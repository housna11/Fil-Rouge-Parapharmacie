export default function Detail() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-xl shadow p-6 max-w-md w-full">

        <img
          src="/bioderma.png"
          className="w-full h-48 object-contain mb-4"/>

        <h2 className="text-2xl font-semibold text-[#1A5788] mb-2">Bioderma</h2>
          
        <p className="text-gray-600 text-sm mb-4">
          Produit de soin dermatologique conçu pour les peaux sensibles.
          Nettoie et protège la peau en douceur.
        </p>
        <p className="font-semibold text-lg mb-4">300 DH</p>

      </div>
    </div>
  );
}
