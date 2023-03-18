import { FileInterface, Folder } from "./structure";

export type FolderStructureContext = {
  get: (path: string) => { folders?: Folder[]; files?: FileInterface[] };
  drop: (
    id: number,
    path: string,
    folder: boolean,
    gottenPath: string,
    gottenName: string
  ) => void;
};
