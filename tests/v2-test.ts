import { JetStore } from "../v2";

/** Create a new JetStore instance */
const storage = new JetStore("v2-store/t1");

storage.editKey("abc", true)
console.log(storage.readKey("abc"))

storage.editKey("", "ee")
console.log(storage.readKey(""))

console.log(storage.getEntries())
