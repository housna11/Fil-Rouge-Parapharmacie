<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmationCommandeMail;
use App\Models\Commande;
use App\Models\Panier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Commande::with(['user', 'products'])->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_complet' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'required|string|max:30',
            'ville' => 'required|string|max:100',
            'adresse' => 'required|string',
            'payment_method' => 'nullable|string|in:cash_on_delivery,card',
        ]);

        $user = $request->user();
        $panier = Panier::where('user_id', $user->id)
            ->with('products')
            ->first();

        if (!$panier || $panier->products->isEmpty()) {
            return response()->json(['message' => 'Panier vide'], 400);
        }

        $sousTotal = 0;
        foreach ($panier->products as $product) {
            $quantite = max(1, (int) ($product->pivot->quantite ?? 1));
            $prixUnitaire = (float) $product->prix;
            $sousTotal += $prixUnitaire * $quantite;
        }

        $villes = config('livraison.villes', []);
        $defaultFee = (float) config('livraison.default_fee', 40);
        $freeThreshold = (float) config('livraison.free_shipping_threshold', 500);

        $fraisLivraison = ($freeThreshold > 0 && $sousTotal >= $freeThreshold)
            ? 0.0
            : (float) ($villes[$validated['ville']] ?? $defaultFee);

        $totalFinal = $sousTotal + $fraisLivraison;

        $commande = Commande::create([
            'user_id' => $user->id,
            'panier_id' => $panier->id,
            'status' => 'en_attente',
            'sous_total' => $sousTotal,
            'frais_livraison' => $fraisLivraison,
            'total' => $totalFinal,
            'nom_complet' => $validated['nom_complet'],
            'email' => $validated['email'],
            'telephone' => $validated['telephone'],
            'ville' => $validated['ville'],
            'adresse' => $validated['adresse'],
            'payment_method' => $validated['payment_method'] ?? 'cash_on_delivery',
            'payment_status' => 'pending',
        ]);

        foreach ($panier->products as $product) {
            $quantite = max(1, (int) ($product->pivot->quantite ?? 1));
            $commande->products()->attach($product->id, [
                'product_nom' => $product->nom,
                'product_image' => $product->image,
                'prix_unitaire' => (float) $product->prix,
                'quantite' => $quantite,
            ]);
        }

        $panier->products()->detach();
        $panier->update(['total' => 0]);

        $commande->load(['user', 'products']);

        if (!empty($commande->email)) {
            Mail::to($commande->email)->send(new ConfirmationCommandeMail($commande));
        }

        return response()->json([
            'message' => 'Commande créée avec succès',
            'commande' => $commande,
        ], 201);
    }
    
    public function destroy(Commande $commande)
    {
        $commande->delete();
        return response()->json(['message' => 'Commande supprimée']);
    }
}