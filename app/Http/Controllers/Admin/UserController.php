<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query()
            // LOGIKA: Sembunyikan akun Admin yang sedang login
            ->where('id', '!=', Auth::id())
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->role, function ($query, $role) {
                $query->where('role_id', $role);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'role_id' => 'required|exists:roles,id',

        ]);
        $user->update($validated);

        return redirect()->back()->with('success', 'Data user berhasil diperbarui.');
    }

    public function toggleStatus(User $user)
    {
        // LOGIKA: Toggle kolom is_active
        $user->is_active = ! $user->is_active;
        $user->save();

        $status = $user->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return redirect()->back()->with('success', "Akun {$user->name} berhasil {$status}.");
    }

    public function resetPassword(Request $request, User $user)
    {
        $request->validate(['password' => 'required|string|min:8']);
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return redirect()->back()->with('success', 'Password user berhasil direset.');
    }

    /**
     * Remove user.
     */
    public function destroy(User $user)
    {
        // Perbaikan: Gunakan Auth::id() untuk menghilangkan error Intelephense
        if ($user->id === Auth::id()) {
            return redirect()->back()->with('error', 'Anda tidak bisa menghapus akun sendiri!');
        }
        $user->delete();

        return redirect()->back()->with('success', 'Akun user berhasil dihapus permanen.');
    }
}
