import React, { useState } from "react";
import useAuthStore from "../Store/authStore";
import toast from "react-hot-toast";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Échec de connexion");
        return;
      }

      login(data.user, data.token);
      toast.success("Connexion réussie !");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur !");
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-19">
      <div className="flex flex-col md:flex-row justify-center py-12">
        <div className="md:w-1/2 max-w-md">
          <img src="/femme1.jpg" alt="Soins visage" className="w-full rounded-l-2xl object-cover shadow-lg" />
        </div>

        <div className="md:w-1/2 max-w-md bg-white p-8 border flex flex-col justify-center rounded-r-2xl" style={{ borderColor: "#1A5788" }}>
          <h2 className="text-2xl font-bold text-[#4296DF] mb-4 text-center">Connexion</h2>
          <p className="text-gray-600 text-center mb-6">Accédez à votre compte ParaPlus</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#4296DF]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#4296DF]"
            />

            <button type="submit" className="w-full bg-[#4296DF] text-white py-2 rounded-md hover:bg-blue-500">
              Se connecter
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4 text-sm">
            Vous n'avez pas de compte ? 
            <a href="/inscription" className="text-blue-500 underline ml-1">S'inscrire maintenant</a>
          </p>
        </div>
      </div>
    </div>
  );
}
