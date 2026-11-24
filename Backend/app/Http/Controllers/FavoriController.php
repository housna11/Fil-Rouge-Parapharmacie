<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class FavoriController extends Controller
{
    public function index(Request $request)
    {
        $favoris = $request->user()
            ->favoris()
            ->with('category')
            ->get();
        return response()->json($favoris);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);
        $request->user()->favoris()->syncWithoutDetaching([
            $validated['product_id']
        ]);

        return response()->json([
            'message' => 'Produit ajouté aux favoris'
        ], 201);
    }

    public function destroy(Request $request, $productId)
    {
        $request->user()->favoris()->detach($productId);
        return response()->json([
            'message' => 'Produit retiré des favoris'
        ]);
    }
}
