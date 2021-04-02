import React from "react";
import { Link } from "react-router-dom";
import FolderIcon from "../../icons/FolderIcon";
import "./File.css";

function File(props) {
  return (
    <>
      <div className="File_wrapper">
        <FolderIcon />
        {props.name}
      </div>
    </>
  );
}

export default File;
