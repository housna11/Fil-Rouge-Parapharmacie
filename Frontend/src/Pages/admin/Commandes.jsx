import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../../Store/authStore";
import { api } from "../../Api/api";
import CommandeStats from "../../Components/admin/CommandeStats";
import CommandeFilters from "../../Components/admin/CommandeFilters";
import CommandeTable from "../../Components/admin/CommandeTable";
import CommandeModals from "../../Components/admin/CommandeModals";

export default function Commandes() {
  const token = useAuthStore((state) => state.token);

  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [commandeToDelete, setCommandeToDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.get("/commandes", token);
      setCommandes(Array.isArray(result) ? result : result.data || []);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger la liste des commandes.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) fetchCommandes();
    else setLoading(false);
  }, [token]);

  const confirmDelete = async () => {
    if (!commandeToDelete) return;
    const id = commandeToDelete.id;
    try {
      setDeletingId(id);
      await api.delete(`/admin/commandes/${id}`, token);
      setCommandes((prev) => prev.filter((cmd) => cmd.id !== id));
      if (selectedCommande?.id === id) setSelectedCommande(null);
      setCommandeToDelete(null);
      toast.success("Commande supprimée avec succès.");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression.");
    } finally {
      setDeletingId(null);
    }
  };

  const cities = [
    ...new Set(commandes.map((cmd) => cmd.ville).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sky-200 border-t-[#36A9E1] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-sky-50 border border-sky-200 rounded-2xl text-[#0284C7] flex items-center justify-between gap-4">
        <p className="text-sm font-medium">{error}</p>
        <button
          onClick={fetchCommandes}
          className="px-4 py-2 text-xs font-semibold bg-[#36A9E1] text-white rounded-xl cursor-pointer"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <header>
        <p className="text-sm text-[#0284C7] font-semibold mb-1.5">
          Ventes / Commandes Clients
        </p>
        <h1 className="text-3xl font-bold text-slate-800">
          Gestion des commandes
        </h1>
        <p className="text-gray-500 mt-1.5 text-sm">
          Suivez les commandes, la ville de chaque client, les produits commandés et les frais de livraison.
        </p>
      </header>

      <CommandeStats commandes={commandes} />

      <CommandeFilters
        search={search}
        onSearchChange={setSearch}
        cityFilter={cityFilter}
        onCityChange={setCityFilter}
        cities={cities}
        onReset={() => {
          setSearch("");
          setCityFilter("all");
        }}
      />

      <CommandeTable
        commandes={commandes}
        search={search}
        cityFilter={cityFilter}
        deletingId={deletingId}
        onSelectCommande={setSelectedCommande}
        onDeleteCommande={setCommandeToDelete}
      />

      <CommandeModals
        selectedCommande={selectedCommande}
        onCloseDetails={() => setSelectedCommande(null)}
        commandeToDelete={commandeToDelete}
        onCloseDelete={() => setCommandeToDelete(null)}
        onConfirmDelete={confirmDelete}
        deletingId={deletingId}
      />
    </div>
  );
}