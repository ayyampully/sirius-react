import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Heatmap from '../../widgets/heatmap/Heatmap';
import './Listview.css';

class Listview extends Component {
  constructor({match}){
    super();
    this.state = {}
    this.state.match = match;
    this.state.ticketList = {
      "title" : "DEMIGOD",
      "owner" : {
        "uid" : 1,
        "login" : "rohith.ayyampully@gmail.com",
        "name" : "Rohith Ayyampully"
      },
      "modules" : [ 
        {
            "label" : "Admin Module",
            "count" : 1,
        }, 
        {
            "label" : "User Module",
            "count" : 3,
        }
      ],
      "projectid": 1,
      "tickets": [{
        "title" : "Add the thumbnail for users",
        "ticketid" : "DEMIGOD-01",
        "createddate" : new Date("2017-11-14T11:20:48.486Z"),
        "modifiedddate" : new Date("2018-02-14T09:24:06.369Z"),
        "createdby" : {
          "uid" : 1,
          "login" : "rohith.ayyampully@gmail.com",
          "name" : "Rohith Ayyampully"
        },
        "status" : "open",
        "type" : "feature",
        "priority" : "high",
      }]
    }
  }
  gotoDetails(ticketId, e){
    e.preventDefault();
    console.log(ticketId);
  }
  render() {
    let rows = [];
    this.state.ticketList.tickets.forEach(ticket => {
      let modifiedddate = ticket.modifiedddate.toLocaleString();
      let url = this.state.match.url + '/' + ticket.ticketid;
      rows.push(<tr key={ticket.ticketid}>
        <td className="checkbox"><input type="checkbox" name="select-item"/></td>
        <td><Link className="view-more" to={url}><span>{ticket.ticketid}</span>- {ticket.title}</Link>
          </td>
        <td>{ticket.createdby.name}</td>
        <td>{modifiedddate}</td>
        <td className="capitalize">{ticket.priority}</td>
        <td className="capitalize">{ticket.status}</td>
      </tr>);
    });
    return (
      <div className="list-wrapper">
        <aside className="nav-list">
            <h4 className="inner-title">{this.state.ticketList.title}</h4>
            <h6 className="inner-title-sub">Admin: {this.state.ticketList.owner.name}</h6>
            <button className="btn">Add new item</button>
            <ul className="modules">
                <li>User Module <span>3</span></li>
            </ul>
        </aside>
        <section className="list-view">
            <Heatmap tickets={this.state.ticketList.tickets} />
            <div className="table">
                <table cellSpacing="0" cellPadding="0">
                    <thead><tr>
                        <th className="checkbox"><input type="checkbox" name="select-all" id="selectAll"/></th>
                        <th>Title</th>
                        <th>Created by</th>
                        <th>Last modified</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr></thead>
                    <tbody>
                      {rows}
                    </tbody>
                </table>
            </div>
        </section>
        
      </div>
    );
  }
}

export default Listview;
