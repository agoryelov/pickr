jQuery.fn.toggle = function(){
	var hideable = true;
	if(hideable) {
      $(this).hide();
	  hideable = false;
    } else {
        hideable = true;
        $(this).show();
    }
};