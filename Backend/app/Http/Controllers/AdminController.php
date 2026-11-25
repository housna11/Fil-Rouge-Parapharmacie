<?php
namespace App\Http\Controllers;
use App\Models\Avis;
use App\Models\Commande;
use App\Models\Product;
use App\Models\User;
class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'totalUsers' => User::where('role', 'client')->count(), 
            'totalProducts' => Product::count(),
            'totalOrders' => Commande::count(),
            'totalReviews' => Avis::count(),
        ];
       $moisNoms = [
        1 => 'Jan', 2 => 'Fév', 3 => 'Mar', 4 => 'Avr',
        5 => 'Mai', 6 => 'Juin', 7 => 'Juil', 8 => 'Août',
        9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Déc',
        ];

        $ventesParMois = Commande::selectRaw('MONTH(created_at) as mois, SUM(total) as total')
            ->whereYear('created_at', date('Y'))
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        $salesChart = [];
        foreach ($moisNoms as $num => $nom) {
            $ligne = $ventesParMois->firstWhere('mois', $num);

            $salesChart[] = [
                'month' => $nom,
                'total' => $ligne ? (float) $ligne->total : 0,
            ];
        }

        $recentOrders = Commande::latest()->take(5)->get()->map(function ($cmd) {
            return [
                'id' => $cmd->id,
                'client' => $cmd->nom_complet,
                'total' => $cmd->total,
                'status' => $cmd->status, // en_attente, livre
                'date' => $cmd->created_at->format('d/m/Y'),
            ];
        });

        $recentReviews = Avis::with(['user', 'product'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($avis) {
                return [
                    'id'          => $avis->id,
                    'client'      => $avis->user ? $avis->user->nom : 'Client',
                    'product'     => $avis->product ? $avis->product->nom : 'Produit',
                    'note'        => $avis->note,
                    'commentaire' => $avis->commentaire,
                    'is_visible'  => $avis->is_visible,
                    'date'        => $avis->created_at->format('d/m/Y'),
                ];
            });

        return response()->json([
            'stats'         => $stats,
            'salesChart'    => $salesChart,
            'recentOrders'  => $recentOrders,
            'recentReviews' => $recentReviews,
        ]);
    }

    public function avis()
    {
        $avis = Avis::with([
            'user:id,nom,email',
            'product:id,nom,image'
        ])
        ->latest()
        ->get();
        return response()->json($avis);
    }

    public function toggleAvisVisibility($id)
    {
        $avis = Avis::findOrFail($id);
        $avis->update([
            'is_visible' => !$avis->is_visible
        ]);

        return response()->json([
            'message' => $avis->is_visible
                ? 'Avis affiché avec succès'
                : 'Avis masqué avec succès',
            'avis' => $avis
        ]);
    }

    public function destroyAvis($id)
    {
        $avis = Avis::findOrFail($id);
        $avis->delete();
        return response()->json([
            'message' => 'Avis supprimé avec succès'
        ]);
    }
}
