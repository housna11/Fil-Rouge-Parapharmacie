import { useEffect, useState } from "react";
import useAuthStore from "../Store/authStore";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8000/api";

export default function ProductsManagement() {
  const token = useAuthStore((state) => state.token);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const emptyForm = {
    id: null,
    nom: "",
    marque: "",
    description: "",
    prix: "",
    stock: "",
    image: null,
  };

  const [formData, setFormData] = useState(emptyForm);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error("Erreur chargement produits");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Impossible de charger les produits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setFormData(emptyForm);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      nom: product.nom || "",
      marque: product.marque || "",
      description: product.description || "",
      prix: product.prix ?? "",
      stock: product.stock ?? "",
      image: null,
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("nom", formData.nom);
      payload.append("marque", formData.marque);
      payload.append("description", formData.description);
      payload.append("prix", formData.prix);
      payload.append("stock", formData.stock);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      if (formData.id) {
        payload.append("_method", "PUT");
      }

      const url = formData.id
        ? `${API_URL}/produits/${formData.id}`
        : `${API_URL}/produits`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (!res.ok) {
        throw new Error("Erreur serveur");
      }

      const savedProduct = await res.json();
      const productItem = savedProduct.product || savedProduct;

      if (formData.id) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productItem.id ? productItem : p))
        );
        toast.success("Produit modifié avec succès !");
      } else {
        setProducts((prev) => [productItem, ...prev]);
        toast.success("Produit ajouté avec succès !");
      }

      setFormData(emptyForm);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce produit ?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erreur suppression");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Produit supprimé avec succès");
    } catch (err) {
      console.error(err);
      toast.error("Impossible de supprimer ce produit.");
    }
  };

  const getStockBadge = (stock) => {
    const qty = Number(stock);
    if (qty <= 0) {
      return {
        label: "Rupture",
        classes: "bg-rose-50 text-rose-600 border-rose-200",
      };
    }
    if (qty <= 5) {
      return {
        label: `Stock faible (${qty})`,
        classes: "bg-amber-50 text-amber-700 border-amber-200",
      };
    }
    return {
      label: `En stock (${qty})`,
      classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  };

  const filteredProducts = products.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (p.nom || "").toLowerCase().includes(q) ||
      (p.marque || "").toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-sky-200 border-t-[#0284C7] rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium">
            Chargement des produits...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Gestion des produits
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ajoutez, modifiez ou supprimez les produits de votre parapharmacie
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
        >
          <i className="fa-solid fa-plus"></i>
          Ajouter un produit
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <i className="fa-solid fa-magnifying-glass text-slate-400 text-sm absolute left-3.5 top-1/2 -translate-y-1/2"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou marque..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#0284C7] transition"
          />
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-sky-50 px-3.5 py-1.5 rounded-lg self-start sm:self-auto">
          {filteredProducts.length} produit(s)
        </span>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/45 backdrop-blur-[1px] z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white border border-sky-100 p-6 rounded-2xl shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#1A5788]">
                {formData.id ? "Modifier le produit" : "Nouveau produit"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Nom du produit
                </label>
                <input
                  name="nom"
                  required
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Ex: Gel Nettoyant"
                  className="w-full px-3 py-2 text-sm bg-[#F5FAFF] border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30 focus:border-[#0284C7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Marque
                </label>
                <input
                  name="marque"
                  required
                  value={formData.marque}
                  onChange={handleChange}
                  placeholder="Ex: La Roche-Posay"
                  className="w-full px-3 py-2 text-sm bg-[#F5FAFF] border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30 focus:border-[#0284C7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description courte du produit..."
                className="w-full px-3 py-2 text-sm bg-[#F5FAFF] border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30 focus:border-[#0284C7]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Prix (DH)
                </label>
                <input
                  name="prix"
                  type="number"
                  step="0.01"
                  required
                  value={formData.prix}
                  onChange={handleChange}
                  placeholder="Ex: 145"
                  className="w-full px-3 py-2 text-sm bg-[#F5FAFF] border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30 focus:border-[#0284C7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Stock
                </label>
                <input
                  name="stock"
                  type="number"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Ex: 20"
                  className="w-full px-3 py-2 text-sm bg-[#F5FAFF] border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30 focus:border-[#0284C7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Image du produit
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-[#0284C7] hover:file:bg-sky-100 border border-slate-200 rounded-xl p-1.5"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#0284C7] hover:bg-[#0369A1] rounded-xl shadow-sm transition disabled:opacity-50 cursor-pointer"
              >
                {submitting
                  ? "Enregistrement..."
                  : formData.id
                  ? "Enregistrer les modifications"
                  : "Ajouter le produit"}
              </button>
            </div>
          </form>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const stockBadge = getStockBadge(p.stock);

            return (
              <div
                key={p.id}
                className="group bg-white rounded-2xl border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all overflow-hidden flex flex-col"
              >
                <div className="relative h-48 bg-[#F5FAFF] flex items-center justify-center p-5 border-b border-sky-50">
                  {p.marque && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white text-[#1A5788] border border-sky-100 shadow-2xs">
                      {p.marque}
                    </span>
                  )}

                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${stockBadge.classes}`}
                  >
                    {stockBadge.label}
                  </span>

                  <img
                    src={p.image}
                    alt={p.nom}
                    className="max-h-36 w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-[#1A5788] line-clamp-1">
                      {p.nom}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                      {p.description || "Aucune description disponible."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 block">
                        Prix unitaire
                      </span>
                      <span className="text-lg font-extrabold text-slate-800">
                        {p.prix} <span className="text-xs font-semibold text-[#0284C7]">DH</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        title="Modifier"
                        className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] hover:bg-[#0284C7] hover:text-white border border-sky-200/70 flex items-center justify-center transition cursor-pointer"
                      >
                        <i className="fa-regular fa-pen-to-square text-sm"></i>
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        title="Supprimer"
                        className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200/70 flex items-center justify-center transition cursor-pointer"
                      >
                        <i className="fa-solid fa-trash text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-sky-100 p-12 text-center text-slate-400 text-sm">
          Aucun produit trouvé.
        </div>
      )}
    </div>
  );
}