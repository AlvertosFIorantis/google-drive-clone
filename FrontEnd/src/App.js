import React from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
// the 2 dasbhoards are exqctly the same componets i just have them name diffrently as a workaround so i can reload the dashboard compoent
// when clickign the link of one of the folders. If i ddint do that the compeont wouldnt be remounted so that is why i was keep seeing the same folders
// evne thoguh i was on a diffrent suboflers now that they ihave dfifernt names i always the problem is that this doesn work ether on the second level
// so i have to find antoehr
import Dashboard_specific_folder from "./components/Dashboard_specific_folder";

function App() {
  return (
    <div className="fileUpload_container">
      <div className="glass">
        <FileUpload />
      </div>
      <Switch>
        {/* <Route
          exact
          path="/folder/:folderId"
          component={Dashboard_specific_folder}
        /> */}
        <Route
          // exo afto to logic me to render gia na boro na kaon re render to idio componet parolo pou pataoo to idio link oste kateh fora pou alazo folder na ginete i alagi
          // https://stackoverflow.com/questions/57786965/force-remount-component-when-click-on-the-same-react-router-link-multiple-times
          path="/folder/:folderId"
          render={(props) => <Dashboard key={props.location.key} {...props} />}
        />

        <Route exact path="/" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
