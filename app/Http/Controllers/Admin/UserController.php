<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Admin\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        return Inertia::render('admin/users/index', [
            'users' => $this->userService->getPaginatedUsers($request->search),
            'filters' => $request->only(['search'])
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $this->userService->updateRole($user, $request->role_id);

        return redirect()->back()->with('success', "Otoritas {$user->name} berhasil diperbarui.");
    }

    public function toggleStatus(User $user)
    {
        $this->userService->toggleUserStatus($user);
        $status = $user->is_active ? 'diaktifkan' : 'dinonaktifkan';
        
        return redirect()->back()->with('success', "Akun {$user->name} berhasil {$status}.");
    }

    public function sendResetLink(User $user)
    {
        $status = $this->userService->sendPasswordReset($user);

        return $status === \Illuminate\Support\Facades\Password::RESET_LINK_SENT
            ? redirect()->back()->with('success', 'Link reset password telah dikirim.')
            : redirect()->back()->with('error', 'Gagal mengirim email reset.');
    }

    public function destroy(User $user)
    {
        $this->userService->deleteUser($user);
        return redirect()->back()->with('success', 'Akun user berhasil dihapus.');
    }
}