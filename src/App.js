import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Overview from './modules/overview/Overview';
import Listview from './modules/listview/Listview';
import Detailview from './modules/detailview/Detailview';
import logo from './assets/images/sirius.png';
import './App.css';
import './assets/font-awesome-4.6.3/css/font-awesome.min.css';
class App extends Component {
  render() {
    return (
      <div className="container">
      <div className="header">
        <h1 className="logo"> <img src={logo} alt="Sirius Lite" /></h1>
      </div>
      <div className="body">
        <div className="main-nav-bar">
          <ul className="main">
            <li><i className="fa fa-tachometer" aria-hidden="true"></i> <span>Dashboard</span></li>
            <li className="active"><i className="fa fa-bug" aria-hidden="true"></i> <span>Issue Tracker</span></li>
            <li><i className="fa fa-inbox" aria-hidden="true"></i>  <span>Messages</span></li>
            <li><i className="fa fa-folder" aria-hidden="true"></i>  <span>Docs</span></li>
          </ul>
          <ul className="settings">
            <li><i className="fa fa-info-circle" aria-hidden="true"></i>  <span>Help</span></li>
            <li><i className="fa fa-cog" aria-hidden="true"></i>  <span>Settings</span></li>
          </ul>
        </div>
        
          <Router>
            <div className="main-content">
              <Route exact path="/" component={Overview}/>
              <Route path="/projects/:id" component={Listview}/>
              <Route path="/projects/:id/:ticket" component={Detailview}/>
            </div>
          </Router>
        
      </div>
      <footer>
        <p>Made with <span>♥</span></p>
      </footer>
    </div>
    
    );
  }
}

export default App;
