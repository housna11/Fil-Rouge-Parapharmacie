import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../Store/Store";
import useAuthStore from "../Store/authStore";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const { user, isAuth, logout } = useAuthStore();

  return (
    <nav className="bg-[#1A5788] text-white h-15 fixed top-0 left-0 w-full z-50 px-6 py-3 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center">
        <div className="w-20 h-10 rounded-full overflow-hidden flex items-center justify-center">
          <Link to="/">
            <img src="/ParaPlus.png" alt="ParaPlus" />
          </Link>
        </div>
      </div>

      {/* Liens */}
      <div className="flex-1 flex justify-center space-x-6 ">
        <li className="list-none hover:text-[#4296DF]"><Link to="/">Accueil</Link></li>
        <li className="list-none hover:text-[#4296DF]"><a href="#avantages">Nos avantages</a></li>
        <li className="list-none hover:text-[#4296DF]"><a href="#apropos">A propos</a></li>
        <li className="list-none hover:text-[#4296DF]"><a href="#nouveaux">Nouveaux produits</a></li>
        <li className="list-none hover:text-[#4296DF]"><Link to="/catalogues">Catalogue</Link></li>

        {user?.role === "admin" && (
          <li className="list-none text-[#4296DF]">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5 relative">
        <Link to="/panier" className="relative text-2xl">
          <i className="fa-solid fa-cart-shopping"></i>
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Link>

        {!isAuth ? (
          <>
            <Link to="/connexion" className="bg-white text-[#1A5788] px-4 py-1 rounded-md">
              Connexion
            </Link>
            <Link to="/inscription" className="bg-[#4296DF] px-4 py-1 rounded-md hover:bg-[#2275bd]">
              Inscription
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-[#4296DF] px-4 py-1 rounded-md"
          >
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
}
