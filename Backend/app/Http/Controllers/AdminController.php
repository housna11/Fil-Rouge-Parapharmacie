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

        $moisNoms = ['', 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        $ventesParMois = Commande::selectRaw('MONTH(created_at) as mois, SUM(total) as total')
            ->whereYear('created_at', date('Y'))
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        $salesChart = [];
        foreach ($ventesParMois as $v) {
            $salesChart[] = [
                'month' => $moisNoms[$v->mois],
                'total' => (float) $v->total,
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

        $recentActivities = [];
        foreach (Commande::latest()->take(3)->get() as $cmd) {
            $recentActivities[] = [
                'id' => 'cmd-' . $cmd->id,
                'type' => 'order',
                'message' => "Nouvelle commande #{$cmd->id} par {$cmd->nom_complet}",
                'time' => $cmd->created_at->diffForHumans(),
            ];
        }

        foreach (Avis::with(['user', 'product'])->latest()->take(2)->get() as $avis) {
            $userName = $avis->user ? $avis->user->nom : 'Client';
            $prodName = $avis->product ? $avis->product->nom : 'Produit';
            $recentActivities[] = [
                'id' => 'avis-' . $avis->id,
                'type' => 'review',
                'message' => "{$userName} a laissé {$avis->note}★ sur {$prodName}",
                'time' => $avis->created_at->diffForHumans(),
            ];
        }

        return response()->json([
            'stats' => $stats,
            'salesChart' => $salesChart,
            'recentOrders' => $recentOrders,
            'recentActivities' => $recentActivities,
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
