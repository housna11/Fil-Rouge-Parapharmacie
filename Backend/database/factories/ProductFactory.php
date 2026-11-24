<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
       return [
            'nom' => fake()->word(),
            'marque' => fake()->company(),
            'prix' => fake()->randomFloat(2, 50, 300),
            'description' => fake()->sentence(),
            'image' => 'product.jpg',
            'stock' => fake()->numberBetween(0, 100),
            'is_active' => true,
        ];
    }
}
