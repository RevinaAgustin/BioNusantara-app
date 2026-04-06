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
        // Menampilkan daftar User dengan role 'expert' yang menunggu verifikasi admin
        $experts = User::where('role', 'expert') // Atau role_id sesuai database kamu
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->paginate(10);

        return Inertia::render('admin/verifications/index', [
            'experts' => $experts,
        ]);
    }

    public function verifyExpert(Request $request, User $expert)
    {
        $request->validate([
            'status' => 'required|in:verified,rejected',
        ]);

        // Admin memverifikasi apakah akun ini layak jadi Expert
        $expert->update([
            'expert_verified_at' => $request->status === 'verified' ? now() : null,
        ]);

        return back()->with('success', 'Status verifikasi akun Expert diperbarui.');
    }
}
