
import { useEffect, useState } from "react";
import { api } from "../../Api/api";
import AvisTable from "../../Components/admin/AvisTable";

function AvisManagement() {
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Charger tous les avis
  const fetchAvis = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.get("/admin/avis", token);

      setAvis(data);
    } catch {
    setError("Impossible de charger les avis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvis();
  }, []);

  // Masquer / Affich un avis
  const handleToggleVisibility = async (id) => {
    try {
      await api.patch(
        `/admin/avis/${id}/visibility`,
        {},
        token
      );

      setAvis((prevAvis) =>
        prevAvis.map((item) =>
          item.id === id
            ? { ...item, is_visible: !item.is_visible }
            : item
        )
      );
    } catch {
    setError("Erreur lors de la modification du statut.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet avis ?"
    );
    if (!confirmDelete) return;
    try {
      await api.delete(`/admin/avis/${id}`, token);
      setAvis((prevAvis) =>
        prevAvis.filter((item) => item.id !== id)
      );

      alert("Avis supprimé avec succès.");
   } catch {
    setError("Impossible de charger les avis.");
   }
  };

  if (loading) {
    return <p>Chargement des avis...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="avis-management">
      <h1>Gestion des avis</h1>
      <p>Total des avis : {avis.length}</p>
      <AvisTable
        avis={avis}
        onToggleVisibility={handleToggleVisibility}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AvisManagement;
