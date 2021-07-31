import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Lines from "./components/Lines";
import LineDetails from "./components/LineDetails";

/*
App component.
*/
export default function App() {
  return (
    <Router>
      <div>
        <h1 className="fw3" data-testid="application-heading">Barcelona Public Transportation Challenge</h1>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Lines />
          </Route>
          <Route path="/line-details/:type/:id">
            <LineDetails />
          </Route>
        </Switch>
        <footer className="tc mv5">
          <i className="far fa-grin-beam f1"></i>
          <p>Now you know everything there is to know about public transportation lines in Barcelona!</p>
        </footer>
      </div>
    </Router>
  );
}
