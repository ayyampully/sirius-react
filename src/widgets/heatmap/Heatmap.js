import React, { Component } from 'react';
import './Heatmap.css';

class Heatmap extends Component {
  constructor(props){
    super(props);
    this.init()
  }
  init(){
    let col = [], tickets = this.props.tickets, count = 0, newArray = [];
    
    for(let i = 1, len = tickets.length; i <= len; i++){
      var item = tickets[i-1];
      if(!item.assignedto) item.status = 'unassigned';
      col.push(item)
      if(i%8 === 0 || len === i){
        newArray.push(col);
        count++;
        col = []
      }
    }
    this.ticketsGrouped = newArray;
  }
  render() {
    let tickets = [];
    this.ticketsGrouped.forEach((group, i) => {
      let items = [];
      group.forEach((ticket, i) => {
        items.push(<span key={ticket.status+i} className={ticket.status}></span>);
      });
      tickets.push(<div key={"col-"+i} className="col">{items}</div>);
    });
    return (
      <div className="review-box">
        <div className="sprint-box">
          {tickets}
        </div>
        <div className="sprint-legends">
          <p className="status">On schedule</p>
          <ul className="legends">
            <li><span className="open"></span> Open ticket</li>
            <li><span className="completed"></span> Completed</li>
            <li><span className="progress"></span> In progress</li>
            <li><span className="unassigned"></span> Unassigned</li>
            <li><span className="behind"></span> Behind schedule</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Heatmap;
