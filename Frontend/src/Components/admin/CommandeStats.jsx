export default function CommandeStats({ commandes }) {
  const totalCommandes = commandes.length;
  const totalRevenue = commandes
    .filter((c) => c.status !== "annulee")
    .reduce((sum, c) => sum + Number(c.total || 0), 0);
  const totalLivraison = commandes
    .filter((c) => c.status !== "annulee")
    .reduce((sum, c) => sum + Number(c.frais_livraison || 0), 0);

  const statCards = [
    {
      title: "Total Commandes",
      value: totalCommandes,
      icon: "fa-solid fa-bag-shopping",
      color: "bg-sky-100",
      iconColor: "text-[#0284C7]",
      accent: "border-[#36A9E1]",
      description: "Toutes les commandes enregistrées",
    },
    {
      title: "Chiffre d'Affaires",
      value: `${totalRevenue.toFixed(2)} DH`,
      icon: "fa-solid fa-coins",
      color: "bg-sky-100",
      iconColor: "text-[#0284C7]",
      accent: "border-sky-400",
      description: "Total des commandes (hors annulées)",
    },
    {
      title: "Frais de Livraison",
      value: `${totalLivraison.toFixed(2)} DH`,
      icon: "fa-solid fa-truck",
      color: "bg-sky-50",
      iconColor: "text-[#36A9E1]",
      accent: "border-sky-300",
      description: "Total des frais appliqués",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {statCards.map((card) => (
        <div
          key={card.title}
          className={`bg-white rounded-2xl p-6 border border-gray-100 border-l-4 ${card.accent} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${card.color}`}>
              <i className={`${card.icon} text-xl ${card.iconColor}`}></i>
            </div>
            <span className="text-xs font-medium text-gray-400">
              {card.title}
            </span>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-800">
            {card.value}
          </h3>
          <p className="text-sm text-gray-400 mt-1.5">{card.description}</p>
        </div>
      ))}
    </section>
  );
}