import React, { useState, useEffect } from "react";
import useAuthStore from "../Store/authStore";
import toast from "react-hot-toast";

export default function ProductCard() {
  const token = useAuthStore((state) => state.token);

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    nom: "",
    marque: "",
    description: "",
    prix: "",
    stock: "",
    image: null,
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nom", formData.nom);
    data.append("marque", formData.marque);
    data.append("description", formData.description);
    data.append("prix", formData.prix);
    data.append("stock", formData.stock);
    if (formData.image) data.append("image", formData.image);
    if (formData.id) data.append("_method", "PUT");

    const url = formData.id
      ? `http://localhost:8000/api/products/${formData.id}`
      : "http://localhost:8000/api/products";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (!res.ok) return console.error("Erreur serveur");

    const product = await res.json();

    if (formData.id) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
      toast.success("Produit modifié avec succès!");
    } else {
      setProducts([...products, product]);
      toast.success("Produit ajouté avec succès!");
    }

    setFormData({
      id: null,
      nom: "",
      marque: "",
      description: "",
      prix: "",
      stock: "",
      image: null,
    });
    setShowForm(false);
  };

  const handleEdit = (p) => {
    setFormData({ ...p, image: null });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(products.filter((p) => p.id !== id));
    toast.success("Produit supprimé");
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 mx-20 my-20">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setFormData({
              id: null,
              nom: "",
              marque: "",
              description: "",
              prix: "",
              stock: "",
              image: null,
            });
            setShowForm(true);
          }}
          className="bg-[#4296DF] text-white px-4 py-2 rounded cursor-pointer"> + Ajouter un produit
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-[#F5FAFF] p-6 rounded-xl "
          >
            <input
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom"
              className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4296DF] focus:border-[#4296DF]"
            />
            <input
              name="marque"
              value={formData.marque}
              onChange={handleChange}
              placeholder="Marque"
              className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4296DF] focus:border-[#4296DF]"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4296DF] focus:border-[#4296DF]"
            />
            <input
              name="prix"
              type="number"
              value={formData.prix}
              onChange={handleChange}
              placeholder="Prix"
              className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4296DF] focus:border-[#4296DF]"
            />
            <input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4296DF] focus:border-[#4296DF]"
            />
            <input
              name="image"
              type="file"
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4296DF] focus:border-[#4296DF]"
            />

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded cursor-pointer hover:bg-[#4296DF]"
              >
                Annuler
              </button>
              <button className="bg-[#4296DF] text-white px-4 py-2 rounded cursor-pointer">
                {formData.id ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-md p-4">
            <img
              src={p.image}
              alt={p.nom}
              className="h-40 w-full object-contain mb-3"
            />
            <h3 className="text-lg font-semibold text-center text-[#1A5788]">
              {p.nom}
            </h3>
            <h3 className="text-sm text-center">{p.marque}</h3>
            <p className="text-sm text-gray-500 text-center mb-3">
              {p.description}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[#1A5788] font-bold">
                {p.prix} DH
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-[#4296DF] text-white p-2 rounded-full"
                >
                  <i className="fa-regular fa-pen-to-square cursor-pointer"></i>
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-[#D3F0FF] text-[#1A5788] p-2 rounded-full"
                >
                  <i className="fa-solid fa-trash cursor-pointer"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
