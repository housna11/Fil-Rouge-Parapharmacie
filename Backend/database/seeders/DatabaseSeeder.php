<?php

namespace Database\Seeders;
use App\Models\Panier;

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

    foreach ($users as $user) {
        Panier::create([
            'user_id' => $user->id,
            'total' => 0,
        ]);
    }

    $commandes = Commande::factory(5)->create([
        'user_id' => $users->random()->id,
    ]);

    foreach ($commandes as $commande) {
        $randomProducts = $products->random(rand(2,5));
        $total = 0;

        foreach ($randomProducts as $product) {
            $qte = rand(1,3);

            $commande->products()->attach($product->id, [
                'quantite' => $qte
            ]);

            $total += $product->prix * $qte;
        }

        Panier::where('user_id', $commande->user_id)->update([
                'commande_id' => $commande->id,
                'total' => $total
            ]);
    }
}
        
    
}
