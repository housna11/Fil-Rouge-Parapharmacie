<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
public function register(RegisterRequest $request)
    {
    $user = User::create([
        'nom' => $request->nom,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => 'utilisateur',
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Inscription réussie',
        'user' => $user,
        'token' => $token,
    ]);

    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
    }

    $token = $user->createToken('token')->plainTextToken;

    return response()->json([
        'message' => 'Connexion réussie',
        'user' => $user,
        'token' => $token,
    ]);

    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie',
        ]);
    }

}
