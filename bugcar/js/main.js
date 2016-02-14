var $cdn = "";
//var $cdn="";


var homedelay = 4000;

//en titles
var titles = ["Fender Speakers",//0
              "Fender Music System",//1
              "LED lights",//2
              "Heated Seat",//4
              "Sunroof",//3

              "Accelerator Pedal",//5
              "Vintage Beetle logo",//6
              "3-Colored Mood lights",//7

              "Sporty Dashboard",//8
              "R-Line Package"//9
              ];
//en ps
var ps = ["The Fender Music System combines 9 speakers with 400 watts of power to produce uncompromised clarity at high volumes, to recreate the raw emotion of a live performance.",
          "The Fender Music System combines 9 speakers with 400 watts of power to produce uncompromised clarity at high volumes, to recreate the raw emotion of a live performance.",//1
          "Light up the path ahead with the Bi-Xenon headlights featuring clear and bright LED daytime running lights. They don’t just look great, but help you see better, too. ",//2
          
          "No more icy seats on winter mornings, as you’ll be equipped with a toasty heated one in your VW Beetle. It’ll make your world a warmer place to be.",//4
          "The tilt and slide panoramic sunroof provides an open-top feeling while letting the sunshine in along with a generous view. Just what you’d expect from living a Bug’s life.",//3
          "Crafted from aluminum, this anti-slip pedal set brings a design aesthetic to the interior, while helping to keep your foot firmly planted exactly where you want it. ",//5
          "The vintage-styled VW Beetle logo defines an ageless classic spirit through a nostalgic font and design that’s perfectly placed.",//6
          "Accented 3-colored mood lighting under the door trim and surrounding the sound system create a uniquely romantic tone, well suited to this very special breed of car.",//7
          "Equipped with more power than ever, the 2015 VW Beetle Sports Package expresses itself with a combination of sporty styling and contemporary technologies.",//8
          "The classic styling of the VW Beetle is still there, it’s just been wrapped in a package that’s even more keen to hit the road and perform."//9
          ];
//cn titles
var titlescn =["Fender 扬声器",//0
               "Fender 音响系统",//1
               "LED 灯",//2
               "加热座椅",//4
               "天窗",//3

               "油门踏板",//5
               "复古甲壳虫标志",//6
               "三色氛围灯",//7

               "运动仪表盘",//8
               "R-line 外观套件"//9
               ];
//cn ps
var pscn=["Fender音响系统配置9个扩音器400瓦特功率,哪怕音量再高,清晰音质绝不妥协。为你还原现场表演原始冲动。",//0
          "Fender音响系统配置9个扩音器400瓦特功率,哪怕音量再高,清晰音质绝不妥协。为你还原现场表演原始冲动。",//1
          "氙气大灯配备清爽明亮的日间行车灯,时刻照亮前进道路。它们不只徒有其表;更重要的是,它们将让你的视野无比开阔。",//2
          "彻底告别在冬天早晨的冰冷座椅,只因我们将暖和舒适的加热座椅安置在你的车内。一切只为让你的世界更加温暖。",//4
          "可倾斜/滑动的全景天窗提供如敞篷车一般的畅快感受,正如你所期望的如甲壳虫一般的生活,明媚阳光与宽广景致将与你一路同行。",//3

          "由铝合金制成的防滑踏板,全面提升车内设计美感。出色的抓附力,只为确保你的脚稳定、精确地踏在你所认为最舒服的位置。",//5
          "复古味十足的甲壳虫标志,将通过考究的字体设计完美展现。一切只为定义经典精神永不褪色。",//6
          "三色氛围灯安置在门饰板下方和音响系统扬声器环绕处。从而营造 出一种与甲壳虫气质完美契合的浪漫氛围。",//7

          "2015年的运动套件配置了前所未有的强大动力,通过将运动风格和现在领先科技相结合,来表达最真实自我。",//8
          "在渴望点燃道路、尽情表演的外观下,隐藏着经典不变的甲壳虫风格。"//9
          ];




var globalMute =false;
//popup elements  h for head p for p c for background r for content(h&p)
var popupH,popupP,popupC,popupR;

//states
var STATE_HERO    = "hero";
var STATE_POWER   = "power";
var STATE_PACKAGE = "package";
var STATE_COLOR   = "color";
var STATE_SHARE   = "share";

var base_video_url = $cdn + "assets/videos/";
var base_video_ext =".mp4";

//prev played
var prevSource;

//if video src changed
var isPlaying =false;

//if video playing
var isDuringMovie =false;

//popup opened
var isPoped =false;

//color changed
var isColorShowing =false;

//if during power video playing
var powerNextState = false;

//disable power mouse event
var isPowerClicked=false;

//scale factor
var scale;

//if feature btn clicked
var featureClicked;

//audios
var audioBg,audioOver,audioFeature;

//for share expanding
var isShareOver =false;

//for fading in html before package video end;
var triedShowingHTML=false;

//video srcs
var videos = {
    "intro":base_video_url + "intro2"+base_video_ext,
    "transform":base_video_url + "transform2"+base_video_ext,
    "power1":base_video_url + "power1"+base_video_ext,
    "power2":base_video_url + "power2"+base_video_ext,
    "power3":base_video_url + "power3"+base_video_ext,
    "pack1":base_video_url + "pack1"+base_video_ext,
    "pack2":base_video_url + "pack2"+base_video_ext,
    "pack3":base_video_url + "pack3"+base_video_ext,
    "back1":base_video_url + "back1"+base_video_ext,
    "back2":base_video_url + "back2"+base_video_ext,
    "back3":base_video_url + "back3"+base_video_ext
};

//for bottom btns onresize event
var bottomBtns=[];

//for color changing sprites
var colors = [];

//current state
var currentState;

//pixi stage
var stage = new PIXI.Stage(0x000000);
var stageWidth = 1280;
var stageHeight =720;

//for onresize event of hero image 
var hero;

//package json data
var hsp1,hsp2,hsp3;

//for hotspots lines and dots
var graphics = new PIXI.Graphics();

//pixi renderer  options transparent for canvas transparent
var renderer = new PIXI.autoDetectRenderer(stageWidth, stageHeight,{'transparent':true});
//for outsprite containing    outsprite is used for 
var carContainer  = new PIXI.DisplayObjectContainer();
//for feature btns and hotspots and lines containing
var graphicsContainer = new PIXI.DisplayObjectContainer();
//for still moves
var movieClip;

//for color changing
var colorContainer = new PIXI.DisplayObjectContainer();
//feature btns
var btns=[];

// add the renderer's view element to the DOM
document.getElementById("canvas").appendChild(renderer.view);


// jquery elements
var $section_home,$section_power,$section_package,$section_color,$section_share,$section_popup,$nav,$section_reserver,$section_wechat,$shares,$shareicons,$reservecontent,$language,$mute,$loading,$startbtn,$lanchoose;

var $bgvid,$canvas,$video;
//for all assets' textures;
var textures = [];





var assetsToLoad = [$cdn+"assets/images/color1-1.png",//0
                    $cdn+"assets/images/color1-2.png",//1
                    $cdn+"assets/images/color1-3.png",//2
                    $cdn+"assets/images/color2-1.png",//3
                    $cdn+"assets/images/color2-2.png",//4
                    $cdn+"assets/images/color2-3.png",//5
                    $cdn+"assets/images/color3-1.png",//6
                    $cdn+"assets/images/color3-2.png",//7
                    $cdn+"assets/images/color3-3.png"//8
                    ];

for(var i=1;i<=34;i++){
    var __img = i>=10?$cdn + "assets/images/antenna00"+i+".png":$cdn + "assets/images/antenna000"+i+".png";
    assetsToLoad.push(__img);//9-42
}

if(!useGLVideo){
	assetsToLoad.push($cdn+"assets/videos/intro_still2.png");//43
	assetsToLoad.push($cdn+"assets/videos/power_still.png");//44
}

console.log(assetsToLoad);

var loader = new PIXI.AssetLoader(assetsToLoad,true);
loader.onComplete = init;
loader.load();


var movieSprite;

//for video posters
var outputSprite,renderTexture,blurSprite;

if(useGLVideo){
	renderTexture = new PIXI.RenderTexture(1280, 720);
	outputSprite  = new PIXI.Sprite(renderTexture);
	blurSprite = new PIXI.Sprite(renderTexture);//for bluring bg usage
}


//resize event handler
function onResize(){
    getStageWidthAndHeight();
    hero.css('height',stageHeight*0.3);
    if(hero.width()/hero.height() != 660/320){
        hero.css('height',hero.width()/660 *320);
    }
	renderer.resize(stageWidth, stageHeight);
    scale = (stageWidth/stageHeight > 16/9)?stageWidth/1280:stageHeight/720;
    colorContainer.scale.x = colorContainer.scale.y = carContainer.scale.x = carContainer.scale.y = scale;
    colorContainer.position.x = carContainer.position.x = (stageWidth/stageHeight > 16/9)?0:(stageWidth - 1280*scale)*0.5;
    colorContainer.position.y = carContainer.position.y = (stageWidth/stageHeight > 16/9)?(stageHeight - 720*scale)*0.8:0;
    graphicsContainer.position.y = (stageWidth/stageHeight > 16/9)?(stageHeight - 720*scale)*0.3:0;

    var isWide = stageWidth/stageHeight > 16/9;
    if(!useGLVideo){
    	$bgvid.css('width',1280*scale+'px');
	    $bgvid.css('height',720*scale+'px');
	    if(isWide){
	        $bgvid.css('left','0px');
	        $bgvid.css('top',(stageHeight - 720*scale)*0.8 +'px');
	    }else{
	        $bgvid.css('left',(stageWidth - 1280*scale)*0.5 + 'px');
	        $bgvid.css('top','0px');
	    }
    }
    
    for(var i=0;i<bottomBtns.length;i++){
        var bottompercent = 13;
        var bottomPos = (stageWidth/stageHeight > 16/9)?720*scale * bottompercent/100+(stageHeight - 720*scale)*0.2+'px':bottompercent+'%';
        bottomBtns[i].css('bottom',bottomPos);
    }
    var spercent = 10;
    var sPos = (stageWidth/stageHeight > 16/9)?720*scale * spercent/100+(stageHeight - 720*scale)*0.2+'px':spercent+'%';
    $startbtn.css('bottom',sPos);
    $lanchoose.css('bottom',sPos);

}


//get innerwidth&height
function getStageWidthAndHeight(){
    stageWidth = window.innerWidth;
    stageHeight = window.innerHeight;
}


function initPIXI(data){
    hsp1 = data.hsp1;
    hsp2 = data.hsp2;
    hsp3 = data.hsp3;
    for(var i=0;i<10;i++){
        var btn = new PIXI.DisplayObjectContainer();
        var _text = new PIXI.Text(titles[i], {font:"18px VWHeadline-Sb", fill:"white"});
        _text.position.x = -_text.width/2;
        _text.position.y = -_text.height-1;
        btn.addChild(_text);
        var _g = new PIXI.Graphics();
        _g.lineStyle(2,0xffffff,1);
        _g.drawRect(-_text.width/2 - 10, -_text.height-8,_text.width+20, _text.height+8);

        var _g2 = new PIXI.Graphics();
        _g2.beginFill(0xff0000,0);
        _g2.drawRect(-_text.width, -_text.height*2-4,_text.width*2, _text.height*3);
        _g2.endFill();

        btn.addChildAt(_g,0);
        btn.addChildAt(_g2,0);
        btn.text = _text;
        btn.graphics = _g;
        btn.graphics2=_g2;
        btns.push(btn);
        btn.buttonMode=true;
        btns[i].visible =false;
        btns[i].interactive = true;
        btns[i].mouseover = function(data) {
        	if(useGLVideo){
        		movieSprite.texture.baseTexture.source.pause();	
        	}else{
        		$video.pause();
        	}
            
            if(!globalMute){
                audioOver.play();
            }
            this.text.setStyle({font:"18px VWHeadline-Sb", fill:"black"});
            this.graphics.lineStyle(2,0xffffff,1);
            this.graphics.beginFill(0xffffff);
            this.graphics.drawRect(-this.text.width/2 - 10, -this.text.height-8,this.text.width+20, this.text.height+8);
            this.graphics.endFill();
        };
        btns[i].mouseout = function(data){
            if(!isPoped){
            	if(useGLVideo){
            		movieSprite.texture.baseTexture.source.play();
            	}else{
            		$video.play();
            	}
            }
            	
            this.text.setStyle({font:"18px VWHeadline-Sb", fill:"white"});
            this.graphics.clear();
            this.graphics.lineStyle(2,0xffffff,1);
            this.graphics.drawRect(-this.text.width/2 - 10, -this.text.height-8,this.text.width+20, this.text.height+8);
        }
        btns[i].click = function(data) {
            //console.log("clicked");

            isPoped =true;
            if(useGLVideo){
            	renderTexture.render(movieSprite);
            	TweenMax.to(blurSprite,0.7,{alpha:1});
            }else{
            	$canvas.addClass('blur');
            	$bgvid.addClass('blur');
            }
            

            
            TweenMax.to(graphicsContainer,0.3,{alpha:0});

            featureClicked = btns.indexOf(this);
            if(currentLanguage == "en"){
                popupH.html(titles[featureClicked]);
                popupP.html(ps[featureClicked]);
            }else{
                popupH.html(titlescn[featureClicked]);
                popupP.html(pscn[featureClicked]);
            }
            
            popupC.css('background-image','url('+$cdn+'assets/images/bg'+featureClicked+'.jpg)');

            TweenMax.set(popupC,{x:-250,y:250,width:0,height:0});
            TweenMax.set(popupR,{alpha:0,x:-500});
            $section_popup.css('visibility','visible').hide().show();
            TweenMax.to(popupC,0.7,{x:0,y:0,width:500,height:500,ease:Strong.easeOut,delay:0.3});
            TweenMax.to(popupR,0.7,{alpha:1,x:0,ease:Strong.easeOut,delay:0.3});
            
            audioFeature.play(0);
            if(!globalMute){
                audioFeature.volume = 0.2;
            }else{
                audioFeature.volume = 0;
            }
            
        };
        graphicsContainer.addChild(btns[i]);
    }
    for(var i=0;i<9;i++){
    	if(useGLVideo){
    		colors.push(new PIXI.Sprite(PIXI.Texture.fromImage(assetsToLoad[i])));
    	}else{
    		textures.push(PIXI.Texture.fromImage(assetsToLoad[i]));
        	colors.push(new PIXI.Sprite(textures[i]));
    	}
        colorContainer.addChild(colors[i]);
        colors[i].alpha = 0;
    }

    if(useGLVideo){
    	movieSprite = new PIXI.Sprite();
	    carContainer.addChild(movieSprite);
	    carContainer.addChild(outputSprite);
	    carContainer.addChild(blurSprite);
	    
        
	    var blurFilter = new PIXI.BlurFilter();
	    blurFilter.blurX = 20;
	    blurFilter.blurY = 20;          
	    blurSprite.filters = [blurFilter];
	    blurSprite.alpha = 0;
    }else{
    	textures.push(PIXI.Texture.fromImage(assetsToLoad[43]));
    	textures.push(PIXI.Texture.fromImage(assetsToLoad[44]));

    	outputSprite = new PIXI.Sprite(textures[9]);
    	carContainer.addChild(outputSprite);
    	outputSprite.alpha = 0;
    }

    var mTs = [];
    for(var i=0;i<50;i++){
        var t = PIXI.Texture.fromImage(assetsToLoad[9]);
        mTs.push(t);
    }
    for(var i=0;i<34;i++){
        var t = PIXI.Texture.fromImage(assetsToLoad[9+i]);
        mTs.push(t);
    }


    
    console.log(mTs);

    movieClip = new PIXI.MovieClip(mTs);
    movieClip.loop = true;
    movieClip.animationSpeed = 0.4;
    movieClip.position.x = 494;
    movieClip.position.y = 486;
    movieClip.alpha = 0;
    stage.addChild(carContainer);
    carContainer.addChild(movieClip);
    graphicsContainer.addChild(graphics);
    stage.addChild(graphicsContainer);
    stage.addChild(colorContainer);
}




function initQuery(){
	if(!useGLVideo){
		$bgvid = $('#bgvid');
    	$canvas = $('#canvas');
    	$video = document.getElementById('bgvid');
	}

    popupH = $('#popup-h');
    popupP = $('#popup-p');
    popupC = $('#popup-c');
    popupR = $('#popup-r');
    bottomBtns = [$('#package-back-btn'),$('#color-back-btn'),$('#color-share-btn'),$('#color-restart-btn'),$('#share-back-btn'),$('#share-restart-btn'),$('#loading')];

    hero = $('#home .hero img');
    $section_home = $('#home');
    $section_power = $('#power');
    $section_package=$('#package');
    $section_color=$('#color');
    $section_share=$('#share');
    $section_popup=$('#popup');
    $nav = $('#nav');
    $shares=$('.shares');
    $shareicons=$('.share-icons');
    $section_reserver=$('#Reserve_box');
    $reservecontent = $('#reserve-content');
    $section_wechat = $('#wechat');

    $section_popup.css('visibility','visible').hide();
    $section_reserver.css('visibility','visible').hide();
    TweenMax.set($shares,{css:{'width':'40px'}});
    TweenMax.set($shareicons,{css:{'left':'40px','opacity':'0'}});

    $language = $('.language');
    $mute = $('.mute');
    TweenMax.set($language,{css:{'right':'165px'}});
    TweenMax.set($mute,{css:{'right':'215px'}});


    $loading = $('#loading');
    $startbtn = $('#start-btn');
    $lanchoose = $('#lan-choose');

}


//change languages
function changeLanguage(_lan){
    if(_lan =="cn"){
        currentLanguage = "cn";
        $language.css('background-image','url('+$cdn+'assets/images/localization/language.png)');
        $startbtn.html('开始');
        $section_power.find('.title').html('<h2>选择引擎</h2>');
        $section_package.find('.title').html('<h2>选择套件</h2>');
        $section_package.find('#package-btn-1').css('background-image','url('+$cdn+'assets/images/localization/package1.png)');
        $section_package.find('#package-btn-2').css('background-image','url('+$cdn+'assets/images/localization/package2.png)');
        $section_package.find('#package-btn-3').css('background-image','url('+$cdn+'assets/images/localization/package3.png)');
        $section_package.find('#package-back-btn').html('返回');
        $section_color.find('.title').html('<h2>选择颜色</h2>');
        $section_color.find('#color-back-btn').html('返回');
        $section_color.find('#color-share-btn').html('分享');
        $section_color.find('#color-restart-btn').html('重新启动');
        $section_share.find('.title').html('<h2>选择一个社交账号分享</h2>');
        $section_share.find('#share-back-btn').html('返回');
        $section_share.find('#share-restart-btn').html('重新启动');
        $nav.find('.test-drive-icon').html('试驾');
        $section_wechat.find('p').html('扫描上方QR码分享到微信');
        $section_home.find('.intro').html("在这里,你将看到三种风格迥异的甲壳虫汽车套件。<br>同时,每种套件的特点都将通过虫子的独特视角,<br>呈现在你眼前。");

        for(var i=0;i<10;i++){
            var btn = btns[i];
            var _text = btn.text;
            var _g = btn.graphics;
            var _g2=btn.graphics2;
            _text.setText(titlescn[i]);
            _text.position.x = -_text.width/2;
            _text.position.y = -_text.height-1;
            
            _g.clear();
            _g.lineStyle(2,0xffffff,1);
            _g.drawRect(-_text.width/2 - 10, -_text.height-8,_text.width+20, _text.height+8);

            _g2.clear();
            _g2.beginFill(0xff0000,0);
            _g2.drawRect(-_text.width, -_text.height*2-4,_text.width*2, _text.height*3);
            _g2.endFill();
        }

        $('#reserve-hint').hide();
        $('.reserve_container').show();

        $('#lan-choose-en').css('opacity',0.3);
        $('#lan-choose-cn').css('opacity',1);
    }else{
        currentLanguage = "en";
        $language.css('background-image','url('+$cdn+'assets/images/language.png)');
        $startbtn.html('start');
        $section_power.find('.title').html('<h2>Choose an engine</h2>');
        $section_package.find('.title').html('<h2>Choose a package</h2>');
        $section_package.find('#package-btn-1').css('background-image','url('+$cdn+'assets/images/package1.png)');
        $section_package.find('#package-btn-2').css('background-image','url('+$cdn+'assets/images/package2.png)');
        $section_package.find('#package-btn-3').css('background-image','url('+$cdn+'assets/images/package3.png)');
        $section_package.find('#package-back-btn').html('back');
        $section_color.find('.title').html('<h2>Choose a color</h2>');
        $section_color.find('#color-back-btn').html('back');
        $section_color.find('#color-share-btn').html('share');
        $section_color.find('#color-restart-btn').html('restart');
        $section_share.find('.title').html('<h2>Share with one of your accounts</h2>');
        $section_share.find('#share-back-btn').html('back');
        $section_share.find('#share-restart-btn').html('restart');
        $nav.find('.test-drive-icon').html('Test Drive');
        $section_wechat.find('p').html('Scan this QR code for WeChat');
        $section_home.find('.intro').html("Take a bug's eye view <br>of three feature-packed options.");

        for(var i=0;i<10;i++){
            var btn = btns[i];
            var _text = btn.text;
            var _g = btn.graphics;
            var _g2=btn.graphics2;
            _text.setText(titles[i], {font:"18px VWHeadline-Sb", fill:"white"});
            _text.position.x = -_text.width/2;
            _text.position.y = -_text.height-1;
            
            _g.clear();
            _g.lineStyle(2,0xffffff,1);
            _g.drawRect(-_text.width/2 - 10, -_text.height-8,_text.width+20, _text.height+8);

            _g2.clear();
            _g2.beginFill(0xff0000,0);
            _g2.drawRect(-_text.width, -_text.height*2-4,_text.width*2, _text.height*3);
            _g2.endFill();
        }

        $('#reserve-hint').show();
        $('.reserve_container').hide();
        $('#lan-choose-cn').css('opacity',0.3);
        $('#lan-choose-en').css('opacity',1);
    }
}

//all assets loaded init now
function init(){
    $.getJSON($cdn + "assets/data.json",function(data){
        getStageWidthAndHeight();
        initAudio();
        initQuery();
        initPIXI(data);
        initBtns();
        initPopups();
        initNavs();
        initShares();
        changeLanguage(currentLanguage);
        playMovie(STATE_HERO,videos.intro);

        onResize();
        if(useGLVideo)requestAnimFrame(animate);
        window.addEventListener('resize',onResize,false);
    });

}






function initPopups(){
    $('.close-popup').click(function(){
        $section_popup.css('visibility','visible').fadeOut('normal');
        isPoped =false;
        audioFeature.pause();
        if(useGLVideo){
        	movieSprite.texture.baseTexture.source.play();
        	TweenMax.to(blurSprite,0.3,{alpha:0});
        }else{
        	$video.play();
        	$canvas.removeClass('blur');
        	$bgvid.removeClass('blur');
        }
        
        TweenMax.to(graphicsContainer,0.3,{alpha:1});
    });

    $('.close-box').click(function(){
        $section_reserver.css('visibility','visible').fadeOut('normal');
        hideState(false);
        $nav.fadeIn('slow');
        if(useGLVideo){
        	TweenMax.to(blurSprite,0.3,{alpha:0});
        }else{
        	$canvas.removeClass('blur');
        	$bgvid.removeClass('blur');
        }
        
    });

    $('.close-wechat').click(function(){
        $section_wechat.css('visibility','visible').fadeOut('normal');
        hideState(false);
        $nav.fadeIn('slow');
        if(useGLVideo){
        	TweenMax.to(blurSprite,0.3,{alpha:0});
        }else{
        	$canvas.removeClass('blur');
        	$bgvid.removeClass('blur');
        }
    });

    $('.test-drive-icon').click(function(){
        $section_reserver.css('visibility','visible').hide().fadeIn('slow');
        hideState(true);
        $nav.fadeOut('slow');
        if(useGLVideo){
        	TweenMax.to(blurSprite,0.7,{alpha:1});
        }else{
        	$canvas.addClass('blur');
        	$bgvid.addClass('blur');
        }
    });


    $('#share-btn-4').click(function(){
        $section_wechat.css('visibility','visible').hide().fadeIn('slow');
        hideState(true);
        $nav.fadeOut('slow');
        if(useGLVideo){
        	TweenMax.to(blurSprite,0.7,{alpha:1});
        }else{
        	$canvas.addClass('blur');
        	$bgvid.addClass('blur');
        }
    });

    $('#nav-share-btn-4').click(function(){
        $section_wechat.css('visibility','visible').hide().fadeIn('slow');
        hideState(true);
        $nav.fadeOut('slow');
        if(useGLVideo){
        	TweenMax.to(blurSprite,0.7,{alpha:1});
        }else{
        	$canvas.addClass('blur');
        	$bgvid.addClass('blur');
        }
    });




    $('.term-btn').mouseover(function(){
        //TweenMax.to($reservecontent,1,{css:{marginTop:-470}});
        TweenMax.to($reservecontent,0.7,{scrollTop:470,ease:Strong.easeOut});
    });

    $('.term-btn').mouseout(function(){
        //TweenMax.to($reservecontent,1,{css:{marginTop:0}});
        TweenMax.to($reservecontent,0.7,{scrollTop:0,ease:Strong.easeOut});
    });
}


//show current html
function showCurrentHtml(_fadeinnav){
    hideState(false);
    if(_fadeinnav){
        if(currentState != STATE_HERO){
            $nav.css('visibility','visible').hide().fadeIn('slow');
        }
    }
    if(currentState != STATE_HERO){
        if(!globalMute){
            audioBg.volume = 0.2;
        }else{
            audioBg.volume = 0;
        }
        audioBg.play();
    }else{
        TweenMax.delayedCall(1,function(){
            if(!isPlaying){
                if(!globalMute){
                    audioBg.volume = 0.2;
                }else{
                    audioBg.volume = 0;
                }
                audioBg.play();
            }
        });
    }
    
}


function initBtns(){

    $('#start-btn').click(function(){
        playMovie(STATE_POWER,videos.transform);
        $section_home.stop().fadeOut('slow');
        movieClip.alpha = 0;
    });

    $('#power-btn-1').mouseover(function(){
        if(isPowerClicked)return;
        powerMovie(videos.power1);
    });

    $('#power-btn-2').mouseover(function(){
        if(isPowerClicked)return;
        powerMovie(videos.power2);
    });

    $('#power-btn-3').mouseover(function(){
        if(isPowerClicked)return;
        powerMovie(videos.power3);
    });

    $('#power-btn-1').click(function(){
        //playMovie(STATE_PACKAGE,videos.power1);
        //$section_power.fadeOut('slow');
        if(isPowerClicked)return;
        isPowerClicked = true;
        if(isDuringMovie){
            $nav.fadeOut('slow');
            powerNextState = true;
            //playMovie(STATE_PACKAGE,null);
        }else{
            playMovie(STATE_PACKAGE,videos.power1);
        }
        $section_power.fadeOut("slow");
    });
    $('#power-btn-2').click(function(){
        //playMovie(STATE_PACKAGE,videos.power2);
        //$section_power.fadeOut('slow');
        if(isPowerClicked)return;
        isPowerClicked = true;
        if(isDuringMovie){
            $nav.fadeOut('slow');
            powerNextState = true;
            //playMovie(STATE_PACKAGE,null);
        }else{
            playMovie(STATE_PACKAGE,videos.power2);
        }
        $section_power.fadeOut(50);
    });
    $('#power-btn-3').click(function(){
        //playMovie(STATE_PACKAGE,videos.power3);
        //$section_power.fadeOut('slow');
        if(isPowerClicked)return;
        isPowerClicked = true;
        if(isDuringMovie){
            $nav.fadeOut('slow');
            powerNextState = true;
            //playMovie(STATE_PACKAGE,null);
        }else{
            playMovie(STATE_PACKAGE,videos.power3);
        }
        $section_power.fadeOut(50);
    });

    $('#package-btn-1').click(function(){
        if(isDuringMovie)return;
        playMovie(STATE_COLOR,videos.pack1,true);
        $section_package.fadeOut('slow');
    });
    $('#package-btn-2').click(function(){
        if(isDuringMovie)return;
        playMovie(STATE_COLOR,videos.pack2,true);
        $section_package.fadeOut('slow');
    });
    $('#package-btn-3').click(function(){
        if(isDuringMovie)return;
        playMovie(STATE_COLOR,videos.pack3,true);
        $section_package.fadeOut('slow');
    });

    $('#package-back-btn').click(function(){
        if(isDuringMovie)return;
        playMovie(STATE_POWER,null);
        $section_package.fadeOut('slow');
    });

    $('#color-btn-1').click(function(){
        var child;
        if(prevSource == videos.pack1){
            child = colors[0];
        }else if(prevSource == videos.pack2){
            child = colors[3];
        }else{
            child = colors[6];
        }
        child.alpha = 0;
        colorContainer.addChild(child);
        TweenMax.to(child,0.3,{alpha:1,onComplete:function(){isColorShowing = true;}});
    });

    $('#color-btn-2').click(function(){
        var child;
        if(prevSource == videos.pack1){
            child = colors[1];
        }else if(prevSource == videos.pack2){
            child = colors[4];
        }else{
            child = colors[7];
        }
        child.alpha = 0;
        colorContainer.addChild(child);
        TweenMax.to(child,0.3,{alpha:1,onComplete:function(){isColorShowing = true;}});
    });

    $('#color-btn-3').click(function(){
        var child;
        if(prevSource == videos.pack1){
            child = colors[2];
        }else if(prevSource == videos.pack2){
            child = colors[5];
        }else{
            child = colors[8];
        }
        child.alpha = 0;
        colorContainer.addChild(child);
        TweenMax.to(child,0.3,{alpha:1,onComplete:function(){isColorShowing = true;}});
    });


    $('#color-back-btn').click(function(){
        if(isDuringMovie)return;
        previouseSection(STATE_PACKAGE);
        $section_color.fadeOut('slow');
    });

    $('#color-share-btn').click(function(){
        if(isDuringMovie)return;
        playMovie(STATE_SHARE,null);
        $section_color.fadeOut('slow');
    });

    $('#color-restart-btn').click(function(){
        if(isDuringMovie)return;
        previouseSection(STATE_POWER);
        $section_color.fadeOut('slow');
    });


    $('#share-back-btn').click(function(){
        if(isDuringMovie)return;
        playMovie(STATE_COLOR,null);
        $section_share.fadeOut('slow');
    });

    $('#share-restart-btn').click(function(){
        if(isDuringMovie)return;
        previouseSection(STATE_POWER);
        $section_share.fadeOut('slow');
    });


    
    $('#reservebox-submit').click(function(){
        checkinfo();
    });


    $('#lan-choose-en').mouseover(function(){
        $(this).css('opacity',1);
    });
    $('#lan-choose-en').mouseout(function(){
        if(currentLanguage == "cn"){
            $(this).css('opacity',0.3);
        }
    });
    $('#lan-choose-en').click(function(){
        changeLanguage("en");
    });

    $('#lan-choose-cn').mouseover(function(){
        $(this).css('opacity',1);
    });
    $('#lan-choose-cn').mouseout(function(){
        if(currentLanguage == "en"){
            $(this).css('opacity',0.3);
        }
    });
    $('#lan-choose-cn').click(function(){
        changeLanguage("cn");
    });
    
}


function initNavs(){
    var testdriveTimeline = new TimelineMax({repeat:-1,yoyo:false,delay:0});
    var tweenedIcon = $('.test-drive-icon');

    testdriveTimeline.add(TweenMax.set(tweenedIcon,{css:{'background-position':'120px 0px'}}));
    testdriveTimeline.add(TweenMax.to(tweenedIcon,1.4,{css:{'background-position':'-120px 0px'},ease:Linear.easeNone}));
    testdriveTimeline.pause();
    TweenMax.set(tweenedIcon,{css:{'background-position':'center 0px'}});
    //testdriveTimeline.seek(0.7,true);

    tweenedIcon.mouseover(function(){
        testdriveTimeline.seek(0.5,true);
        testdriveTimeline.resume();
    });
    tweenedIcon.mouseout(function(){
        testdriveTimeline.pause();
        //testdriveTimeline.seek(0.7,true);
        TweenMax.set(tweenedIcon,{css:{'background-position':'center 0px'}});
    });

    $('#nav .logo').click(function(){
        window.open("http://vico.vw.com.cn/zh/models/beetle.html");
    });

    $('.share-icon').mouseover(function(){
        isShareOver = true;
        TweenMax.to($shares,0.4,{css:{'width':'220px'}});
        TweenMax.to($shareicons,0.4,{css:{'left':'0px','opacity':'1'}});
        TweenMax.to($language,0.4,{css:{'right':'345px'}});
        TweenMax.to($mute,0.4,{css:{'right':'395px'}});
        //$shareicons.fadeIn();
    });
    $('.share-icon').mouseout(function(){
        isShareOver=false;
        TweenMax.delayedCall(0.1,tryFadeOut);
    });
    $('.nav-share-btn').mouseover(function(){
        isShareOver = true;
    });
    $('.nav-share-btn').mouseout(function(){
        isShareOver = false;
        TweenMax.delayedCall(0.1,tryFadeOut);
    });

    $mute.click(function(){
        //alert("mute");
        globalMute = !globalMute;
        //alert(globalMute);
        if(globalMute){
            if(!useGLVideo){
                 $video.volume = 0;
            }
            console.log('mute');
            audioBg.volume = 0;
            $mute.css('background-position','center bottom');
        }else{
            if(!useGLVideo){
                 $video.volume = 0.2;
            }
            audioBg.volume = 0.2;
            console.log('unmute');
            $mute.css('background-position','center top');
        }
    });

    $language.click(function(){
        if(currentLanguage == "cn"){
            changeLanguage("en");
        }else{
            changeLanguage("cn");
        }
    });
}
function initShares(){
    $('#share-btn-1').click(function(){shareNow("twitter");});
    $('#nav-share-btn-1').click(function(){shareNow("twitter");});

    $('#share-btn-2').click(function(){shareNow("facebook");});
    $('#nav-share-btn-2').click(function(){shareNow("facebook");});

    $('#share-btn-3').click(function(){shareNow("weibo");});
    $('#nav-share-btn-3').click(function(){shareNow("weibo");});
}

//unexpand share icons
function tryFadeOut(){
    if(!isShareOver){
        // $shareicons.fadeOut();
        TweenMax.to($shares,0.4,{css:{'width':'40px'}});
        TweenMax.to($shareicons,0.4,{css:{'left':'40px','opacity':'0'}});
        TweenMax.to($language,0.4,{css:{'right':'165px'}});
        TweenMax.to($mute,0.4,{css:{'right':'215px'}});
    }
}

function shareNow(_site){
    var title = "See%20the%20car%20configurator%20site%20like%20no%20other!";
    var url ="www.bugconfigurator.com/index.php";
    var pic = "http://www.bugconfigurator.com/img/share.jpg";

    switch(_site){
        
        case "twitter":
            var via = "VWBeetle";
            window.open("https://twitter.com/share?url=http%3A%2F%2F"+url+"&hashtags=&text="+title,"_blank");
            break;
        case "facebook":
            window.open('http://www.facebook.com/sharer/sharer.php?s=100&p[url]=http://'+url+'&p[images][0]='+pic+'&p[title]='+title,'_blank');
            break;
        case "weibo":
            window.open('http://service.weibo.com/share/share.php?url=http://'+url+'&appkey=&title='+title+'&pic='+pic+'&ralateUid=&language=zh_cn',"_blank");
            break;
        case "wechat":
            break;
        default:
            break;
    }
}


//show&hide section htmls
function hideState(_hide){
    if(_hide){
        switch(currentState){
            case STATE_HERO:
                $section_home.fadeOut('slow');
                break;
            case STATE_POWER:
                $section_power.fadeOut('slow');
                break;
            case STATE_PACKAGE:
                $section_package.fadeOut('slow');
                break;
            case STATE_COLOR:
                $section_color.fadeOut('slow');
                break;
            case STATE_SHARE:
                $section_share.fadeOut('slow');
                break;
            default:
                break;
        }
    }else{
        switch(currentState){
            case STATE_HERO:
                $section_home.css('visibility','visible').hide().fadeIn(homedelay);
                break;
            case STATE_POWER:
                $section_power.css('visibility','visible').hide().fadeIn('slow');
                break;
            case STATE_PACKAGE:
                $section_package.css('visibility','visible').hide().fadeIn('slow');
                break;
            case STATE_COLOR:
                $section_color.css('visibility','visible').hide().fadeIn('slow');
                break;
            case STATE_SHARE:
                $section_share.css('visibility','visible').hide().fadeIn('slow');
                break;
            default:
                break;
        }   
    }
    
}


//back to previous section
function previouseSection(param){
    var delayed = 0.3;
    if(isColorShowing){
        isColorShowing =false;
        delayed = 0;
        for(var i=0;i<9;i++){
            TweenMax.to(colors[i],0.3,{alpha:0});
        }
    }
    TweenMax.delayedCall(delayed,function(){
        if(prevSource == videos.pack1){
            playMovie(param,videos.back1);
        }else if(prevSource == videos.pack2){
            playMovie(param,videos.back2);
        }else{
            playMovie(param,videos.back3);
        }
    });
}



function initAudio(){
    audioBg = document.getElementById('audio-bg');

    audioBg.addEventListener('ended',function(){
        this.currentTime = 0;
        this.play();
    });

    audioOver=document.getElementById('audio-over');
    audioOver.volume = 0.5;
    audioFeature=document.getElementById('audio-feature');

    audioFeature.addEventListener('ended',function(){
        this.currentTime = 0;
        this.play();
    });

    $('.over-btn').mouseover(function(){ 
        if(!globalMute){
            audioOver.play();
        }
    });
}





//animate loop renderer.render();
function animate() {
    requestAnimFrame(animate);
    // render the stage
    graphics.clear();
    for(var i=0;i<10;i++){
        btns[i].visible =false;
    }


    if(isPlaying && useGLVideo){

        if(movieSprite.texture.baseTexture.hasLoaded){
            outputSprite.alpha =0;
            if(globalMute){
                movieSprite.texture.baseTexture.source.volume = 0;
            }else{
                movieSprite.texture.baseTexture.source.volume = 0.6;
            }
        }else{
            outputSprite.alpha =1;
            movieSprite.texture.baseTexture.source.volume = 0;
        }
    }


    if((prevSource == videos.pack1 || prevSource == videos.pack2 || prevSource == videos.pack3) && isPlaying){
        var percent;
        if(useGLVideo){
            percent = movieSprite.texture.baseTexture.source.currentTime/movieSprite.texture.baseTexture.source.duration;
        }else{
            percent = $video.currentTime/$video.duration;
        }
        if(isNaN(percent)){
            percent = 0;
        }

        if(percent >5){
            outputSprite.alpha = 0;
        }
        if(!triedShowingHTML){
            if(prevSource == videos.pack1){
                if(percent > 0.85){
                    triedShowingHTML = true;
                    showCurrentHtml(true);
                }
            }else if(prevSource == videos.pack2){
                if(percent > 0.8){
                    triedShowingHTML = true;
                    showCurrentHtml(true);
                }
            }else{
                if(percent > 0.8){
                    triedShowingHTML = true;
                    showCurrentHtml(true);
                }
            }
        }

        var frame,currentHsp;

        var btnsSubset,pbs;
        var isOutFrames =false;
        frame = 0;

        if(prevSource == videos.pack1){
            frame = Math.floor(percent * 394);
            if(frame > 322)frame = 0;
            if(frame<83||frame>244)isOutFrames = true;
            if(!isOutFrames){
                currentHsp = hsp1;
                btnsSubset = [btns[0],btns[1],btns[2],btns[3],btns[4]];
                pbs = [ currentHsp[frame-83].p0,currentHsp[frame-83].b0,
                    currentHsp[frame-83].p1,currentHsp[frame-83].b1,
                    currentHsp[frame-83].p2,currentHsp[frame-83].b2,
                    currentHsp[frame-83].p3,currentHsp[frame-83].b3,
                    currentHsp[frame-83].p4,currentHsp[frame-83].b4];
            }
        }else if(prevSource == videos.pack2){
            frame = Math.floor(percent * 276);
            if(frame >204)frame =0;
            if(frame<36||frame>138)isOutFrames = true;
            if(!isOutFrames){
                currentHsp = hsp2;
                btnsSubset = [btns[5],btns[6],btns[7]];
                pbs = [ currentHsp[frame-36].p0,currentHsp[frame-36].b0,
                        currentHsp[frame-36].p1,currentHsp[frame-36].b1,
                        currentHsp[frame-36].p2,currentHsp[frame-36].b2];
            }
        }else{
            frame = Math.floor(percent * 315);
            if(frame >243)frame =0;
            if(frame<87||frame>182)isOutFrames = true;
            if(!isOutFrames){
                currentHsp = hsp3;
                btnsSubset = [btns[8],btns[9]];
                pbs = [ currentHsp[frame-87].p0,currentHsp[frame-87].b0,
                        currentHsp[frame-87].p1,currentHsp[frame-87].b1];
            }
        }
        
        if(!isOutFrames){
            for(var i = 0;i<pbs.length/2;i++){
                if(pbs[i*2].x !=0 && pbs[i*2].y !=0){
                    var btnoffsetX,btnoffsetY;
                    btnoffsetX = 0;
                    if(pbs[i*2].y > pbs[i*2+1].y){
                        btnoffsetY = 32;
                    }else{
                        btnoffsetY = 0;
                    }

                    graphics.lineStyle(2,0xffffff,1);
                    graphics.moveTo(stageWidth/2 + (pbs[i*2].x-640) * scale,stageHeight/2 +(pbs[i*2].y - 360)*scale);
                    graphics.lineTo(stageWidth/2 + (pbs[i*2+1].x-640) * scale - btnoffsetX,stageHeight/2 +(pbs[i*2+1].y - 360)*scale)+ btnoffsetY;

                    graphics.lineStyle(0,0,0);
                    graphics.beginFill(0xffffff,1);
                    graphics.drawCircle(stageWidth/2 + (pbs[i*2].x-640) * scale,stageHeight/2 +(pbs[i*2].y - 360)*scale,6);
                    graphics.endFill();
                    graphics.beginFill(0xffffff,0.4);
                    graphics.drawCircle(stageWidth/2 + (pbs[i*2].x-640) * scale,stageHeight/2 +(pbs[i*2].y - 360)*scale,16);
                    graphics.endFill();
                    btnsSubset[i].visible = true;
                    
                    btnsSubset[i].position.x = stageWidth/2 + (pbs[i*2+1].x-640) * scale;
                    btnsSubset[i].position.y = stageHeight/2 +(pbs[i*2+1].y - 360)*scale;
                }
            }
        }
        
    }

    renderer.render(stage);
}



function playMovie(_state,_srcURL,pauseMusic){
    isDuringMovie =true;
    triedShowingHTML = false;

    if(pauseMusic){
        audioBg.pause();
    }
    if(_srcURL == null){
        currentState = _state;
        isDuringMovie =false;
        showCurrentHtml();
        return;
    }

    $nav.fadeOut('slow');
    prevSource = _srcURL;
    currentState = _state;

    if(useGLVideo){
    	var prevtexture = movieSprite.texture;
	    prevtexture.destroy(true);
	    prevtexture = null;

	    var movieTexture = PIXI.VideoTexture.fromUrl(_srcURL);

	    movieSprite.setTexture(movieTexture);
	    movieTexture.baseTexture.source.addEventListener('play',onPlayStart);
	    movieTexture.baseTexture.source.addEventListener('playing',onPlaying);
	    movieTexture.baseTexture.source.addEventListener('waiting',onWaiting);
	    movieTexture.baseTexture.source.addEventListener('ended',onPlayEnded);
    }else{
    	$video.setAttribute('src', _srcURL);
	    $video.addEventListener('play',onPlayStart);
	    $video.addEventListener( 'canplaythrough', onCanPlayThrough);
	    $video.addEventListener('playing',onPlaying);
	    $video.addEventListener('waiting',onWaiting);
	    $video.addEventListener('ended',onPlayEnded);
	    $video.play();
    }
    
}


function onCanPlayThrough(){
    outputSprite.alpha = 0;
    renderer.render(stage);
    this.removeEventListener( 'canplaythrough', onCanPlayThrough);
}

function onPlayStart(){
    this.removeEventListener('play',onPlayStart);
    isPlaying = true;
}

function onPlaying(){
    $loading.hide();
    if(!useGLVideo){
    	outputSprite.alpha = 0;
    	graphicsContainer.alpha = 1;


    }
}
function onWaiting(){
    $loading.show();
    if(!useGLVideo){
    	graphicsContainer.alpha = 0;
    }
}

function onPlayEnded(){
    if(prevSource == videos.intro && !useGLVideo){
        requestAnimFrame(animate);
    }

    if(prevSource == videos.intro){
        movieClip.alpha = 1;
        movieClip.gotoAndPlay(8);
    }

    if(prevSource == videos.pack1 || prevSource == videos.pack2 || prevSource == videos.pack3){
        if(!triedShowingHTML){
            showCurrentHtml(true);
        }
    }else{
        var delay = 0;
        if(prevSource == videos.intro){
            delay = 0.5;
        }
        TweenMax.delayedCall(delay,function(){
            showCurrentHtml(true);
        });
        
    }
    isPlaying = false;
    isDuringMovie =false;
    this.removeEventListener('waiting',onWaiting);
    this.removeEventListener('playing',onPlaying);
    this.removeEventListener('ended',onPlayEnded);
    isPowerClicked =false;

    if(useGLVideo){
    	renderTexture.render(movieSprite);
	    //console.log('onstop');
	    outputSprite.alpha = 1;
	    var movieTexture = movieSprite.texture;
	    movieTexture.destroy(true);
	    movieTexture = null;
	    movieSprite.texture = PIXI.Texture.emptyTexture;
    }else{
    	outputSprite.setTexture(getCurrentTexture());
    	TweenMax.to(outputSprite,0.2,{alpha:1});
    }
    
}
function getCurrentTexture(){
    //return textures[0];
    if(currentState == STATE_HERO){
        return textures[9];
    }else if(currentState == STATE_POWER|| currentState== STATE_PACKAGE){
        return textures[10];
    }else if(currentState ==STATE_COLOR){
        if(prevSource == videos.pack1){
            return textures[0];
        }else if(prevSource == videos.pack2){
            return textures[3];
        }else{
            return textures[6];
        }
    }
}

function powerMovie(_srcURL){
    if(isDuringMovie){
        prevSource = _srcURL;
        if(useGLVideo){
        	renderTexture.render(movieSprite);
	        outputSprite.alpha = 1;
	        var movieTexture = movieSprite.texture;
	        movieTexture.baseTexture.source.removeEventListener('ended',onPowerEnded);
	        movieTexture.destroy(true);
	        movieTexture = null;
	        movieSprite.texture = PIXI.Texture.emptyTexture;
        }else{
        	$video.removeEventListener('ended',onPowerEnded);
        }
        
    }
    isDuringMovie = true;
    if(useGLVideo){
    	var movieTexture = PIXI.VideoTexture.fromUrl(_srcURL);
	    movieSprite.setTexture(movieTexture);
	    movieTexture.baseTexture.source.addEventListener('play',onPowerStart);
	    movieTexture.baseTexture.source.addEventListener('playing',onPlaying);
	    movieTexture.baseTexture.source.addEventListener('waiting',onWaiting);
	    movieTexture.baseTexture.source.addEventListener('ended',onPowerEnded);
    }else{
    	outputSprite.alpha = 1;
    	$video.setAttribute('src', _srcURL);
	    $video.addEventListener('play',onPowerStart);
	    $video.addEventListener( 'canplaythrough', onCanPlayThrough);
	    $video.addEventListener('playing',onPlaying);
	    $video.addEventListener('waiting',onWaiting);
	    $video.addEventListener('ended',onPowerEnded);
	    $video.play();
    }
    
}

function onPowerStart(){
    this.removeEventListener('play',onPowerStart);
    isDuringMovie = true;
    isPlaying = true;
}

function onPowerEnded(){
    isDuringMovie = false;
    isPlaying = false;
    this.removeEventListener('waiting',onWaiting);
    this.removeEventListener('playing',onPlaying);
    this.removeEventListener('ended',onPowerEnded);
    if(powerNextState){
        playMovie(STATE_PACKAGE,null);
        $nav.fadeIn('slow');
        powerNextState = false;
        isPowerClicked =false;
    }

    if(useGLVideo){
    	renderTexture.render(movieSprite);
	    outputSprite.alpha = 1;
	    var movieTexture = movieSprite.texture;
	    movieTexture.destroy(true);
	    movieTexture = null;
	    movieSprite.texture = PIXI.Texture.emptyTexture;
    }else{
    	outputSprite.setTexture(getCurrentTexture());
    	TweenMax.to(outputSprite,0.2,{alpha:1});
    }
    
}





var username_text = "", mobile_text = "", email_text = "", buytime_text = -1, buybudget_text = -1,dealer_text = 0,dealerprovince_text = 0,dealercity_text = 0;
        function username_blur(obj) {
            if(username_text != obj)
                // dataLayer.push({ 'event': 'event', 'cat': 'reg_form', 'act': 'name', 'lbl': '' });
            username_text = obj;
        }
        function mobile_blur(obj) {
            if(mobile_text != obj)
                // dataLayer.push({ 'event': 'event', 'cat': 'reg_form', 'act': 'phone', 'lbl': '' });
            mobile_text = obj;
        }
        function email_blur(obj)
        {
            if(email_text != obj)
                // dataLayer.push({ 'event': 'event', 'cat': 'reg_form', 'act': 'email', 'lbl': '' });
            email_text = obj;   
        }
        function buytime_change(obj) {
            if(buytime_text != obj)
            {
                // dataLayer.push({ 'event': 'event', 'cat': 'reg_form', 'act': 'time', 'lbl': '' });
                buytime_text = obj;
            }
        }
        function buybudget_change(obj) {
            if(buybudget_text != obj)
                // dataLayer.push({ 'event': 'event', 'cat': 'reg_form', 'act': 'budget', 'lbl': '' });
            buybudget_text = obj;
        }
        function dealer_change(obj) {
            if(dealer_text != obj)
                // dataLayer.push({ 'event': 'event', 'cat': 'reg_form', 'act': 'dealer', 'lbl': '' });
            dealer_text = obj;
        }
        function dealerprovince_change(obj) {
            if(dealerprovince_text != obj)
                // dataLayer.push({'event':'event','cat':'reg_form','act':'province','lbl':''});
            dealerprovince_text = obj;
        }
        function dealercity_change(obj) {
            if(dealercity_text != obj)
                // dataLayer.push({'event':'event','cat':'reg_form','act':'town','lbl':''});
            dealercity_text = obj;
        }
        //绑定省市经销商
        $(document).ready(function () {
            // dataLayer.push({ 'event': 'page', 'branch': 'testdrive', 'section': '', 'pname': '' });
            $.ajax({
                type: "get",
                url: "assets/dealer.json",
                dataType: "text",
                success: function (data, textStatus) {
                    var obj = eval("(" + data + ")");
                    if (obj != 0) {
                        ProvinceCity($("#dealerprovince"), $("#dealercity"), $("#dealer"), obj.Location.State);
                    }
                    else
                        alert('读取省市、经销商失败！');
                },
                error: function () {
                    alert("出错了");

                }
            });
        });

        function checkinfo() {
            // dataLayer.push({ 'event': 'event', 'cat': 'reg_form', 'act': 'submit', 'lbl': '' });
            if ($(".copyright input").attr('checked')) {
                var username = $('input[name="username"]').val().replace(/^\s+/, "");
                if (username == "") {
                    alert('请填写姓名！');
                    return;
                }
                if (username.length > 8) {
                    alert('姓名最多8个汉字');
                    return;
                }
                var gender = $('select[name="gender"] option:selected').text();
                var regex = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
                var mobile = $('input[name="mobile"]').val();
                if (mobile == "") {
                    alert('请填写手机号码！');
                    return;
                }
                if (!regex.exec(mobile)) {
                    alert('手机号码不正确！');
                    return;
                }
                var regex_email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                var email = $('input[name="email"]').val();
                if (email == "") {
                    alert('请输入您的电子邮箱');
                    return;
                }
                if (!regex_email.exec(email)) {
                    alert('邮件地址不正确');
                    return;
                }
                var dealerprovince = $('select[name="dealerprovince"] option:selected').val();
                var dealercity = $('select[name="dealercity"] option:selected').val();
                if (dealercity == 0) {
                    alert('请选择您所在省份城市');
                    return;
                }
                var dealer = $('select[name="dealer"] option:selected').val();
                if (dealer == 0) {
                    alert('请选择您的意向经销商');
                    return;
                }

                var Series = $('select[name="Series"] option:selected').val();
                if (Series == -1) {
                    alert('请选择试驾的车型！');
                    return;
                }

                var buytime = $('select[name="buytime"] option:selected').val();
                if (buytime == -1) {
                    alert('请选择预计购车时间');
                    return;
                }
                var buybudget = $('select[name="buybudget"] option:selected').val();
                if (buybudget == -1) {
                    alert('请选择预计购车预算');
                    return;
                }
                var fd = new FormData();
                fd.append("id", 124);
                fd.append("username", username);
                fd.append("gender", gender);
                fd.append("email", email);
                fd.append("source", $.cookie('utm_source'));
                fd.append("channel", $.cookie('utm_medium'));
                fd.append("mobile", mobile);
                fd.append("dealerprovince", dealerprovince);
                fd.append("dealercity", dealercity);
                fd.append("dealer", dealer);
                fd.append("Series", Series);
                fd.append("buytime", buytime);
                fd.append("buybudget", buybudget);
                fd.append("sitesource","campaign wapsite");
                fd.append("utm_campaign",$.cookie('utm_campaign'));
                fd.append("utm_term",$.cookie('utm_term'));
                fd.append("utm_content",$.cookie('utm_content'));
                $.ajax({
                    type: "POST",
                    url: "submit_yuyueshijia.php",
                    data: fd,
                    processData: false,  // tell jQuery not to process the data
                    contentType: false,   // tell jQuery not to set contentType
                    success: function (data, textStatus) {
                        //alert(data);
                        var obj = eval("(" + data + ")");
                        if (obj.status == 1) {
                            $('input[name="username"]').val("");
                            $('input[name="mobile"]').val("");
                            $('input[name="email"]').val("");
                            $("#dealerprovince  option[value='0'] ").attr("selected", true);
                            $("#dealercity").empty();
                            $("#dealer").empty();
                            $("#dealercity").append("<option value='0'>请选择</option>");
                            $("#dealer").append("<option value='0'>请选择</option>");
                            $("#Series  option[value='-1'] ").attr("selected", true);
                            $("#buytime  option[value='-1'] ").attr("selected", true);
                            $("#buybudget  option[value='-1'] ").attr("selected", true);

                            alert("提交成功");
                        }
                        else
                            alert(obj.errormess);
                    },
                    complete: function (XMLHttpRequest, textStatus) {

                    },
                    error: function () {
                        alert("出错了");
                    }
                });
            }
            else
                alert('no checked!');
        }





