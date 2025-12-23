<?php

namespace Database\Seeders;

use App\Models\Commande;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'email' => 'housna@test.com',
            'role' => 'admin',
        ]);

        $users = User::factory(5)->create();

        $products = Product::factory(10)->create();

        $commandes = Commande::factory(5)->create([
            'user_id' => $users->random()->id,
        ]);

        foreach ($commandes as $commande) {
            $randomProducts = $products->random(rand(2,5));

            foreach ($randomProducts as $product) {
                $commande->products()->attach($product->id, [
                    'quantite' => rand(1,3) 
                ]);
            }
        }
    }
}
