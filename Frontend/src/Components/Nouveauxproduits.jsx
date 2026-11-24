import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../Api/api";


export default function Nouveauxproduits() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products/nouveau")
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <h2 id="nouveaux" className="text-center text-2xl font-bold text-[#4296DF] mb-12">
        Nos nouveaux Produits
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow">
            <img
              src={product.image}
              className="w-full h-40 object-contain"
              alt={product.nom}
            />
            <div className="bg-gray-200 p-4 rounded text-center">
              <h3 className="text-[#1A5788] font-bold">{product.nom}</h3>
              <p className="text-sm">{product.prix} DH</p>
            </div>
          </div>
        ))}
      </div>

      {/* Button global sous la grille */}
      <div className="text-center mt-6">
        <Link
          to="/catalogues"
          className="inline-block bg-[#4296DF] text-white text-xl px-14 py-3 rounded-full"
        >
          Voir plus...
        </Link>
      </div>
    </div>
  );
}
