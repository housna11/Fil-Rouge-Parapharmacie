import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuthStore from "../Store/authStore";
import { api } from "../Services/api";

export default function Dashboard() {
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    stats: {
      totalUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
      totalReviews: 0,
    },
    salesChart: [],
    recentOrders: [],
    recentReviews: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await api.get("/admin/dashboard", token);
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les données du tableau de bord.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboard();
    } else {
      setLoading(false);
    }
  }, [token]);

  const formatStatus = (status) => {
    switch (status) {
      case "livre":
      case "livré":
        return { label: "Livré", style: "bg-emerald-50 text-emerald-600 border-emerald-200" };
      case "en_cours":
        return { label: "En cours", style: "bg-sky-50 text-sky-600 border-sky-200" };
      case "en_attente":
        return { label: "En attente", style: "bg-amber-50 text-amber-600 border-amber-200" };
      case "annule":
      case "annulé":
        return { label: "Annulé", style: "bg-rose-50 text-rose-600 border-rose-200" };
      default:
        return { label: status, style: "bg-slate-50 text-slate-600 border-slate-200" };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-sky-200 border-t-[#0284C7] rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 flex items-center gap-3">
        <i className="fa-solid fa-circle-exclamation text-xl"></i>
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Utilisateurs",
      value: data.stats.totalUsers,
      icon: "fa-solid fa-users",
      bgIcon: "bg-sky-100 text-[#0284C7]",
      border: "border-sky-100",
    },
    {
      title: "Total Produits",
      value: data.stats.totalProducts,
      icon: "fa-solid fa-box-open",
      bgIcon: "bg-teal-100 text-teal-600",
      border: "border-teal-100",
    },
    {
      title: "Total Commandes",
      value: data.stats.totalOrders,
      icon: "fa-solid fa-bag-shopping",
      bgIcon: "bg-indigo-100 text-indigo-600",
      border: "border-indigo-100",
    },
    {
      title: "Total Avis",
      value: data.stats.totalReviews,
      icon: "fa-solid fa-star",
      bgIcon: "bg-amber-100 text-amber-500",
      border: "border-amber-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
          <p className="text-sm text-slate-500 mt-1">
            Vue d'ensemble des performances de votre parapharmacie ParaPlus
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-sky-100 rounded-xl text-xs font-medium text-slate-600 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Données en temps réel
        </div>
      </div>

      {/* 1. STATISTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-2xl border ${card.border} shadow-sm hover:shadow-md transition-shadow flex items-center justify-between`}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {card.title}
              </p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">
                {card.value}
              </h3>
            </div>
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${card.bgIcon}`}
            >
              <i className={card.icon}></i>
            </div>
          </div>
        ))}
      </div>

      {/* 2. GRAPHIQUE DES VENTES (PLEINE LARGEUR) */}
      <div className="bg-white p-6 rounded-2xl border border-sky-100/80 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Évolution des ventes</h2>
            <p className="text-xs text-slate-400">Chiffre d'affaires mensuel (DH)</p>
          </div>
          <span className="px-3 py-1 text-xs font-semibold bg-sky-50 text-[#0284C7] rounded-lg">
            {new Date().getFullYear()}
          </span>
        </div>

        <div className="h-72 w-full">
          {data.salesChart.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.salesChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #E0F2FE",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                  }}
                  formatter={(value) => [`${value} DH`, "Ventes"]}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#0284C7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-slate-400">
              Aucune donnée de vente disponible
            </div>
          )}
        </div>
      </div>

      {/* 3. DERNIÈRES COMMANDES */}
      <div className="bg-white rounded-2xl border border-sky-100/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Dernières commandes</h2>
            <p className="text-xs text-slate-400">Les commandes les plus récentes des clients</p>
          </div>
          <Link
            to="/admin/commandes"
            className="text-xs font-semibold text-[#0284C7] hover:underline"
          >
            Voir toutes les commandes →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-6 font-semibold">Réf. Commande</th>
                <th className="py-3.5 px-6 font-semibold">Client</th>
                <th className="py-3.5 px-6 font-semibold">Date</th>
                <th className="py-3.5 px-6 font-semibold">Montant</th>
                <th className="py-3.5 px-6 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {data.recentOrders.length > 0 ? (
                data.recentOrders.map((order) => {
                  const st = formatStatus(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-sky-50/30 transition">
                      <td className="py-4 px-6 font-semibold text-slate-700">
                        #{order.id}
                      </td>
                      <td className="py-4 px-6 text-slate-600">{order.client}</td>
                      <td className="py-4 px-6 text-slate-400 text-xs">{order.date}</td>
                      <td className="py-4 px-6 font-bold text-slate-800">
                        {order.total} DH
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${st.style}`}
                        >
                          {st.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-400 text-sm">
                    Aucune commande récente trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. DERNIERS AVIS CLIENTS (LTA7T) */}
      <div className="bg-white rounded-2xl border border-sky-100/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Derniers avis clients</h2>
            <p className="text-xs text-slate-400">
              Les évaluations récentes laissées sur vos produits
            </p>
          </div>
          <Link
            to="/admin/avis"
            className="text-xs font-semibold text-[#0284C7] hover:underline"
          >
            Gérer tous les avis →
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {data.recentReviews?.length > 0 ? (
            data.recentReviews.map((avis) => (
              <div
                key={avis.id}
                className="p-5 hover:bg-sky-50/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-slate-800">
                      {avis.client}
                    </span>
                    <span className="text-xs text-slate-400">• sur</span>
                    <span className="text-xs font-medium text-[#0284C7] bg-sky-50 px-2.5 py-0.5 rounded-md">
                      {avis.product}
                    </span>
                  </div>

                  {/* Étoiles */}
                  <div className="flex items-center gap-1 text-xs">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fa-solid fa-star ${
                          star <= avis.note ? "text-amber-400" : "text-slate-200"
                        }`}
                      ></i>
                    ))}
                  </div>

                  {/* Commentaire */}
                  <p className="text-sm text-slate-600">
                    {avis.commentaire || (
                      <span className="italic text-slate-400">
                        Aucun commentaire écrit
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <span className="text-xs text-slate-400">{avis.date}</span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      avis.is_visible
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}
                  >
                    {avis.is_visible ? "Visible" : "Masqué"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-400 text-sm">
              Aucun avis récent trouvé
            </div>
          )}
        </div>
      </div>
    </div>
  );
}