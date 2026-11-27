export default function AvisDeleteModal({ avisToDelete, onClose, onConfirm, isDeleting }) {
  if (!avisToDelete) return null;
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-sky-100 space-y-5">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
            <i className="fa-solid fa-circle-info text-lg"></i>
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-800">
              Confirmer la suppression
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Supprimer l'avis de{" "}
              <span className="font-semibold text-slate-700">
                {avisToDelete.user?.nom || "ce client"}
              </span>{" "}
              sur{" "}
              <span className="font-semibold text-slate-700">
                {avisToDelete.product?.nom || "ce produit"}
              </span>{" "}
              ?
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#36A9E1] text-white hover:bg-[#0284C7] transition cursor-pointer disabled:opacity-60"
          >
            {isDeleting ? "Suppression..." : "Confirmer"}
          </button>
        </div>
      </div>
    </div>
  );
}