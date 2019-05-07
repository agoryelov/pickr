$('#rightArrow').click(function(){
  index++;
  loadQuest(currentQuest);
});

$('#leftArrow').click(function() {
  index--;
  loadQuest(currentQuest);
});