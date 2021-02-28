import { combineReducers } from "redux";
import Folder_reducer from "./folder_reducer";

const RootReducer = combineReducers({
  Folder_reducer: Folder_reducer,
});

export default RootReducer;
