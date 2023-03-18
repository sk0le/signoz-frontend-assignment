import { FileInterface, Folder } from "../types/structure";

export const sampleFolder: Folder[] = [
  { name: "folder 1", path: "/", id: 0 },
  { name: "folder 2", path: "/", id: 1 },
  { name: "folder 3", path: "/", id: 2 },
  { name: "folder 4", path: "/folder-1/", id: 3 },
  { name: "folder 5", path: "/", id: 4 },
];

export const sampleFiles: FileInterface[] = [
  { name: "App", ext: "js", path: "/", id: 0 },
  { name: "index", ext: "js", path: "/", id: 1 },
];
