import React, {Component} from 'react';
import * as d3 from 'd3';


class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const data = this.props.data;
    var w = this.props.width;
    var h = this.props.height;
    var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("margin-left", 100);

    svg.selectAll("rect").exit().remove()
    
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")
  }

  render(){

    console.log(this.props.data)
    return <div id={"#" + this.props.id}></div>
  }
}

export default BarChart;
