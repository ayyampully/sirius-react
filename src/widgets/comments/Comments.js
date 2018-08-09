import React, { Component } from "react";
import "./Comments.css";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.addCommentHandler = this.props.addCommentHandler;
  }
  render() {
    let comments = [];
    this.props.comments.forEach((comment, i) => {
      const commentDate = formatCommentTime(comment.createddate);
      comments.push(
        <div key={comment.createddate + i} className="comment">
          {" "}
          <span className="comment-icon">RA</span>
          <div className="comment-body">
            <label className="user">
              <span>{comment.createdby.name}</span> wrote:
            </label>
            <span className="time">{commentDate}</span>
            <p>{comment.message}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="comments-wrap">
        <div className="comments-list">{comments}</div>

        <div className="comments-add-form">
          <textarea placeholder="Type here..." className="text" id="comments" />
          <button onClick={this.addCommentHandler} className="btn">
            Send
          </button>
        </div>
      </div>
    );
  }
}
function formatCommentTime(date) {
  const dateNow = new Date().getTime();
  const commentDate = new Date(date).getTime();
  const diff = (dateNow - commentDate) / 1000; // to seconds
  const diffdays = Math.round(diff / (60 * 60 * 24));
  if (diff < 30) {
    return "Few seconds ago";
  } else if (diff < 180) {
    // 3 minutes 3*60
    return "Few minutes ago";
  } else if (diff < 3600) {
    // 1 hour 60*60
    const min = Math.ceil(diff / 60);
    return min + " minutes ago";
  } else if (diffdays == 0) {
    // 24 hour 24*60*60
    const min = Math.ceil(diff / (60 * 60));
    return min + " hours ago";
  } else if (diffdays < 15) {
    return diffdays + " days ago";
  } else {
    const tempDate = new Date(date);
    const dateString =
      tempDate.getMonth() +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();
    return dateString;
  }
}
export default Comments;
