import React, { useState, useEffect } from "react";
import Modal from "./Modal/Modal";
import "./Dashboard.css";
import Folder from "./Folder/Folder";
import { createFolder } from "../_actions/actions/Folders/createFolder";
// den kano to connect pou kano sta ala compoents tha xrisimopios to hooks gia na kano dispatch to icon
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [FolderName, setFolderName] = useState("");
  const ParentId = useSelector((state) => state.Folder_reducer.folderId);
  const path = useSelector((state) => state.Folder_reducer.path);

  const FolderNameHandler = (e) => {
    setFolderName(e.target.value);
  };

  const onClosingModalHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const createFolderHandler = (event) => {
    event.preventDefault();
    // Npomizo epidi sto action createProkect sot reucer kano append to neo project pou kano create pou to perno piso apo to api ara ginete update to prokects props pou exo sto mapsStaetToProps nomizo aftmata otan alazi to props ginete re-render to compponet i apla epidi to prosp tora exei ena akoma array den ginete re-render to componet gia na kalaesi to myPRojects actions pou exo sto use effect apla ginete display to extra prokect pou iparxei tora sto prosp.projects pou kano map kai kano display ta data
    dispatch(
      createFolder(
        JSON.stringify({
          FolderName: FolderName,
          ParentId: ParentId,
          path: path,
        })
      )
    );
    // klino to modal isos prepei na kano kati pio sofisticated na valo ena settimout na vazo ena loader gia na prolava na paro ta data apo to api prin  kliso to componetne den kseor an to create post epieidi exie async await perimein na paro ta data apo to server prin ektelesi to apo kano function pou eina ito onClosingmodalHalder kai epid
    onClosingModalHandler();
  };

  return (
    <div className="dashboard-folder-container">
      <Modal
        open={isOpen}
        onClose={onClosingModalHandler}
        FolderName={FolderName}
        FolderNameHandler={FolderNameHandler}
        createFolderHandler={createFolderHandler}
      />
      <div className="container_button">
        <div className="center">
          <button onClick={onClosingModalHandler} className="btn">
            <svg
              width="180px"
              height="60px"
              viewBox="0 0 180 60"
              className="border"
            >
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                className="bg-line"
              />
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                className="hl-line"
              />
            </svg>
            <span>Create a Folder</span>
          </button>
        </div>
      </div>
      <Folder name={"test"} />
    </div>
  );
}

export default Dashboard;
