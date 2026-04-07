<?php

use App\Http\Controllers\Admin\SpeciesController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VerificationController as AdminVerification;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Expert\VerificationController as ExpertVerification;
use App\Http\Controllers\Expert\ValidationController; // Tambahin ini
use App\Http\Controllers\Expert\HistoryController;    // Tambahin ini
use App\Http\Controllers\Expert\StatisticsController; // Tambahin ini
use App\Http\Controllers\User\ObservationController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (Bisa diakses tanpa login)
|--------------------------------------------------------------------------
*/
Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// PINDAH KE SINI: Biar publik bisa akses tanpa disuruh login
Route::get('/jelajah', function () {
    return inertia('Jelajah'); // Sesuaikan dengan nama file Jelajah.tsx kamu
})->name('explore');

Route::get('/peta', function () {
    return inertia('map');
})->name('map');


/*
|--------------------------------------------------------------------------
| PRIVATE ROUTES (Wajib login)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Admin Routes (Hanya Role Admin)
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::patch('/users/{user}/toggle', [UserController::class, 'toggleStatus'])->name('users.toggle');
        Route::put('/users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('users.reset-password');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        Route::get('/spesies', [SpeciesController::class, 'index'])->name('species.index');
        Route::get('/verifikasi-ahli', [AdminVerification::class, 'index'])->name('verification.index');
        Route::get('/laporan', function () {
            return inertia('admin/reports');
        })->name('reports');
    });

    // Expert Routes (Hanya Role Expert)
    Route::middleware(['role:expert'])->prefix('expert')->name('expert.')->group(function () {
        Route::get('/verifikasi', [ExpertVerification::class, 'index'])->name('verification.index');
        Route::get('/validasi', [ValidationController::class, 'index'])->name('validation.index');
        Route::get('/riwayat', [HistoryController::class, 'index'])->name('history.index');
        Route::get('/statistik', [StatisticsController::class, 'index'])->name('statistics.index');
        Route::post('/verifikasi', [ExpertVerification::class, 'store'])->name('verification.store');
    });

    // User Routes (Hanya Role User Biasa)
    Route::middleware(['role:user'])->prefix('user')->name('user.')->group(function () {
        Route::get('/observasi/buat', [ObservationController::class, 'create'])->name('observations.create');
        Route::get('/observasi/riwayat', [ObservationController::class, 'history'])->name('observations.history');
        Route::get('/kontribusi', function () {
            return inertia('user/contributions');
        })->name('contributions');
    });

});

require __DIR__.'/settings.php';