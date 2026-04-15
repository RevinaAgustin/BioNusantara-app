<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Admin\VerificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerificationController extends Controller
{
    protected $verificationService;

    public function __construct(VerificationService $verificationService)
    {
        $this->verificationService = $verificationService;
    }

    public function index(Request $request)
    {
        return Inertia::render('admin/verifikasi/index', [
            'experts' => $this->verificationService->getPendingExperts($request->search),
        ]);
    }

    public function verifyExpert(Request $request, User $expert)
    {
        $request->validate([
            'status' => 'required|in:verified,rejected',
        ]);

        $this->verificationService->processVerification($expert, $request->status);

        $message = $request->status === 'verified' 
            ? 'Akun Ahli berhasil disetujui.' 
            : 'Pengajuan ditolak dan akun dihapus.';

        return back()->with('success', $message);
    }
}