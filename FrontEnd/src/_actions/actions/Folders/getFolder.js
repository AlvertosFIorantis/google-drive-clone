import axios from "axios";
import {
  FOLDER_FAILED,
  GET_FOLDER,
} from "../../constants/folder_constants/folderConstants";

export const getFolder = (dataFromComponent) => async (dispatch) => {
  console.log("data from Component", dataFromComponent);
  try {
    const responseData = await axios({
      method: "POST",
      url: "http://localhost:5000/folder",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataFromComponent,
    });
    console.log("Response", responseData.data);
    dispatch({
      type: GET_FOLDER,
      // boro na peraso san payload pragmata pou perno apo to backend, vazo .fodler giati girano ena object fodler apo to backend opote apo to repsoend data exo to foler kai ego thelo ta values pou exo mesa sto folder
      payload: responseData.data.folder,
    });
  } catch (err) {
    console.log("my folder error:...", err);
    dispatch({
      type: FOLDER_FAILED,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: err.response.data,
    });
  }
};
