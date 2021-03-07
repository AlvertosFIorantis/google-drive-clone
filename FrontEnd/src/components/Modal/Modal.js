import React from "react";
import ReactDom from "react-dom";
import "./Modal.css";

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255,255,255,0.2)",
  zIndex: 1000,
  backdropFilter: "blur(3px)",
};

function Modal(props) {
  const {
    open,
    onClose,
    FolderName,
    FolderNameHandler,
    createFolderHandler,
  } = props;

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div className="MODAL_STYLES">
        <h1>Add a Folder</h1>
        <form className="product__form" onSubmit={createFolderHandler}>
          <div className="inputGroup inputGroup1">
            <input
              className="inputGroup__textfield"
              placeholder="Folder name"
              onChange={FolderNameHandler}
              value={FolderName}
            />
          </div>

          <div className="inputGroup inputGroup5">
            <button
              type="submit"
              onClick={createFolderHandler}
              className="product__create__button"
            >
              Create
            </button>
          </div>
          <div className="inputGroup inputGroup6">
            <button
              onClick={onClose}
              type="button"
              className="close_modal_button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>,
    // exo fitaksi ena neo id me dive sto public folder sto index.html
    document.getElementById("portal")
  );
}

export default Modal;
