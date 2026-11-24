
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('panier_produit', function (Blueprint $table) {
            $table->id();

            $table->foreignId('panier_id')
                ->constrained('paniers')
                ->cascadeOnDelete();

            $table->foreignId('product_id')
                ->constrained('products')
                ->cascadeOnDelete();

            $table->unsignedInteger('quantite')->default(1);
            $table->decimal('prix_unitaire', 10, 2);

            $table->timestamps();

            $table->unique(['panier_id', 'product_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('panier_produit');
    }
};
