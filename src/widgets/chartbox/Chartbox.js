import React, { Component } from "react";
import { Link } from "react-router-dom";
import { YELLOW_THEME, BLUE_THEME } from "../../constants/color";
import "./Chartbox.css";

class Chartbox extends Component {
  constructor(props) {
    super(props);
    this.init();
  }
  init() {
    this.overflow = { overflow: "hidden" };
    const pdata = this.props.projectData;
    var theme = pdata.label === "Features" ? BLUE_THEME : YELLOW_THEME;
    this.drawPie(pdata, theme);
    this.projectUrl = "/projects/" + this.props.projectId;
  }
  drawPie(pdata, theme) {
    var cx = 100,
      cy = 100,
      r = 92,
      px = 192,
      py = 100,
      path = "",
      colors = theme, // from kuler
      graphData = pdata.data;

    var pathArray = [],
      percArray = [];

    for (let i = 0; i < graphData.length; i++) {
      var deg = 0,
        tempvar = graphData[i].count;

      percArray[i] = (graphData[i].count / pdata.total) * 100;
      if (percArray[i] === 100) {
        this.isFullCircle = colors[i];
      }
      for (let j = 0; j <= i; j++) {
        deg += percArray[j];
      }
      deg = deg * 3.6;
      var largeArc = percArray[i] > 50 ? 1 : 0,
        x = cx + r * Math.cos((deg * Math.PI) / 180),
        y = cy + r * Math.sin((deg * Math.PI) / 180);

      path =
        "M" +
        cx +
        "," +
        cy +
        " L" +
        px +
        "," +
        py +
        " A" +
        r +
        "," +
        r +
        ",0," +
        largeArc +
        ",1," +
        x +
        "," +
        y;
      pathArray.push({
        path: path,
        dataValue: tempvar,
        color: colors[i],
        cssClass: "svg-path-" + i
      });
      px = x;
      py = y;
    }
    this.svgpath = pathArray;

    removeScaledClass();
  }
  render() {
    let chart = [];
    let label = this.props.projectData.label;
    if (this.props.isFullCircle) {
      chart = (
        <circle
          cx="100"
          cy="100"
          r="92"
          fill={this.props.isFullCircle}
          stroke="#f9f9f9"
          strokeWidth="1"
        />
      );
    } else {
      this.svgpath.forEach((data, i) => {
        let key = data.cssClass + label + i;
        chart.push(
          <g className={data.cssClass} key={key}>
            <path
              d={data.path}
              className="tooltip svgpath"
              data-value={data.dataValue}
              fill={data.color}
              stroke="#f9f9f9"
              strokeWidth="1"
            />
          </g>
        );
      });
    }
    var listItems = [];
    this.props.projectData.data.forEach((data, i) => {
      let key = data.cssClass + label + i;
      listItems.push(
        <li data-class={data.cssClass} key={key} className="legends-item">
          <span>{data.count}</span>
          {data.label}
        </li>
      );
    });
    return (
      <div className="svg-wrap scaled">
        <h4>{this.props.projectData.label}</h4>
        <svg
          className="pie-chart"
          width="200"
          height="200"
          aria-label="A chart."
          style={this.overflow}
        >
          <g>{chart}</g>
          <g>
            {" "}
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="#f9f9f9"
              stroke="#f9f9f9"
              strokeWidth="1"
            />
          </g>
        </svg>
        <div className="total">
          <span>{this.props.projectData.total}</span>
          Total
        </div>
        <ul className="legends-chart">{listItems}</ul>
        <Link className="view-more" to={this.projectUrl}>
          View Details
        </Link>
      </div>
    );
  }
}
var debounce = function(fn, delay) {
  var timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.call(this);
    }, delay);
  };
};

var removeScaledClass = debounce(() => {
  var svgArray = document.querySelectorAll(".svg-wrap");
  [].forEach.call(svgArray, svg => {
    svg.classList.remove("scaled");
  });
  setupMouseOver();
}, 600);

var setupMouseOver = () => {
  var svg = document.querySelectorAll(".pie-chart path");
  [].forEach.call(svg, item => {
    item.addEventListener("mouseenter", function(e) {
      removePath();
      var el = item.cloneNode(true),
        arcpath = el.getAttribute("d").split(" L");

      arcpath = "M" + arcpath[1];
      el.setAttribute("d", arcpath);
      el.setAttribute("stroke", el.getAttribute("fill"));
      el.setAttribute("fill", "transparent");
      el.setAttribute("id", "hoverpath");
      el.setAttribute("stroke-width", "15px");
      el.style.strokeOpacity = 0.5;
      item.parentNode.appendChild(el);
    });
  });
};
function removePath() {
  var path = document.getElementById("hoverpath");
  if (path) path.parentNode.removeChild(path);
  return false;
}
export default Chartbox;
