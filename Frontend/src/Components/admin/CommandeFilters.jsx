export default function CommandeFilters({
  search,
  onSearchChange,
  cityFilter,
  onCityChange,
  cities = [],
  onReset,
}) {
  const hasFilters = Boolean(search.trim()) || cityFilter !== "all";

  return (
    <section className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="relative flex-1 max-w-md">
        <i className="fa-solid fa-magnifying-glass text-[#0284C7] text-sm absolute left-4 top-1/2 -translate-y-1/2"></i>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par N°, client, ville, produit ou téléphone..."
          className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#36A9E1] transition"
        />
      </div>

      <select
        value={cityFilter}
        onChange={(e) => onCityChange(e.target.value)}
        className="px-4 py-2.5 text-sm bg-slate-50 border border-gray-200 rounded-xl text-slate-700 focus:outline-none focus:bg-white focus:border-[#36A9E1] transition cursor-pointer"
      >
        <option value="all">Toutes les villes</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2.5 text-xs font-semibold bg-sky-50 text-[#0284C7] border border-sky-200 rounded-xl hover:bg-sky-100 transition cursor-pointer self-start sm:self-auto"
        >
          Réinitialiser
        </button>
      )}
    </section>
  );
}