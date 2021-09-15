import { SessionStore } from "./session";
import { ProductStore } from "./product";

export default function createStore() {
  const sessionStore = new SessionStore();
  const productStore = new ProductStore();

  return {
    session: sessionStore,
    product: productStore,
  };
}
