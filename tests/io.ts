import { JetFile } from "../jet-file";

const file = new JetFile<{ [value: string]: number }>(
  "./path/to/ressource/hi.json"
);

for (let i = 0; i <= 1500; i++) {
  file.set(i.toString(), i);
}
