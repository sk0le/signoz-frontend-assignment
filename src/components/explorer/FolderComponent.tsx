import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { FolderStructure } from "../../context/FolderStructure";
import { FolderStructureContext } from "../../types/context";
import { FileInterface, Folder } from "../../types/structure";
import FileComponent from "./FileComponent";

const FolderComponent = ({ name, path, id }: Folder) => {
  const { get, drop } = useContext(FolderStructure) as FolderStructureContext;
  const [opened, setOpened] = useState(false);

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("id", id.toString());
    event.dataTransfer.setData("type", "folder");
    event.dataTransfer.setData("name", name);
    event.dataTransfer.setData("path", `${path}${name.replaceAll(" ", "-")}/`);

    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const gottenId = parseInt(event.dataTransfer.getData("id"));
    const type = event.dataTransfer.getData("type");
    const gottenPath = event.dataTransfer.getData("path");
    const gottenName = event.dataTransfer.getData("name");

    if (gottenId === id) return;

    drop(
      gottenId,
      `${path}${name.replace(" ", "-")}/`,
      type === "file" ? false : true,
      type === "folder" ? gottenPath : "",
      type === "folder" ? gottenName : ""
    );
    setOpened(true);

    event.stopPropagation();
  };

  const [structure, setStructure] = useState<{
    folders?: Folder[];
    files?: FileInterface[];
  }>({});

  useEffect(() => {
    const newStructure = get(`${path}${name.replace(" ", "-")}/`);
    setStructure(newStructure);
  }, [get, name, path]);

  return (
    <div
      draggable
      onDrop={handleDrop}
      onDragOver={enableDropping}
      onDragStart={handleDragStart}
      className="flex w-full flex-col"
      data-testid={id}
    >
      <div
        className="flex w-full cursor-pointer justify-between rounded-md p-1 hover:bg-zinc-600 "
        onClick={() => {
          setOpened((prev) => !prev);
        }}
      >
        {opened ? (
          <ChevronDownIcon className="w-4 text-zinc-400" />
        ) : (
          <ChevronRightIcon className="w-4 text-zinc-400" />
        )}
        <div className="ml-2 flex-1 text-sm">{name}</div>
      </div>

      <div className="space-y-1 pl-4">
        {structure.folders &&
          opened &&
          structure.folders.map((folder, index) => {
            return <FolderComponent {...folder} key={index} />;
          })}
        {structure.files &&
          opened &&
          structure.files.map((file, index) => {
            return <FileComponent {...file} key={index} />;
          })}
      </div>
    </div>
  );
};

export default FolderComponent;
