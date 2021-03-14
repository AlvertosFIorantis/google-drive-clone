import React from "react";
import { Link } from "react-router-dom";
import FolderIcon from "../../icons/FolderIcon";
import "./Folder.css";

function Folder(props) {
  return (
    <>
      <Link to={`/folder/${props.folderId}`} style={{ textDecoration: "none" }}>
        <div className="Folder_wrapper">
          <FolderIcon />
          {props.name}
        </div>
      </Link>
    </>
  );
}

export default Folder;
