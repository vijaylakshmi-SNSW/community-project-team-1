import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import Nav from "./component/Nav";
import ViewAll from "./component/projectsRegistry/ViewProjects";
import ProjectsRegistry from "./component/projectsRegistry/ProjectsRegistry";
import Admin from "./component/Admin";

function App() {

  return (
    <div className="container">
      <Router>
        <Nav />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/project-registry-submit" component={ProjectsRegistry} />
          <Route path="/view-all" component={ViewAll} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;