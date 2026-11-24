<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'marque',
        'prix',
        'description',
        'image',
        'stock',
        'category_id',
        'is_active',
    ];

    protected $casts = [
        'prix' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function paniers()
    {
        return $this->belongsToMany(Panier::class, 'panier_produit')
            ->withPivot('quantite', 'prix_unitaire')
            ->withTimestamps();
    }

    public function commandes()
    {
        return $this->belongsToMany(Commande::class, 'commande_produit')
            ->withPivot(
                'product_nom',
                'product_image',
                'prix_unitaire',
                'quantite'
            )
            ->withTimestamps();
    }
}
