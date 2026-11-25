import { useEffect, useState } from "react";
import useAuthStore from "../../Store/authStore";
import { api } from "../../Api/api";
export default function AvisManagement() {
  const token = useAuthStore((state) => state.token);

  const [avisList, setAvisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); 
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchAvis = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.get("/admin/avis", token);
      setAvisList(Array.isArray(result) ? result : result.data || []);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger la liste des avis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAvis();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleToggleVisibility = async (avis) => {
    try {
      setActionLoadingId(avis.id);
      const response = await api.patch(
        `/admin/avis/${avis.id}/visibility`,
        {},
        token
      );

      const updatedVisible =
        response?.avis?.is_visible !== undefined
          ? response.avis.is_visible
          : !avis.is_visible;

      setAvisList((prev) =>
        prev.map((item) =>
          item.id === avis.id ? { ...item, is_visible: updatedVisible } : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour de la visibilité.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet avis définitivement ?"
    );
    if (!confirmed) return;

    try {
      setActionLoadingId(id);
      await api.delete(`/admin/avis/${id}`, token);
      setAvisList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression de l'avis.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredAvis = avisList.filter((item) => {
    const clientNom = (item.user?.nom || "").toLowerCase();
    const produitNom = (item.product?.nom || "").toLowerCase();
    const commentaire = (item.commentaire || "").toLowerCase();
    const q = search.trim().toLowerCase();

    const matchesSearch =
      !q ||
      clientNom.includes(q) ||
      produitNom.includes(q) ||
      commentaire.includes(q);

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "visible" && item.is_visible) ||
      (filterStatus === "hidden" && !item.is_visible);

    return matchesSearch && matchesFilter;
  });

  const totalCount = avisList.length;
  const visibleCount = avisList.filter((i) => i.is_visible).length;
  const hiddenCount = totalCount - visibleCount;

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-200 border-t-[#36A9E1] rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 font-medium">
            Chargement des avis clients...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-circle-exclamation text-xl text-red-500"></i>
          <p className="text-sm font-medium">{error}</p>
        </div>
        <button
          onClick={fetchAvis}
          className="px-4 py-2 text-xs font-semibold bg-[#36A9E1] text-white rounded-xl hover:opacity-95 transition"
        >
          Réessayer
        </button>
      </div>
    );
  }
  const statCards = [
    {
      title: "Total Avis",
      value: totalCount,
      icon: "fa-solid fa-comments",
      color: "bg-sky-100",
      iconColor: "text-[#0284C7]",
      accent: "border-[#36A9E1]",
      description: "Tous les avis enregistrés",
    },
    {
      title: "Avis Visibles",
      value: visibleCount,
      icon: "fa-solid fa-eye",
      color: "bg-sky-50",
      iconColor: "text-[#36A9E1]",
      accent: "border-sky-400",
      description: "Publiés sur la boutique",
    },
    {
      title: "Avis Masqués",
      value: hiddenCount,
      icon: "fa-solid fa-eye-slash",
      cardBg: "bg-gradient-to-br from-white via-sky-50/50 to-sky-100/50",
      iconBox: "bg-gradient-to-br from-[#0284C7]/80 to-[#36A9E1]/80 text-white shadow-sm shadow-sky-200/70",
      accent: "border-sky-300",
      description: "Masqués par l'administrateur",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-[#0284C7] font-semibold mb-1.5">
            Modération / Avis Clients
          </p>
          <h1 className="text-3xl font-extrabold text-[#0284C7]">
            Gestion des avis
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            Consultez, affichez, masquez ou supprimez les avis laissés sur vos produits.
          </p>
        </div>
      </header>
      <section className="relative overflow-hidden bg-[#36A9E1] rounded-2xl p-6 md:p-8 text-white shadow-lg shadow-sky-200/80">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-2 bg-white/25 px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
            <i className="fa-solid fa-star text-amber-200"></i>
            Qualité &amp; Confiance Client
          </span>
          <h2 className="text-2xl font-bold mb-2">
            Contrôlez les retours de vos clients ParaPlus
          </h2>
          <p className="text-sky-50 text-sm leading-relaxed">
            Gardez uniquement les avis pertinents visibles sur vos fiches produits et
            gérez la modération en un seul clic.
          </p>
        </div>

        <div className="absolute -right-10 -top-20 w-72 h-72 bg-white/15 rounded-full" />
        <div className="absolute right-28 -bottom-32 w-64 h-64 bg-white/15 rounded-full" />
        <i className="fa-solid fa-star text-[110px] text-white/20 absolute right-10 bottom-4 hidden md:block"></i>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {statCards.map((card) => (
          <div
            key={card.title}
            className={`bg-white rounded-2xl p-6 border border-gray-100 border-l-4 ${card.accent} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.color}`}>
                <i className={`${card.icon} text-xl ${card.iconColor}`}></i>
              </div>
              <span className="text-xs font-medium text-gray-400">
                {card.title}
              </span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-800">
              {card.value}
            </h3>
            <p className="text-sm text-gray-400 mt-1.5">{card.description}</p>
          </div>
        ))}
      </section>
      <section className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <i className="fa-solid fa-magnifying-glass text-[#0284C7] text-sm absolute left-4 top-1/2 -translate-y-1/2"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par client, produit ou commentaire..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#36A9E1] transition"
          />
        </div>

        <div className="flex items-center gap-2">
          {[
            { key: "all", label: "Tous" },
            { key: "visible", label: "Visibles" },
            { key: "hidden", label: "Masqués" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                filterStatus === tab.key
                  ? "bg-[#36A9E1] text-white shadow-sm"
                  : "bg-slate-100 text-gray-600 hover:bg-sky-50 hover:text-[#0284C7]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="py-4 px-6 font-bold">Produit</th>
                <th className="py-4 px-6 font-bold">Client</th>
                <th className="py-4 px-6 font-bold">Note</th>
                <th className="py-4 px-6 font-bold">Commentaire</th>
                <th className="py-4 px-6 font-bold">Statut</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredAvis.length > 0 ? (
                filteredAvis.map((avis) => {
                  const isBusy = actionLoadingId === avis.id;
                  const isVisible =(avis.is_visible);

                  return (
                    <tr
                      key={avis.id}
                      className="hover:bg-sky-50/30 transition"
                    >
                      <td className="py-4 px-6 font-semibold text-slate-800">
                        {avis.product?.nom || "Produit"}
                      </td>

                      <td className="py-4 px-6">
                        <div className="text-gray-700 font-medium">
                          {avis.user?.nom || "Client"}
                        </div>
                        {avis.user?.email && (
                          <div className="text-xs text-gray-400">
                            {avis.user.email}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-xs">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className={`fa-solid fa-star ${
                                star <= avis.note
                                  ? "text-amber-400"
                                  : "text-gray-200"
                              }`}
                            ></i>
                          ))}
                          <span className="ml-1 text-xs font-bold text-slate-700">
                            ({avis.note}/5)
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6 max-w-xs">
                        <p className="text-gray-600 line-clamp-2">
                          {avis.commentaire || (
                            <span className="italic text-gray-400">
                              Aucun commentaire
                            </span>
                          )}
                        </p>
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            isVisible
                              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                              : "bg-amber-50 text-amber-600 border-amber-200"
                          }`}
                        >
                          {isVisible ? "Visible" : "Masqué"}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            disabled={isBusy}
                            onClick={() => handleToggleVisibility(avis)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition disabled:opacity-50 ${
                              isVisible
                                ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                                : "bg-sky-50 text-[#0284C7] border-sky-200 hover:bg-sky-100"
                            }`}
                          >
                            {isVisible ? "Masquer" : "Afficher"}
                          </button>

                          <button
                            disabled={isBusy}
                            onClick={() => handleDelete(avis.id)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition disabled:opacity-50"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-10 text-center text-gray-400 text-sm"
                  >
                    Aucun avis trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}