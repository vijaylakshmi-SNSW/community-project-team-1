import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import Nav from "./component/Nav";
import About from "./component/About";
import ProjectsRegistry from "./component/projectsRegistry/ProjectsRegistry"

function App() {



  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/project-registry" component={ProjectsRegistry} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;