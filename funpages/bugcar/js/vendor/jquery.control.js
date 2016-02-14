
// the bug
// $(function(){
// 	_b.init();
// });
var _b = {
	// init: function(){
	// 	$(".far").animate({
	// 				width: 600,
	// 				height: 450,
	// 				left: 0,
	// 				top: 0
	// 			}, 500, "easeInOutBack",  function(){
	// 				$(this).addClass("on");
	// 				$(this).removeAttr("style");
	// 				$(".diy").removeClass("hidden");
	// 			});
	// },
	focus: function(){
		$(".guang").fadeIn(1);
		$(".guang").animate({
			width: "1280px",
			height: "1280px",
			left: "-640px",
			top: "0"
		}, 200, function(){
			$(".guang").fadeOut(50).removeAttr("style");
		});
	},
	shakeRightBottom: function(){
		setTimeout(function(){
			$("."+car_model+" .far").transition({
								left: +5,
								top: -1
							}, 60, function(){
								$("."+car_model+" .far").transition({
									left: -3,
									top: +1
								}, 30, function(){
									$("."+car_model+" .far").transition({
										left: +2,
										top: -1
									}, 20, function(){
										$("."+car_model+" .far").removeAttr("style");
									});
								});
							});
			$("."+car_model+" .diyFocus").each(function(){
				if($(this).hasClass("hasAct"))
				{
					$(this).transition({
								left: +5,
								top: -1
							}, 60, function(){
								$(this).transition({
									left: -3,
									top: +1
								}, 30, function(){
									$(this).transition({
										left: +2,
										top: -1
									}, 20, function(){
										//$(this).transition({left:0,top:0},10);
										$(this).css({left:0,top:0})
									});
								});
							});
				}
			});
			//_b.focus();
		}, 10);
	},
	diy: function(i){
		if($(".diyFocus.d"+i).hasClass('hasAct')){
			var t = "0px";
			var l = "-640px"
			if(i==1){
				t="-500px";
			}
			if(i == 4 || i == 8){
				t ="-500px";
				l = "640px"
			}
			if(i==2 || i == 6){
				l = "640px"
			}
			$(".diyFocus.d"+i).css("transition","none").animate({left:l,top:t}, 200, "easeInQuart", function(){
				$(this).removeClass('hasAct');
			});
		}else{
			$(".diyFocus.d"+i).animate({
				left: 0,
				top: 0
			}, 450, "easeInQuart", function(){
				$(this).addClass("hasAct");
				_b.shakeRightBottom();
				
			});
		}
			
	}
}