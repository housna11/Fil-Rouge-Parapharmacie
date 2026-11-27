import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../../Store/authStore";
import { api } from "../../Api/api";
import AvisStats from "../../Components/admin/AvisStats";
import AvisFilters from "../../Components/admin/AvisFilters";
import AvisDeleteModal from "../../Components/admin/AvisDeleteModal";

export default function AvisManagement() {
  const token = useAuthStore((state) => state.token);

  const [avisList, setAvisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [avisToDelete, setAvisToDelete] = useState(null);

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
    if (token) fetchAvis();
    else setLoading(false);
  }, [token]);

  const handleToggleVisibility = async (avis) => {
    try {
      setActionLoadingId(avis.id);
      const response = await api.patch(`/admin/avis/${avis.id}/visibility`, {}, token);
      const updatedVisible =
        response?.avis?.is_visible !== undefined
          ? Boolean(response.avis.is_visible)
          : !avis.is_visible;

      setAvisList((prev) =>
        prev.map((item) =>
          item.id === avis.id ? { ...item, is_visible: updatedVisible } : item
        )
      );
      toast.success(updatedVisible ? "Avis visible." : "Avis masqué.");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!avisToDelete) return;
    const id = avisToDelete.id;
    try {
      setActionLoadingId(id);
      await api.delete(`/admin/avis/${id}`, token);
      setAvisList((prev) => prev.filter((item) => item.id !== id));
      setAvisToDelete(null);
      toast.success("Avis supprimé.");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredAvis = avisList.filter((item) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (item.user?.nom || "").toLowerCase().includes(q) ||
      (item.product?.nom || "").toLowerCase().includes(q) ||
      (item.commentaire || "").toLowerCase().includes(q);

    const isVisible = Boolean(item.is_visible);
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "visible" && isVisible) ||
      (filterStatus === "hidden" && !isVisible);

    const noteNum = Number(item.note || 0);
    const matchesRating =
      filterRating === "all" ||
      (filterRating === "5" && noteNum === 5) ||
      (filterRating === "4" && noteNum === 4) ||
      (filterRating === "low" && noteNum <= 3);

    return matchesSearch && matchesStatus && matchesRating;
  });

  const totalCount = avisList.length;
  const visibleCount = avisList.filter((i) => Boolean(i.is_visible)).length;
  const averageRating =
    totalCount > 0
      ? (avisList.reduce((acc, i) => acc + Number(i.note || 0), 0) / totalCount).toFixed(1)
      : "0.0";

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sky-200 border-t-[#36A9E1] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-sky-50 border border-sky-200 rounded-2xl text-[#0284C7] flex items-center justify-between">
        <p className="text-sm font-medium">{error}</p>
        <button
          onClick={fetchAvis}
          className="px-4 py-2 text-xs font-semibold bg-[#36A9E1] text-white rounded-xl cursor-pointer"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-[#0284C7] font-semibold mb-1.5">
            Modération / Avis Clients
          </p>
          <h1 className="text-3xl font-bold text-slate-800">Gestion des avis</h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            Consultez, affichez, masquez ou supprimez les avis laissés sur vos produits.
          </p>
        </div>

        <div className="bg-white border border-sky-100 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3 self-start sm:self-center">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-[#0284C7] flex items-center justify-center text-sm">
            <i className="fa-solid fa-star"></i>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
              Note moyenne
            </p>
            <p className="text-lg font-extrabold text-slate-800">
              {averageRating}{" "}
              <span className="text-xs font-medium text-gray-400">/ 5</span>
            </p>
          </div>
        </div>
      </header>

      <AvisStats
        totalCount={totalCount}
        visibleCount={visibleCount}
        hiddenCount={totalCount - visibleCount}
      />

      <AvisFilters
        search={search}
        onSearchChange={setSearch}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
        filterRating={filterRating}
        onRatingChange={setFilterRating}
        onReset={() => {
          setSearch("");
          setFilterStatus("all");
          setFilterRating("all");
        }}
      />

      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-800 text-xs uppercase tracking-wider border-b border-gray-100">
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
                  const isVisible = Boolean(avis.is_visible);

                  return (
                    <tr key={avis.id} className="hover:bg-sky-50/30 transition">
                      <td className="py-4 px-6 font-semibold text-slate-800">
                        {avis.product?.nom || "Produit"}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {avis.user?.nom || "Client"}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-700">
                        {avis.note}/5
                      </td>
                      <td className="py-4 px-6 max-w-xs text-gray-600 line-clamp-2">
                        {avis.commentaire || "—"}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            isVisible
                              ? "bg-sky-50 text-[#0284C7] border-sky-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
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
                            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-sky-50 text-[#0284C7] border border-sky-200 hover:bg-sky-100 transition cursor-pointer disabled:opacity-50"
                          >
                            {isVisible ? "Masquer" : "Afficher"}
                          </button>
                          <button
                            disabled={isBusy}
                            onClick={() => setAvisToDelete(avis)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-sky-50 hover:text-[#0284C7] transition cursor-pointer disabled:opacity-50"
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
                  <td colSpan="6" className="py-10 text-center text-gray-400">
                    Aucun avis trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <AvisDeleteModal
        avisToDelete={avisToDelete}
        onClose={() => setAvisToDelete(null)}
        onConfirm={confirmDelete}
        isDeleting={actionLoadingId === avisToDelete?.id}
      />
    </div>
  );
}