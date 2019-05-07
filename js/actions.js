var rotation_grab;
var rotation_release = 0;
var originX = 0;
var originY = 0;
var translationX;
var translationY;
var currX;
var currY;
var centreX;
var centreY;
var dropped = true;
var maxRotation = 20;

/** Swipe function for the landing page. Animates the card when user grabs it. */
jQuery.fn.swipe = function(degrees, Xpixels, Ypixels) {
	$(this).css({'-webkit-transform' : 'rotate('+ degrees + 'deg) translateX(' 
		+ Xpixels + 'px)',
				 'transform' : 'translateX(' 
		+ Xpixels + 'px) translateY(' + Ypixels + 'px) rotate(' + degrees + 'deg)',
		'transition' : '0.1s' 
	});
	return $(this);
};

var mouseSwipe = function(event2){
	event2.preventDefault();
	translationX = event2.clientX - centreX;
	console.log(translationX);
	currX += translationX;
	translationY = event2.clientY - centreY;
	console.log(translationY);
	currY += translationY;
	rotation_grab = Math.atan(Math.abs(translationY)
		/ translationX) * 180/Math.PI;
	//console.log(translation);
	if(rotation_grab > 20) {
		rotation_grab = maxRotation;
	} else if (rotation_grab < -20) {
		rotation_grab = -1 * maxRotation;
	}
	//console.log(currX +', ' + currY);
    $('#cardAct').swipe(rotation_grab, translationX, translationY);
};

/** Script for when the user grabs and moves the card. */
$('#cardAct').mousedown(function(event1) {
	currX = 0;
	currY = 0;
	dropped = false;
	$('#cardAct').fadeTo("fast",0.5);
	centreX = window.innerWidth / 2;
	centreY = window.innerHeight / 2;
	//console.log(centreX + ", " + centreY);
	//console.log(event1.pageX + ", " + event1.pageY);
	if(!dropped) {
		$('#cardAct').bind('mousemove', mouseSwipe);
	}
});

$('#cardAct').mouseup(function() {
	dropped = true;
	$('#cardAct').unbind('mousemove', mouseSwipe);
	$('#cardAct').fadeTo("fast",1);
	$('#cardAct').swipe(rotation_release, originX, originY);
});

$('#cardAct').mouseleave(function() {
	dropped = true;
	$('#cardAct').unbind('mousemove', mouseSwipe);
	$('#cardAct').fadeTo("slow",1);
	$('#cardAct').swipe(rotation_release, originX, originY);
});