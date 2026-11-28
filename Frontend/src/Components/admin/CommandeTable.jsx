export default function CommandeTable({
  commandes,
  search,
  cityFilter = "all",
  deletingId,
  onSelectCommande,
  onDeleteCommande,
}) {
  const filteredCommandes = commandes.filter((cmd) => {
    const matchesCity =
      cityFilter === "all" ||
      (cmd.ville || "").toLowerCase() === cityFilter.toLowerCase();

    const q = search.trim().toLowerCase();
    if (!q) return matchesCity;

    const matchProduit = (cmd.products || []).some((p) =>
      (p.pivot?.product_nom || p.nom || "").toLowerCase().includes(q)
    );
    const matchesSearch =
      String(cmd.id).includes(q) ||
      (cmd.nom_complet || "").toLowerCase().includes(q) ||
      (cmd.user?.nom || "").toLowerCase().includes(q) ||
      (cmd.email || "").toLowerCase().includes(q) ||
      (cmd.telephone || "").toLowerCase().includes(q) ||
      (cmd.ville || "").toLowerCase().includes(q) ||
      matchProduit;

    return matchesCity && matchesSearch;
  });

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-800 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="py-4 px-6 font-bold">N°</th>
              <th className="py-4 px-6 font-bold">Client</th>
              <th className="py-4 px-6 font-bold">Ville</th>
              <th className="py-4 px-6 font-bold">Produits</th>
              <th className="py-4 px-6 font-bold">Sous-total</th>
              <th className="py-4 px-6 font-bold">Livraison</th>
              <th className="py-4 px-6 font-bold">Total</th>
              <th className="py-4 px-6 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredCommandes.length > 0 ? (
              filteredCommandes.map((cmd) => {
                const isBusy = deletingId === cmd.id;
                const products = cmd.products || [];
                const sousTotal =
                  cmd.sous_total !== undefined && cmd.sous_total !== null
                    ? Number(cmd.sous_total)
                    : products.reduce(
                        (sum, p) =>
                          sum +
                          Number(p.pivot?.prix_unitaire ?? p.prix ?? 0) *
                            Number(p.pivot?.quantite || 1),
                        0
                      );
                const isFreeShipping = sousTotal >= 500;
                const frais = isFreeShipping
                  ? 0
                  : Number(cmd.frais_livraison ?? 0);
                const total =
                  cmd.total !== undefined && cmd.total !== null
                    ? Number(cmd.total)
                    : sousTotal + frais;

                return (
                  <tr key={cmd.id} className="hover:bg-sky-50/30 transition">
                    <td className="py-4 px-6 font-bold text-[#0284C7]">
                      #{cmd.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-800">
                        {cmd.nom_complet || cmd.user?.nom || "Client"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {cmd.telephone || cmd.email || "—"}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-[#0284C7] border border-sky-200">
                        {cmd.ville || "—"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xs text-slate-700 font-medium">
                        {products.length > 0
                          ? products
                              .map(
                                (p) =>
                                  `${p.pivot?.product_nom || p.nom} (x${
                                    p.pivot?.quantite || 1
                                  })`
                              )
                              .join(", ")
                          : "—"}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700">
                      {sousTotal.toFixed(2)} DH
                    </td>
                    <td className="py-4 px-6 text-slate-700">
                      {isFreeShipping ? (
                        <span className="text-[#0284C7] font-semibold">
                          Gratuit
                        </span>
                      ) : (
                        `${frais.toFixed(2)} DH`
                      )}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#0284C7]">
                      {total.toFixed(2)} DH
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectCommande(cmd)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-sky-50 text-[#0284C7] border border-sky-200 hover:bg-sky-100 transition cursor-pointer"
                        >
                          Détails
                        </button>
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => onDeleteCommande(cmd)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-sky-50 hover:text-[#0284C7] hover:border-sky-200 transition cursor-pointer disabled:opacity-50"
                        >
                          {isBusy ? "Retrait..." : "Retirer"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="py-10 text-center text-gray-400 text-sm"
                >
                  Aucune commande trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}