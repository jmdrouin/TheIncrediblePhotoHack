$(function () {
    startLoadingPhotos();
})
var round = 0;
var photos = {};
var photo_keys = [];

function startLoadingPhotos () {
  loadPhotos();
}

function replacePhotos () {
  $('.photo').attr("xlink:href", function(i,d) {
    var url = photos[photo_keys[i]].photoUrl;
    //var pk = photo_keys.shift();
    //photo_keys.push(pk);
    return url
  });
  d3.select("#chart").selectAll("path")
  .attr("photo_id", function(d,i) {
    return photo_keys[i]
  })
  .attr("trend", function(d,i) {
    return photos[photo_keys[i]].trend
  });
  //setTimeout(replacePhotos, 3000);
}
function loadPhotos () {
  $.ajax({
    url: '/photos/eyeem/' + $('#album_id').val(),
    success: function (data) {
      $('#loading').hide();
      addPhotos(data);
      round += 1;
      orderPhotos();
      replacePhotos();
      moving();

    },
    /* complete: function() {
      setTimeout(replacePhotos, 60000);
    },*/
    beforeSend: function() {
      $('#loading').show();
    }
  })
}

function orderPhotos() {
  photo_keys = [];
  for (var k in photos)photo_keys.push(k);
  photo_keys.sort(function(a,b){return photos[a].likes - photos[b].likes}).reverse();
  localStorage.setItem('photos_sorted', JSON.stringify(photo_keys));
}

function addPhotos(data) {
  for (var i = 0; data.photos.items.length > i; i++){
    var photoRaw = data.photos.items[i];
    var photo = {};
    photo.photoUrl = photoRaw.photoUrl;
    photo.id = photoRaw.id;
    photo.likes = photoRaw.totalLikes;
    photo.comments = photoRaw.totalComments;
    if (photos[photoRaw.id]) {
      var oldPhoto = photos[photoRaw.id];
      photo.trend = photo.likes + photo.comments - oldPhoto.likes + oldPhoto.comments
    }
    photos[photoRaw.id] = photo;
    localStorage.setItem( photoRaw.id, JSON.stringify(photo));
  }
}