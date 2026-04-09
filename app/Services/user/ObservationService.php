<?php

namespace App\Services\User;

use App\Models\Observation;
use App\Models\ObservationPhoto;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ObservationService
{
    /**
     * Menyimpan data observasi beserta fotonya.
     *
     * @param  array  $data  Data dari request (latitude, longitude, notes, dll)
     * @param  int  $userId  ID User yang sedang login
     */
    public function store(array $data, int $userId): Observation
    {
        return DB::transaction(function () use ($data, $userId) {
            // 1. Simpan data utama ke tabel 'observations'
            $observation = Observation::create([
                'user_id' => $userId,
                'species_id' => $data['species_id'] ?? null,
                'latitude' => $data['latitude'],
                'longitude' => $data['longitude'],
                'notes' => $data['notes'] ?? null,
                'ai_confidence' => $data['ai_confidence'] ?? 0,
                'status' => 'pending',
            ]);

            // 2. Upload foto jika ada
            if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
                $this->uploadPhoto($data['photo'], $observation->id);
            }

            return $observation;
        });
    }

    /**
     * Upload photo untuk observasi.
     */
    public function uploadPhoto(UploadedFile $photo, int $observationId): ObservationPhoto
    {
        // Simpan file ke folder 'public/observations'
        $path = $photo->store('observations', 'public');

        // Simpan path-nya ke tabel 'observation_photos'
        return ObservationPhoto::create([
            'observation_id' => $observationId,
            'file_path' => $path,
        ]);
    }

    /**
     * Menghapus observasi beserta file fisik fotonya.
     */
    public function delete(Observation $observation): ?bool
    {
        return DB::transaction(function () use ($observation) {
            // Hapus semua foto terkait
            foreach ($observation->photos as $photo) {
                $this->deletePhoto($photo);
            }

            // Hapus record observasi
            return $observation->delete();
        });
    }

    /**
     * Menghapus file foto dari storage dan record dari database.
     */
    public function deletePhoto(ObservationPhoto $photo): ?bool
    {
        // Hapus file fisik dari storage
        if (Storage::disk('public')->exists($photo->file_path)) {
            Storage::disk('public')->delete($photo->file_path);
        }

        // Hapus record foto
        return $photo->delete();
    }

    /**
     * Mendapatkan observasi dengan semua relasinya.
     */
    public function getObservationWithRelations(int $observationId, int $userId): ?Observation
    {
        return Observation::with(['photos', 'species', 'verification'])
            ->where('id', $observationId)
            ->where('user_id', $userId)
            ->first();
    }

    /**
     * Update status observasi.
     */
    public function updateStatus(Observation $observation, string $status): bool
    {
        $allowedStatuses = ['pending', 'verified', 'rejected'];

        if (! in_array($status, $allowedStatuses)) {
            throw new \InvalidArgumentException('Status tidak valid');
        }

        return $observation->update(['status' => $status]);
    }

    /**
     * Mendapatkan statistik observasi user.
     */
    public function getUserStatistics(int $userId): array
    {
        return [
            'total' => Observation::where('user_id', $userId)->count(),
            'pending' => Observation::where('user_id', $userId)->where('status', 'pending')->count(),
            'verified' => Observation::where('user_id', $userId)->where('status', 'verified')->count(),
            'rejected' => Observation::where('user_id', $userId)->where('status', 'rejected')->count(),
        ];
    }
}