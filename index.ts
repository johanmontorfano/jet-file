import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readJsonSync,
  writeJsonSync,
} from "fs-extra";

/** all the exit listeners */
const exitListeners: (() => void)[] = [];

/** create a new jet-file instance */
export class JetFile<FILE_TYPE extends { [attr: string]: any }> {
  private path: string;
  private data: FILE_TYPE;

  constructor(path: string) {
    this.path = path; // register the path

    // decompose the path and create directories if they don't exists
    // it ignores "./"
    path
      .replace("./", "")
      .split("/")
      .forEach((f, i) => {
        /** path which will be checked for existence */
        const currentPath = path.split("/").splice(0, i).join("/");

        if (!existsSync(currentPath) && currentPath !== "")
          mkdirSync(currentPath);
      });

    if (!existsSync(path)) appendFileSync(path, "{}");

    // initialize the data field
    this.data = this.diskGet();

    // add an exit listener
    exitListeners.push(() => {
      writeJsonSync(path, this.data);
    });
  }

  /** read data from the file */
  private diskGet(): FILE_TYPE {
    return readJsonSync(this.path);
  }

  /** automatically encrypt and type a data element
   * this is useful because it put [string] | [int]
   * before an encrypted element, if the element is
   * of type int, parseInt will be used, otherwise
   * it's JSON. which will be used
   */
  private encryptRessource(ressource: any) {
    // value type parser
    const parser: "string" | "int" =
      ["number", "bigint"].indexOf(typeof ressource) !== -1 ? "int" : "string";
    return `[${parser}]${Buffer.from(JSON.stringify(ressource)).toString(
      "base64"
    )}`;
  }

  /** automatically decrypt a ressource depending
   * on it's element type, if the flag before the
   * ressource is [string], JSON.parse will be
   * used, otherwise it's parseInt which will be
   * used.
   */
  private decryptRessource(ressource: string) {
    if (ressource.startsWith("[int]"))
      parseInt(
        Buffer.from(ressource.replace("[int]", ""), "base64").toString("utf-8")
      );
    return JSON.parse(
      Buffer.from(ressource.replace("[string]", ""), "base64").toString("utf-8")
    );
  }

  /** get a key of the file (it's uncrypted during this process) */
  get<KEY extends keyof FILE_TYPE>(key: KEY): FILE_TYPE[KEY] | null {
    if (this.data[key] === undefined) return null;
    return this.decryptRessource(this.data[key]);
  }

  /** set a key of the file (it's crypted during this process) */
  set<KEY extends keyof FILE_TYPE>(key: KEY, value: FILE_TYPE[KEY]) {
    this.data[key] = this.encryptRessource(value) as FILE_TYPE[KEY];
  }
}

process.on("exit", () => {
  // perform an exit action on JetFile instances
  exitListeners.forEach((listener) => listener());
});
