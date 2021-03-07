import axios from "axios";
import {
  FOLDER_FAILED,
  CREATE_FOLDER,
} from "../../constants/folder_constants/folderConstants";

// an kapia fora den vlepo na dimiourgit item me to modal einai giati vazo mikro onoma sto project kai den exo kanei setup na pernei error otan simveni afto gia na dimiourgiso item thelo toulaxisotn 6 characters long name

export const createFolder = (dataFromComponent) => async (dispatch) => {
  // edo vazo to logic pou thelo na ekteleite sto async request gia paradigma an thelo na alakso kati apo ta data pou perno apo to api peso ti gia pradigma ot iperno kati data apo to backend kai thelo na ta peraso san payload gia paradgiam exo token apo to logged in user
  try {
    const responseData = await axios({
      method: "POST",
      url: "http://localhost:5000/folder/createFolder",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataFromComponent,
    });
    // otan telioso oti thelo na kano pali kano return to object opos exo kai sta apla action apla i idiafora tora einai oti adi gia return object exo dispatch to object
    console.log(responseData.data);
    dispatch({
      type: CREATE_FOLDER,
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
