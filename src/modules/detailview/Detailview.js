import React, { Component } from 'react';
import Chartbox from '../../widgets/chartbox/Chartbox';
import './Detailview.css';

class Detailview extends Component {
  constructor({match}){
    super();
    this.state = {};
    this.urlParms = match.params;
    //this.state.ticketDetails = {}
  }
  componentWillMount() {
    let url = `http://localhost:3030/api/v1/ticket?projectid=${this.urlParms.id}&ticketid=${this.urlParms.ticket}`
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            ticketDetails: result
          });
        },
        (error) => {
          this.setState({
            ticketDetails: [],
            error
          });
        }
      )
  }
  render() {
    if(!this.state.ticketDetails) return (<div className="detailview-wrap">Loading</div>);
    let createddate = getLocaleDate(this.state.ticketDetails.createddate);
    let modifiedddate = getLocaleDate(this.state.ticketDetails.modifiedddate);
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

function getLocaleDate(data){
    return new Date(data).toLocaleString();
}
export default Detailview;
