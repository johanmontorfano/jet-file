import { JetStore } from "../store";

const storage = new JetStore<{ébecede: boolean}>("v2-store/t2");

storage.editKey("ébecede", true);
console.log(storage.readKey("ébecede"));

console.log(storage.getEntries());