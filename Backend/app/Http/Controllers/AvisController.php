<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Avis;

class AvisController extends Controller
{
    public function index($productId)
    {
        $avis = Avis::with('user:id,nom')
            ->where('product_id', $productId)
            ->where('is_visible', true)
            ->latest()
            ->get();

        return response()->json($avis);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'nullable|string|max:2000',
        ]);

        $avis = $request->user()->avis()->updateOrCreate(
            [
                'product_id' => $validated['product_id']
            ],
            [
                'note' => $validated['note'],
                'commentaire' => $validated['commentaire'] ?? null,
            ]
        );

        return response()->json([
            'message' => 'Avis enregistré avec succès',
            'avis' => $avis
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $avis = $request->user()->avis()->findOrFail($id);
        $validated = $request->validate([
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'nullable|string|max:2000',
        ]);

        $avis->update($validated);
        return response()->json([
            'message' => 'Avis modifié avec succès',
            'avis' => $avis
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $avis = $request->user()->avis()->findOrFail($id);
        $avis->delete();
        return response()->json([
            'message' => 'Avis supprimé avec succès'
        ]);
    }
}
