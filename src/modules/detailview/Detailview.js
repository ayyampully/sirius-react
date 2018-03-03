import React, { Component } from 'react';
import Chartbox from '../../widgets/chartbox/Chartbox';
import './Detailview.css';

class Detailview extends Component {
  constructor(){
    super();
    this.state = {};
    this.state.ticketDetails = {
      "title" : "Add the thumbnail for users",
      "ticketid" : "DEMIGOD-01",
      "createddate" : new Date("2016-11-14T11:20:48.486Z"),
      "modifiedddate" : new Date("2017-04-14T09:24:06.369Z"),
      "status" : "open",
      "type" : "feature",
      "priority" : "high",
      "description" : "This is the description of a demigod ticket. blah blah. Donec urna neque, mattis at lorem et, volutpat tempor neque. Nunc ut imperdiet urna, sodales dictum erat. Integer sollicitudin mattis tortor, tempor tempus velit consectetur in. Vestibulum blandit ipsum eget lacus ultricies scelerisque. Quisque facilisis dictum consequat. Sed aliquet gravida fringilla. Aenean nulla diam, rutrum a molestie at, laoreet quis nulla. Donec nibh elit, luctus ac quam porttitor, ultricies vestibulum felis. Aenean commodo, metus ut elementum bibendum, risus sem condimentum massa, quis fermentum arcu nisi sit amet dui. In quam ex, tempor ut arcu at, eleifend auctor neque. Fusce volutpat nibh hendrerit orci semper dictum sit amet eu turpis.",
      "comments" : [ 
          {
              "message" : "Someone going crazy",
              "createddate" : new Date("2016-11-14T11:20:48.486Z"),
              "createdby" : {
                  "uid" : 1,
                  "login" : "rohith.ayyampully@gmail.com",
                  "name" : "Rohith Ayyampully"
              }
          }, 
          {
              "message" : "Hellooo",
              "createddate" : new Date("2016-11-14T11:57:28.548Z"),
              "createdby" : {
                  "login" : "rohith.ayyampully@gmail.com",
                  "name" : "Ayyampully, Rohith",
                  "uid" : 1
              }
          }, 
          {
              "message" : "aas",
              "createddate" : new Date("2017-04-14T09:24:06.364Z"),
              "createdby" : {
                  "login" : "rohith.ayyampully@gmail.com",
                  "name" : "Ayyampully, Rohith",
                  "uid" : 1
              }
          }
      ],
      "tags" : [ 
          "Array"
      ],
      "subtickets" : [],
      "attachments" : [],
      "watchers" : [ 
          {
              "uid" : 1,
              "login" : "rohith.ayyampully@gmail.com",
              "icon" : "RA",
              "name" : {
                  "first" : "Rohith",
                  "last" : "Ayyampully"
              }
          }, 
          {
              "uid" : 3,
              "login" : "Koenigsegg.Agera@abc.com",
              "icon" : "KA",
              "name" : {
                  "first" : "Koenigsegg",
                  "last" : "Agera"
              }
          }
      ],
      "assignedto" : {
          "uid" : 1,
          "login" : "rohith.ayyampully@gmail.com",
          "name" : "Rohith Ayyampully"
      },
      "createdby" : {
          "uid" : 1,
          "login" : "rohith.ayyampully@gmail.com",
          "name" : "Rohith Ayyampully"
      },
      "project" : {
          "id" : 1,
          "title" : "DEMIGOD",
          "icon" : "D"
      },
    }
  }
  render() {
    let createddate = this.state.ticketDetails.createddate.toLocaleString();
    let modifiedddate = this.state.ticketDetails.modifiedddate.toLocaleString();
    return (
    <div className="detailview-wrap">
      <div className="detailview box-3">
        <div className="detailview-header">
          <span className="icon">{this.state.ticketDetails.project.icon}</span>
          <div className="title-wrap">
            <p className="breadcrumb"><a>{this.state.ticketDetails.project.title}/</a>{this.state.ticketDetails.ticketid}</p>
            <h2>{this.state.ticketDetails.title}</h2>
          </div>
          <span className="edit-btn" ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
        </div>
        <div className="details">
            <ul className="list">
              <li><label>Status:</label> <span className="status {this.state.ticketDetails.status}" >{this.state.ticketDetails.status}</span></li>
              <li><label>Ticket type:</label>  </li>
              <li><label>Priority:</label>  </li>
            </ul>
            <ul  className="list">
              <li><label>Reported by:</label> <span>{this.state.ticketDetails.createdby.name}</span> </li>
              <li><label>Assigned to:</label>  </li>
            </ul>
            <ul  className="list">
              <li><label>Created date:</label> <span>{createddate}</span></li>
              <li><label>Last modified:</label> <span>{modifiedddate}</span></li>
            </ul>
        </div>
        <div className="details">
          <h4>Description</h4>
          <p>{this.state.ticketDetails.description}</p>
        </div>
        <div className="details">
          <h4>Attachments</h4>
          <p>{this.state.ticketDetails.attachments}</p>
        </div>
        <div className="details">
          <h4>Comments</h4>
        </div>
      </div>
      <div className="watchers-wrap box-1">
        <h2>Watchers</h2>
        <ul>
          <li ><span className="icon color-0">RA</span> Ayyampully, Rohith </li>
        </ul>
      </div>
    </div>
    );
  }
}

export default Detailview;
