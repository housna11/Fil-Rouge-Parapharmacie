import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <nav className="bg-[#1A5788] text-white h-15 fixed top-0 left-0 w-full z-50 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
            <img src="/ParaPlus.png" alt="ParaPlus"/>
          </div>
        </div>

        <div className="flex-1 flex justify-center space-x-6">
          <li className="cursor-pointer list-none"><Link to="/">Accueil</Link></li>
          <li className="cursor-pointer list-none"><Link to="/apropos">Nos avantages</Link></li>
          <li className="cursor-pointer list-none"><Link to="/services ">A propos</Link></li>
          <li className="cursor-pointer list-none"><Link to="/catalogues">Catalogue</Link></li>
        </div>

        <div className="flex items-center gap-5">
          <i className="fa-solid fa-cart-shopping text-2xl"></i>
          <Link to="/connexion" className="cursor-pointer bg-white text-[#1A5788] px-4 py-1 rounded-md">
            Connexion
          </Link>
          <Link to="/inscription" className="cursor-pointer bg-[#4296DF] px-4 py-1 rounded-md">
            Inscription
          </Link>
        </div>
    </nav>
  )
}
