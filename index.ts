import { JetFile } from "./database";
import { JetStore } from "./store";
import { JetWrapper } from "./wrapper";

export namespace Jet {
    const File = JetFile;
    const Store = JetStore;
    const Wrapper = JetWrapper;
    const labels = Object.freeze({
        store: "js",
        file: "jf"
    });
}
