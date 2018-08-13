import React, { Component } from "react";
import Chartbox from "../../widgets/chartbox/Chartbox";
import "./Overview.css";

class Overview extends Component {
  constructor() {
    super();
    this.state = {};

    this.features = {
      label: "Features",
      data: [
        { label: "Completed", count: 4 },
        { label: "In progress", count: 3 },
        { label: "Pending", count: 1 }
      ],
      total: 8
    };
    this.bugs = {
      label: "Bugs",
      data: [
        { label: "Completed", count: 2 },
        { label: "In progress", count: 1 },
        { label: "Pending", count: 1 }
      ],
      total: 4
    };
  }
  componentDidMount() {
    /* this.props.store.subscribe(() => {
      console.log("getState")
      let state = this.props.store.getState();
      if(state.notification.type === "NEW_COMMENT"){
        this.setState((prevState)=>{
          return {list: prevState.list.push(<li><span>AJ</span> <p><a>Ayyampully, Rohith</a> added <a>Agera</a>.</p> </li>)}
        })
      }
    });*/

    this.props.store.subscribe(() => {
      console.log(JSON.stringify(this.props.store.getState()));
      //socket.emit("addComment", Store.getState())
    });
  }
  componentDidUpdate() {
    console.log("componentDidUpdate()");
  }
  render() {
    this.state.list = [
      <li>
        <span>RA</span>{" "}
        <p>
          <a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a>
        </p>{" "}
      </li>,
      <li>
        <span>RA</span>{" "}
        <p>
          <a>Ayyampully, Rohith</a> added <a>Agera</a> to project blah blah.
        </p>{" "}
      </li>
    ];
    const { projectData, activeUser: member, notifications } = this.props.data;
    return (
      <div className="overview">
        <div className="row">
          <div className="box-2">
            <h1>
              {projectData.title}
              <span>
                <img src={projectData.flagurl} />
              </span>
            </h1>
            <p>{projectData.description}</p>
          </div>
          <div className="box-4 notifications">
            <ul>
              {notifications.map(n => (
                <li>
                  <span>RA</span>
                  <p>
                    <a>{n.name}</a> {n.message}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="box-4 members">
            <h4>Members</h4>
            <ul>
              <li>
                <span className={member.className}>{member.icon}</span>
                <div className="desc">
                  <p>
                    {member.name.last}, {member.name.first}
                  </p>
                  <span>{member.role}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="box-2 sprint-review">
            <h4>Sprint review</h4>
          </div>
          <Chartbox
            projectData={this.features}
            projectId={projectData.projectId}
          />
          <Chartbox projectData={this.bugs} projectId={projectData.projectId} />
        </div>
      </div>
    );
  }
}

export default Overview;
