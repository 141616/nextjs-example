import { createContext, useContext } from "react";
import createStore from "../stores";

let rootStore = createStore();

export const StoreContext = createContext(rootStore);

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}

export function StoreProvider({ children, initialState: initialData }: any) {
  const store = initializeStore(initialData);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

function initializeStore(initialData = null) {
  const _store = rootStore ?? createStore();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.session.hydrate(initialData);
    _store.product.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!rootStore) rootStore = _store;

  return _store;
}
