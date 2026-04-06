<?php

namespace App\Http\Controllers;

use App\Models\Observation;
use App\Models\Species;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->role_id;

        // 1. DASHBOARD ADMIN (Role 1)
        if ($role === 1) {
            return Inertia::render('admin/dashboard', [
                'stats' => [
                    'total_users' => User::count(),
                    'total_observations' => Observation::count(),
                    'total_species' => Species::count(),
                    'pending_verifications' => Observation::where('status', 'pending')->count(),
                ],
                'recent_users' => User::latest()->take(5)->get(),
            ]);
        }

        // 2. DASHBOARD EXPERT (Role 2)
        if ($role === 2) {
            return Inertia::render('expert/dashboard', [
                'tasks' => [
                    'pending_count' => Observation::where('status', 'pending')->count(),
                    'verified_count' => Observation::where('status', 'verified')->count(),
                ],
                'recent_pending' => Observation::with(['user', 'photos'])
                    ->where('status', 'pending')
                    ->latest()
                    ->take(10)
                    ->get(),
            ]);
        }

        // 3. DASHBOARD USER / CITIZEN SCIENTIST (Role 3)
        if ($role === 3) {
            return Inertia::render('dashboard', [ // Default Dashboard User
                'user_stats' => [
                    'my_total_uploads' => Observation::where('user_id', $user->id)->count(),
                    'my_verified' => Observation::where('user_id', $user->id)->where('status', 'verified')->count(),
                    'my_rejected' => Observation::where('user_id', $user->id)->where('status', 'rejected')->count(),
                ],
                'my_recent_uploads' => Observation::with('species')
                    ->where('user_id', $user->id)
                    ->latest()
                    ->take(5)
                    ->get(),
            ]);
        }

        abort(403, 'Role tidak dikenali.');
    }
}