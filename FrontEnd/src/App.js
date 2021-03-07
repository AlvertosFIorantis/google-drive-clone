import React from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="fileUpload_container">
      <div className="glass">
        <FileUpload />
      </div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/folder/:folderId" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
