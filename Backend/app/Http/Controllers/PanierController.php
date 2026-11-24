<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Panier;
use App\Http\Requests\StorePanierRequest;
use App\Models\Product;

class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    $user = $request->user();
    if (!$user) {
        return response()->json(['message' => 'Non authentifié'], 401);
    }

    $items = $request->input('items', []);
    if (empty($items)) {
        return response()->json(['message' => 'Aucun produit à ajouter'], 400);
    }

    $panier = Panier::firstOrCreate(
        ['user_id' => $user->id],
        ['total' => 0]
    );

    $total = 0;

    foreach ($items as $item) {
        $product = Product::find($item['product_id']);
        if (!$product) continue; // ignore produit invalide

        $quantity = isset($item['quantite']) && $item['quantite'] > 0 ? $item['quantite'] : 1;

        // syncWithoutDetaching pour éviter les doublons
        $panier->products()->syncWithoutDetaching([
            $product->id => ['quantite' => $quantity]
        ]);

        $total += $product->prix * $quantity;
    }

    // mettre à jour le total du panier
    $panier->total = $total;
    $panier->save();

    return response()->json([
        'message' => 'Commande enregistrée',
        'panier' => $panier->load('products')
    ]);
}



    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }

        $panier = Panier::where('user_id', $user->id)->with('products')->first();
        return $panier ? $panier : response()->json(['message' => 'Panier vide']);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Product $product)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }

        $panier = Panier::where('user_id', $user->id)->first();
        if ($panier) {
            $panier->products()->detach($product->id);
        }

        return response()->json(['message' => 'Produit supprimé du panier']);
    }
}
