export default function AvisFilters({
  search,
  onSearchChange,
  filterStatus,
  onStatusChange,
  filterRating,
  onRatingChange,
  onReset,
}) {
  const hasActiveFilters =
    search.trim() !== "" || filterStatus !== "all" || filterRating !== "all";

  return (
    <section className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <i className="fa-solid fa-magnifying-glass text-[#0284C7] text-sm absolute left-4 top-1/2 -translate-y-1/2"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher par client, produit ou commentaire..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#36A9E1] transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: "all", label: "Tous" },
            { key: "visible", label: "Visibles" },
            { key: "hidden", label: "Masqués" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => onStatusChange(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                filterStatus === tab.key
                  ? "bg-[#36A9E1] text-white shadow-sm"
                  : "bg-slate-100 text-gray-600 hover:bg-sky-50 hover:text-[#0284C7]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-400 mr-1">
            Filtrer par note :
          </span>
          {[
            { key: "all", label: "Toutes" },
            { key: "5", label: "5 ★" },
            { key: "4", label: "4 ★" },
            { key: "low", label: "3 ★ et moins" },
          ].map((rating) => (
            <button
              key={rating.key}
              onClick={() => onRatingChange(rating.key)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                filterRating === rating.key
                  ? "bg-sky-100 text-[#0284C7] border border-sky-200"
                  : "bg-slate-50 text-gray-500 hover:bg-slate-100"
              }`}
            >
              {rating.label}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>
    </section>
  );
}