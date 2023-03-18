export type FileInterface = {
  name: string;
  ext: "ts" | "js";
  path: string;
  id: number;
};

export type Folder = {
  name: string;
  path: string;
  id: number;
};
