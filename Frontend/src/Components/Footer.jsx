import React from "react";
export default function Footer() {
  return (
    <footer className="bg-[#1A5788] text-white pt-12">
      
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div>
          <h3 className="font-semibold text-lg mb-4">ParaPlus</h3>
          <p className="text-sm leading-relaxed">
            ParaPlus, votre parapharmacie en ligne de confiance et sécurisée.
            Nous facilitons l’accès à des produits fiables et adaptés à vos
            besoins pour une expérience d’achat fluide et agréable.
          </p>
        </div>

       
        <div className="ml-20">
          <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
          <ul className="space-y-2 text-sm">
            <li>Accueil</li>
            <li>A propos</li>
            <li>Nos avantages</li>
            <li>Catalogue</li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold text-lg mb-4">Votre compte</h3>
          <ul className="space-y-2 text-sm">
            <li>Créer votre compte</li>
            <li>Connexion mon compte</li>
          </ul>
        </div>

        
    <div>
      <h3 className="font-semibold text-lg mb-4">Contact</h3>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <i className="fa-solid fa-location-dot"></i>
          Casablanca 42 Bd Abdelmoumen
        </li>

        <li className="flex items-center gap-2">
          <i className="fa-solid fa-phone"></i>
          0657375044
        </li>

        <li className="flex items-center gap-2">
          <i className="fa-solid fa-mobile-screen"></i>
          0606464845
        </li>

        <li className="flex items-center gap-2">
          <i className="fa-solid fa-envelope"></i>
          contact@paraplus.com
        </li>
      </ul>
    </div>

      </div>

      
      {/* <div className="text-center mt-12 px-6">
        <h3 className="font-semibold text-lg mb-2">Newsletter</h3>
        <p className="text-sm mb-6">
          Abonnez-vous à notre newsletter et recevez nos nouveautés, conseils
          et offres exclusives directement dans votre boite mail.</p>
        <div className="flex justify-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Votre email"
            className="w-full px-4 py-3 rounded-full bg-white text-black outline-none"/>
          <button className="cursor-pointer bg-blue-400 px-6 py-3 rounded-full font-medium">
            S'abonner
          </button>
        </div>
      </div> */}

      
      <div className="text-center text-sm mt-12 pb-6">
        © 2025 ParaPlus. Tous droits réservés.
      </div>
    </footer>
  );
}
