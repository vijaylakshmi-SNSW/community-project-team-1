import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import Nav from "./component/Nav";
import ViewAll from "./component/ViewProjects";
import ProjectsRegistry from "./component/projectsRegistry/ProjectsRegistry";

function App() {

  return (
    <div className="container">
      <Router>
        <Nav />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/project-registry" component={ProjectsRegistry} />
          <Route path="/view-all" component={ViewAll} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;