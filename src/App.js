import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./components/pages/Dashboard";
import Coins from "./components/pages/Coins";
import Exchanges from "./components/pages/Exchanges";
import FooterContainer from "./components/Footer";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/coins" component={Coins} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/exchanges" component={Exchanges} />
        </Switch>
      </Router>
      <FooterContainer />
    </div>
  );
}

export default App;
