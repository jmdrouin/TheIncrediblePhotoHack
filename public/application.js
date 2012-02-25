$(function () {

  $('h1').click(function() {
    startLoadingPhotos();
  })
})
var round = 0;

function startLoadingPhotos () {
  loadPhotos();
}
function loadPhotos () {
  $.ajax({
    url: 'https://www.eyeem.com/api/v2/albums/' + $('#album_id').val() + '/photos?limit=100&detailed=1&client_id=vn8HBPeioY1c5fhKEWipZtBqOhxT1cg5',
    success: function (data) {
      $('#loading').hide();
      addPhotos(data);
      round += 1;
    },
    complete: function() {
      setTimeout(loadPhotos, 120000);
    },
    beforeSend: function() {
      $('#loading').show();
    }
  })
}
function addPhotos (data) {
  for (var i = 0; data.photos.items.length > i; i++){
    var photoRaw = data.photos.items[i];
    var photo = {};
    if (!localStorage.getItem(photo.id)) {
      photo.photoUrl = photoRaw.photoUrl;
      photo.id = photoRaw.id;
      photo.likes = photoRaw.totalLikes;
      photo.comments = photoRaw.totalComments;
      localStorage.setItem( photoRaw.id, JSON.stringify(photo) );
      $(document.createElement("img"))
        .attr({ src: photo.photoUrl, id: photoRaw.id })
        .prependTo('#photos')
    }
  }
}