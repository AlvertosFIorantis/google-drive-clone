import { CREATE_FOLDER } from "../_actions/constants/folder_constants/folderConstants";

// prepei pada na exo ena initial state
const initialState = {
  folders: [],
  files: [],
  path: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_FOLDER:
      return {
        ...state,
      };

    default:
      console.log("Project reducer");
      return state;
  }
}
