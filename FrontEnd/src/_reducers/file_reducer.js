import {
  FILES_FAILED,
  GET_FILES,
} from "../_actions/constants/file_constants/fileConstants";

// prepei pada na exo ena initial state
const initialState = {
  files: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        files: action.payload.files,
      };
    case FILES_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      console.log("Project reducer");
      return state;
  }
}
