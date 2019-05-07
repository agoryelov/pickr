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
var swipeMin = 250;
var maxRotation = 10;
var quickly = "0.1s";
var slowly = "0.7s";

/** Swipe function for the landing page. Animates the card when user grabs it. */
jQuery.fn.tinder = function(degrees, Xpixels, Ypixels, speed) {
	$(this).css({'-webkit-transform' : 'rotate('+ degrees + 'deg) translateX(' 
		+ Xpixels + 'px)',
				 'transform' : 'translateX(' 
		+ Xpixels + 'px) translateY(' + Ypixels + 'px) rotate(' + degrees + 'deg)',
		'transition' : speed
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

	if(rotation_grab > maxRotation) {
		rotation_grab = maxRotation;
	} else if (rotation_grab < -1 * maxRotation) {
		rotation_grab = -1 * maxRotation;
	}
	$('#cardAct').tinder(rotation_grab, translationX, translationY, quickly);
};

/** Script for when the user grabs and moves the card. */
$('#cardAct').mousedown(function(event1) {
	currX = 0;
	currY = 0;
	$('#cardAct').fadeTo("fast",0.5);
	centreX = event1.clientX;
	centreY = event1.clientY;
	$('#cardAct').bind('mousemove', mouseSwipe);
});

$('#cardAct').bind("tap", function(event1){
	currX = 0;
	currY = 0;
	$('#cardAct').fadeTo("fast",0.5);
	centreX = event1.clientX;
	centreY = event1.clientY;
	$('#cardAct').bind('swipe', mouseSwipe);
});

$('#cardAct').mouseup(function() {
	$('#cardAct').fadeTo("fast",1);
	$('#cardAct').tinder(rotation_release, originX, originY, slowly);
	if(translationX >= swipeMin) {
		index++;
		indexRedone();
		currentQuest = questArray[index];
		$('#cardAct').tinder(rotation_release, originX, originY, slowly);
		loadQuest(currentQuest);
    }
	else if(translationX <= -1 * swipeMin) {
		index--;
		indexRedone();
		currentQuest = questArray[index];
		$('#cardAct').tinder(rotation_release, originX, originY, slowly);
		loadQuest(currentQuest);
	}
	$('#cardAct').unbind('mousemove', mouseSwipe);
});

$('#cardAct').mouseleave(function() {
	dropped = true;
	$('#cardAct').fadeTo("fast",1);
	$('#cardAct').unbind('mousemove', mouseSwipe);
	$('#cardAct').tinder(rotation_release, originX, originY, slowly);
});