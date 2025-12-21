import { Link } from "react-router-dom";

export default function Nouveauxproduits() {
  return (
    <div className="p-6 min-h-screen">
         <div>
            <h2 className="text-center text-2xl font-bold text-[#4296DF] mb-12">Nos nouveaux Produits</h2>
        </div>

      <div className="grid grid-cols-3 gap-6">
       
        <div className="bg-white rounded shadow">
          <img src="/public/bioderma.jpg" className="w-full h-40 object-contain" />
          <div className="bg-gray-200 p-4 rounded text-center">
            <h3 className="text-[#1A5788] font-bold">Bioderma</h3>
            <p className="text-sm">300 DH</p>
            <Link to="/catalogues"className="inline-block mt-2 bg-[#4296DF] text-white px-4 py-1 rounded-full">Voir plus</Link>

          </div>
        </div>

        
        <div className="bg-white rounded shadow">
          <img src="/public/bioderma.jpg" className="w-full h-40 object-contain" />
          <div className="bg-gray-200 p-4 rounded text-center">
            <h3 className="text-[#1A5788] font-bold">Bioderma</h3>
            <p className="text-sm">300 DH</p>
            <Link to="/catalogues"className="inline-block mt-2 bg-[#4296DF] text-white px-4 py-1 rounded-full">Voir plus</Link>

          </div>
        </div>

        
        <div className="bg-white rounded shadow">
          <img src="/public/bioderma.jpg" className="w-full h-40 object-contain" />
          <div className="bg-gray-200 p-4 rounded text-center">
            <h3 className="text-[#1A5788] font-bold">Bioderma</h3>
            <p className="text-sm">300 DH</p>
            <Link to="/catalogues"className="inline-block mt-2 bg-[#4296DF] text-white px-4 py-1 rounded-full">Voir plus</Link>

          </div>
        </div>

        <div className="bg-white rounded shadow">
          <img src="/public/bioderma.jpg" className="w-full h-40 object-contain" />
          <div className="bg-gray-200 p-4 rounded text-center">
            <h3 className="text-[#1A5788] font-bold">Bioderma</h3>
            <p className="text-sm">300 DH</p>
            <Link to="/catalogues"className="inline-block mt-2 bg-[#4296DF] text-white px-4 py-1 rounded-full">Voir plus</Link>

          </div>
        </div>

        <div className="bg-white rounded shadow">
          <img src="/public/bioderma.jpg" className="w-full h-40 object-contain" />
          <div className="bg-gray-200 p-4 rounded text-center">
            <h3 className="text-[#1A5788] font-bold">Bioderma</h3>
            <p className="text-sm">300 DH</p>
            <Link to="/catalogues"className="inline-block mt-2 bg-[#4296DF] text-white px-4 py-1 rounded-full">Voir plus</Link>

          </div>
        </div>

        <div className="bg-white rounded shadow">
          <img src="/public/bioderma.jpg" className="w-full h-40 object-contain" />
          <div className="bg-gray-200 p-4 rounded text-center">
            <h3 className="text-[#1A5788] font-bold">Bioderma</h3>
            <p className="text-sm">300 DH</p>
            <Link to="/catalogues"className="inline-block mt-2 bg-[#4296DF] text-white px-4 py-1 rounded-full">Voir plus</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
