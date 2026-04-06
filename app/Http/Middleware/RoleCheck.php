<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleCheck
{
    /**
     * Handle an incoming request.
     * * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string[]  ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 1. Cek apakah user sudah login
        if (!Auth::check()) {
            return redirect('/login');
        }

        // 2. Ambil role_id user (1: Admin, 2: Expert, 3: User)
        $userRole = Auth::user()->role_id;

        // 3. Mapping nama role ke ID (sesuai database kita)
        $roleMap = [
            'admin' => 1,
            'expert' => 2,
            'user' => 3,
        ];

        // 4. Validasi akses
        foreach ($roles as $role) {
            if (isset($roleMap[$role]) && $userRole == $roleMap[$role]) {
                return $next($request);
            }
        }

        // Jika tidak punya akses, lempar ke 403 atau dashboard
        abort(403, 'Anda tidak memiliki izin untuk mengakses halaman ini.');
    }
}