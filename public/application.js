$(function () {

  $('h1').click(function() {
    loadPhotos();
    round += 1;
  })
})
var round = 0;

function loadPhotos () {
  $.ajax({
    url: 'https://www.eyeem.com/api/v2/albums/125363/photos?limit=20&offset=' + round*20 +'&client_id=vn8HBPeioY1c5fhKEWipZtBqOhxT1cg5',
    success: function (data) {
      addPhotos(data);
    }
  })
}
function addPhotos (data) {
  for (var i = 0; data.photos.items.length > i; i++){
    $(document.createElement("img"))
      .attr({ src: data.photos.items[i].photoUrl })
      .appendTo('#photos')
  }
}