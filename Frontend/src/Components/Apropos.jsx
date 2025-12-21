export default function Apropos() {
  return (
    <div>
            <h2 className="text-center text-2xl font-bold text-[#4296DF] mb-12 aos-init ">A propos</h2>
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/public/jeune-femme.jpg')" }}>
            <div className="bg-white/50 p-10 rounded-2xl max-w-3xl text-center">
                <h2 className="text-2xl font-semibold mb-4">Notre parapharmacie</h2>

                <p className="text-gray-900 text-sm leading-relaxed">
                Chez ParaPlus, nous sommes convaincus que chaque produit de parapharmacie mérite d’être facilement accessible et que chaque client mérite une expérience d’achat fluide et sécurisée. Notre plateforme a été conçue comme un espace pratique et intuitif, où la santé et le bien-être se rencontrent avec simplicité. Que vous souhaitiez découvrir de nouveaux soins, suivre vos commandes ou partager votre avis sur un produit, vous trouverez ici une expérience en ligne claire et agréable. Nous avons développé un système de navigation et de filtrage performant qui vous permet de trouver rapidement les produits correspondant à vos besoins, qu’il s’agisse de soins de la peau, de compléments alimentaires ou d’autres produits de cosmétique.
                </p>
            </div>
            </div>
    </div>
  );
}
