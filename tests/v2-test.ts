import { JetStore } from "../store";

/** Create a new JetStore instance */
const storage = new JetStore<{abc: boolean, z: number}>("v2-store/t1");

storage.editKey("abc", true)
console.log(storage.readKey("abc"))
storage.editKey("z", 12);

storage.deleteKey("z");
console.log(storage.getEntries())