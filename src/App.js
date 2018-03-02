import React, { Component } from 'react';
import Overview from './modules/overview/Overview';
import logo from './assets/images/sirius.png';
import './App.css';

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
        <div className="main-content"><Overview /></div>
      </div>
      <footer>
        <p>Made with <span>♥</span></p>
      </footer>
    </div>
    
    );
  }
}

export default App;
