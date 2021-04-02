import { combineReducers } from "redux";
import Folder_reducer from "./folder_reducer";
import File_reducer from "./file_reducer";

const RootReducer = combineReducers({
  Folder_reducer: Folder_reducer,
  File_reducer: File_reducer,
});

export default RootReducer;
