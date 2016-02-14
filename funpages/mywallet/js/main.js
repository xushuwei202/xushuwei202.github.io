$(function() {
	$("body").on("touchmove", function(e) {
		e.preventDefault();
	});		

	//屏幕自适应
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
	LSystem.screen(LStage.FULL_SCREEN);

	//初始化游戏
	//var gameWidth = $(window).width();
	var gameWidth = 640;
	//var gameHeight = $(window).height();
	var gameHeight = window.innerHeight * gameWidth / window.innerWidth;
	//-----------------------判断横屏------------------------------------------------
	var initFlag = true;
	var landscape = false;
	//判断横屏
	function orien() {
		//alert(window.orientation);
		if (window.orientation == 90 || window.orientation == -90) {
			//log("这是横屏");
			if(initFlag) {
				initFlag = false;
				landscape = true;
			}
			$("#landscape").show();

		} else {
			if(initFlag) {
				initFlag = false;
			}
			if(landscape) {
				//window.location.reload();
				window.location.reload(true);
			} else {
				$("#landscape").hide();	
			}
			//log("这是竖屏");
		}
	};

	orien();
	$(window).on("orientationchange", orien);

	var ua = navigator.userAgent, wx = /MicroMessenger/i.test(ua), ios = /ip(?=od|ad|hone)/i.test(ua);


	/**层变量*/
	//显示进度条所用层
	var gameContainerLayer,lightStarsLayer,sceneId=1;

	/**数组变量*/
	//图片及js文件path数组
	var imgData0 = new Array();
	//读取完的图片数组
	var imglist0 = {};	
	imgData0.push({name: "screen_bg", path: "img/screen_bg.jpg"});	
	imgData0.push({name: "light_red", path: "img/light_red.png"});
	imgData0.push({name: "light_white", path: "img/light_white.png"});
	imgData0.push({name: "loading_logo", path: "img/loading_logo.png"});
	imgData0.push({name: "loading_txt", path: "img/loading_txt.png"});
	imgData0.push({name: "loading_txt_bg", path: "img/loading_txt_bg.png"});
	imgData0.push({name: "music_off", path: "img/music_off.png"});
	//imgData0.push({name: "music_on", path: "img/music_on.png"});
	imgData0.push({name: "arrow", path: "img/arrow.png"});
	imgData0.push({name: "next_loading", path: "img/next_loading.png"});
	
	//-----------------------------------------------------------------
	var imgData1 = new Array();
	//读取完的图片数组
	var imglist1 = {};	
	//imgData1.push({name: "screen_bg", path: "img/screen_bg.png"});
	for(var i0=0;i0<=101;i0++){
		imgData1.push({name: "baidu"+String(i0), path: "img/baidu"+String(i0)+".jpg"});
	}
	for(var i1=1;i1<=6;i1++){
		imgData1.push({name: "d0"+String(i1), path: "img/d0"+String(i1)+".png"});
	}
	for(var i1a=1;i1a<=5;i1a++){
		imgData1.push({name: "copy"+String(i1a), path: "img/copy"+String(i1a)+".png"});
	}
	for(var i1b=1;i1b<=10;i1b++){
		imgData1.push({name: "fabuhui"+String(i1b), path: "img/fabuhui"+String(i1b)+".png"});
	}
	//-----------------------------------------------------------------
	var imgData2 = new Array();
	//读取完的图片数组
	var imglist2 = {};
	for(var i2=102;i2<=237;i2++){
		imgData2.push({name: "baidu"+String(i2), path: "img/baidu"+String(i2)+".jpg"});
	}

	//-----------------------------------------------------------------
	var imgData3 = new Array();
	//读取完的图片数组
	var imglist3 = {};
	for(var i1=238;i1<=350;i1++){
		imgData3.push({name: "baidu"+String(i1), path: "img/baidu"+String(i1)+".jpg"});
	}

	//---------------------main------------------------------------------

	//设定游戏速度，屏幕大小，回调函数./
	LInit(1000/25, "main", gameWidth, gameHeight, main);

	//添加后可以定义Zepto swipe事件
	//LGlobal.touchHandler = function(){};
	
	function main() {
		//LGlobal.setDebug(true);
		LMouseEventContainer.set(LMouseEvent.MOUSE_UP, true);
		LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN, true);
		//var loadingLayer = new LoadingSample4();
		//addChild(loadingLayer);
		LLoadManage.load(
			imgData0,
			function(progress) {
				//$(".loadingNumber").text(progress);
				//loadingLayer.setProgress(progress);
			},
			function(result) {
				imglist0 = result;
				//removeChild(loadingLayer);
				//loadingLayer = null;
				gameInit();
			}
		);
	}	
    
	function gameInit(event) {
		var loading_txt_speed = 25;
		gameContainerLayer = new LSprite();
		addChild(gameContainerLayer);

		initStarsLayer();

		var bitmapdataGameBg = new LBitmapData(imglist0["screen_bg"]);
		var bitmapGameBg = new LBitmap(bitmapdataGameBg);
		gameContainerLayer.addChild(bitmapGameBg);
		bitmapGameBg.alpha = 0;
		LTweenLite.to(bitmapGameBg,0.3,{alpha:1.0});

		var loaderLayer = new LSprite();
		gameContainerLayer.addChild(loaderLayer);			

		var loading_txt_layer = new LSprite();
		var bitmapdataLoading_logo = new LBitmapData(imglist0["loading_txt"]);
		var loading_txt = new LBitmap(bitmapdataLoading_logo);
		loading_txt_layer.addChild(loading_txt);

		var bitmapdataLoading_txt_bg = new LBitmapData(imglist0["loading_txt_bg"]);
		var bitmapLoading_txt_bg = new LBitmap(bitmapdataLoading_txt_bg);
		bitmapLoading_txt_bg.x = -43;
		var loading_txt_bg = new LSprite();
		loading_txt_bg.addChild(bitmapLoading_txt_bg);
		loading_txt_layer.addChild(loading_txt_bg);
		loading_txt_bg.x = 108;
		loading_txt_bg.y = 30;

		var loadingNum = new LTextField();
		loading_txt_layer.addChild(loadingNum);
		loadingNum.x = 108;
		loadingNum.y = 50;
		loadingNum.size = 24;
		loadingNum.color="#ffffff";
		loadingNum.text = "0";
		loadingNum.width = 60;
		loadingNum.textAlign = "center";

		loading_txt_layer.x = 232;
		loading_txt_layer.y = 698;
		loaderLayer.addChild(loading_txt_layer);
		loading_txt_layer.alpha = 0;
		LTweenLite.to(loading_txt_layer,0.3,{alpha:1.0,delay:0.3});

		var container3d = new  LSprite();
		loaderLayer.addChild(container3d);
		container3d.x = 320;
		container3d.y = 400;
		//container3d.visible = false;
		container3d.scaleX = container3d.scaleY = 1.8;

		var bitmapdataLoading_logo = new LBitmapData(imglist0["loading_logo"]);
		var loading_logo = new LBitmap(bitmapdataLoading_logo);
		loaderLayer.addChild(loading_logo);
		loading_logo.alpha = 0;
		loading_logo.x = 298;
		loading_logo.y = 416;
		LTweenLite.to(loading_logo,0.5,{alpha:1.0,delay:0.2});

		var starsArr = new Array();
		var starsAlphaFlagArr = [0,0,0,0,0];
		var vectorStarArr = new Array();
		var vectorPersArr = new Array();
		var lineShapeArr = new Array();
		var vectorStarPositionArr = [[-1,59,80],[-88,1,30],[-15,-16,-70],[71,64,30],[37,-75,15]];
		var starNumber = 5;
		for(var i=0;i<starNumber;i++){
			var lightStarLayer = new  LSprite();
			var bitmapdataStar = new LBitmapData(imglist0["light_white"]);
			var bitmapStar = new LBitmap(bitmapdataStar);
			bitmapStar.x = -12;
			bitmapStar.y = -12;
			lightStarLayer.addChild(bitmapStar);
			container3d.addChild(lightStarLayer);
			//lightStarLayer.alpha = 0.0;
			starsArr.push(lightStarLayer);

			var vectorStar = new HVector(vectorStarPositionArr[i][0],vectorStarPositionArr[i][1],vectorStarPositionArr[i][2]);
			vectorStarArr.push(vectorStar);
			vectorPersArr.push({x:0,y:0});

			var mylineShape = new LSprite();
			container3d.addChild(mylineShape);
			mylineShape.alpha = 0.0;
			lineShapeArr.push(mylineShape);
		}

		var lightRedLayer = new  LSprite();
		var bitmapdataStar = new LBitmapData(imglist0["light_red"]);
		var bitmapStar = new LBitmap(bitmapdataStar);
		bitmapStar.x = -60;
		bitmapStar.y = -60;
		lightRedLayer.addChild(bitmapStar);
		container3d.addChild(lightRedLayer);

		lightRedLayer.alpha = 0;
		lightRedLayer.scaleX = lightRedLayer.scaleY = 0.6;
		var lightRedTween;
		LTweenLite.to(lightRedLayer,0.3,{alpha:1,delay:0.2,onComplete:function(){
			lightRedTween = LTweenLite.to(lightRedLayer,0.3,{scaleX:0.8,scaleY:0.8,loop:true}).to(lightRedLayer,0.3,{scaleX:0.6,scaleY:0.6});
		}});
		var lineShape = new LSprite();
		container3d.addChild(lineShape);
		lineShape.alpha = 0.4;
		container3d.addEventListener(LEvent.ENTER_FRAME,update);

		var step = 0,loaderStep=0;
		var loaderTimeinterval = window.setInterval(function(){
			step++;
			if(step>loaderStep) {
				step = loaderStep;
			}
			loadingNum.text = String(step);
		},loading_txt_speed);

		var loaerCount = 1;
		
		var loaded = false,loaded2 = false;

		var starsScaleArr = [0.2,0.2,0.2,0.2,0.2];
		
		function update(event) {
	        for(var i=0;i<starNumber;i++){
	        	//vectorStarArr[i].rotateY(-7);
	        	if (!loaded2) {
	        		vectorStarArr[i].rotateXYZ(rotate_x,rotate_y,1);
	        		//vectorStarArr[i].getAngleY=vectorStarArr[i].getAngleY+rotate_y;
	        		//container3d.rotate+=0.2;
	        	} 
	        	render(i,vectorStarArr[i],starsArr[i],starsScaleArr[i]);
	        	vectorPersArr[i] = getPersPostion(vectorStarArr[i]);
	        	//
	        	lineShapeArr[i].graphics.clear();
	        	lineShapeArr[i].graphics.drawLine(1, "white", [0, 0, vectorPersArr[i].x, vectorPersArr[i].y]);
	        }
	        lineShape.graphics.clear();
	        lineShape.graphics.drawLine(1, "white", [vectorPersArr[0].x, vectorPersArr[0].y, vectorPersArr[1].x, vectorPersArr[1].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[1].x, vectorPersArr[1].y, vectorPersArr[2].x, vectorPersArr[2].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[2].x, vectorPersArr[2].y, vectorPersArr[3].x, vectorPersArr[3].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[3].x, vectorPersArr[3].y, vectorPersArr[0].x, vectorPersArr[0].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[0].x, vectorPersArr[0].y, vectorPersArr[4].x, vectorPersArr[4].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[1].x, vectorPersArr[1].y, vectorPersArr[4].x, vectorPersArr[4].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[2].x, vectorPersArr[2].y, vectorPersArr[4].x, vectorPersArr[4].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[3].x, vectorPersArr[3].y, vectorPersArr[4].x, vectorPersArr[4].y]);

			
			if(step>=loaerCount*20 && !loaded) {
				if(!starsAlphaFlagArr[loaerCount-1]) {
					starsAlphaFlagArr[loaerCount-1] = 1;					
					loaerCount++;
					starsScaleArr[loaerCount-2] = 0.5;
					//log(loaerCount);
					if(loaerCount>5){
						loaded = true;
						clearInterval(loaderTimeinterval);
						endLoader();
					} else {
						LTweenLite.to(lineShapeArr[loaerCount-2],0.3,{alpha:1}).to(lineShapeArr[loaerCount-2],0.5,{alpha:0.4});
					}
				}				
			}
		}
		function render(id,v,sp,sc) {
			var scale = sc ? sc : 1;
			var pers = v.getPerspective();
			var screenPos = v.persProjectNew(pers);
			//var screenPos = v.persProjectNew(pers);
			var tx = screenPos.x;
			var ty = -screenPos.y;
			sp.x = tx;
			sp.y = ty;
			sp.scaleX = sp.scaleY= scale * pers;
	
			if(starsAlphaFlagArr[id]) {
				//sp.alpha = pers*0.68;
			}
		}
		function endLoader(){
			//log("end");
			LTweenLite.to(loading_logo,0.3,{alpha:0});
			LTweenLite.to(loading_txt_layer,0.3,{alpha:0});
			LTweenLite.to(lineShapeArr[loaerCount-2],0.3,{alpha:1}).to(lineShapeArr[loaerCount-2],0.5,{alpha:0.4,onComplete:function(){
				loaded2 = true;								
				for(var i=0;i<starNumber;i++){
				 	LTweenLite.to(vectorStarArr[i],0.7,{x:vectorStarPositionArr[i][0],y:vectorStarPositionArr[i][1],z:vectorStarPositionArr[i][2],ease:LEasing.Cubic.easeInOut});
				}
				setTimeout(function(){
					container3d.removeEventListener(LEvent.ENTER_FRAME,update);
					LTweenLite.remove(lightRedTween);
					gameContainerLayer.removeChild(loaderLayer);
					initPartA(1);
					//initFabuhui3D();
	    			//initShare3D();
				},710);
			}});
			
			initMusic();
		}
		

		//----------------------load 1------------------------------
		LLoadManage.load(
			imgData1,
			function(progress) {
				//log(progress);				
				loaderStep = Number(progress);
			},
			function(result) {
				imglist1 = result;
				//--------------
			}
		);

		//FPS 信息
		//addChild(new FPS());
	}
	var musicBtn;
	function initMusic(){
		
		musicBtn = new LSprite();
		addChild(musicBtn);
		musicBtn.x = 575;
		musicBtn.y = 21;
		
		//var bitmapdataMusic = new LBitmapData(imglist0["music_on"]);
		var bitmapMusic = new LSprite();
		var musicLineScaleArr = [[0.8,0.3],[0.1,0.5],[0.9,0.5],[0.2,0.7]];
		for(var i=0;i<4;i++) {
			var line1s = new LShape();
			line1s.graphics.drawLine(1, "white", [0,0,0,12]);
			line1s.y = -12;
			line1s.alpha = 0.6;
			var line1 = new LSprite();
			line1.addChild(line1s);
			line1.x = 18+i*4;
			line1.y = 29;
			bitmapMusic.addChild(line1);
			LTweenLite.to(line1,0.3,{scaleY:musicLineScaleArr[i][0],loop:true}).to(line1,0.3,{scaleY:musicLineScaleArr[i][1]});
		}
		var bitmapdataMusic2 = new LBitmapData(imglist0["music_off"]);
		var bitmapMusic2 = new LBitmap(bitmapdataMusic2);
		musicBtn.addChild(bitmapMusic);
		//bitmapMusic.visible = false;
		musicBtn.addChild(bitmapMusic2);
		//bitmapMusic2.visible = false;
	    
	    musicBtn.addEventListener(LMouseEvent.MOUSE_DOWN,musicBtnClick);
	    musicBtn.visible = false;

		var isMusicOn = true;
		var audio = new Audio('mic/bgmusic.mp3');
		audio.load();
		//audio.loop = true;
		audio.addEventListener("canplaythrough", function() {
			musicBtn.visible = true;
			audio.play();
		}, false);
		audio.addEventListener("ended", function() {
			//musicBtn.visible = true;
			audio.play();
		}, false);
		audio.addEventListener("error", function() {
			//musicBtn.visible = true;
			audio.play();
		}, false);
	    function musicBtnClick(event){
	    	if(isMusicOn){
				isMusicOn = false;
				audio.pause();
				bitmapMusic.visible = false;
				//bitmapMusic2.visible = true;
			}else {
				audio.play();
				isMusicOn=true;
				//bitmapMusic2.visible = false;
				bitmapMusic.visible = true;
			}
	    }
	}
	function getPersPostion(v){
		var pers = v.getPerspective();
		var screenPos = v.persProjectNew(pers);
		var tx = screenPos.x;
		var ty = -screenPos.y;
		var rusult = {x:tx,y:ty};
		return rusult;
	}
	var rotate_y = -3;
	var rotate_x = -3;
	if (window.DeviceOrientationEvent) {
		$(window).on('deviceorientation',function(e) {
			//txt.text = Number(e.alpha).toFixed(2)+".."+Number(e.beta).toFixed(2)+".."+Number(e.gamma).toFixed(2);
			//log(Number(e.gamma));
			//log(Number(e.beta));
			var ty = Number(e.gamma)/6;
			ty = Math.max(ty,-3);
			ty = Math.min(ty,3);
			var tx = (Number(e.beta)-45)/5;
			tx = Math.max(tx,-3);
			tx = Math.min(tx,3);
			rotate_y = ty;
			rotate_x = tx;
		});
	}
	
	var starScaleArr = [[1.2,1.8],[1.2,1.8],[1.2,1.8],[1.0,1.8],[1.25,1.8]];
	var stopFrameArr = [-1,44,101,161,237,313,350];
	var copyPositionArr = [[177,760],[300,765],[40,635],[188,126],[343,117]];
	var partStarsArr = new Array();
	var partStarsArrPosition = [[[316,200],[130,392],[171,576],[428,462],[561,310],[483,682]],
								[[150,449],[303,119],[236,277],[430,438],[563,386],[252,819]],
								[[397,294],[353,120],[493,372],[46,541],[493,649],[346,864]],
								[[328,347],[221,442],[135,661],[467,603],[561,716],[320,879]],
								[[270,428],[237,237],[113,646],[553,512],[162,895],[418,810]]];
								
	var partLayer,copyLayer,partLightRedLayer,redStarArrowLayer,nextLoadingLayer;
	function initStarsLayer(){
		lightStarsLayer = new LSprite();
		addChild(lightStarsLayer);
		lightStarsLayer.visible = false;

		for(var i=0;i<5;i++){
			var starLayer = new  LSprite();
			var bitmapdataStar = new LBitmapData(imglist0["light_white"]);
			var bitmapStar = new LBitmap(bitmapdataStar);
			bitmapStar.x = -12;
			bitmapStar.y = -12;
			starLayer.addChild(bitmapStar);
			lightStarsLayer.addChild(starLayer);
			partStarsArr.push(starLayer);			
		}
		var count=0;
		var starInterval = window.setInterval(function(){
			var starLayerTween = LTweenLite.to(partStarsArr[count],0.6,{scaleX:0.8,scaleY:0.8,loop:true}).to(partStarsArr[count],0.6,{scaleX:1,scaleY:1});	
			count++;
			if(count>4) {
				window.clearInterval(starInterval);
			}
		},300);

		partLightRedLayer = new  LSprite();
		var bitmapdataStar = new LBitmapData(imglist0["light_red"]);
		var bitmapStar = new LBitmap(bitmapdataStar);
		bitmapStar.x = -60;
		bitmapStar.y = -60;
		partLightRedLayer.addChild(bitmapStar);
		lightStarsLayer.addChild(partLightRedLayer);
		var lightRedTween = LTweenLite.to(partLightRedLayer,0.3,{scaleX:1.2,scaleY:1.2,loop:true}).to(partLightRedLayer,0.3,{scaleX:1.5,scaleY:1.5});		

		nextLoadingLayer = new  LSprite();
		var bitmapdataNextLoading = new LBitmapData(imglist0["next_loading"]);
		var bitmapNextLoading = new LBitmap(bitmapdataNextLoading);
		bitmapNextLoading.x = -13;
		bitmapNextLoading.y = -13;
		nextLoadingLayer.addChild(bitmapNextLoading);
		lightStarsLayer.addChild(nextLoadingLayer);
		nextLoadingLayer.addEventListener(LEvent.ENTER_FRAME,function(e){
			nextLoadingLayer.rotate+=10;
		});
		nextLoadingLayer.visible = false;

		partLightRedLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onRedLightTap);
		function onRedLightTap(e){
			if(sceneId==6) return false;
			if(_redLightTaped) return false;
			_redLightTaped = true;
			
			sceneId+=1;
			//log("sceneId..."+sceneId)
			redStarArrowLayer.visible = false;

			if(sceneId==2||sceneId==4){
				removePartLayer();
				initPartA(sceneId);
			}
			if(sceneId==3){
				nextLoadingLayer.visible = true;
				nextLoadingLayer.x = partStarsArrPosition[1][0][0];
				nextLoadingLayer.y = partStarsArrPosition[1][0][1];
				LLoadManage.load(
					imgData2,
					function(progress) {
						//log(progress);				
						//loaderStep = Number(progress);
					},
					function(result) {
						nextLoadingLayer.visible = false;
						imglist2 = result;
						removePartLayer();
						initPartA(sceneId);
					}
				);
			}
			if(sceneId==5){
				nextLoadingLayer.visible = true;
				nextLoadingLayer.x = partStarsArrPosition[3][0][0];
				nextLoadingLayer.y = partStarsArrPosition[3][0][1];
				LLoadManage.load(
					imgData3,
					function(progress) {
						//log(progress);				
						//loaderStep = Number(progress);
					},
					function(result) {
						nextLoadingLayer.visible = false;
						imglist3 = result;
						removePartLayer();
						initPartA(sceneId);
					}
				);
			}
			if(sceneId==6){
				removePartLayer();
				initFabuhui();
				//musicBtn.visible = false;
			}
		}
		function removePartLayer(){
			partLayer.removeChild(copyLayer);
			copyLayer = null;
			partLayer.removeChild(partScene);
			partScene = null;
			gameContainerLayer.removeChild(partLayer);
			partLayer = null;
			lightStarsLayer.visible = false;
			//_redLightTaped = false;
		}
		redStarArrowLayer = new  LSprite();
		var bitmapdataArrow = new LBitmapData(imglist0["arrow"]);
		var bitmapArrow = new LBitmap(bitmapdataArrow);
		bitmapArrow.x = -25;
		bitmapArrow.y = -25;
		redStarArrowLayer.addChild(bitmapArrow);
		redStarArrowLayer.scaleX=redStarArrowLayer.scaleY = 1.2;
		lightStarsLayer.addChild(redStarArrowLayer);		
		redStarArrowLayer.visible = false;
		var arrowTween = LTweenLite.to(bitmapArrow,0.3,{y:5,loop:true,ease:LEasing.Cubic.easeInOut}).to(bitmapArrow,0.3,{y:0,ease:LEasing.Cubic.easeInOut});
	}
	
	function setStars(id){
		lightStarsLayer.visible = true;
		for(var i=0;i<5;i++){
			partStarsArr[i].x = partStarsArrPosition[id][i+1][0];
			partStarsArr[i].y = partStarsArrPosition[id][i+1][1];
		}
		partLightRedLayer.x = partStarsArrPosition[id][0][0];
		partLightRedLayer.y = partStarsArrPosition[id][0][1];
		partLightRedLayer.scaleX = partLightRedLayer.scaleY = starScaleArr[id][0];
		//LTweenLite.to(partLightRedLayer,0.5,{scaleX:starScaleArr[id][1],scaleY:starScaleArr[id][1],loop:true});
		redStarArrowLayer.x = partStarsArrPosition[id][0][0];
		redStarArrowLayer.y = partStarsArrPosition[id][0][1]-55;
	}
	function hideStars(){
		//lightStarsLayer.visible = false;
	}
	var _redLightTaped = true;
	var partScene;
	function initPartA(id){
		var ilist;
		log("id....."+id);
		if(id==1||id==2){
			ilist = imglist1;
		} else if(id==3||id==4){
			ilist = imglist2;
		} else if(id==5||id==6){
			ilist = imglist3;
		}
		var datas = [];
	    var listChild = [];
	    for (var i = (stopFrameArr[id-1]+1); i <= stopFrameArr[id]; i++) {
	    	//log("baidu" + i);
	        datas.push(new LBitmapData(ilist["baidu" + i]));
	        listChild.push({dataIndex : i-(stopFrameArr[id-1]+1), x : 0, y : 0, width : 640, height : 1010, sx : 0, sy : 0});
	    }
	    
	    var partSceneBitmapdata = new LBitmapData(imglist1["d0"+id]);
		partScene = new LBitmap(partSceneBitmapdata); 
		partScene.alpha = 0.5;

	    var partAniLayer = new LAnimationTimeline(datas, [listChild]);
	    
	    partLayer = new LSprite();
	    partLayer.addChild(partAniLayer);
	    gameContainerLayer.addChild(partLayer);
	    
	    partAniLayer.addEventListener(LEvent.COMPLETE,function(e){
	    	partAniLayer.stop();
	    	partLayer.addChild(partScene);	    	
	    	LTweenLite.to(partScene,0.5,{alpha:0.8});
	    	setStars(id-1);	    	
	    	partLayer.removeChild(partAniLayer);
	    	partAniLayer = null;
	    });
	    
	    var copyTimerArr = [2100,2650,2850,3150,3200];
	    copyLayer = new LSprite();

	    var bitmapdataCopy1 = new LBitmapData(imglist1["copy"+String(id)]);
		var bitmapStar1 = new LBitmap(bitmapdataCopy1);
		bitmapStar1.alpha = 0;
		bitmapStar1.y = 30;
		var maskObj1 = new LSprite();
		maskObj1.y = 30;
    	maskObj1.graphics.drawRect(0, "#ffffff", [0, 0, 285, 30]);
   		bitmapStar1.mask = maskObj1;

		var bitmapdataCopy2 = new LBitmapData(imglist1["copy"+String(id)]);
		var bitmapStar2 = new LBitmap(bitmapdataCopy2);
		bitmapStar2.alpha = 0;
		bitmapStar2.y = 30;
		var maskObj2 = new LSprite();
		maskObj2.y = 30;
    	maskObj2.graphics.drawRect(0, "#ffffff", [0, 31, 285, 48]);
   		bitmapStar2.mask = maskObj2;
		
		var bitmapdataCopy3 = new LBitmapData(imglist1["copy"+String(id)]);
		var bitmapStar3 = new LBitmap(bitmapdataCopy3);
		bitmapStar3.alpha = 0;
		bitmapStar3.y = 30;
		var maskObj3 = new LSprite();
		maskObj3.y = 30;
    	maskObj3.graphics.drawRect(0, "#ffffff", [0, 84, 285, 31]);
   		bitmapStar3.mask = maskObj3;

		var bitmapdataCopy4 = new LBitmapData(imglist1["copy"+String(id)]);
		var bitmapStar4 = new LBitmap(bitmapdataCopy4);
		bitmapStar4.alpha = 0;
		bitmapStar4.y = 30;
		var maskObj4 = new LSprite();
		maskObj4.y = 30;
    	maskObj4.graphics.drawRect(0, "#ffffff", [0, 116, 285, 27]);
   		bitmapStar4.mask = maskObj4;

		copyLayer.addChild(bitmapStar1);
		copyLayer.addChild(bitmapStar2);
		copyLayer.addChild(bitmapStar3);
		copyLayer.addChild(bitmapStar4);

		partLayer.addChild(copyLayer);
		copyLayer.x = copyPositionArr[id-1][0];
		copyLayer.y = copyPositionArr[id-1][1];
		//copyLayer.alpha = 0;
		window.setTimeout(function(){
			LTweenLite.to(bitmapStar1,0.5,{alpha:1.0,y:0,ease:LEasing.Cubic.easeOut});
			LTweenLite.to(maskObj1,0.5,{y:0,ease:LEasing.Cubic.easeOut});
			LTweenLite.to(bitmapStar2,0.5,{alpha:1.0,y:0,ease:LEasing.Cubic.easeOut,delay:0.07});
			LTweenLite.to(maskObj2,0.5,{y:0,ease:LEasing.Cubic.easeOut,delay:0.07});
			LTweenLite.to(bitmapStar3,0.5,{alpha:1.0,y:0,ease:LEasing.Cubic.easeOut,delay:0.15});
			LTweenLite.to(maskObj3,0.5,{y:0,ease:LEasing.Cubic.easeOut,delay:0.15});
			LTweenLite.to(maskObj4,0.5,{y:0,ease:LEasing.Cubic.easeOut,delay:0.22});
			LTweenLite.to(bitmapStar4,0.5,{alpha:1.0,y:0,ease:LEasing.Cubic.easeOut,delay:0.22,onComplete:function(){
				_redLightTaped = false;
				redStarArrowLayer.visible = true;
				redStarArrowLayer.alpha = 0;
				LTweenLite.to(redStarArrowLayer,0.5,{alpha:1});
			}});

			LTweenLite.to(copyLayer,0.2,{alpha:0.6,delay:3,loop:true}).to(copyLayer,0.2,{alpha:1}).to(copyLayer,0.2,{alpha:0.6}).to(copyLayer,0.2,{alpha:1}).to(copyLayer,0.2,{alpha:0.6}).to(copyLayer,0.2,{alpha:1}).to(copyLayer,0.2,{alpha:0.6}).to(copyLayer,0.2,{alpha:1});	

		},copyTimerArr[id-1]);
		window.setTimeout(function(){
			
		},copyTimerArr[id-1]+200);
	}

	function initFabuhui(){
		log("fabuhui")
		var datas = [];
	    var listChild = [];
	    for (var i = (stopFrameArr[5]+1); i <= stopFrameArr[6]; i++) {
	    	//log("baidu" + i);
	        datas.push(new LBitmapData(imglist3["baidu" + i]));
	        listChild.push({dataIndex : i-(stopFrameArr[5]+1), x : 0, y : 0, width : 640, height : 1010, sx : 0, sy : 0});
	    }
	    var fabuhuiAniLayer = new LAnimationTimeline(datas, [listChild]);
	    gameContainerLayer.addChild(fabuhuiAniLayer);
	    
	    fabuhuiAniLayer.addEventListener(LEvent.COMPLETE,function(e){
	    	fabuhuiAniLayer.stop();
	    	gameContainerLayer.removeChild(fabuhuiAniLayer);
	    	initFabuhui3D();
	    	initShare3D();
	    });
	}
	var share3DLayer;
	function initFabuhui3D(){
		log("initFabuhui3D")
		var fabuhuiLayer = new LSprite();
		gameContainerLayer.addChild(fabuhuiLayer);
		
		/*
		//fabuhui3DLayer
		var fabuhui3DLayer = new LSprite();
		var fabuhui3DBitmapdata = new LBitmapData(imglist1["d06"]);
		var fabuhui3DBitmap = new LBitmap(fabuhui3DBitmapdata); 
		fabuhui3DBitmap.x = -240;
		fabuhui3DBitmap.y = -223;
		fabuhui3DLayer.addChild(fabuhui3DBitmap);
		fabuhuiLayer.addChild(fabuhui3DLayer);
		//fabuhui3DLayer.alpha = 0.5;
		//LTweenLite.to(fabuhui3DLayer,0.5,{alpha:0.8});
		fabuhui3DLayer.x = 320;
		fabuhui3DLayer.y = 301;
		fabuhui3DLayer.addEventListener(LEvent.ENTER_FRAME,updateBg);
		function updateBg(e){
			fabuhui3DLayer.rotate-=2;
		}
		var starNumber = 5;
		var starsArr = new Array();
		var starPositionArr = [[241,11],[12,299],[217,137],[471,245],[328,435]];
		for(var i=0;i<starNumber;i++){
			var lightStarLayer = new  LSprite();
			var bitmapdataStar = new LBitmapData(imglist0["light_white"]);
			var bitmapStar = new LBitmap(bitmapdataStar);
			bitmapStar.x = -12;
			bitmapStar.y = -12;
			lightStarLayer.addChild(bitmapStar);
			fabuhui3DLayer.addChild(lightStarLayer);
			lightStarLayer.x = starPositionArr[i][0]-240;
			lightStarLayer.y = starPositionArr[i][1]-223;
			starsArr.push(lightStarLayer);
		}
		var count=0;
		var starInterval = window.setInterval(function(){
			var starLayerTween = LTweenLite.to(starsArr[count],0.6,{scaleX:0.8,scaleY:0.8,loop:true}).to(starsArr[count],0.6,{scaleX:1,scaleY:1});	
			count++;
			if(count>4) {
				window.clearInterval(starInterval);
			}
		},300);
		*/
		var container3d = new  LSprite();
		fabuhuiLayer.addChild(container3d);
		container3d.x = 320;
		container3d.y = 190;
		container3d.scaleX = container3d.scaleY = 2.4;
		
		//--------------------------------fabuhui 3D begin------------------------------
		
		var starsArr = new Array();
		var vectorStarArr = new Array();
		var vectorPersArr = new Array();
		var vectorStarPositionArr = [[1,48,50],[-103,-85,25],[38,-142,20],[99,-56,5],[-8,-10,-40]];
		var starNumber = 5;
		for(var i=0;i<starNumber;i++){
			var lightStarLayer = new  LSprite();
			var bitmapdataStar = new LBitmapData(imglist0["light_white"]);
			var bitmapStar = new LBitmap(bitmapdataStar);
			bitmapStar.x = -12;
			bitmapStar.y = -12;
			lightStarLayer.addChild(bitmapStar);
			container3d.addChild(lightStarLayer);
			starsArr.push(lightStarLayer);

			var vectorStar = new HVector(vectorStarPositionArr[i][0],vectorStarPositionArr[i][1],vectorStarPositionArr[i][2]);
			vectorStarArr.push(vectorStar);
			vectorPersArr.push({x:0,y:0});
		}
		var count=0;
		var starInterval = window.setInterval(function(){
			//var starLayerTween = LTweenLite.to(starsArr[count],0.6,{alpha:0.5,loop:true}).to(starsArr[count],0.6,{alpha:1.0});	
			count++;
			if(count>4) {
				window.clearInterval(starInterval);
			}
		},300);

		var lineShape = new LSprite();
		container3d.addChild(lineShape);
		lineShape.alpha = 0.3;
		container3d.addEventListener(LEvent.ENTER_FRAME,update);
		//LTweenLite.to(container3d,1,{alpha:0.3});
		var vectorStarPositionArr2 = [[-1,59,80],[-88,1,30],[-15,-16,-70],[71,64,30],[37,-75,15]];
		for(var i2=0;i2<starNumber;i2++){
		 	LTweenLite.to(vectorStarArr[i2],0.5,{x:vectorStarPositionArr2[i2][0],y:vectorStarPositionArr2[i2][1],z:vectorStarPositionArr2[i2][2]});
		}
		LTweenLite.to(container3d,0.5,{y:300,onComplete:function(){
			rotateFlag = true;
		}})
		
		var rotateFlag = false;
		function update(event) {
	        for(var i=0;i<starNumber;i++){
	        	if(rotateFlag) {
	        		vectorStarArr[i].rotateXYZ(rotate_x/1.5,rotate_y/1.5,0.6);
	        	}
	        	renderSp(i,vectorStarArr[i],starsArr[i],0.4);
	        	vectorPersArr[i] = getPersPostion(vectorStarArr[i]);
	        }
	        lineShape.graphics.clear();
	        lineShape.graphics.drawLine(1, "white", [vectorPersArr[0].x, vectorPersArr[0].y, vectorPersArr[1].x, vectorPersArr[1].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[1].x, vectorPersArr[1].y, vectorPersArr[2].x, vectorPersArr[2].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[2].x, vectorPersArr[2].y, vectorPersArr[3].x, vectorPersArr[3].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[3].x, vectorPersArr[3].y, vectorPersArr[0].x, vectorPersArr[0].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[0].x, vectorPersArr[0].y, vectorPersArr[4].x, vectorPersArr[4].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[1].x, vectorPersArr[1].y, vectorPersArr[4].x, vectorPersArr[4].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[2].x, vectorPersArr[2].y, vectorPersArr[4].x, vectorPersArr[4].y]);
			lineShape.graphics.drawLine(1, "white", [vectorPersArr[3].x, vectorPersArr[3].y, vectorPersArr[4].x, vectorPersArr[4].y]);		
		}
		
		//----------------------fabuhui 3D end------------------------------------------------
		
		var redLightLayer = new LSprite();
		var redLightBitmapdata =  new LBitmapData(imglist0["light_red"]);
		var redLightBitmap =  new LBitmap(redLightBitmapdata);		
		redLightBitmap.x = -60;
		redLightBitmap.y = -60;
		redLightLayer.addChild(redLightBitmap);
		redLightLayer.x = 317;
		redLightLayer.y = 430;
		redLightLayer.scaleX = redLightLayer.scaleY = 0.55;		
		fabuhuiLayer.addChild(redLightLayer);
		setTimeout(function(){
			LTweenLite.to(redLightLayer,0.3,{scaleX:0.8,scaleY:0.8}).to(redLightLayer,0.3,{scaleX:1.2,scaleY:1.2,alpha:0});
			
			var leftBraceBitmapdata =  new LBitmapData(imglist1["fabuhui4"]);
			var leftBraceBitmap = new LBitmap(leftBraceBitmapdata); 
			fabuhuiLayer.addChild(leftBraceBitmap);
			leftBraceBitmap.x = 297;
			leftBraceBitmap.y = 409;
			leftBraceBitmap.alpha = 0;
			LTweenLite.to(leftBraceBitmap,0.3,{alpha:1,delay:0.4}).to(leftBraceBitmap,0.4,{x:185,ease:LEasing.Cubic.easeInOut,delay:0.3});
			
			var rightBraceBitmapdata = new LBitmapData(imglist1["fabuhui4"]);
			var rightBraceBitmap = new LBitmap(rightBraceBitmapdata);
			fabuhuiLayer.addChild(rightBraceBitmap);
			rightBraceBitmap.scaleX = -1;
			rightBraceBitmap.x = 336;
			rightBraceBitmap.y = 409;
			rightBraceBitmap.alpha = 0;
			LTweenLite.to(rightBraceBitmap,0.3,{alpha:1,delay:0.4}).to(rightBraceBitmap,0.4,{x:456,ease:LEasing.Cubic.easeInOut,delay:0.3});

			var redTxtBitmapdata = new LBitmapData(imglist1["fabuhui3"]);
			var redTxtBitmap = new LBitmap(redTxtBitmapdata);
			redTxtBitmap.x = 209;
			redTxtBitmap.y = 420;
			redTxtBitmap.alpha = 0;
			LTweenLite.to(redTxtBitmap,0.1,{alpha:1,delay:1.1});
			fabuhuiLayer.addChild(redTxtBitmap);
			
			var redTxtMask = new LSprite();
			redTxtMask.graphics.drawRect(0, "#000000", [-115, 0, 230, 30]);
			redTxtMask.x = 320;
			redTxtMask.y = 416;
			redTxtMask.scaleX = 0.1;
			fabuhuiLayer.addChild(redTxtMask);
			redTxtBitmap.mask = redTxtMask;
			LTweenLite.to(redTxtMask,0.4,{scaleX:1,ease:LEasing.Cubic.easeInOut,delay:1.05});
		},500);
		
		var fabuhui1Bitmapdata = new LBitmapData(imglist1["fabuhui1"]);
		var fabuhui1Bitmap = new LBitmap(fabuhui1Bitmapdata);
		fabuhuiLayer.addChild(fabuhui1Bitmap);
		var x1 = 320-fabuhui1Bitmap.width/2;
		flashLayer(fabuhui1Bitmap,x1,234,0.03,0.3);

		var fabuhui2Bitmapdata = new LBitmapData(imglist1["fabuhui2"]);
		var fabuhui2Bitmap = new LBitmap(fabuhui2Bitmapdata);
		fabuhuiLayer.addChild(fabuhui2Bitmap);
		var x2 = 320-fabuhui2Bitmap.width/2;
		flashLayer(fabuhui2Bitmap,x2,288,0.03,0.5);

		var fabuhui5Bitmapdata = new LBitmapData(imglist1["fabuhui5"]);
		var fabuhui5Bitmap = new LBitmap(fabuhui5Bitmapdata);
		fabuhuiLayer.addChild(fabuhui5Bitmap);
		var x5 = 320-fabuhui5Bitmap.width/2;
		flashLayer(fabuhui5Bitmap,x5,560,0.03,2.0);
		
		var fabuhui6Bitmapdata = new LBitmapData(imglist1["fabuhui6"]);
		var fabuhui6Bitmap = new LBitmap(fabuhui6Bitmapdata);
		fabuhuiLayer.addChild(fabuhui6Bitmap);
		flashLayer(fabuhui6Bitmap,218,620,0.03,2.2);
		
		var fabuhui7Bitmapdata = new LBitmapData(imglist1["fabuhui7"]);
		var fabuhui7Bitmap = new LBitmap(fabuhui7Bitmapdata);
		fabuhuiLayer.addChild(fabuhui7Bitmap);
		var x7 = 320-fabuhui7Bitmap.width/2;
		flashLayer(fabuhui7Bitmap,x7,641,0.03,2.4);
		
		var fabuhui8Bitmapdata = new LBitmapData(imglist1["fabuhui8"]);
		var fabuhui8Bitmap = new LBitmap(fabuhui8Bitmapdata);
		var shareBtn = new LSprite();
		shareBtn.addChild(fabuhui8Bitmap);
		fabuhuiLayer.addChild(shareBtn);
		shareBtn.x = 218;
		shareBtn.y = 756;
		shareBtn.alpha = 0;
		LTweenLite.to(shareBtn,0.5,{alpha:1,delay:2.8});
		shareBtn.addEventListener(LMouseEvent.MOUSE_DOWN,shareBtnClick);
		function shareBtnClick(e){
			if(share3DLayer.visible == false){
				share3DLayer.visible = true;
			}
		}
		
		var fabuhui9Bitmapdata = new LBitmapData(imglist1["fabuhui9"]);
		var fabuhui9Bitmap = new LBitmap(fabuhui9Bitmapdata);
		var logoLayer = new LSprite();
		logoLayer.addChild(fabuhui9Bitmap);
		fabuhuiLayer.addChild(logoLayer);
		logoLayer.x = 241;
		logoLayer.y = 866;
		logoLayer.alpha = 0;
		LTweenLite.to(logoLayer,0.5,{alpha:1,delay:3.0});

	}
	function flashLayer(layer,x,y,flash_time,delay_time){
		layer.alpha = 0;
		layer.x = x;
		layer.y = y;
		LTweenLite.to(layer,flash_time,{alpha:1,delay:delay_time}).to(layer,flash_time,{alpha:1.0}).to(layer,flash_time,{alpha:0.1}).to(layer,flash_time,{alpha:1.0}).to(layer,flash_time,{alpha:0.1}).to(layer,flash_time,{alpha:1.0}).to(layer,flash_time,{alpha:0.1}).to(layer,flash_time,{alpha:1.0}).to(layer,flash_time,{alpha:0.1}).to(layer,flash_time,{alpha:1.0});
	}
	function initShare3D(){
		log("share3DLayer")
		//share3DLayer
		share3DLayer = new LSprite();
		addChild(share3DLayer);
		//gameContainerLayer.addChild(share3DLayer);
		share3DLayer.visible = false;
		share3DLayer.addEventListener(LMouseEvent.MOUSE_DOWN,shareLayerClick);
		function shareLayerClick(e){
			if(share3DLayer.visible == true){
				share3DLayer.visible = false;
			}
		}
		
		var share3Dbg = new LShape();
		share3Dbg.graphics.drawRect(0,"#000000",[0,0,640,gameHeight],true,"#000000");
		share3DLayer.addChild(share3Dbg);
		
		var container3d = new  LSprite();
		share3DLayer.addChild(container3d);
		container3d.x = 320;
		container3d.y = 385;		
		container3d.scaleX = container3d.scaleY = 1.8;

		//--------------------------------share 3D begin------------------------------
		var starsArr = new Array();
		var vectorStarArr = new Array();
		var vectorPersArr = new Array();
		var lineShapeArr = new Array();
		var lineShapeArr2 = new Array();
		var vectorStarPositionArr = [[-1,59,80],[-88,1,30],[-15,-16,-70],[71,64,30],[37,-75,15]];	

		for(var i2=0;i2<8;i2++){
			var mylineShape2 = new LSprite();
			mylineShape2.alpha = 0.6;
			container3d.addChild(mylineShape2);
			lineShapeArr2.push(mylineShape2);
		}
	
		var starNumber = 5;
		for(var i=0;i<starNumber;i++){
			var lightStarLayer = new  LSprite();
			var bitmapdataStar = new LBitmapData(imglist0["light_white"]);
			var bitmapStar = new LBitmap(bitmapdataStar);
			bitmapStar.x = -12;
			bitmapStar.y = -12;
			lightStarLayer.addChild(bitmapStar);
			container3d.addChild(lightStarLayer);
			starsArr.push(lightStarLayer);

			var vectorStar = new HVector(vectorStarPositionArr[i][0],vectorStarPositionArr[i][1],vectorStarPositionArr[i][2]);
			vectorStarArr.push(vectorStar);
			vectorPersArr.push({x:0,y:0});

			var mylineShape = new LSprite();
			mylineShape.alpha = 0.4;
			container3d.addChild(mylineShape);
			lineShapeArr.push(mylineShape);
		}

		var lightRedLayer = new  LSprite();
		var bitmapdataStar = new LBitmapData(imglist0["light_red"]);
		var bitmapStar = new LBitmap(bitmapdataStar);
		bitmapStar.x = -60;
		bitmapStar.y = -60;
		lightRedLayer.addChild(bitmapStar);
		container3d.addChild(lightRedLayer);

		lightRedTween = LTweenLite.to(lightRedLayer,0.3,{scaleX:0.6,scaleY:0.6,loop:true}).to(lightRedLayer,0.3,{scaleX:0.4,scaleY:0.4});

		var star_tt = new LSprite();
		var bitmapdataStar_tt = new LBitmapData(imglist0["light_white"]);
		var bitmapStar_tt = new LBitmap(bitmapdataStar_tt);
		bitmapStar_tt.x = -12;
		bitmapStar_tt.y = -12;
		star_tt.addChild(bitmapStar_tt);
		container3d.addChild(star_tt);
		star_tt.x = 155;
		star_tt.y = -192;
		star_tt.scaleX = star_tt.scaleY = 0.6;
		star_tt.alpha = 0;

		var lineShape = new LSprite();
		container3d.addChild(lineShape);
		lineShape.alpha = 0;

		container3d.addEventListener(LEvent.ENTER_FRAME,update);
		
		function update(event) {
	        for(var i=0;i<starNumber;i++){
	        	vectorStarArr[i].rotateXYZ(-2,1.5,2);
	        	renderSp(i,vectorStarArr[i],starsArr[i],0.6);
	        	vectorPersArr[i] = getPersPostion(vectorStarArr[i]);
	        	//
	        	lineShapeArr[i].graphics.clear();
	        	lineShapeArr[i].graphics.drawLine(1, "white", [0, 0, vectorPersArr[i].x, vectorPersArr[i].y]);
	        }
	        lineShapeArr2[0].graphics.clear();
	        lineShapeArr2[0].graphics.drawLine(1, "white", [vectorPersArr[0].x, vectorPersArr[0].y, vectorPersArr[1].x, vectorPersArr[1].y]);
	        lineShapeArr2[1].graphics.clear();
			lineShapeArr2[1].graphics.drawLine(1, "white", [vectorPersArr[1].x, vectorPersArr[1].y, vectorPersArr[2].x, vectorPersArr[2].y]);
			lineShapeArr2[2].graphics.clear();
			lineShapeArr2[2].graphics.drawLine(1, "white", [vectorPersArr[2].x, vectorPersArr[2].y, vectorPersArr[3].x, vectorPersArr[3].y]);
			lineShapeArr2[3].graphics.clear();
			lineShapeArr2[3].graphics.drawLine(1, "white", [vectorPersArr[3].x, vectorPersArr[3].y, vectorPersArr[0].x, vectorPersArr[0].y]);
			lineShapeArr2[4].graphics.clear();
			lineShapeArr2[4].graphics.drawLine(1, "white", [vectorPersArr[0].x, vectorPersArr[0].y, vectorPersArr[4].x, vectorPersArr[4].y]);
			lineShapeArr2[5].graphics.clear();
			lineShapeArr2[5].graphics.drawLine(1, "white", [vectorPersArr[1].x, vectorPersArr[1].y, vectorPersArr[4].x, vectorPersArr[4].y]);
			lineShapeArr2[6].graphics.clear();
			lineShapeArr2[6].graphics.drawLine(1, "white", [vectorPersArr[2].x, vectorPersArr[2].y, vectorPersArr[4].x, vectorPersArr[4].y]);
			lineShapeArr2[7].graphics.clear();
			lineShapeArr2[7].graphics.drawLine(1, "white", [vectorPersArr[3].x, vectorPersArr[3].y, vectorPersArr[4].x, vectorPersArr[4].y]);
			lineShape.graphics.clear();
	        lineShape.graphics.drawLine(1, "white", [0, 0,star_tt.x, star_tt.y]);
		}
		
		var count = 0;
		var starInterval = window.setInterval(function(){
			LTweenLite.to(lineShapeArr[count],0,{alpha:0}).to(lineShapeArr[count],0.3,{alpha:0.4,delay:3.2});
			LTweenLite.to(starsArr[count],0,{alpha:0}).to(starsArr[count],0.3,{alpha:1,delay:3.2});
			var ttp = getPersPostion(vectorStarArr[count]);
			star_tt.x = ttp.x;
			star_tt.y = ttp.y;
			LTweenLite.to(lineShape,0,{alpha:0.4}).to(lineShape,0.5,{alpha:0,delay:3});
			LTweenLite.to(star_tt,0,{alpha:1}).to(star_tt,0.5,{x:155,y:-192,ease:LEasing.Cubic.easeOut}).to(star_tt,0.3,{x:8,y:-10,alpha:0,ease:LEasing.Cubic.easeOut,delay:2.5});

			switch(count){
				case 0:
					LTweenLite.to(lineShapeArr2[0],0,{alpha:0}).to(lineShapeArr2[0],0.3,{alpha:0.4,delay:3.2});
					LTweenLite.to(lineShapeArr2[3],0,{alpha:0}).to(lineShapeArr2[3],0.3,{alpha:0.4,delay:3.2});
					LTweenLite.to(lineShapeArr2[4],0,{alpha:0}).to(lineShapeArr2[4],0.3,{alpha:0.4,delay:3.2});
					break;

				case 1:
					LTweenLite.to(lineShapeArr2[1],0,{alpha:0}).to(lineShapeArr2[1],0.3,{alpha:0.4,delay:3.2});
					LTweenLite.to(lineShapeArr2[0],0,{alpha:0}).to(lineShapeArr2[0],0.3,{alpha:0.4,delay:3.2});
					LTweenLite.to(lineShapeArr2[5],0,{alpha:0}).to(lineShapeArr2[5],0.3,{alpha:0.4,delay:3.2});
					break;

				case 2:
					LTweenLite.to(lineShapeArr2[2],0,{alpha:0}).to(lineShapeArr2[2],0.3,{alpha:0.4,delay:3.2});
					LTweenLite.to(lineShapeArr2[1],0,{alpha:0}).to(lineShapeArr2[1],0.3,{alpha:0.4,delay:3.2});
					LTweenLite.to(lineShapeArr2[6],0,{alpha:0}).to(lineShapeArr2[6],0.3,{alpha:0.4,delay:3.2});
					break;

				case 3:
					LTweenLite.to(lineShapeArr2[3],0,{alpha:0}).to(lineShapeArr2[3],0.3,{alpha:0.4,delay:3.2});
					LTweenLite.to(lineShapeArr2[2],0,{alpha:0}).to(lineShapeArr2[2],0.3,{alpha:0.4,delay:3.2});
					LTweenLite.to(lineShapeArr2[7],0,{alpha:0}).to(lineShapeArr2[7],0.3,{alpha:0.4,delay:3.2});
					break;

				case 4:
					LTweenLite.to(lineShapeArr2[4],0,{alpha:0}).to(lineShapeArr2[4],0.3,{alpha:0.4,delay:3.2});
					LTweenLite.to(lineShapeArr2[5],0,{alpha:0}).to(lineShapeArr2[5],0.3,{alpha:0.4,delay:3.2});
					LTweenLite.to(lineShapeArr2[6],0,{alpha:0}).to(lineShapeArr2[6],0.3,{alpha:0.4,delay:3.2});
					LTweenLite.to(lineShapeArr2[7],0,{alpha:0}).to(lineShapeArr2[7],0.3,{alpha:0.4,delay:3.2});
					break;
			}

			//LTweenLite.to(starsArr[count],0.6,{alpha:0.5,loop:true}).to(starsArr[count],0.6,{alpha:1.0});	
			count++;
			if(count>4) {
				count = 0;
			}
		},4500);


		//----------------------share 3D end------------------------------------------------
		
		var shareLogoBitmapdata = new LBitmapData(imglist0["loading_logo"]);
		var shareLogoBitmap = new LBitmap(shareLogoBitmapdata);
		share3DLayer.addChild(shareLogoBitmap);
		shareLogoBitmap.x = 300;
		shareLogoBitmap.y = 400;
		
		var fabuhui10Bitmapdata = new LBitmapData(imglist1["fabuhui10"]);
		var fabuhui10Bitmap = new LBitmap(fabuhui10Bitmapdata);
		share3DLayer.addChild(fabuhui10Bitmap);
		fabuhui10Bitmap.x = 155;
		fabuhui10Bitmap.y = 592;
	}
	function renderSp(id,v,sp,sc) {
		var scale = sc ? sc : 1;
		var pers = v.getPerspective();
		var screenPos = v.persProjectNew(pers);
		//var screenPos = v.persProjectNew(pers);
		var tx = screenPos.x;
		var ty = -screenPos.y;
		sp.x = tx;
		sp.y = ty;
		sp.scaleX = sp.scaleY= scale * pers;
	}
});


