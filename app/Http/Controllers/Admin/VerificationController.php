<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerificationController extends Controller
{
    public function index(Request $request)
    {
        $experts = User::where('role', 'expert')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->paginate(10);

        return Inertia::render('admin/verifikasi/index', [
            'experts' => $experts,
        ]);
    }

    public function verifyExpert(Request $request, User $expert)
    {
        $request->validate([
            'status' => 'required|in:verified,rejected',
        ]);

        $expert->update([
            'expert_verified_at' => $request->status === 'verified' ? now() : null,
        ]);

        return back()->with('success', 'Status verifikasi akun Expert diperbarui.');
    }
}