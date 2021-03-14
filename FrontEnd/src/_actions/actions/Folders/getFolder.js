import axios from "axios";
import {
  FOLDER_FAILED,
  GET_FOLDER,
} from "../../constants/folder_constants/folderConstants";

export const GetFolder = () => async (dispatch) => {
  try {
    const responseData = await axios({
      method: "GET",
      url: "http://localhost:5000/folder/",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataFromComponent,
    });
    console.log(responseData.data);
    dispatch({
      type: GET_FOLDER,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: responseData.data,
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
