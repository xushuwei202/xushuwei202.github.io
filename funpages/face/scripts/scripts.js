var		video = document.querySelector('video'),
		time_dump = document.getElementById("elapsed_time"),
		glasses = new Image(),
		canvas = document.getElementById("output"),
		ctx = canvas.getContext("2d");
		glasses.src = "i/glasses.png";

function html5glasses() {
	console.log('1111');
	var elapsed_time = (new Date()).getTime();

	ctx.drawImage(video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height);

	// var comp = ccv.detect_objects({ "canvas" : (ccv.pre(canvas)),
	// 								"cascade" : cascade,
	// 								"interval" : 5,
	// 								"min_neighbors" : 1 });


	// for (var i = 0; i < comp.length; i++) {
	// 	ctx.drawImage(glasses, comp[i].x, comp[i].y,comp[i].width, comp[i].height);
	// }
}



video.addEventListener('play', function() {
	vidInterval = setInterval(html5glasses,0); 
});

video.addEventListener('ended', function() {
	clearInterval(vidInterval);

});

canvas.addEventListener('click', function() {
	video.play();
});
