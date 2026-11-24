
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('commande_produit', function (Blueprint $table) {
            $table->id();

            $table->foreignId('commande_id')
                ->constrained('commandes')
                ->cascadeOnDelete();

            $table->foreignId('product_id')
                ->nullable()
                ->constrained('products')
                ->nullOnDelete();

            // Historique du produit au moment de la commande
            $table->string('product_nom');
            $table->string('product_image')->nullable();

            $table->decimal('prix_unitaire', 10, 2);
            $table->unsignedInteger('quantite')->default(1);

            $table->timestamps();

            $table->unique(['commande_id', 'product_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('commande_produit');
    }
};
