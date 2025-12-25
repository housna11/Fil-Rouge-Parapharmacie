<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Commande;

class CommandePolicy
{
   public function viewAny(User $user)
    {
    return $user->role === 'admin';
    }

    public function delete(User $user, Commande $commande)
    {
    return $user->role === 'admin';
    }

   
}
