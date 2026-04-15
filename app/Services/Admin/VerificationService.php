<?php

namespace App\Services\Admin;

use App\Models\User;

class VerificationService
{
    public function getPendingExperts($search = null)
    {
        return User::where('role_id', 2)
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }

    public function processVerification(User $expert, string $status)
    {
        if ($status === 'verified') {
            return $expert->update([
                'expert_verified_at' => now(),
                'role_id' => 2,
                'is_active' => true
            ]);
        }

        return $expert->delete(); // Rejected = Delete
    }
}