import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home.js";
import MissionInfo from "./MissionInfo/MissionInfo.js";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div>
        {/* <Home /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/missionInfo" component={MissionInfo} />
        </Switch>
      </div>
    );
  }
}

export default App;
