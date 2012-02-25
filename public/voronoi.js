var w = 1000,
    h = 500;

var vertices = d3.range(6).map(function(d) {
  return [Math.random() * w, Math.random() * h];
});

var svg = d3.select("#chart")
  .append("svg")
    .attr("width", w)
    .attr("id", "root")
    .attr("height", h)
    .attr("class", "PiYG")
    .on("mousemove", update);


svg.selectAll("path")
    .data(d3.geom.voronoi(vertices))
  .enter().append("clipPath")
    .attr("id", function(d, i) { return i ? "id" + i : null; })
    .append("path")
      .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
      .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

var count = 0;
$('.photo')
  .attr({height:500, width:1000})
  .attr("clip-path", function(d,i) {return "url(#id"+ (count++) +")" })
  .prependTo('#root');


function update() {
}
