<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\PanierController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product}', [ProductController::class, 'show']);

    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
});

// usercontrol
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});
// commandecont
Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/commandes', [CommandeController::class, 'index']);
    Route::post('/commandes', [CommandeController::class, 'store']);
    Route::delete('/commandes/{commande}', [CommandeController::class, 'destroy']);
});
// panier
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/panier', [PanierController::class, 'show']);             
    Route::post('/panier/add', [PanierController::class, 'store']);       
    Route::delete('/panier/remove/{product}', [PanierController::class, 'destroy']); 
});
