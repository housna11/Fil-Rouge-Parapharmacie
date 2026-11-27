export default function AvisStats({ totalCount, visibleCount, hiddenCount }) {
  const statCards = [
    {
      title: "Total Avis",
      value: totalCount,
      icon: "fa-solid fa-comments",
      color: "bg-sky-100",
      iconColor: "text-[#0284C7]",
      accent: "border-[#36A9E1]",
      description: "Tous les avis enregistrés",
    },
    {
      title: "Avis Visibles",
      value: visibleCount,
      icon: "fa-solid fa-eye",
      color: "bg-sky-50",
      iconColor: "text-[#36A9E1]",
      accent: "border-sky-400",
      description: "Publiés sur la boutique",
    },
    {
      title: "Avis Masqués",
      value: hiddenCount,
      icon: "fa-solid fa-eye-slash",
      color: "bg-sky-100",
      iconColor: "text-[#0284C7]",
      accent: "border-sky-300",
      description: "Masqués par l'administrateur",
    },
  ];

  return (
    <div className="space-y-5">
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
    </div>
  );
}