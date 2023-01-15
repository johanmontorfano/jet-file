import {
    appendFileSync,
    existsSync,
    mkdirSync,
    readFileSync,
    writeFileSync,
    readdirSync,
    lstatSync
} from "fs-extra";

/**
 * # JetStore
 * JetStore is an alternative to JetFile which appears to be more efficient and scalable than JetFile.
 * It solves many issues of JetFile:
 * - File size overflow
 * - RAM overflow
 * - Poor cache managment
 *
 * And have many advantages:
 * - Database splitting
 * */
export class JetStore<STORE_TYPE extends { [key: string]: any }> {
    /** Store location path */
    private storeLocation: string;

    constructor(storeLocation: string) {
        /** if there is an ending "/" to the path, it's removed */
        if (storeLocation.endsWith("/")) this.storeLocation = storeLocation.split("").reverse().splice(1).reverse().join("")
        else this.storeLocation = storeLocation;
        JetStore.makeStoreLocationPath(this.storeLocation);
    }

    /** This function makes sure that the store location exists, if it doesn't exists nor is unreachable the function fails */
    private static makeStoreLocationPath(path: string) {
        path.replace("./", "").split("/").forEach((dir, i) => {
            /** Path that'll have to be checked */
            const targetPath = [...path.replace("./", "").split("/").splice(0, i), dir].join("/");
            if (!existsSync(targetPath) && targetPath !== "") mkdirSync(targetPath)
        });
    }

    /** This function creates a hash for a key store */
    private static hashing(from: string) {
        return Buffer.from("v2s:" + encodeURIComponent(from)).toString("hex") + ".k"
    }

    /** This function removes the hash of a key store */
    private static unhashing(hash: string) {
        const uncryptedButStillWithCustomKeys = Buffer.from(hash, "hex").toString("utf-8").replace("v2s:", "");
        return uncryptedButStillWithCustomKeys.split("").splice(0, uncryptedButStillWithCustomKeys.length - 2).join("");
    }

    /** Get all the keys entries of this instance, to do this it gets all the files/folders
     * on the store location and returns their unhashed names */
    getEntries(): string[] {
        /** This variable only stores the files that are used as keys */
        const keyFiles: string[] = [];
        readdirSync(this.storeLocation).map(i => {
            /** Determines if the item is a file or a folder, if it's a folder it is not
            * listed as an entry */
            if (!lstatSync(this.storeLocation + "/" + i).isDirectory()) keyFiles.push(JetStore.unhashing(i));
        });
        return keyFiles;
    }

    /** Edit a key, a key is a file */
    editKey<KEY extends keyof STORE_TYPE>(key: KEY, value: STORE_TYPE[KEY]) {
        const keyHash = JetStore.hashing(key as string);
        const filePath = this.storeLocation + "/" + keyHash;

        /** Checks if the file exists, if it doesn't exists it's created */
        if (!existsSync(filePath)) appendFileSync(filePath, "");
        writeFileSync(filePath, Buffer.from(JSON.stringify(value)).toString("base64"));
    }

    /** Read a key */
    readKey<KEY extends keyof STORE_TYPE>(key: KEY): STORE_TYPE[KEY] | null {
        try {
            return JSON.parse(Buffer.from(readFileSync(this.storeLocation + "/" + JetStore.hashing(key as string), "utf8"), "base64").toString("utf-8"))
        } catch {
            return null;
        }
    }
}

