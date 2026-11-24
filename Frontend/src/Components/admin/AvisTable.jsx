
function AvisTable({ avis, onToggleVisibility, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Produit</th>
            <th>Note</th>
            <th>Commentaire</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {avis.length === 0 ? (
            <tr>
              <td colSpan="7">Aucun avis disponible.</td>
            </tr>
          ) : (
            avis.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.user?.nom || "Client inconnu"}
                  <br />
                  <small>{item.user?.email}</small>
                </td>

                <td>
                  {item.product?.nom || "Produit inconnu"}
                </td>

                <td>
                  {"⭐".repeat(item.note || 0)}
                  <br />
                  {item.note}/5
                </td>

                <td>{item.commentaire}</td>

                <td>
                  {new Date(item.created_at).toLocaleDateString("fr-FR")}
                </td>

                <td>
                  <span>
                    {item.is_visible ? "Visible" : "Masqué"}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => onToggleVisibility(item.id)}
                  >
                    {item.is_visible ? "Masquer" : "Afficher"}
                  </button>

                  <button
                    onClick={() => onDelete(item.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AvisTable;
