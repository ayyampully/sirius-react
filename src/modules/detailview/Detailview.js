import React, { Component } from 'react';
import Chartbox from '../../widgets/chartbox/Chartbox';
import './Detailview.css';

class Detailview extends Component {
  constructor(){
    super();
    this.state = {
      projectData: {
        title: "Blaha-v1",
        projectId: 1,
        description: "This is the first project listed in sirius. Praesent nisl est, congue sollicitudin justo ac, aliquam bibendum arcu. Nulla vel magna et ex sollicitudin varius. Sed interdum fringilla lacus. Suspendisse in ante id nisi vehicula venenatis sed vitae elit. Aliquam tristique a leo ac fermentum. Praesent gravida sagittis mauris, id pellentesque sapien tincidunt vitae.",
        flagurl:""
      },
      member : {
        name: {
          first: "Rohith",
          last: "Ayyampully"
        },
        icon:"RA",
        className: "icon color-1",
        role: 'UI Developer'
      }
    }

    this.features = {
      "label":"Bugs",
      "data":[
        {"label":"Completed","count":7},
        {"label":"In progress","count":3},
        {"label":"Pending","count":1}
      ],
      "total":8,
    }
  }
  render() {
    return (
      <div className="overview">
        <div className="row"> <div className="box-2">
          <h1>{this.state.projectData.title} <span><img src={this.state.projectData.flagurl} /></span></h1>
          <p>{this.state.projectData.description}</p>
        </div>
        <div className="box-4 notifications">
          <ul>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a></p> </li>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> added <a>Agera</a> to project blah blah.</p> </li>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a></p> </li>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a></p> </li>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a></p> </li>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a></p> </li>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a></p> </li>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a></p> </li>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a></p> </li>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a></p> </li>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a></p> </li>
            <li><span>RA</span> <p><a>Ayyampully, Rohith</a> updated <a>DEMIGOD-1</a></p> </li>
            </ul>
        </div>
        <div className="box-4 members">
            <h4>Members</h4>
            <ul>
              <li>
                <span className={this.state.member.className}>{this.state.member.icon}</span> 
                <div className="desc"><p>{this.state.member.name.last}, {this.state.member.name.first}</p> 
                <span>{this.state.member.role}</span></div>
              </li>
            </ul>
        </div>
        </div>
      <div className="row">
        <div className="box-2 sprint-review">
            <h4>Sprint review</h4>
            
        </div>
        <Chartbox projectData={this.features} projectId={this.state.projectData.projectId} />
      </div>
      </div>
    );
  }
}

export default Detailview;
