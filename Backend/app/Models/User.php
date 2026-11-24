<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'user_id');
    }

    public function panier()
    {
        return $this->hasOne(Panier::class, 'user_id');
    }

    // Les avis publiés par l'utilisateur
    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    // Les produits favoris
    public function favoris()
    {
        return $this->belongsToMany(
            Product::class,
            'favoris'
        )->withTimestamps();
    }
}
