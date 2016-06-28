(function(){
  var button = document.querySelector("button")
  button.onclick = function(){
    var newGraph = document.querySelector(".new")
    var originalGraph = document.querySelector(".original")
    if (newGraph.style.display !== "none") {
      newGraph.style.display = "none";
      originalGraph.style.display = "block";
      document.querySelector(".farm-tenant").style.backgroundColor = "#EEECE8";
    } else {
      newGraph.style.display = "block";
      originalGraph.style.display = "none";
      document.querySelector(".farm-tenant").style.backgroundColor = "#E0D3C7";
    }
  }

  var ft = {}

  ft.statuses = ["BANKRUPT", "IN DEBT", "CLEARED NOTHING", "CLEARED LESS THAN $10", "CLEARED $10-25", "CLEARED $25-50", "CLEARED $50 OR MORE"]
  ft.nums = [3, 168, 53, 27, 15, 13, 13]

  ft.extraNum = 0
  for (var i = 2; i < ft.nums.length; i++){
    ft.extraNum += ft.nums[i];
  }

  ft.lineDataA = [
    {"x": 290, "y": 72},
    {"x": 323, "y": 76},
    {"x": 324, "y": 145},
    {"x": 330, "y": 151}
  ];
  ft.lineDataB = [
    {"x": 330, "y": 151},
    {"x": 324, "y": 157},
    {"x": 323, "y": 226},
    {"x": 290, "y": 230}
  ];

  ft.nums.push(ft.extraNum)

  ft.xscale = d3.scale.linear()
      .domain([0, d3.max(ft.nums)])
      .range([0, 500])

  ft.yscale = d3.scale.linear()
      .domain([0, ft.statuses.length])
      .range([25, 250]);

  var canvas = d3.select('.ftchart')
			.append('svg')
			.attr({'width':750,'height':300});

  var yAxis = d3.svg.axis();
    yAxis
      .orient("left")
      .scale(ft.yscale)
      .tickSize(0)
      .tickFormat(function(d, i){ return ft.statuses[i] })
      .tickValues(d3.range(8))

  var y_xis = canvas.append('g')
    .attr("transform", "translate(150,0)")
    .attr("id", "yaxis")
    .call(yAxis)

  var ftchart = canvas.append('g')
    .attr("transform", "translate(150,0)")
    .attr("id","bars")
    .selectAll("rect")
    .data(ft.nums)
    .enter()
    .append("rect")
    .attr("height",25)
    .attr("x", function(d, i){
      if (i==7){ return 180 }
      else { return 10 }
    })
    .attr("y", function(d,i){
      if (i==7){
        return 140;
      } else {
        return ft.yscale(i)-12.5;
      }
    })
    .style('fill',function(d, i){
        if (ft.statuses[i] == "BANKRUPT" || ft.statuses[i] == "IN DEBT") {
          return "black";
        } else {
          return "#F55A63";
        }
      })
    .attr('width',function(d){ return 0; });


  var transit = d3.select("svg").selectAll("rect")
    .data(ft.nums)
    .transition()
    .duration(500)
    .attr("width", function(d){ return ft.xscale(d); })

  var transittext = d3.select("#bars")
    .selectAll("text")
    .data(ft.nums)
    .enter()
    .append("text")
    .attr("x", function(d, i){
      if (i==7){
        return 350;
      } else {
        return ft.xscale(d)/2 + 6;
      }
    })
    .attr('y', function(d,i){
      if (i==7){
        return 157;
      } else {
        return ft.yscale(i) + 3;
      }
    })
    .text(function(d){ return d; })
    .style("fill", function(d, i){
      if (ft.statuses[i] == "BANKRUPT" || ft.statuses[i] == "IN DEBT") {
        return "white";
      } else {
        return "black";
      }
    });

  ft.lineFunction = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .interpolate("cardinal");

  var lineGraphA = d3.select("svg").append("path")
    .attr("d", ft.lineFunction(ft.lineDataA))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("stroke-cap", "round")
    .attr("fill", "none");

  var lineGraphB = d3.select("svg").append("path")
    .attr("d", ft.lineFunction(ft.lineDataB))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("stroke-cap", "round")
    .attr("fill", "none");

})()
