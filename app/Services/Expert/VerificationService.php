<?php

namespace App\Services\Expert;

use App\Models\Observation;
use App\Models\Verification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class VerificationService
{
    /**
     * Proses verifikasi observasi oleh expert.
     *
     * @param  array  $data  Data verifikasi (observation_id, is_valid, expert_notes)
     * @param  int  $expertId  ID expert yang melakukan verifikasi
     *
     * @throws ValidationException
     */
    public function processVerification(array $data, int $expertId): Verification
    {
        return DB::transaction(function () use ($data, $expertId) {
            // Validasi tambahan sebelum proses
            $this->validateVerification($data['observation_id']);

            // 1. Simpan data ke tabel verifications
            $verification = Verification::create([
                'observation_id' => $data['observation_id'],
                'expert_id' => $expertId,
                'is_valid' => $data['is_valid'],
                'expert_notes' => $data['expert_notes'] ?? null,
                'verified_at' => now(),
            ]);

            // 2. Update status di tabel observations
            $observation = Observation::findOrFail($data['observation_id']);
            $observation->status = $data['is_valid'] ? 'verified' : 'rejected';
            $observation->verified_by = $expertId;
            $observation->verified_at = now();
            $observation->save();

            // 3. Log aktivitas verifikasi
            $this->logVerificationActivity($verification, $observation);

            return $verification;
        });
    }

    /**
     * Memperbarui verifikasi yang sudah ada.
     *
     * @throws ValidationException
     */
    public function updateVerification(int $verificationId, array $data, int $expertId): Verification
    {
        return DB::transaction(function () use ($verificationId, $data, $expertId) {
            $verification = Verification::where('id', $verificationId)
                ->where('expert_id', $expertId)
                ->firstOrFail();

            // Simpan data lama untuk logging
            $oldData = [
                'is_valid' => $verification->is_valid,
                'expert_notes' => $verification->expert_notes,
            ];

            // Update verifikasi
            $verification->update([
                'is_valid' => $data['is_valid'] ?? $verification->is_valid,
                'expert_notes' => $data['expert_notes'] ?? $verification->expert_notes,
                'updated_at' => now(),
            ]);

            // Update status observasi jika is_valid berubah
            if (isset($data['is_valid']) && $data['is_valid'] !== $oldData['is_valid']) {
                $observation = Observation::findOrFail($verification->observation_id);
                $observation->status = $data['is_valid'] ? 'verified' : 'rejected';
                $observation->save();
            }

            // Log perubahan
            $this->logVerificationUpdate($verification, $oldData);

            return $verification;
        });
    }

    /**
     * Mendapatkan daftar observasi yang menunggu verifikasi.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getPendingObservations(array $filters = [])
    {
        $query = Observation::with(['user', 'photos', 'species'])
            ->where('status', 'pending');

        // Filter by species if provided
        if (! empty($filters['species_id'])) {
            $query->where('species_id', $filters['species_id']);
        }

        // Filter by date range if provided
        if (! empty($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }
        if (! empty($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        return $query->latest()->get();
    }

    /**
     * Mendapatkan statistik verifikasi untuk expert.
     */
    public function getExpertStatistics(int $expertId): array
    {
        $verifications = Verification::where('expert_id', $expertId);

        return [
            'total' => $verifications->count(),
            'verified' => (clone $verifications)->where('is_valid', true)->count(),
            'rejected' => (clone $verifications)->where('is_valid', false)->count(),
            'today' => (clone $verifications)->whereDate('created_at', today())->count(),
            'this_week' => (clone $verifications)->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
            'this_month' => (clone $verifications)->whereMonth('created_at', now()->month)->count(),
            'average_per_day' => $this->calculateAveragePerDay($expertId),
        ];
    }

    /**
     * Validasi sebelum verifikasi.
     *
     * @throws ValidationException
     */
    private function validateVerification(int $observationId): void
    {
        $observation = Observation::find($observationId);

        if (! $observation) {
            throw ValidationException::withMessages([
                'observation_id' => 'Observasi tidak ditemukan.',
            ]);
        }

        if ($observation->status !== 'pending') {
            throw ValidationException::withMessages([
                'observation_id' => 'Observasi ini sudah diverifikasi sebelumnya.',
            ]);
        }

        $existingVerification = Verification::where('observation_id', $observationId)->first();
        if ($existingVerification) {
            throw ValidationException::withMessages([
                'observation_id' => 'Observasi ini sudah memiliki record verifikasi.',
            ]);
        }
    }

    /**
     * Log aktivitas verifikasi.
     */
    private function logVerificationActivity(Verification $verification, Observation $observation): void
    {
        $status = $verification->is_valid ? 'verified' : 'rejected';

        Log::info('Observasi diverifikasi', [
            'observation_id' => $observation->id,
            'expert_id' => $verification->expert_id,
            'status' => $status,
            'verification_id' => $verification->id,
            'timestamp' => now()->toDateTimeString(),
        ]);
    }

    /**
     * Log perubahan verifikasi.
     */
    private function logVerificationUpdate(Verification $verification, array $oldData): void
    {
        Log::info('Verifikasi diperbarui', [
            'verification_id' => $verification->id,
            'expert_id' => $verification->expert_id,
            'old_data' => $oldData,
            'new_data' => [
                'is_valid' => $verification->is_valid,
                'expert_notes' => $verification->expert_notes,
            ],
            'timestamp' => now()->toDateTimeString(),
        ]);
    }

    /**
     * Hitung rata-rata verifikasi per hari.
     */
    private function calculateAveragePerDay(int $expertId): float
    {
        $total = Verification::where('expert_id', $expertId)->count();

        if ($total === 0) {
            return 0;
        }

        $firstVerification = Verification::where('expert_id', $expertId)
            ->orderBy('created_at', 'asc')
            ->first();

        if (! $firstVerification) {
            return 0;
        }

        $days = max(1, now()->diffInDays($firstVerification->created_at));

        return round($total / $days, 2);
    }

    /**
     * Mendapatkan detail verifikasi lengkap dengan relasi.
     */
    public function getVerificationWithRelations(int $verificationId): ?Verification
    {
        return Verification::with(['expert', 'observation.user', 'observation.photos', 'observation.species'])
            ->find($verificationId);
    }

    /**
     * Mengecek apakah expert sudah pernah memverifikasi observasi tertentu.
     */
    public function hasExpertVerified(int $observationId, int $expertId): bool
    {
        return Verification::where('observation_id', $observationId)
            ->where('expert_id', $expertId)
            ->exists();
    }
 
}
