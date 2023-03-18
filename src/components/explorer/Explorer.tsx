import { useContext, useEffect, useState } from "react";
import { FolderStructure } from "../../context/FolderStructure";
import { FolderStructureContext } from "../../types/context";
import { FileInterface, Folder } from "../../types/structure";
import FolderComponent from "./FolderComponent";
import FileComponent from "./FileComponent";

const Header = () => {
  return (
    <div className="flex w-full items-center rounded-t-md bg-zinc-700 py-3 px-4 ">
      <div className="flex space-x-1">
        <div className="h-3 w-3 rounded-full bg-red-600"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-600"></div>
        <div className="h-3 w-3 rounded-full bg-green-600"></div>
      </div>

      <div className="flex flex-1 items-center justify-center text-sm">
        signoz-frontend-assignment
      </div>
    </div>
  );
};

const Body = () => {
  const { get, drop } = useContext(FolderStructure) as FolderStructureContext;
  const [structure, setStructure] = useState<{
    folders?: Folder[];
    files?: FileInterface[];
  }>({ folders: [], files: [] });

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const gottenId = parseInt(event.dataTransfer.getData("id"));
    const type = event.dataTransfer.getData("type");
    const gottenPath = event.dataTransfer.getData("path");
    const gottenName = event.dataTransfer.getData("name");

    if (gottenPath === "/") return;

    drop(
      gottenId,
      "/",
      type === "file" ? false : true,
      type === "folder" ? gottenPath : "",
      type === "folder" ? gottenName : ""
    );

    event.stopPropagation();
  };

  useEffect(() => {
    const newStructure = get(`/`);
    setStructure(newStructure);
  }, [get]);
  return (
    <div
      onDragOver={enableDropping}
      onDrop={handleDrop}
      className="flex h-full flex-1 flex-col space-y-1 p-6"
    >
      {structure.folders &&
        structure.folders.map((folder, index) => {
          return <FolderComponent {...folder} key={index} />;
        })}
      {structure.files &&
        structure.files.map((file, index) => {
          return <FileComponent {...file} key={index} />;
        })}
    </div>
  );
};

const Explorer = () => {
  return (
    <div className="h-[90vh] w-full max-w-sm select-none rounded-md bg-zinc-800 text-zinc-200 shadow-lg">
      <Header />
      <Body />
    </div>
  );
};

export default Explorer;
