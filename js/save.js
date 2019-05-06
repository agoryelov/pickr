$('#setSave').click(function(){
  var savedItems = $('.catGroupsclicked').length;

  var categories = [];
  for(let i = 0; i < 11; i++) {
    categories[i] = true;
  }
  console.log(categories);

  var prefCats = [];
  var clickedCats = document.getElementsByClassName('catGroupsclicked');
  for(let i = 0; i < savedItems; i++) {
    prefCats[i] = clickedCats[i].getElementsByTagName("h2")[0].innerHTML;
  }
  console.log(prefCats);
});

$('#catReset').click(function(){
    var unclickedCats = document.getElementsByClassName('catGroupsunclicked');
    for(let i = 0; i < unclickedCats.length; i++) {
        console.log(unclickedCats[i]);
        unclickedCats[i].setAttribute("class", "catGroupsclicked");
    }
});