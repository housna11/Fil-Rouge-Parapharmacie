import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [marque, setMarque] = useState("");

  useEffect(() => {
    const url = `http://localhost:8000/api/products?recherche=${recherche}&marque=${marque}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, [recherche, marque]);

  return (
    <div>

      {/* Banner + Search */}
      <div
        className="h-140 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/paraplus-back.png')" }}
      >
        <input
          type="text"
          placeholder="Rechercher"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-full bg-[#1A5788]/80 text-white text-xl placeholder-white outline-none"
        />
      </div>

      {/* Filtrage */}
      <div className="p-6 flex gap-4">
        <select
          value={marque}
          onChange={(e) => setMarque(e.target.value)}
          className="px-4 py-2 border bg-[#4296DF] text-white rounded-lg">

          <option value="">Toutes les marques</option>
          <option value="Nivea">Nivea</option>
          <option value="La roche posay">La roche posay</option>
          <option value="Eucerin">Eucerin</option>
          <option value="Cerave">Cerave</option>
          <option value="Bioderma">Bioderma</option>
          <option value="Isdin">Isdin</option>
          <option value="Mustela">Mustela</option>
        </select>
      </div>

      {/* Products cards */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.length === 0 && (
          <p className="text-center col-span-full">Aucun produit trouvé</p>
        )}

        {products.map(product => (
          <div
            key={product.id}
            className="w-64 bg-white rounded-xl overflow-hidden
             shadow-md hover:shadow-xl
             transform hover:-translate-y-2
             transition duration-300 ease-in-out
             flex flex-col"
          >
            <img
              src={product.image}
              alt={product.nom}
              className="w-full h-40 object-contain"
            />

            <div className="bg-gray-200 p-4 text-center">
              <h3 className="text-[#1A5788] font-semibold">
                {product.nom}
              </h3>

              <p className="text-sm text-gray-600">
                {product.marque}
              </p>

              <p className="text-sm mb-3 font-bold">
                {product.prix} DH
              </p>

              <div className="flex justify-center gap-3 mt-auto">
                <button className="bg-[#4296DF] cursor-pointer text-white px-3 py-1 rounded">
                  J’achète
                </button>

                <Link
                  to={`/detail/${product.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Voir détail
                </Link>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
