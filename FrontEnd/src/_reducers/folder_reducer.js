import {
  CREATE_FOLDER,
  SELECT_FOLDER,
} from "../_actions/constants/folder_constants/folderConstants";

// prepei pada na exo ena initial state
const initialState = {
  folderId: "",
  folder: {},
  childFolders: [],
  childFiles: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_FOLDER:
      return {
        ...state,
      };
    case SELECT_FOLDER:
      return {
        ...state,
        folderId: action.payload.folderId,
        folder: action.payload.folder,
      };

    default:
      console.log("Project reducer");
      return state;
  }
}
