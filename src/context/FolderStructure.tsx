import { createContext, useCallback, useEffect, useState } from "react";
import { sampleFiles, sampleFolder } from "../data/sampleData";
import { FolderStructureContext } from "../@types/context";
import { FileInterface, Folder } from "../@types/structure";

export const FolderStructure = createContext<FolderStructureContext | null>(
  null
);

export const FolderStructureProvider = ({ children }: any) => {
  const [folders, setFolders] = useState<Folder[]>(sampleFolder);
  const [files, setFiles] = useState<FileInterface[]>(sampleFiles);

  const get = (path: string) => {
    const foldersWithPath = folders.filter((el) => el.path === path);
    const filesWithPath = files.filter((el) => el.path === path);

    return { folders: foldersWithPath, files: filesWithPath };
  };

  const moveFilesWithFolders = (
    path: string,
    gottenPath: string,
    gottenName: string
  ) => {
    setFiles(
      files.map((file) => {
        if (file.path === gottenPath) {
          return {
            ...file,
            path: `${path}${gottenName.replaceAll(" ", "-")}/`,
          };
        }
        return file;
      })
    );
  };

  const moveFolders = (
    data: Folder[],
    path: string,
    gottenPath: string,
    gottenName: string
  ) => {
    return data.map((folder) => {
      if (folder.path.startsWith(gottenPath)) {
        const pathToBeSet = folder.path.startsWith(
          `/${gottenName.replaceAll(" ", "-")}/`
        )
          ? `${path}${folder.path.slice(1)}`
          : `${path}${gottenName.replaceAll(" ", "-")}/`;

        return {
          ...folder,
          path: pathToBeSet,
        };
      }
      return folder;
    });
  };

  const drop = (
    id: number,
    path: string,
    folder: boolean,
    gottenPath: string,
    gottenName: string
  ) => {
    if (!folder) {
      const data = files.map((v) => {
        if (v.id === id) return { ...v, path };
        return v;
      });

      setFiles(data);
      return;
    }

    const data = folders.map((v) => {
      if (v.id === id) {
        return { ...v, path };
      }
      return v;
    });

    const newData = moveFolders(data, path, gottenPath, gottenName);

    setFolders(newData);

    moveFilesWithFolders(path, gottenPath, gottenName);
  };

  return (
    <FolderStructure.Provider value={{ get, drop }}>
      {children}
    </FolderStructure.Provider>
  );
};
