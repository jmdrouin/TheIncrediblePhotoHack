var w = 960, h = 500;
var IMAGES_BEING_DISPLAYED = 20;
var MIN_DISTANCE = 100;

//var vertices = d3.range(30).map(function(d) {
//  return [Math.random() * w, Math.random() * h];
//});

var vertices = [];
for(var i = 0; i < IMAGES_BEING_DISPLAYED; i++) {
	new_point = [Math.random() * w, Math.random() * h];
	var min_dist = 1000;
	for(var i in vertices) {
		var distance = Math.sqrt((new_point[0] - vertices[i][0]) * (new_point[0] - vertices[i][0]) + (new_point[1] - vertices[i][1]) * (new_point[1] - vertices[i][1]));
		if(!min_dist || distance < min_dist) min_dist = distance;
	}
	if(!min_dist || min_dist > MIN_DISTANCE) vertices.push(new_point);
}

var svg = d3.select("#chart")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "PiYG")
    .on("mousemove", update);

svg.selectAll("path")
    .data(d3.geom.voronoi(vertices))
  .enter().append("path")
    .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
    .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

svg.selectAll("circle")
    .data(vertices.slice(1))
  .enter().append("circle")
    .attr("transform", function(d) { return "translate(" + d + ")"; })
    .attr("r", 2);

function update() {
  vertices[0] = d3.mouse(this);
  svg.selectAll("path")
      .data(d3.geom.voronoi(vertices)
      .map(function(d) { return "M" + d.join("L") + "Z"; }))
      .filter(function(d) { return this.getAttribute("d") != d; })
      .attr("d", function(d) { return d; });
}
