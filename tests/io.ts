import { JetFile } from "../index";

const file = new JetFile<{ a: string; b: number; c: string }>(
  "./tests/path/to/ressource/hi.json"
);

file.set("a", "abc");
file.set("b", 120);

console.log(file.get("b"));
console.log(file.get("c"));
console.log(file.entries());
