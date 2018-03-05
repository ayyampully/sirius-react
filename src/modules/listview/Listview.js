import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Heatmap from '../../widgets/heatmap/Heatmap';
import './Listview.css';

class Listview extends Component {
  constructor({match}){
    super();
    this.state = {}
    this.state.match = match;
    this.state.ticketList = null
  }
  componentWillMount() {
    let url = `http://localhost:3030/api/v1/getticketslist?projectid=${this.state.match.params.id}`
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            ticketList: result
          });
        },
        (error) => {
          this.setState({
            ticketList: null,
            error
          });
        }
      )
  }
  gotoDetails(ticketId, e){
    e.preventDefault();
    console.log(ticketId);
  }
  render() {
    if(!this.state.ticketList) return (<div className="list-wrapper">Loading</div>);
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
