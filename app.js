(function(){
  var statuses = ["BANKRUPT", "IN DEBT", "CLEARED NOTHING", "CLEARED LESS THAN $10", "CLEARED $10-25", "CLEARED $25-50", "CLEARED $50 OR MORE"]
  var nums = [3, 168, 53, 27, 15, 13, 13]

  var extraNum = 0
  for (var i = 2; i < nums.length; i++){
    extraNum += nums[i];
  }

  var lineDataA = [
    {"x": 290, "y": 72},
    {"x": 323, "y": 76},
    {"x": 324, "y": 145},
    {"x": 330, "y": 151}
  ];
  var lineDataB = [
    {"x": 330, "y": 151},
    {"x": 324, "y": 157},
    {"x": 323, "y": 226},
    {"x": 290, "y": 230}
  ];

  nums.push(extraNum)

  var xscale = d3.scale.linear()
      .domain([0, d3.max(nums)])
      .range([0, 500])

  var yscale = d3.scale.linear()
      .domain([0, statuses.length])
      .range([25, 250]);

  var canvas = d3.select('.chart')
			.append('svg')
			.attr({'width':750,'height':300});

  var yAxis = d3.svg.axis();
    yAxis
      .orient("left")
      .scale(yscale)
      .tickSize(0)
      .tickFormat(function(d, i){ return statuses[i] })
      .tickValues(d3.range(8))

  var y_xis = canvas.append('g')
    .attr("transform", "translate(150,0)")
    .attr("id", "yaxis")
    .call(yAxis)

  var chart = canvas.append('g')
    .attr("transform", "translate(150,0)")
    .attr("id","bars")
    .selectAll("rect")
    .data(nums)
    .enter()
    .append("rect")
    .attr("height",25)
    .attr("x", function(d, i){
      if (i==7){ console.log(i); return 180 }
      else { return 10 }
    })
    .attr("y", function(d,i){
      if (i==7){
        return 140;
      } else {
        return yscale(i)-12.5;
      }
    })
    .style('fill',function(d, i){
        if (statuses[i] == "BANKRUPT" || statuses[i] == "IN DEBT") {
          return "black";
        } else {
          return "#F55A63";
        }
      })
    .attr('width',function(d){ return 0; });


  var transit = d3.select("svg").selectAll("rect")
    .data(nums)
    .transition()
    .duration(500)
    .attr("width", function(d){ return xscale(d); })

  var transittext = d3.select("#bars")
    .selectAll("text")
    .data(nums)
    .enter()
    .append("text")
    .attr("x", function(d, i){
      if (i==7){
        return 350;
      } else {
        return xscale(d)/2 + 6;
      }
    })
    .attr('y', function(d,i){
      if (i==7){
        return 157;
      } else {
        return yscale(i) + 3;
      }
    })
    .text(function(d){ return d; })
    .style("fill", function(d, i){
      if (statuses[i] == "BANKRUPT" || statuses[i] == "IN DEBT") {
        return "white";
      } else {
        return "black";
      }
    });

  var lineFunction = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .interpolate("cardinal");

  var lineGraphA = d3.select("svg").append("path")
    .attr("d", lineFunction(lineDataA))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("stroke-cap", "round")
    .attr("fill", "none");

  var lineGraphB = d3.select("svg").append("path")
    .attr("d", lineFunction(lineDataB))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("stroke-cap", "round")
    .attr("fill", "none");

})()
