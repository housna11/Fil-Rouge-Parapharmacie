<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    use HasFactory;
    protected $fillable = [ 
        'user_id',
        'commande_id',
        'total',
    ];

    public function commandes()
{
    return $this->hasMany(Commande::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}


}
