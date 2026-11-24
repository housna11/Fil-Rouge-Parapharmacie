<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\Panier;
use App\Models\Commande;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::factory()->create([
            'nom' => 'Admin',
            'email' => 'housna@test.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        $users = User::factory(5)->create([
            'role' => 'client',
        ]);

        $categories = collect([
            'Visage',
            'Cheveux',
            'Corps',
            'Hygiène',
            'Compléments alimentaires',
        ])->map(fn ($nom) => Category::create([
            'nom' => $nom,
            'slug' => \Illuminate\Support\Str::slug($nom),
            'is_active' => true,
        ]));

        $products = Product::factory(10)->make()->each(function ($product) use ($categories) {
            $product->category_id = $categories->random()->id;
            $product->save();
        });

        foreach ($users as $user) {
            Panier::create([
                'user_id' => $user->id,
                'total' => 0,
            ]);
        }

        foreach (range(1, 5) as $i) {
            $user = $users->random();

            $commande = Commande::factory()->create([
                'user_id' => $user->id,
            ]);

            $total = 0;

            foreach ($products->random(2) as $product) {
                $quantite = rand(1, 3);
                $prix = (float) $product->prix;

                $commande->products()->attach($product->id, [
                    'product_nom' => $product->nom,
                    'product_image' => $product->image,
                    'prix_unitaire' => $prix,
                    'quantite' => $quantite,
                ]);

                $total += $prix * $quantite;
            }

            $commande->update(['total' => $total]);
        }
    }
}
