import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/authStore";

export default function Deconnexion() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // يرجع ل'accueil
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer bg-red-500 text-white px-4 py-1 rounded-md"
    >
      Déconnexion
    </button>
  );
}
