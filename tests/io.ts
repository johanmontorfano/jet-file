import { JetFile } from "../index";

const file = new JetFile<{ a: string, b: number }>(
  "./path/to/ressource/hi.json"
);

file.set("a", "abc")
file.set("b", 120)

console.log(file.get("b"))