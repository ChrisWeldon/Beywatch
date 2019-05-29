import React, {Component} from 'react';
import * as d3 from 'd3';


class BarChart extends Component {
  constructor(props){
    super(props);
    this.w = this.props.width;
    this.h = this.props.height;
    this.svg = d3.select("body")
    .append("svg")
    .attr("width", this.w)
    .attr("height", this.h)
    .style("margin-left", 100);
  }
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    var data = this.props.data;
    this.w = this.props.width;
    this.h = this.props.height;

    this.svg.selectAll("svg > *").remove()

    this.svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => this.h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "blue")
  }

  render(){
    this.drawChart();
    console.log("render Data : ", this.props.data)
    return <div id={"#" + this.props.id}></div>
  }
}

export default BarChart;
