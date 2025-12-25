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
        {
        $panier = Panier::find($request->panier_id); 
        $commande = Commande::create([
            'user_id' => $panier->user_id,
            'panier_id' => $panier->id,
            'status' => 'en cours',
        ]);

        foreach ($panier->products as $product) {
            $commande->products()->attach($product->id, ['quantite' => $product->pivot->quantite]);
        }

        return $commande->load('products');
    }
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
