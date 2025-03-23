<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\HabitacionController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('hoteles', HotelController::class);
Route::post('hoteles/{hotel}/habitaciones', [HabitacionController::class, 'store']);
Route::delete('habitaciones/{id}', [HabitacionController::class, 'destroy']);
