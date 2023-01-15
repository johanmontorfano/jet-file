import { JetWrapper } from "../wrapper";

const store = new JetWrapper<{"a": string}>("jf", "store/test");
store.set("a", "coucou");
store.get("a");
console.log(store.get("a"));


