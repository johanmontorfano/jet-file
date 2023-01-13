import { JetWrapper } from "../wrapper";

/** This tool converts any JetFile database into a JetStore store */
export function jfToJS(jfPath: string, jsPath: string) {
    console.log(`Converting the JetFile database file at ${jfPath} into a store at ${jsPath}`);
    
    /** Create each wrapper instance */
    const database = new JetWrapper("jf", jfPath);
    const store = new JetWrapper("js", jsPath)

    /** Read each database entry and transfers it into a store */
    database.entries().forEach(entry => {
        store.set(entry.toString(), database.get(entry.toString()));
    });
}
