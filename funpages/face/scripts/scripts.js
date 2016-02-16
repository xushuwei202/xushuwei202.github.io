var renderer = PIXI.autoDetectRenderer(640, 1008, { transparent: true });
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var texture = PIXI.Texture.fromVideo('videos/v3.mp4');
var videoSprite = new PIXI.Sprite(texture);

videoSprite.width = renderer.width;
videoSprite.height = renderer.height;

stage.addChild(videoSprite);


var		glasses = new Image(),
		isStart = false,
		canvas = document.getElementsByTagName("canvas")[0],
		ctx = canvas.getContext("2d");
		glasses.src = "i/glasses.png";
var lastTime = (new Date()).getTime()

function html5glasses() {
	var elapsed_time = (new Date()).getTime();
	if(elapsed_time - lastTime < 50) {
		return;
	}

	lastTime = elapsed_time;

	var comp = ccv.detect_objects({ "canvas" : (ccv.pre(canvas)),
									"cascade" : cascade,
									"interval" : 5,
									"min_neighbors" : 1 });

	time_dump.innerHTML = "Process time : " + ((new Date()).getTime() - elapsed_time).toString() + "ms";

	// for (var i = 0; i < comp.length; i++) {
		if(comp.length > 0) {
			ctx.drawImage(glasses, comp[0].x, comp[0].y,comp[0].width, comp[0].height);
		}
	// }
}

animate();

function animate(){
    renderer.render(stage);
    requestAnimationFrame(animate);

    html5glasses();
}
