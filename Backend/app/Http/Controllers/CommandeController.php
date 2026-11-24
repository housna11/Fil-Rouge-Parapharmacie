<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Models\Panier;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Commande::class);
        return Commande::with(['user', 'products'])->get();
    
    }

    /**
     * Store a newly created resource in storage.
     */
 public function store(Request $request)
{
    $user = $request->user(); // سواء admin أو user

    // ممنوع تمرير user_id من frontend
    // دايماً ناخدو user connecté

    $panier = Panier::where('user_id', $user->id)
        ->with('products')
        ->first();

    if (!$panier || $panier->products->isEmpty()) {
        return response()->json(['message' => 'Panier vide'], 400);
    }

    $commande = Commande::create([
        'user_id'   => $user->id, // 👈 مهم
        'panier_id' => $panier->id,
        'status'    => 'en cours',
    ]);

    foreach ($panier->products as $product) {
        $commande->products()->attach($product->id, [
            'quantite' => $product->pivot->quantite
        ]);
    }

    // تفريغ panier
    $panier->products()->detach();
    $panier->update(['total' => 0]);

    return response()->json([
        'message' => 'Commande créée avec succès',
        'commande' => $commande->load('products')
    ]);
}



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commande $commande)
    {
        $this->authorize('delete', $commande);
        $commande->delete();
        return response()->json(['message' => 'Commande supprimée']);
    }
}
