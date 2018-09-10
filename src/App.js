import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SecureRoute from "./components/SecureRoute";

//views
import IndexPage from "./views/";
import Login from "./views/login";
import Dashboard from "./views/dashboard";
import BranchIndex from "./views/branches/";
import StaffIndex from "./views/staffs/";
import BonusCalculator from "./views/bonus-calculator";
import GuestBonusCalculator from "./views/guestbonuscalculator";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/login" component={Login} />
          <SecureRoute exact path="/dashboard" component={Dashboard} />
          <SecureRoute path="/branches" component={BranchIndex} />
          <SecureRoute path="/staffs" component={StaffIndex} />
          <SecureRoute path="/bonus-calculator" component={BonusCalculator} />
          <Route exact path="/GuestBonusCalculator" component={GuestBonusCalculator} />          
        </div>
      </Router>
    );
  }
}

export default App;
