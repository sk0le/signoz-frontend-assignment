import { File, Folder } from "./structure";

export type FolderStructureContext = {
  get: (path: string) => { folders?: Folder[]; files?: Files[] };
  drop: (
    id: number,
    path: string,
    folder: boolean,
    gottenPath: string,
    gottenName: string
  ) => void;
};
