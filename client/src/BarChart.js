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

    data = [
      [3,4,3,6,7,2],
      [1,4,2,6,1,2],
      [2,9,4,2,8,5],
    ]

    var keys  = ['energy', 'forge', 'performance']
    var colorScale = d3.scaleOrdinal().domain(keys).range(["#fcd88a", "#cf7c1c", "#93c464"])
    var yScale = d3.scaleLinear().domain([0,20]).range([480,20])
    var xScale = d3.scaleLinear().domain([0,6]).range([20,480])

    var yAxis = d3.axisLeft().scale(yScale)
        .tickSize(-500)
    d3.select("svg").append("g")
        .attr("class", "yAxis")
        .call(yAxis)
        .attr("transform",`translate(${20}, 0)`)

    var xAxis = d3.axisBottom().scale(xScale)
        .tickSize(-500)

    d3.select("svg").append("g")
        .attr("class", "xAxis")
        .call(xAxis)
        .attr("transform",`translate(0, ${480})`)

    d3.select("g.xAxis").selectAll("g.tick").selectAll("text")
    d3.select("g.xAxis").selectAll("g.tick").selectAll("line")

    var stackLayout = d3.stack()
        .keys(keys)

    //this.svg.selectAll("svg > *").remove()
    //console.log(stackLayout(data))
    this.svg.selectAll("g.bar")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar")
      .each(function(d){
        console.log(d)
        d3.select(this).selectAll("rect")
          .data(d)
          .enter()
          .append("rect")
          .attr("width", 40)
          .attr("height", function(p){
            console.log(yScale(p[1]))
            return(yScale(1))
          })
          .attr("x", (p, i) => xScale(i) + 25)
          .attr("y", p => yScale(p[1]))
          .style("fill", colorScale(d.key))
      })
  }

  render(){
    this.drawChart();
    return <div id={"#" + this.props.id}></div>
  }
}

export default BarChart;
