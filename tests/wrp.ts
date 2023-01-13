import { JetWrapper } from "../wrapper";
const store = new JetWrapper("js", "store/test");
store.set("a", "coucou");
console.log(store.get("a"));
