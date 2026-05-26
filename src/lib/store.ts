import { useSyncExternalStore } from "react";

type State = { cart: Record<string, number>; wishlist: string[] };
const KEY = "manyavar-store-v1";

const initial: State = { cart: {}, wishlist: [] };
let state: State = (() => {
  if (typeof window === "undefined") return initial;
  try { return JSON.parse(localStorage.getItem(KEY) || "") || initial; } catch { return initial; }
})();

const listeners = new Set<() => void>();
function set(next: State) {
  state = next;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach(l => l());
}
function subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); }
function getSnapshot() { return state; }
function getServerSnapshot() { return initial; }

export function useStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const cartActions = {
  add(id: string, qty = 1) {
    set({ ...state, cart: { ...state.cart, [id]: (state.cart[id] || 0) + qty } });
  },
  remove(id: string) {
    const { [id]: _, ...rest } = state.cart;
    set({ ...state, cart: rest });
  },
  setQty(id: string, qty: number) {
    if (qty <= 0) return cartActions.remove(id);
    set({ ...state, cart: { ...state.cart, [id]: qty } });
  },
  clear() { set({ ...state, cart: {} }); },
};

export const wishlistActions = {
  toggle(id: string) {
    const has = state.wishlist.includes(id);
    set({ ...state, wishlist: has ? state.wishlist.filter(x => x !== id) : [...state.wishlist, id] });
  },
  remove(id: string) {
    set({ ...state, wishlist: state.wishlist.filter(x => x !== id) });
  },
};
