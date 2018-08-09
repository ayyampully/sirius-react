import React, { Component } from "react";
import "./Selectbox.css";

class Selectbox extends Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      showListCss: "",
      selectedItem: this.props.label
    };
  }
  init() {
    switch (this.props.serviceType) {
      case "priority":
        this.autoClt = [
          { label: "Urgent", className: "fa fa-chevron-up urgent" },
          { label: "High", className: "fa fa-chevron-up" },
          { label: "Normal", className: "fa fa-minus" },
          { label: "Low", className: "fa fa-chevron-down" }
        ];
        break;

      case "type":
        this.autoClt = [
          { label: "Feature", className: "fa fa-code-fork" },
          { label: "Bug", className: "fa fa-flag" },
          { label: "Story", className: "fa fa-cube" }
        ];
        break;
    }
  }

  showAutoComplete(e) {
    this.setState({
      showListCss: "show"
    });
    let parentNode = e.target.parentNode;
    this.checkClickedTarget(parentNode);
  }

  checkClickedTarget(parentNode) {
    let checkFunc = e => {
      if (!parentNode.contains(e.target)) {
        document.removeEventListener("click", checkFunc);
        this.setState({
          showListCss: ""
        });
      }
    };
    document.addEventListener("click", checkFunc);
  }
  setLabel(label) {
    this.setState({
      selectedItem: label
    });
  }
  render() {
    let items = [];
    this.autoClt.forEach((item, i) => {
      items.push(
        <li key={item.label + i} onClick={this.setLabel.bind(this, item.label)}>
          {item.label} <i className={item.className} aria-hidden="true" />
        </li>
      );
    });
    return (
      <div
        onClick={this.showAutoComplete.bind(this)}
        className="autocomplete-wrap"
      >
        <div>
          <span className="capitalize">{this.state.selectedItem}</span>
          <i className="fa fa-chevron-down drop-arrow" aria-hidden="true" />
        </div>
        <div className={"autocomplete " + this.state.showListCss}>
          <div>
            <ul>{items}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Selectbox;
