(function(){
  var statuses = ["BANKRUPT", "IN DEBT", "CLEARED NOTHING", "CLEARED LESS THAN $10", "CLEARED $10-25", "CLEARED $25-50", "CLEARED $50 OR MORE"]
  var nums = [3, 168, 53, 27, 15, 13, 13]

  var extraNum = 0
  for (var i = 2; i < nums.length; i++){
    extraNum += nums[i];
  }

  lineData = [
    {"x": 100, "y":100},
    {"x": 350, "y": 150},
    {"x": 350, "y": 175},
    {"x": 100, "y":400}
  ]

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

})()
