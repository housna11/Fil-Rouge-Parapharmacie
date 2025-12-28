import React, { useState, useEffect } from "react";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    nom: "",
    description: "",
    prix: "",
    stock: "",
    image: null,
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
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
    data.append("description", formData.description);
    data.append("prix", formData.prix);
    data.append("stock", formData.stock);
    if (formData.image) data.append("image", formData.image);

    const url = formData.id 
      ? `http://localhost/api/products/${formData.id}` 
      : "http://localhost/api/products";
    const method = formData.id ? "PUT" : "POST";

    const res = await fetch(url, { method, body: data });
    if (!res.ok) return console.error("Erreur serveur");

    const product = await res.json();

    if (formData.id) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      setProducts([...products, product]);
    }

    setFormData({ id: null, nom: "", description: "", prix: "", stock: "", image: null });
    setShowForm(false);
  };

  const handleEdit = (p) => {
    setFormData({ ...p, image: null });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 mx-20 my-20">
      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={() => { setFormData({ id: null, nom: "", description: "", prix: "", stock: "", image: null }); setShowForm(!showForm); }}
          className="bg-[#4296DF] text-white px-4 py-2 rounded"
        >
          {showForm ? "Fermer" : "Ajouter un produit"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 bg-[#F5FAFF] p-6 rounded-xl shadow-inner">
          <input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" className="w-full mb-3 p-2 border rounded"/>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full mb-3 p-2 border rounded"/>
          <input name="prix" type="number" value={formData.prix} onChange={handleChange} placeholder="Prix" className="w-full mb-3 p-2 border rounded"/>
          <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" className="w-full mb-3 p-2 border rounded"/>
          <input name="image" type="file" onChange={handleChange} className="w-full mb-4 p-2 border rounded"/>
          <div className="flex gap-3">
            <button className="bg-[#4296DF] text-white px-4 py-2 rounded">{formData.id ? "Modifier" : "Ajouter"}</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow-md p-4">
            <img src={p.image} alt={p.nom} className="h-40 w-full object-contain mb-3"/>
            <h3 className="text-lg font-semibold text-center text-[#1A5788]">{p.nom}</h3>
            <p className="text-sm text-gray-500 text-center mb-3">{p.description}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[#1A5788] font-bold">{p.prix} DH</span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="cursor-pointer bg-[#4296DF] text-white p-2 rounded-full hover:bg-[#1f75c9]">
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button onClick={() => handleDelete(p.id)} className="cursor-pointer bg-[#D3F0FF] text-[#1A5788] p-2 rounded-full hover:bg-[#bde4ff]">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
