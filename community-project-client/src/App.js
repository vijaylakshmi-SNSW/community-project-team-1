import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import Nav from "./component/Nav";
import ViewAll from "./component/projectsRegistry/ViewProjects";
import ProjectsRegistry from "./component/projectsRegistry/ProjectsRegistry";
import Admin from "./component/Admin";
import TopVoted from "./component/TopVoted";
import Footer from "./component/Footer";

function App() {

  return (
    <div className="container">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/project-registry-submit" component={ProjectsRegistry} />
          <Route path="/view-all" component={ViewAll} />
          <Route path="/top-voted" component={TopVoted} />
          <Route path="/admin" component={Admin} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;