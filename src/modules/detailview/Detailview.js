import React, { Component } from "react";
import Comments from "../../widgets/comments/Comments";
import Selectbox from "../../widgets/selectbox/Selectbox";
import "./Detailview.css";

class Detailview extends Component {
  constructor({ match }) {
    super();
    this.state = {};
    this.urlParms = match.params;
    //this.state.ticketDetails = {}
  }
  componentWillMount() {
    let url = `http://localhost:3030/api/v1/ticket?projectid=${
      this.urlParms.id
    }&ticketid=${this.urlParms.ticket}`;
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            ticketDetails: result
          });
        },
        error => {
          this.setState({
            ticketDetails: [],
            error
          });
        }
      );
  }
  addCommentHandler = comment => {
    if (comment.length) {
      comment = comment.replace(/\r?\n/g, "<br />");
      this.addNewComment(this.urlParms.ticket, comment);
    }
  };
  addNewComment(ticketid, comment) {
    /*this.props.store.dispatch({
      type: "ADD_COMMENT",
      payload: {
        ticketid,
        comment
      }
    });*/
    fetch(`http://localhost:3030/api/v1/addcomment?ticketid=${ticketid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment })
    }).then(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
  onEditClick() {
    console.log(this);
  }
  render() {
    if (!this.state.ticketDetails)
      return <div className="detailview-wrap">Loading</div>;
    const ticketDetails = this.state.ticketDetails;
    let createddate = getLocaleDate(ticketDetails.createddate);
    let modifiedddate = getLocaleDate(ticketDetails.modifiedddate);
    let watchers = [];
    ticketDetails.watchers.forEach((watcher, i) => {
      let label = watcher.login;
      let iconText = "RA";
      if (watcher.name) {
        label = watcher.name;
      }
      watchers.push(
        <li key={"icon-color-" + i}>
          <span className={"icon color-" + i}>{iconText}</span> {label}
        </li>
      );
    });
    return (
      <div className="detailview-wrap">
        <div className="detailview box-3">
          <div className="detailview-header">
            <span className="icon">{ticketDetails.project.icon}</span>
            <div className="title-wrap">
              <p className="breadcrumb">
                <a>{ticketDetails.project.title}/</a>
                {ticketDetails.ticketid}
              </p>
              <h2>{ticketDetails.title}</h2>
            </div>
            <span className="edit-btn" onClick={this.onEditClick.bind(this)}>
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
          </div>
          <div className="details">
            <ul className="list">
              <li>
                <label>Status:</label>{" "}
                <span className={"status " + ticketDetails.status}>
                  {ticketDetails.status}
                </span>
              </li>
              <li>
                <label>Ticket type:</label>{" "}
                <Selectbox label={ticketDetails.type} serviceType="type" />{" "}
              </li>
              <li>
                <label>Priority:</label>{" "}
                <Selectbox
                  label={ticketDetails.priority}
                  serviceType="priority"
                />{" "}
              </li>
            </ul>
            <ul className="list">
              <li>
                <label>Reported by:</label>{" "}
                <span>{ticketDetails.createdby.name}</span>{" "}
              </li>
              <li>
                <label>Assigned to:</label>{" "}
              </li>
            </ul>
            <ul className="list">
              <li>
                <label>Created date:</label> <span>{createddate}</span>
              </li>
              <li>
                <label>Last modified:</label> <span>{modifiedddate}</span>
              </li>
            </ul>
          </div>
          <div className="details">
            <h4>Description</h4>
            <p>{ticketDetails.description}</p>
          </div>
          <div className="details">
            <h4>Attachments</h4>
            <p>{ticketDetails.attachments}</p>
          </div>
          <div className="details">
            <h4>Comments</h4>
            <Comments
              comments={ticketDetails.comments}
              addCommentHandler={this.addCommentHandler}
            />
          </div>
        </div>
        <div className="watchers-wrap box-1">
          <h2>Watchers</h2>
          <ul>{watchers}</ul>
        </div>
      </div>
    );
  }
}

function getLocaleDate(data) {
  return new Date(data).toLocaleString();
}
export default Detailview;
