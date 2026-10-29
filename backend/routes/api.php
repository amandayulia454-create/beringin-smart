
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LaporanController;
use Illuminate\Support\Facades\Route;

// Login
Route::post('/login', [AuthController::class, 'login']);

// Mengambil daftar laporan
Route::get('/laporan', [LaporanController::class, 'index']);

// Route yang membutuhkan login
Route::middleware('auth:sanctum')->group(function () {

    // Mengirim laporan
    Route::post('/laporan', [LaporanController::class, 'store']);

    // Mengubah status laporan
    Route::patch('/laporan/{id}/status', [
        LaporanController::class,
        'updateStatus'
    ]);

});
