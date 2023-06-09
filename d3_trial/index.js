
 var result = d3.json("https://api.covidtracking.com/v1/us/daily.json");
// //^it parses using a parsing lib as csv file and returns it as a list of JS objects. corresponds to rows and values of the rows.

    console.log('result', result);
    result.then(function (data) {
    console.log('data', data);
 });

function drawChart(){
    //d3 code goes here
    var svg = d3.select(".barChart svg"),
//     margin = 200
//     width = svg.attr("width") - margin,
//     height = svg.attr("heigth") - margin,

// // set the dimensions and margins of the graph
    margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 10000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.date; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 13000])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("bar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.date); })
    .attr("y", function(d) { return y(d.death); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.death); })
    .attr("fill", "#69b3a2")


}

// Parse the Data
//d3.json("https://api.covidtracking.com/v1/us/daily.json", function(data) {

