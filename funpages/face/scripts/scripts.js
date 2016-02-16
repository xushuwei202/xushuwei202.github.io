var		video = document.querySelector('video'),
		time_dump = document.getElementById("elapsed_time"),
		glasses = new Image(),
		canvas = document.getElementById("output"),
		ctx = canvas.getContext("2d");
		glasses.src = "i/glasses.png";

function html5glasses() {
	var elapsed_time = (new Date()).getTime();

	ctx.drawImage(video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height);

	var comp = ccv.detect_objects({ "canvas" : (ccv.pre(canvas)),
									"cascade" : cascade,
									"interval" : 5,
									"min_neighbors" : 1 });

	time_dump.innerHTML = "Process time : " + ((new Date()).getTime() - elapsed_time).toString() + "ms";

	for (var i = 0; i < comp.length; i++) {
		ctx.drawImage(glasses, comp[i].x, comp[i].y,comp[i].width, comp[i].height);
	}
}


video.addEventListener('play', function() {
	vidInterval = setInterval(html5glasses,200); 
});

video.addEventListener('ended', function() {
	clearInterval(vidInterval);
	time_dump.innerHTML = "finished";
});

canvas.addEventListener('click', function() {
	video.play();
});
