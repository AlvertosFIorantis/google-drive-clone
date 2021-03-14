import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BreadCrumbs.css";
import { useSelector } from "react-redux";

function BreadCrumbs() {
  const breadCrumb = useSelector((state) => state.Folder_reducer.path);
  const breadCrumbIds = useSelector((state) => state.Folder_reducer.path_ids);
  return (
    <ul className="breadcrumb">
      {breadCrumb.split("/").map((item, i) => {
        // console.log(breadCrumbIds.split("/")[i]);
        let linkId = breadCrumbIds.split("/")[i];
        return (
          <l className="breadcrumbLink" key={i}>
            <Link to={`/folder/${linkId}`}>{item}</Link>
          </l>
        );
      })}
    </ul>
  );
}

export default BreadCrumbs;
