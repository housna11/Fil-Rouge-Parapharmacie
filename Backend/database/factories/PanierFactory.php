<?php

namespace Database\Factories;
use APP\Models\User;
use APP\Models\Commande;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Panier>
 */
class PanierFactory extends Factory
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
            Commande::factory(),
            'total' => $this->faker->numberBetween(0, 500), 
        ];
    }
}
