import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/authStore";
import useCartStore from "../Store/Store";
import toast from "react-hot-toast";

export default function Inscription() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({}); // ✅ added

  const login = useAuthStore((state) => state.login);
  const addItem = useCartStore((state) => state.addItem);
  const pendingProduct = useCartStore((state) => state.pendingProduct);
  const clearPendingProduct = useCartStore((state) => state.clearPendingProduct);

  const navigate = useNavigate();

  // ✅ validation frontend simple
  const validateForm = () => {
    const newErrors = {};
    if (!nom.trim()) newErrors.nom = "Le nom est obligatoire";
    if (!email.trim()) newErrors.email = "L'email est obligatoire";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Format de l'email invalide";
    }
    if (password.length < 8) newErrors.password = "Mot de passe ≥ 8 caractères";
    if (password !== passwordConfirm) newErrors.passwordConfirm = "Les mots de passe ne correspondent pas";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // stop si erreurs

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          email,
          password,
          password_confirmation: passwordConfirm,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Erreur lors de l'inscription");
        return;
      }

      login(data.user, data.token); // connecter automatiquement

      if (pendingProduct) {
        addItem(pendingProduct);
        toast.success(`${pendingProduct.nom} ajouté au panier !`);
        clearPendingProduct();
        navigate("/panier");
      } else {
        toast.success("Inscription réussie !");
        navigate("/");
      }

      setNom("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur !");
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-19">
      <div className="flex flex-col md:flex-row justify-center py-12">

        <div className="md:w-1/2 max-w-md bg-white p-8 border rounded-l-2xl flex flex-col justify-center" style={{ borderColor: "#1A5788" }}>
          <h2 className="text-2xl font-bold text-[#4296DF] mb-4 text-center">Inscription</h2>
          <p className="text-gray-600 text-center mb-6">Créez votre compte ParaPlus</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Nom complet"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#4296DF]"
              />
              {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#4296DF]"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#4296DF]"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirmer mot de passe"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#4296DF]"
              />
              {errors.passwordConfirm && <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>}
            </div>

            <button type="submit" className="w-full bg-[#4296DF] text-white py-2 rounded-md hover:bg-blue-500">
              S'inscrire
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4 text-sm">
            Vous avez déjà un compte ? 
            <a href="/connexion" className="text-blue-500 underline ml-1">Connexion</a>
          </p>
        </div>

        <div className="md:w-1/2 max-w-md mt-8 md:mt-0">
          <img src="/serum.jpg" alt="Soins visage" className="w-full object-cover shadow-lg rounded-r-2xl" />
        </div>
      </div>
    </div>
  );
}
