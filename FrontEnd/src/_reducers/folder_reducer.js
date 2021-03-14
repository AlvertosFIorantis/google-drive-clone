import {
  CREATE_FOLDER,
  SELECT_FOLDER,
  FOLDER_FAILED,
  GET_FOLDER,
} from "../_actions/constants/folder_constants/folderConstants";

// prepei pada na exo ena initial state
const initialState = {
  folderId: undefined,
  folder: {},
  childFolders: [],
  childFiles: [],
  path: "/home",
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_FOLDER:
      return {
        ...state,
        childFolders: action.payload.childFolders,
      };
    case SELECT_FOLDER:
      return {
        ...state,
        folderId: action.payload.folderId,
        folder: action.payload.folder,
      };
    case GET_FOLDER:
      return {
        ...state,
        folderId: action.payload.folderId,
        path: action.payload.path,
        childFolders: action.payload.childFolders,
      };
    case FOLDER_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      console.log("Project reducer");
      return state;
  }
}
