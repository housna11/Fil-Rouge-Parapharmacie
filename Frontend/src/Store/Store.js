import { create } from "zustand";

const useCartStore = create((set) => ({
  items: [],
  pendingProduct: null,     // produit en attente si l'utilisateur n'est pas connecté
  orderPending: false,      // indique qu'une commande est en attente

  // ajouter un produit au panier
  addItem: (product) =>
    set((state) => {
      const exist = state.items.find((item) => item.id === product.id);
      if (exist) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),

  clearCart: () => set({ items: [] }),

  // produit en attente pour inscription
  setPendingProduct: (product) => set({ pendingProduct: product }),
  clearPendingProduct: () => set({ pendingProduct: null }),

  // commande en attente
  setOrderPending: (value) => set({ orderPending: value }),
}));
  
export default useCartStore;
