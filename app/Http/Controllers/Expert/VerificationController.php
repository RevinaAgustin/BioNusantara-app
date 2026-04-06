<?php

namespace App\Http\Controllers\Expert;

use App\Http\Controllers\Controller;
use App\Models\Observation;
use App\Models\Verification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VerificationController extends Controller
{
    public function index()
    {
        return Inertia::render('expert/verifications/index', [
            'pendingObservations' => Observation::with(['user', 'photos', 'species'])
                ->where('status', 'pending')
                ->latest()
                ->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'observation_id' => 'required|exists:observations,id',
            'is_valid' => 'required|boolean',
            'notes' => 'nullable|string|max:1000',
        ]);

        Verification::create([
            'observation_id' => $validated['observation_id'],
            'expert_id' => Auth::id(),
            'is_valid' => $validated['is_valid'],
            'notes' => $validated['notes'],
        ]);

        $observation = Observation::find($validated['observation_id']);
        $observation->update(['status' => $validated['is_valid'] ? 'verified' : 'rejected']);

       return redirect()->back()->with('success', 'Berhasil memproses verifikasi observasi.');
    }
}