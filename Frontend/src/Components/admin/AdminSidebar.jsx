import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../Store/authStore";
import { api } from "../../Api/api"; 
export default function AdminSidebar() {
  const navigate = useNavigate();
  const { token, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      if (token) {
        await api.post("/logout", {}, token);
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      logout();
      navigate("/");
    }
  };

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: "fa-solid fa-chart-pie", end: true },
    { name: "Utilisateurs", path: "/admin/users", icon: "fa-solid fa-users" },
    { name: "Produits", path: "/admin/products", icon: "fa-solid fa-box" },
    { name: "Commandes", path: "/admin/commandes", icon: "fa-solid fa-cart-shopping" },
    { name: "Avis clients", path: "/admin/avis", icon: "fa-solid fa-star" },
  ];

  return (
    <aside className="w-64 min-h-screen shrink-0 bg-gradient-to-b from-white via-[#F8FBFF] to-[#EBF5FF] border-r border-sky-100 text-slate-700 flex flex-col shadow-sm">
      
      {/* LOGO */}
      <div className="h-24 flex items-center justify-center border-b border-sky-100/80">
        <img
          src="/ParaPlus.png"
          alt="ParaPlus"
          className="w-36 object-contain"
        />
      </div>

      {/* ADMIN INFO */}
      <div className="mx-4 mt-7 mb-8 p-4 rounded-2xl bg-sky-50/80 border border-sky-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0284C7] flex items-center justify-center text-white shadow-sm">
            <i className="fa-solid fa-user-shield text-lg"></i>
          </div>

          <div>
            <p className="font-bold text-sm text-slate-800">Administrator</p>
            <p className="text-xs text-sky-600 font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="px-4 flex-1">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4 px-3">
          Menu principal
        </p>

        <div className="space-y-1.5">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-md shadow-sky-200 font-semibold"
                    : "text-slate-600 hover:bg-sky-100/60 hover:text-[#0284C7]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <i
                    className={`${link.icon} w-5 text-center ${
                      isActive ? "text-white" : "text-sky-500"
                    }`}
                  ></i>
                  <span className="text-sm">{link.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-sky-100/80">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 cursor-pointer transition font-medium"
        >
          <i className="fa-solid fa-right-from-bracket w-5 text-[#0284C7]"></i>
          <span className="text-sm">Déconnexion</span>
        </button>

        <p className="text-center text-xs text-slate-400 mt-5">
          © 2026 ParaPlus
        </p>
      </div>

    </aside>
  );
}