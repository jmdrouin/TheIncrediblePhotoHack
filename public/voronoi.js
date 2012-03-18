var w = 500;
var h = 500;

var IMAGES_BEING_DISPLAYED = 21;
var MIN_DISTANCE = 100;
var TREND_BOOST = w / h * 99;

function createVertices () {
  var createdVertices = [];
  var mul = Math.round(IMAGES_BEING_DISPLAYED / 4);

  for(var j = 0; j < mul; j++) {
    wP = w/(mul+1);
    createdVertices.push([wP+ j*wP, getRandomInt(h/10,h/5)]);
    createdVertices.push([wP+ j*wP, h- getRandomInt(h/10,h/5)]);
  }

  for(var j = 0; j < mul; j++) {
    hP = h/(mul+1);
    createdVertices.push([getRandomInt(w/10,w/5), hP+ j*hP]);
    createdVertices.push([w- getRandomInt(w/10,w/5), hP+ j*hP]);
  }

  createdVertices.push([w/2, h/2]);

  return createdVertices
}

var vertices    = createVertices();
var newVertices = createVertices();

function getNewPoints() { 
  for (var i = 0; i < IMAGES_BEING_DISPLAYED; i++) {
    newVertices[i][0] = vertices[i][0] + getRandomInt(-55, 55);
    newVertices[i][1] = vertices[i][1] + getRandomInt(-55, 55);
  }
} 

getNewPoints();

// Returns a random number between min and max
function getRandomArbitrary (min, max) {
  return Math.random() * (max - min) + min;
}

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNearestVerticesByClick(click) {
  var distanceVertices = {};
  var distances = [];

  for (var i = 0; vertices.length > i; i++) {
    var diffX = click.clientX - vertices[i][0];
    var diffY = click.clientY - vertices[i][1];
    var distance = Math.sqrt(Math.pow(diffX,2)+Math.pow(diffY,2));
    distances.push(distance);
    distanceVertices[distance] = vertices[i];
  }

  distances.sort().slice(0,3)
  for (var i = 0; distances.length > i; i++) {
    if (distanceVertices[distances[i]][0] < click.clientX) { //(diffX>0)
      distanceVertices[distances[i]][0] = distanceVertices[distances[i]][0] + TREND_BOOST;
    } else {
	  distanceVertices[distances[i]][0] = distanceVertices[distances[i]][0] - TREND_BOOST;
    }

    if (distanceVertices[ distances[i] ][1] < click.clientY ) { //(diffY> 0)
      distanceVertices[distances[i]][1] = distanceVertices[distances[i]][1] - TREND_BOOST;
    } else {
	  distanceVertices[distances[i]][1] = distanceVertices[distances[i]][1] + TREND_BOOST;
    }
  }

  vertices = [];
  for(var distKey in distanceVertices) {
    vertices.push( distanceVertices[distKey] )
  }
}

var svg = d3.select("#chart")
    .append("svg")
      .attr("width", w)
      .attr("id", "root")
      .attr("height", h)
      .attr("class", "PiYG");

  var count = 1;
  $('.photo')
    .attr({height:h, width:w})
    .attr("clip-path", function(d,i) {return "url(#id"+ (count++) +")" })
    .prependTo('#root')
    .on('click',function(e) {
      getNearestVerticesByClick(e);
      //replacePhotos();
        });

  svg.selectAll("path")
      .data(d3.geom.voronoi(vertices))
    .enter().append("clipPath")
      .attr("id", function(d, i) { return i ? "id" + i : null; })
      .append("path")
        .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
        .attr("d", function(d) { return "M" + d.join("L") + "Z"; })

var t = 0.0;
function moving () {
  d3.timer(function() { 
    for (var i = 0; i < IMAGES_BEING_DISPLAYED; i++ ) {
      vertices[i][0] = d3.interpolateNumber(vertices[i][0], newVertices[i][0]) (t);
      vertices[i][1] = d3.interpolateNumber(vertices[i][1], newVertices[i][1]) (t);
    }
      
    t = t + 0.01;

    if (t >= 1) {console.log(t)}

    if (t >= 1.1) {
      t = 0.0;
      getNewPoints();
    }

    svg.selectAll("path")
      .data(d3.geom.voronoi(vertices)
      .map(function(d) { return "M" + d.join("L") + "Z"; }))
      .filter(function(d) { return this.getAttribute("d") != d; })
      .attr("d", function(d) { return d; });

    return false; 
  });
}
