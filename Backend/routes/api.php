<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\AvisController;
use App\Http\Controllers\FavoriController;
use App\Http\Controllers\AdminController;

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
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/nouveau',[ProductController::class,'nouveau']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/{productId}/avis', [AvisController::class, 'index']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
});

// usercontrol
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});
// commande
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/commandes', [CommandeController::class, 'store']);
});
// panier
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/panier', [PanierController::class, 'show']);             
    Route::post('/panier/add', [PanierController::class, 'store']);       
    Route::delete('/panier/remove/{product}', [PanierController::class, 'destroy']); 
});
// favoris
Route::middleware('auth:sanctum')->group(function () {
Route::get('/favoris', [FavoriController::class, 'index']);
    Route::post('/favoris', [FavoriController::class, 'store']);
    Route::delete('/favoris/{productId}', [FavoriController::class, 'destroy']);

    // Avis
    Route::post('/avis', [AvisController::class, 'store']);
    Route::put('/avis/{id}', [AvisController::class, 'update']);
    Route::delete('/avis/{id}', [AvisController::class, 'destroy']);
});

Route::middleware(['auth:sanctum','admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);   
    Route::get('/admin/avis', [AdminController::class, 'avis']);
    Route::patch('/admin/avis/{id}/visibility', [AdminController::class, 'toggleAvisVisibility']);
    Route::delete('/admin/avis/{id}', [AdminController::class, 'destroyAvis']);

    //Commandes
    Route::get('/commandes', [CommandeController::class, 'index']);
    Route::delete('/admin/commandes/{commande}', [CommandeController::class, 'destroy']);

});