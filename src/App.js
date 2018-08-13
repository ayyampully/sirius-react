import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Overview from "./modules/overview/Overview";
import Listview from "./modules/listview/Listview";
import Detailview from "./modules/detailview/Detailview";
import logo from "./assets/images/sirius.png";
import "./App.css";
import "./assets/font-awesome-4.6.3/css/font-awesome.min.css";

import Store from "./store/Store";

import io from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.initStore();
  }
  state = {
    data: { comment: "Test" }
  };
  initStore() {
    const socket = io(
      `${window.location.protocol}//${window.location.hostname}:3031`
    );
    socket.on("state", state => {
      console.log(state);
      this.setState({ data: state });
    });
    Store.subscribe(() => {
      //console.log(JSON.stringify(Store.getState()));
      socket.emit("addComment", Store.getState());
    });
  }
  render() {
    return (
      <div className="container">
        <div className="header">
          <h1 className="logo">
            {" "}
            <img src={logo} alt="Sirius Lite" />
          </h1>
        </div>
        <div className="body">
          <div className="main-nav-bar">
            <ul className="main">
              <li>
                <i className="fa fa-tachometer" aria-hidden="true" />{" "}
                <span>Dashboard</span>
              </li>
              <li className="active">
                <i className="fa fa-bug" aria-hidden="true" />{" "}
                <span>Issue Tracker</span>
              </li>
              <li>
                <i className="fa fa-inbox" aria-hidden="true" />{" "}
                <span>Messages</span>
              </li>
              <li>
                <i className="fa fa-folder" aria-hidden="true" />{" "}
                <span>Docs</span>
              </li>
            </ul>
            <ul className="settings">
              <li>
                <i className="fa fa-info-circle" aria-hidden="true" />{" "}
                <span>Help</span>
              </li>
              <li>
                <i className="fa fa-cog" aria-hidden="true" />{" "}
                <span>Settings</span>
              </li>
            </ul>
          </div>

          <Router>
            <div className="main-content">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Overview {...props} data={this.state.data} store={Store} />
                  )}
                />
                <Route exact path="/projects/:id" component={Listview} />
                <Route
                  exact
                  path="/projects/:id/:ticket"
                  render={props => <Detailview {...props} store={Store} />}
                />
              </Switch>
            </div>
          </Router>
        </div>
        <footer>
          <p>
            Made with <span>♥</span>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
