<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Observation;
use App\Models\Species;
use App\Services\User\ObservationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ObservationController extends Controller
{
    protected $observationService;

    public function __construct(ObservationService $service)
    {
        $this->observationService = $service;
    }

    /**
     * Display a listing of the user's observations.
     */
    public function index()
    {
        $userId = Auth::id();

        return Inertia::render('User/Observation/Index', [
            'observations' => Observation::with(['photos', 'species'])
                ->where('user_id', $userId)
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new observation.
     */
    public function create()
    {
        return Inertia::render('observasi', [
            'speciesList' => Species::select('id', 'scientific_name', 'category')->get(),
        ]);
    }

    /**
     * Store a newly created observation in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'notes' => 'nullable|string',
            'species_id' => 'nullable|exists:species,id',
            'ai_confidence' => 'nullable|numeric|min:0|max:100',
        ]);

        try {
            // Memanggil service untuk menangani Database Transaction & Upload Foto
            $this->observationService->store($request->all(), Auth::id());

            return redirect()
                ->route('observations.index')
                ->with('success', 'Observasi berhasil terkirim.');

        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal menyimpan observasi: '.$e->getMessage());
        }
    }

    /**
     * Display the specified observation.
     */
    public function show(Observation $observation)
    {
        // Pastikan hanya pemilik yang bisa melihat detail observasi
        if (! $this->isOwner($observation)) {
            abort(403, 'Anda tidak memiliki akses ke observasi ini.');
        }

        return Inertia::render('User/Observation/Show', [
            'observation' => $observation->load(['photos', 'species', 'verification']),
        ]);
    }

    /**
     * Remove the specified observation from storage.
     */
    public function destroy(Observation $observation)
    {
        // Pastikan hanya pemilik yang bisa hapus dan data masih 'pending'
        if (! $this->isOwner($observation) || $observation->status !== 'pending') {
            abort(403, 'Data sudah diverifikasi atau Anda bukan pemiliknya.');
        }

        try {
            // Gunakan service agar file di folder storage juga terhapus
            $this->observationService->delete($observation);

            return redirect()
                ->route('observations.index')
                ->with('success', 'Data berhasil dihapus.');

        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus observasi: '.$e->getMessage());
        }
    }

    /**
     * Edit the specified observation.
     */
    public function edit(Observation $observation)
    {
        // Pastikan hanya pemilik yang bisa edit dan data masih 'pending'
        if (! $this->isOwner($observation) || $observation->status !== 'pending') {
            abort(403, 'Data sudah diverifikasi atau Anda bukan pemiliknya.');
        }

        return Inertia::render('User/Observation/Edit', [
            'observation' => $observation->load('photos'),
            'speciesList' => Species::select('id', 'scientific_name', 'category')->get(),
        ]);
    }

    /**
     * Update the specified observation in storage.
     */
    public function update(Request $request, Observation $observation)
    {
        // Pastikan hanya pemilik yang bisa update dan data masih 'pending'
        if (! $this->isOwner($observation) || $observation->status !== 'pending') {
            abort(403, 'Data sudah diverifikasi atau Anda bukan pemiliknya.');
        }

        $request->validate([
            'latitude' => 'sometimes|required|numeric',
            'longitude' => 'sometimes|required|numeric',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'notes' => 'nullable|string',
            'species_id' => 'nullable|exists:species,id',
        ]);

        try {
            // Update observation
            $observation->update($request->only([
                'latitude',
                'longitude',
                'notes',
                'species_id',
            ]));

            // Handle new photo if uploaded
            if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
                // Delete old photos first
                foreach ($observation->photos as $photo) {
                    $this->observationService->deletePhoto($photo);
                }

                // Upload new photo
                $this->observationService->uploadPhoto($request->file('photo'), $observation->id);
            }

            return redirect()
                ->route('observations.show', $observation->id)
                ->with('success', 'Observasi berhasil diperbarui.');

        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal memperbarui observasi: '.$e->getMessage());
        }
    }

    /**
     * Check if the authenticated user is the owner of the observation.
     */
    private function isOwner(Observation $observation): bool
    {
        return $observation->user_id === Auth::id();
    }
}
