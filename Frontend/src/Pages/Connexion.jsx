import React from "react";
import Navbar from "../Components/Navbar";

export default function Connexion() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row  justify-center py-12 ">
        
        <div className="md:w-1/2 max-w-md">
          <img
            src="/femme1.jpg"
            alt="Soins visage"
            className="w-full  object-cover rounded-lg shadow-lg"
          />
        </div>

        {/*formlr*/}
        <div
          className="md:w-1/2 max-w-md bg-white rounded-xl p-8 border flex flex-col justify-center"
          style={{ borderColor: "#1A5788" }}>
          <h2 className="text-2xl font-bold text-[#4296DF] mb-4 text-center">Connexion</h2>
          <p className="text-gray-600 text-center mb-6">Accédez à votre compte ParaPlus</p>

          <form className="space-y-4">
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
              className="cursor-pointer w-full bg-[#4296DF] text-white py-2 rounded-md hover:bg-blue-500">Se connecter
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4 text-sm">Vous n'avez pas de compte ?
            <a href="/inscription" className="cursor-pointer text-blue-500 underline">S'inscrire maintenant</a>
          </p>
        </div>
      </div>
    </div>
  );
}
