import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../Store/Store";
import useAuthStore from "../Store/authStore";
import toast from "react-hot-toast";

export default function Panier() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const user = useAuthStore((state) => state.user);

  const total = items.reduce((sum, item) => sum + item.prix * item.quantity, 0);

  const handleCommander = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour commander !");
      navigate("/connexion");
      return;
    }

    if (items.length === 0) {
      toast.error("Votre panier est vide !");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/panier/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: items.map((i) => ({ product_id: i.id, quantite: i.quantity })),
        }),
      });

      // Vérifie si la réponse est bien du JSON
      const data = await res.json().catch(() => null);

      if (!res.ok || !data) {
        console.error("Erreur serveur ou réponse invalide", data);
        throw new Error("Erreur serveur");
      }

      toast.success("Commande passée avec succès !");
      useCartStore.setState({ items: [] }); // Vide le panier côté frontend
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la commande");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-center text-[#4296DF] mb-4">Panier</h2>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">Panier vide</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2 border-b pb-2">
                <span>{item.nom}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <span>{item.prix * item.quantity} DH</span>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-[#4296DF]"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ))}

            <p className="text-right font-bold mt-4">Total : {total} DH</p>

            <button
              onClick={handleCommander}
              className="w-full mt-4 bg-[#4296DF] text-white py-2 rounded hover:bg-[#6abde6]"
            >
              Commander
            </button>
          </>
        )}
      </div>
    </div>
  );
}
