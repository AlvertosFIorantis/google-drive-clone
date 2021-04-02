import axios from "axios";
import {
  FILES_FAILED,
  GET_FILES,
} from "../../constants/file_constants/fileConstants";

export const getFiles = (dataFromComponent) => async (dispatch) => {
  console.log("data from Component", dataFromComponent);
  try {
    const responseData = await axios({
      method: "POST",
      url: "http://localhost:5000/upload/getfiles/",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataFromComponent,
    });
    console.log("Response from Files", responseData.data.files);
    dispatch({
      type: GET_FILES,
      // boro na peraso san payload pragmata pou perno apo to backend, vazo .fodler giati girano ena object fodler apo to backend opote apo to repsoend data exo to foler kai ego thelo ta values pou exo mesa sto folder
      payload: responseData.data,
    });
  } catch (err) {
    console.log("my File error:...", err);
    dispatch({
      type: FILES_FAILED,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: err.response.data,
    });
  }
};
