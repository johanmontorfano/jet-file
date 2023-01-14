import { JetFile } from "./database";
import { JetStore } from "./store";
import { JetWrapper } from "./wrapper";

export namespace Jet {
    export const File = JetFile;
    export const Store = JetStore;
    export const Wrapper = JetWrapper;
    export const labels = Object.freeze({
        store: "js",
        file: "jf"
    });
}
