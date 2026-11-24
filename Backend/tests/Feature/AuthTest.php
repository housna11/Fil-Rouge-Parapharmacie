<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * Test user registration.
     */
    public function test_user_can_register()
    {
        $email = 'maria_' . time() . '@example.com'; 

        $response = $this->postJson('/api/register', [
            'nom' => 'Maria',
            'email' => $email,
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->dump(); // باش تشوفي JSON response

        $response->assertStatus(201)
                 ->assertJsonStructure(['message', 'user', 'token']);
    }

    /**
     * Test user login.
     */
    public function test_user_can_login()
    {
        $user = User::where('email', 'login@example.com')->first();

        if (!$user) {
            $user = User::create([
                'nom' => 'Login User',
                'email' => 'login@example.com',
                'password' => Hash::make('password123'),
                'role' => 'utilisateur',
            ]);
        }

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['message', 'user', 'token']);
    }

    /**
     * Test user logout.
     */
    public function test_user_can_logout()
    {
        $user = User::factory()->create([
            'email' => 'logout_' . time() . '@example.com',
            'password' => bcrypt('password123')
        ]);

        $token = $user->createToken('token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/logout');

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Déconnexion réussie',
                 ]);
    }
}
