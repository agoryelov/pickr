$('#setSave').click(function(){
  var savedItems = $('.catGroupsclicked').length;

  var categories = [];
  for(let i = 0; i < 11; i++) {
    categories[i] = true;
  }

  var prefCats = [];
  var clickedCats = document.getElementsByClassName('catGroupsclicked');
  for(let i = 0; i < savedItems; i++) {
    prefCats[i] = clickedCats[i].getElementsByTagName("h2")[0].innerHTML;
  }
});

$('#catReset').click(function(){
    var unclickedCats = document.getElementsByClassName('catGroupsunclicked');
    var count = 0;
    while(unclickedCats.length != 0) {
      unclickedCats[count].getAttribute("class");
      unclickedCats[count].setAttribute("class", "catGroupsclicked");
    }
});