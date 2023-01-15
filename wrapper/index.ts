import { JetFile } from "../database";
import { JetStore } from "../store";

/** The utility of a Wrapper is to allows to use JetFile and JetStore without having to
 * adapt the whole codebase for a new storage method.
 * Instead, using JetWrapper will allow to use either JetFile or JetStore with JetFile
 * bindings.
 *
 * @param instanceType `"jf" | "js"`: for JetFile instances, use "jf". and "js" for JetStore stores.
 */
export class JetWrapper<JFileType extends { [entry: string]: any } = { [entry: string]: any }> {
    private instance: JetFile<JFileType> | JetStore<JFileType>;
    private instanceType: "jf" | "js";

    constructor(instanceType: "jf" | "js", path: string) {
        /** Create the new instance */
        this.instance = new (instanceType === "jf" ? JetFile<JFileType> : JetStore<JFileType>)(path);
        /** Determines the instance type */
        this.instanceType = instanceType;
    }

    /** Performs a read operation on storage */
    get<KEY extends keyof JFileType>(key: KEY): JFileType[KEY] | null {
        switch (this.instanceType) {
            case "js":
                return (this.instance as unknown as JetStore<JFileType>).readKey(key);
            case "jf":
                return (this.instance as unknown as JetFile<JFileType>).get(key);
        }
    }

    /** Performs a write operation on storage */
    set<KEY extends keyof JFileType>(key: KEY, value: JFileType[KEY]) {
        switch (this.instanceType) {
            case "js":
                (this.instance as unknown as JetStore<JFileType>).editKey(key, value);
                break;
            case "jf":
                (this.instance as unknown as JetFile<JFileType>).set(key, value);
                break;
        }
    }

    entries(): (keyof JFileType)[] {
        switch (this.instanceType) {
            case "js":
                return (this.instance as unknown as JetStore<JFileType>).getEntries() as any
            case "jf":
                return (this.instance as unknown as JetFile<JFileType>).entries() as any
        }
    }
}
