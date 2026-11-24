<?php

namespace Database\Factories;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commande>
 */
class CommandeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'status' => 'en_attente',
            'total' => 0,
            'nom_complet' => fake()->name(),
            'telephone' => '0612345678',
            'adresse' => fake()->address(),
            'ville' => fake()->city(),
            'code_postal' => null,
            'notes' => null,
            'payment_method' => 'cash_on_delivery',
            'payment_status' => 'pending',
        ];
    }
}
