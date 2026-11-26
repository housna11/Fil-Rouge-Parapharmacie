<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Confirmation de commande - ParaPlus</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f9fc; padding: 24px; color: #1e293b;">
    <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e0f2fe;">
        <div style="background: #36A9E1; color: #ffffff; padding: 20px 24px;">
            <h2 style="margin: 0; font-size: 20px;">ParaPlus — Confirmation de commande</h2>
            <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.95;">
                Merci pour votre confiance, <strong>{{ $commande->nom_complet }}</strong>.
            </p>
        </div>

        <div style="padding: 24px;">
            <p style="margin-top: 0; font-size: 14px;">
                Votre commande <strong>#{{ $commande->id }}</strong> a bien été enregistrée. Voici le récapitulatif :
            </p>

            <h3 style="font-size: 15px; color: #0284C7; margin-bottom: 8px;">Informations client &amp; livraison</h3>
            <p style="font-size: 13px; line-height: 1.7; background: #f8fafc; padding: 12px 14px; border-radius: 8px; margin-top: 0;">
                <strong>Nom complet :</strong> {{ $commande->nom_complet }}<br>
                <strong>Email :</strong> {{ $commande->email }}<br>
                <strong>Téléphone :</strong> {{ $commande->telephone }}<br>
                <strong>Ville :</strong> {{ $commande->ville }}<br>
                <strong>Adresse :</strong> {{ $commande->adresse }}
            </p>

            <h3 style="font-size: 15px; color: #0284C7; margin-bottom: 8px;">Produits commandés</h3>
            <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-size: 13px;">
                <thead>
                    <tr style="background: #f0f9ff; text-align: left; color: #0369a1;">
                        <th style="border-bottom: 1px solid #e0f2fe;">Produit</th>
                        <th style="border-bottom: 1px solid #e0f2fe;">Qté</th>
                        <th style="border-bottom: 1px solid #e0f2fe; text-align: right;">Prix</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($commande->products as $product)
                        @php
                            $nomProduit = $product->pivot->product_nom ?? $product->nom ?? 'Produit';
                            $quantite = (int) ($product->pivot->quantite ?? 1);
                            $prixUnitaire = (float) ($product->pivot->prix_unitaire ?? $product->prix ?? 0);
                            $ligneTotal = $prixUnitaire * $quantite;
                        @endphp
                        <tr>
                            <td style="border-bottom: 1px solid #f1f5f9;">{{ $nomProduit }}</td>
                            <td style="border-bottom: 1px solid #f1f5f9;">{{ $quantite }}</td>
                            <td style="border-bottom: 1px solid #f1f5f9; text-align: right;">
                                {{ number_format($ligneTotal, 2) }} DH
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 13px;">
                <p style="margin: 4px 0;">
                    <strong>Sous-total :</strong> {{ number_format((float) $commande->sous_total, 2) }} DH
                </p>
                <p style="margin: 4px 0;">
                    <strong>Frais de livraison ({{ $commande->ville }}) :</strong>
                    @if((float) $commande->frais_livraison === 0.0)
                        Gratuit (0.00 DH)
                    @else
                        {{ number_format((float) $commande->frais_livraison, 2) }} DH
                    @endif
                </p>
                <p style="margin: 8px 0 0; font-size: 15px; color: #0284C7;">
                    <strong>Total à payer : {{ number_format((float) $commande->total, 2) }} DH</strong>
                </p>
            </div>
        </div>
    </div>
</body>
</html>