<?php

namespace App\Http\Controllers\Expert;

use App\Http\Controllers\Controller;
use App\Models\Verification;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        return Inertia::render('expert/riwayat/index', [
            'verifications' => Verification::with([
                'observation.species', 
                'observation.user',
                'observation.photos' // Tambahkan ini untuk melihat foto yang diverifikasi
            ])
            ->where('expert_id', Auth::id())
            ->latest()
            ->get()
        ]);
    }
}