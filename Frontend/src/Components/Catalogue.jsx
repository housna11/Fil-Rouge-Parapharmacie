import { Link } from "react-router-dom";

export default function Catalogue() {
  return (
    <div>

      <div
        className="h-140 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/paraplus-back.png')" }}>
        <input
          type="text"
          placeholder="Rechercher"
          className="w-full md:w-1/2 px-4 py-2 rounded-full bg-[#1A5788]/80 text-white text-xl placeholder-white outline-none"
        />
      </div>

      <div className="p-6">
        <button className="bg-[#4296DF] text-white px-6 py-2 rounded-lg flex items-center gap-2">
          Filtrage
        </button>
      </div>

      
      <div className="p-6">
        <div className="w-64 bg-white shadow rounded-xl overflow-hidden">

          <img
            src="/bioderma.png"
            className="w-full h-40 object-contain"/>

          <div className="bg-gray-200 p-4 text-center">
            <h3 className="text-[#1A5788] font-semibold">Bioderma</h3>
            <p className="text-sm mb-3">300 DH</p>

            <div className="flex justify-center gap-3">
              <button className="bg-[#4296DF] cursor-pointer text-white px-3 py-1 rounded">J’achète</button>
              <Link to="/detail"className="bg-blue-500 text-white px-3 py-1 rounded">
                Voir détail
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
