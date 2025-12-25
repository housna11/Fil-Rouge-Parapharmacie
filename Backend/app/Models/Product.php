<?php

namespace App\Models;
use App\Models\Commande;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'prix', 'description', 'image', 'stock'];
    
    public function commandes(){
    return $this->belongsToMany(Commande::class, 'commande_produit');
    }
}

