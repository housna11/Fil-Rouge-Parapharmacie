import React from "react";

export default function Inscription() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row justify-center py-12">

        <div
          className="md:w-1/2 max-w-md bg-white rounded-xl p-8 border flex flex-col justify-center"
          style={{ borderColor: "#1A5788" }}>
          <h2 className="text-2xl font-bold text-[#4296DF] mb-4 text-center">Inscription</h2>

          <p className="text-gray-600 text-center mb-6">Créez votre compte ParaPlus</p>

          <form className="space-y-4">
            <div>
              <label className="block text-[#1A5788] font-medium mb-1">Nom complet</label>
              <input
                type="text"
                placeholder="Entrez votre nom complet"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#4296DF]"
              />
            </div>

            <div>
              <label className="block text-[#1A5788] font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="votre@email.com"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#4296DF]"
              />
            </div>

            <div>
              <label className="block text-[#1A5788] font-medium mb-1">Mot de passe</label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#4296DF]"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-[#4296DF] text-white py-2 rounded-md hover:bg-blue-500">S'inscrire
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4 text-sm">Vous avez déjà un compte ?
            <a href="/connexion" className="cursor-pointer text-blue-500 underline">Connexion</a>
          </p>
        </div>

        <div className="md:w-1/2 max-w-md mt-8 md:mt-0">
          <img
            src="/femme1.jpg"
            alt="Soins visage"
            className="w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
