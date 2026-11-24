import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/authStore";
import { api } from "../Api/api";
import toast from "react-hot-toast";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "L'email est obligatoire";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Format de l'email invalide";
      }
    }

    if (!password) {
      newErrors.password = "Le mot de passe est obligatoire";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const data = await api.post("/login", {
        email,
        password,
      });

      login(data.user, data.token);

      toast.success("Connexion réussie !");

      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setErrors({ form: err.message || "Erreur serveur !" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-19">
      <div className="flex flex-col md:flex-row justify-center py-12">
        <div className="md:w-1/2 max-w-md">
          <img
            src="/femme1.jpg"
            alt="Soins visage"
            className="w-full rounded-l-2xl object-cover shadow-lg"
          />
        </div>

        <div
          className="md:w-1/2 max-w-md bg-white p-8 border flex flex-col justify-center rounded-r-2xl"
          style={{ borderColor: "#1A5788" }}
        >
          <h2 className="text-2xl font-bold text-[#4296DF] mb-4 text-center">
            Connexion
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Accédez à votre compte ParaPlus
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div>
              <label className="block text-[#1A5788] font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#4296DF]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-[#1A5788] font-medium mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#4296DF]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {errors.form && (
              <p className="text-red-500 text-sm text-center">{errors.form}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-[#4296DF] text-white py-2 rounded-md hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4 text-sm">
            Vous n'avez pas de compte ?
            <Link
              to="/inscription"
              className="cursor-pointer text-blue-500 underline ml-1"
            >
              S'inscrire maintenant
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
