$(function(){
	var DDS = {};
	var Video = function() {
			var setting = $.extend({},{
				platformType: 'ios',
				roomType: '',
				app_id: '101',
				player_type: 'h5',
				alias: 'stream_alias_817050982_59591',
				token: '56a0be639a9f89ff7ab2d6c04ace1015',
    			container: $('#DDS_videoPlayer'),
				playlistUrl: 'http://lapi.xiu.youku.com/v1/get_playlist?',
				loadingEvts: ["loadstart", "progress", "suspend", "abort", "loadedmetadata", "loadeddata", "waiting", "canplay", "canplaythrough", "seeking", "seeked", "ended", "ratechange", "durationchange", "canplaythrough", "error", "stalled"],
				playingEvts: ["playing", "pause", "timeupdate"]
			});

			for(var name in setting){
				this[name] = setting[name];
			}
			this.init();
	}

	Video.prototype = {
		init : function() {
			this.platformType = this.judgePlatform();
			this.createDom();
			this.addEvent();
			this.loadData();
		},
		createDom: function() {
			var videoWidth = this.container.width();

	        var videoHeight = videoWidth*9/16;
        	if(this.roomType != 'livehouse') {
        		videoHeight = videoWidth * 3 / 4;
        	}
	        this.container.height(videoHeight);
			this.video = this.container.find("video");	

			this.changeUrlButton = $('#changeUrlButton');
			this.urlInput = $('#room-url');
		},
		addEvent: function() {
			var self = this;
			this.changeUrlButton.on('click', function(){
				var url = self.urlInput.val();
				self.video.attr('src', url);
				self.video[0].play();
			});

			window.onload = function(){

			  var myAudio = document.getElementById('video');

			  myAudio.addEventListener('progress', function() {
			    var bufferedEnd = myAudio.buffered.end(myAudio.buffered.length - 1);
			    var duration =  myAudio.duration;
			    if (duration > 0) {
			      document.getElementById('buffered-amount').style.width = ((bufferedEnd / duration)*100) + "%";
			    }
			  });

			  myAudio.addEventListener('timeupdate', function() {
			    var duration =  myAudio.duration;
			    if (duration > 0) {
			      document.getElementById('progress-amount').style.width = ((myAudio.currentTime / duration)*100) + "%";
			    }
			  });
			}
		},
		loadData: function() {
			var _this = this;
			var roomid = $('#room-id').val();

			var url = 'https://creeper-xushuwei.rhcloud.com/videooption?roomid=' + roomid;
			 $.ajax({
	            url: url,
	            data: {
	             
	            },
	            type:'GET',
	            cache:false,
	            success:function(data) {
		            eval(data);
		            _this.app_id = DDS.videoOption.appId;
					_this.player_type= 'h5';
					_this.alias =  DDS.videoOption.initAlias;
					_this.token =  DDS.videoOption.initToken;
					_this.getVideoUrl();
	            },
	            error:function(data){
	            }
	        });
		},
		getVideoUrl:function() {
			var self = this;
			var _w = this.container.width(),
	            _h =_w/16*9;

	        $.ajax({
	            url:this.playlistUrl,
	            data: {
	                app_id : this.app_id,
	                player_type : this.player_type,
	                alias : this.alias,
	                token : this.token
	            },
	            type:'GET',
	            cache:false,
	            dataType:'jsonp',
	            success:function(data) {
	            	console.log(data);
	                if(data.error_code==0) {
	                  	var _url = data.url_list[0].url;
	                  	self.video.attr('src', _url);
	                }
	            },
	            error:function(data){
	            }
	        });
		},
		judgePlatform: function(){
            var ua = navigator.userAgent;
                // ios
            if (ua.match(/(iPhone|iPod|iPad);?/i)) {
                return 'ios';
            } else if (ua.match(/Android/i)) {
                return 'android';
            } else {
                return '';
            }
        }
	}

	window.video = new Video();
});