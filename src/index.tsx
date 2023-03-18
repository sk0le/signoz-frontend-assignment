import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FolderStructureProvider } from "./context/FolderStructure";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <FolderStructureProvider>
      <App />
    </FolderStructureProvider>
  </React.StrictMode>
);
