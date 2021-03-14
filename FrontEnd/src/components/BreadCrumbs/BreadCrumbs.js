import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BreadCrumbs.css";

function BreadCrumbs() {
  const [breadCrumb, setBreadCrumb] = useState("home/folder1/folder2");
  return (
    <ul className="breadcrumb">
      {breadCrumb.split("/").map((item, i) => {
        return (
          <l className="breadcrumbLink" key={i}>
            <Link to={`/folder/${item}`}>{item}</Link>
          </l>
        );
      })}
    </ul>
  );
}

export default BreadCrumbs;
