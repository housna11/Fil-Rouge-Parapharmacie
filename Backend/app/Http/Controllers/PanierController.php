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
    public function store(StorePanierRequest $request)
    {
            $panier = Panier::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['total' => 0]
        );

        $panier->products()->attach($request->product_id, [
            'quantite' => $request->quantite ?? 1
        ]);

        return response()->json(['message' => 'Produit ajouté au panier']);
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
