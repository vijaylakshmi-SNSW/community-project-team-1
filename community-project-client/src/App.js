import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {



  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;