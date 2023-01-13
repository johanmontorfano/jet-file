import { JetFile } from "../database";
import { JetStore } from "../store";

/** The utility of a Wrapper is to allows to use JetFile and JetStore without having to
 * adapt the whole codebase for a new storage method.
 * Instead, using JetWrapper will allow to use either JetFile or JetStore with JetFile
 * bindings.
 *
 * @param instanceType `"jf" | "js"`: for JetFile instances, use "jf". and "js" for JetStore stores.
 */
export class JetWrapper<JFileType extends {[entry: string]: any} = {[entry: string]: any}, T extends "jf" | "js" = "jf"> {
    private instance: JetFile<JFileType> | JetStore;
    private instanceType: "jf" | "js";

    constructor(instanceType: T, path: string) {
        /** Create the new instance */
        this.instance = new (instanceType === "jf" ? JetFile<JFileType> : JetStore)(path);
        /** Determines the instance type */
        this.instanceType = instanceType;
    }

    /** Performs a read operation on storage */
    get <T = any>(key: string): T {
        switch (this.instanceType) {
            case "js":
                return (this.instance as unknown as JetStore).readKey<T>(key);
            case "jf":
                return (this.instance  as unknown as JetFile<any>).get(key);
        }
    }
    
    /** Performs a write operation on storage */
    set (key: string, value: any) {
        switch (this.instanceType) {
            case "js":
                (this.instance as unknown as JetStore).editKey(key, value);
                break;
            case "jf":
                (this.instance as unknown as JetFile<any>).set(key, value);
                break;
        }
    }

    entries(): T extends JetStore ? string[] : (keyof JFileType)[] {
        switch (this.instanceType) {
            case "js":
                return (this.instance as unknown as JetStore).getEntries() as any
            case "jf":
                return (this.instance as unknown as JetFile<any>).entries() as any
        }
    } 
}
