import React from "react";
export default function HeroSection() {
  return (
    <div className="w-full">
<section
  className="h-[90vh] bg-cover bg-center"
  style={{ backgroundImage: "url('/pharmacien.jpg')" }}>
  <div className="w-full h-full flex items-center">
    <div className="max-w-4xl mx-auto px-6 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Bienvenue sur ParaPlus</h1>
        
      <p className="max-w-xl text-xl">
        Votre parapharmacie en ligne de confiance. Des produits de qualité
        pour votre santé et votre bien-être.
      </p>

       
      <a href="/catalogues"> 
        <button className="cursor-pointer ml-39 mt-11 bg-[#D3F0FF] text-black px-8 py-3 rounded-lg font-medium">
        Découvrir nos produits
        </button></a>
    </div>
  </div>
</section>


      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold text-[#4296DF] mb-12">
          Nos avantages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8">
          <div>
            <i className="fa-solid fa-certificate text-4xl text-[#1A5788] mb-4"></i>
            <h3 className="font-semibold mb-2">Produits Certifiés</h3>
            <p className="text-sm text-gray-600">Tous nos produits sont certifiés et approuvés</p>
          </div>

          <div>
            <i className="fa-solid fa-headset text-4xl text-[#1A5788] mb-4"></i>
            <h3 className="font-semibold mb-2">Service Client Disponible</h3>
            <p className="text-sm text-gray-600">Réponse rapide et assistance pour vos questions</p>
          </div>

          <div>
            <i className="fa-solid fa-award text-4xl text-[#1A5788] mb-4"></i>
            <h3 className="font-semibold mb-2">Qualité Garantie</h3>
            <p className="text-sm text-gray-600">Produits sélectionnés avec soin</p>
          </div>

          <div>
            <i className="fa-solid fa-cart-shopping text-4xl text-[#1A5788] mb-4"></i>
            <h3 className="font-semibold mb-2">Large Choix</h3>
            <p className="text-sm text-gray-600">Une grande variété de catégories et articles</p>
          </div>
        </div>
      </section>
    </div>
  );
}

