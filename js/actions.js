var rotation_grab;
var rotation_release = 0;
var translation;
var centreX;
var centreY;
var clicked = false;

/** Function for liked. */

function liked() {

}

/** Swipe function for the landing page. Animates the card when user grabs it. */
jQuery.fn.swipe = function(degrees, pixels) {
	$(this).css({'-webkit-transform' : 'rotate('+ degrees + 'deg) translateX(' 
		+ pixels + 'px)',
				 'transform' : 'translateX(' 
		+ pixels + 'px) rotate(' + degrees + 'deg)',
		'transition' : '0.7s' 
	});
	return $(this);
};

/** Script for when the user grabs and moves the card. */
$('#cardAct').mousedown(function(event1) {
	$('#cardAct').fadeTo("fast",0.5);
	centreX = window.innerWidth / 2;
	centreY = window.innerHeight / 2;
	console.log(centreX + ", " + centreY);
	console.log(event1.pageX + ", " + event1.pageY);
	$('#cardAct').mousemove(function(event2){
		translation = event1.clientX - centreX;
		rotation_grab = Math.atan(Math.abs((event2.clientY - centreY))
			/ translation) * 180/Math.PI;
		//console.log(translation);
	});
	$('#cardAct').swipe(rotation_grab, translation);
});

$('#cardAct').mouseup(function() {
	$('#cardAct').fadeTo("fast",1);
	$('#cardAct').swipe(rotation_release, 0);
});

$('#cardAct').mouseleave(function() {
	$('#cardAct').fadeTo("slow",1);
	$('#cardAct').swipe(rotation_release, 0);
});