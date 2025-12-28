<!-- Ajouter Font Awesome CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-KdP9s1+ZLJX9L3v0HXnq..." crossorigin="anonymous" referrerpolicy="no-referrer" />

<div id="root"></div>

<script type="text/babel">
const { useState } = React;

function NavbarPanier() {
    const [panier, setPanier] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const addToCart = (product) => {
        setPanier([...panier, product]);
    };

    return (
        <div>
            <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#ddd" }}>
                <h1>Mon Shop</h1>
                <div style={{ position: "relative" }}>
                    <i className="fa fa-shopping-cart" style={{ fontSize: "24px", cursor: "pointer" }} onClick={() => setShowForm(!showForm)}></i>
                    {panier.length > 0 && (
                        <span style={{
                            position: "absolute", top: "-5px", right: "-10px",
                            background: "red", color: "white", borderRadius: "50%",
                            width: "20px", height: "20px", textAlign: "center", lineHeight: "20px", fontSize: "12px"
                        }}>
                            {panier.length}
                        </span>
                    )}
                </div>
            </nav>

            {showForm && (
                <form style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem", width: "300px" }}>
                    <h3>Panier</h3>
                    {panier.length === 0 ? <p>Le panier est vide.</p> : 
                        <ul>
                            {panier.map((p, i) => <li key={i}>{p.name} - {p.prix} dh</li>)}
                        </ul>
                    }
                    <button type="submit">Passer Commande</button>
                </form>
            )}

            {/* Boutons test */}
            <button onClick={() => addToCart({ id: 1, name: "Produit 1", prix: 300 })}>Ajouter Produit 1</button>
            <button onClick={() => addToCart({ id: 2, name: "Produit 2", prix: 200 })}>Ajouter Produit 2</button>
        </div>
    );
}


