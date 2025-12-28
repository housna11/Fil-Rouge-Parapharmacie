import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detail() {
  const { id } = useParams(); // id من URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-10"></p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 mt-10 ">
      <div className="bg-white rounded-xl shadow p-6 max-w-md w-full">
        <img
          src={product.image}
          alt={product.nom}
          className="w-full h-48 object-contain mb-4"
        />

        <h2 className="text-2xl font-semibold text-[#1A5788] mb-2">
          {product.nom}
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          {product.description}
        </p>

        <p className="font-semibold text-lg mb-4">
          {product.prix} DH
        </p>

        <p className="text-[#1A5788] text-sm mb-2">
          Marque: {product.marque}
        </p>

        <p className="text-gray-600 text-sm mb-2">
          Stock: {product.stock}
        </p>
      </div>
    </div>
  );
}
