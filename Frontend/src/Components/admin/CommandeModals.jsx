export default function CommandeModals({
  selectedCommande,
  onCloseDetails,
  commandeToDelete,
  onCloseDelete,
  onConfirmDelete,
  deletingId,
}) {
  const getOrderTotals = (cmd) => {
    const products = cmd?.products || [];
    const sousTotal =
      cmd?.sous_total !== undefined && cmd?.sous_total !== null
        ? Number(cmd.sous_total)
        : products.reduce(
            (sum, p) =>
              sum +
              Number(p.pivot?.prix_unitaire ?? p.prix ?? 0) *
                Number(p.pivot?.quantite || 1),
            0
          );
    const isFreeShipping = sousTotal >= 500;
    const frais = isFreeShipping ? 0 : Number(cmd?.frais_livraison ?? 0);
    const total =
      cmd?.total !== undefined && cmd?.total !== null
        ? Number(cmd.total)
        : sousTotal + frais;

    return { sousTotal, isFreeShipping, frais, total };
  };

  return (
    <>
      {commandeToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-sky-100 space-y-5">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-circle-info text-lg"></i>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-800">
                  Confirmer le retrait de la commande #{commandeToDelete.id}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Cette action retirera la commande de{" "}
                  <span className="font-semibold text-slate-700">
                    {commandeToDelete.nom_complet ||
                      commandeToDelete.user?.nom ||
                      "ce client"}
                  </span>{" "}
                  ({commandeToDelete.ville || "—"}). Voulez-vous continuer ?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                disabled={deletingId === commandeToDelete.id}
                onClick={onCloseDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={deletingId === commandeToDelete.id}
                onClick={onConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#36A9E1] text-white hover:bg-[#0284C7] transition cursor-pointer disabled:opacity-60"
              >
                {deletingId === commandeToDelete.id
                  ? "Traitement..."
                  : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedCommande && (() => {
        const { sousTotal, isFreeShipping, frais, total } =
          getOrderTotals(selectedCommande);

        return (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-sky-100 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-lg font-extrabold text-[#0284C7]">
                  Commande #{selectedCommande.id}
                </h2>
                <button
                  type="button"
                  onClick={onCloseDetails}
                  className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div className="text-sm space-y-1.5 bg-slate-50 p-4 rounded-xl">
                <p>
                  <span className="font-semibold text-slate-700">Client :</span>{" "}
                  {selectedCommande.nom_complet ||
                    selectedCommande.user?.nom ||
                    "—"}
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Email :</span>{" "}
                  {selectedCommande.email ||
                    selectedCommande.user?.email ||
                    "—"}
                </p>
                <p>
                  <span className="font-semibold text-slate-700">
                    Téléphone :
                  </span>{" "}
                  {selectedCommande.telephone || "—"}
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Ville :</span>{" "}
                  {selectedCommande.ville || "—"}
                </p>
                <p>
                  <span className="font-semibold text-slate-700">
                    Adresse :
                  </span>{" "}
                  {selectedCommande.adresse || "—"}
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">
                  Produits commandés
                </h3>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl px-4">
                  {(selectedCommande.products || []).length > 0 ? (
                    selectedCommande.products.map((prod, idx) => {
                      const nom =
                        prod.pivot?.product_nom || prod.nom || "Produit";
                      const qte = Number(prod.pivot?.quantite || 1);
                      const prix = Number(
                        prod.pivot?.prix_unitaire ?? prod.prix ?? 0
                      );
                      return (
                        <div
                          key={prod.id || idx}
                          className="py-2.5 flex items-center justify-between text-sm"
                        >
                          <div>
                            <span className="font-medium text-slate-800">
                              {nom}
                            </span>
                            <span className="text-xs text-gray-400 ml-2">
                              x{qte}
                            </span>
                          </div>
                          <span className="font-semibold text-slate-700">
                            {(prix * qte).toFixed(2)} DH
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="py-4 text-sm text-gray-400">
                      Aucun produit associé.
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 text-sm space-y-1">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total :</span>
                  <span>{sousTotal.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frais de livraison :</span>
                  <span>
                    {isFreeShipping ? "Gratuit" : `${frais.toFixed(2)} DH`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#0284C7] pt-1">
                  <span>Total :</span>
                  <span>{total.toFixed(2)} DH</span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}