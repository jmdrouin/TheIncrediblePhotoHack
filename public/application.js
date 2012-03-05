$(function() {
  $('#album_search').bindWithDelay('keyup',function() {
    var query = $(this).val().trim();
    if (query != '') {
      $.ajax({
        url: '/search/eyeem/albums',
        data: {q: query},
        success: function(data) {
          var list = $('#albums_list'),
            albums = data['albums']['items'],
            list_item;
          list.empty();
          for (var i = albums.length - 1; i >= 0; i--) {
            list_item = $(document.createElement("li"));
            $(document.createElement("a")).attr({ href: '/eyeem/' + albums[i].id }).text(albums[i].name).appendTo(list_item);
            list.append(list_item);          
          };
        }
      })
    }
  },1000,true)
})