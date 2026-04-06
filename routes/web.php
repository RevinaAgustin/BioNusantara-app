<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\SpeciesController;
use App\Http\Controllers\Admin\VerificationController as AdminVerification;
use App\Http\Controllers\Expert\VerificationController as ExpertVerification;
use App\Http\Controllers\User\ObservationController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
 // Admin Routes (Hanya Role 1)
Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::patch('/users/{user}/toggle', [UserController::class, 'toggleStatus'])->name('users.toggle');
    Route::put('/users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('users.reset-password');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/spesies', [SpeciesController::class, 'index'])->name('species.index');
    Route::get('/verifikasi-ahli', [AdminVerification::class, 'index'])->name('verification.index');
    Route::get('/laporan', function () { return inertia('admin/reports'); })->name('reports');
});

// Expert Routes (Hanya Role 2) - SEKARANG JADI BERSIH TANPA PATH PANJANG
Route::middleware(['role:expert'])->prefix('expert')->name('expert.')->group(function () {
    Route::get('/verifikasi', [ExpertVerification::class, 'index'])->name('verification.index');
    Route::post('/verifikasi/store', [ExpertVerification::class, 'store'])->name('verifikasi.store');
    Route::get('/validasi', [ValidationController::class, 'index'])->name('validation.index');
    Route::get('/riwayat', [HistoryController::class, 'index'])->name('history.index');
    Route::get('/statistik', [StatisticsController::class, 'index'])->name('statistics.index');
    
    // Route untuk proses simpan (POST)
    Route::post('/verifikasi', [ExpertVerification::class, 'store'])->name('verification.store');
});
    
    // User Routes (Hanya Role 3)
    Route::middleware(['role:user'])->prefix('user')->name('user.')->group(function () {
        Route::get('/observasi/buat', [ObservationController::class, 'create'])->name('observations.create');
        Route::get('/observasi/riwayat', [ObservationController::class, 'history'])->name('observations.history');
        Route::get('/kontribusi', function () { return inertia('user/contributions'); })->name('contributions');
    });

    // Shared (Bisa diakses semua role yang login)
    Route::get('/jelajah', function () { return inertia('explore'); })->name('explore');
    Route::get('/peta', function () { return inertia('map'); })->name('map');
});

require __DIR__.'/settings.php';