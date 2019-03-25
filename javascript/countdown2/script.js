window.onload = Show_Countdown;
var counter = 5;
var short_break_duration = 2;
var long_break_duration = 15;
var long_break_delay = 2;

function Show_Countdown() {
	var countDown_overlay =
		'position:absolute;' +
		'top:50%;' +
		'left:50%;' +
		'background-color:white;' +
		'z-index:1002;' +
		'overflow:auto;' +
		'width:400px;' +
		'text-align:center;' +
		'height:400px;' +
		'margin-left:-200px;' +
		'margin-top:-200px';

	$('body').append('<div id="overLay" style="' + countDown_overlay + '"><span id="time"></span></div>');

	var timer = setInterval(function() {
		document.getElementById('time').innerHTML = counter;
		counter = counter - 1;

		if (counter == short_break_duration) {
			alert(short_break_duration);
		}

		if (counter < 0) {
			clearInterval(timer);
			document.getElementById('overLay').style.display = 'none';
		}
	}, 1000);
}
