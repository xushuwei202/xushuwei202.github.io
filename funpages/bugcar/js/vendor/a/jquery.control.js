// JavaScript Document
var utm_source = "", utm_medium = "", utm_campaign = "", utm_term = "", utm_content = "", url_param = "";
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function _uGC(l, n, s) {
    if (!l || l == "" || !n || n == "" || !s || s == "") return "-";
    var i, i2, i3, c = "-";
    i = l.indexOf(n);
    i3 = n.indexOf("=") + 1;
    if (i > -1) {
        i2 = l.indexOf(s, i); if (i2 < 0) { i2 = l.length; }
        c = l.substring((i + i3), i2);
    }
    return c;
}
$(function () {
    var u_s = "(direct)";
    var u_c = "(none)";
    var ref = document.referrer;
    //if (ref) {
    //    u_s = "http://" + ref.split("/")[2] + "/";
    //    u_c = 'referral';
    //}
    utm_source = getQueryString("utm_source") || u_s;
    utm_medium = getQueryString("utm_medium") || u_c;
    utm_campaign = getQueryString("utm_campaign") || '';
    utm_term = getQueryString("utm_term") || '';
    utm_content = getQueryString("utm_content") || '';

    if (utm_source == "" && utm_medium == "") {
        utm_source = _uGC(utmz, "utmcsr", "|");
        utm_medium = _uGC(utmz, "utmcmd", "|");
    }

    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核                
                presto: u.indexOf('Presto') > -1, //opera内核                
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                
                mobile: !!u.match(/AppleWebKit.*Mobile/) || !!u.match(/Windows Phone/) || !!u.match(/Android/) || !!u.match(/MQQBrowser/), //是否为移动终端                
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器                
                iPad: u.indexOf('iPad') > -1, //是否iPad                
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部            
            };
        }()
    }

    if (utm_campaign != "")
        url_param += "?utm_campaign=" + utm_campaign;
    if (utm_term != "") {
        if (url_param != "")
            url_param += "&utm_term=" + utm_term;
        else
            url_param += "?utm_term=" + utm_term;
    }
    if (utm_content != "") {
        if (url_param != "")
            url_param += "&utm_content=" + utm_content;
        else
            url_param += "?utm_content=" + utm_content;
    }
    
    if ($.cookie('utm_source') == null) {
        $.cookie('utm_source', '' + utm_source + '', { expires: 365 });
    }
    else {
        if ($.cookie('utm_source') != utm_source && utm_source != "(direct)")
            $.cookie('utm_source', '' + utm_source + '', { expires: 365 });
    }

    if ($.cookie('utm_medium') == null) {
        $.cookie('utm_medium', '' + utm_medium + '', { expires: 365 });
    }
    else {
        if ($.cookie('utm_medium') != utm_medium && utm_medium != "(none)")
            $.cookie('utm_medium', '' + utm_medium + '', { expires: 365 });
    }

    if (utm_source != "(direct)") {
        if (url_param != "")
            url_param += "&utm_source=" + utm_source;
        else
            url_param += "?utm_source=" + utm_source;
    }
    if (utm_medium != "(none)") {
        if (url_param != "")
            url_param += "&utm_medium=" + utm_medium;
        else
            url_param += "?utm_medium=" + utm_medium;
    }

            $.cookie('utm_campaign', '' + utm_campaign + '', { expires: 365 });
            $.cookie('utm_term', '' + utm_term + '', { expires: 365 });
            $.cookie('utm_content', '' + utm_content + '', { expires: 365 });
        
    
    //if (browser.versions.iPad) {
    //    //存cookie
    //    //如果传递了参数
    //    if (url_param != "") {
    //        $.cookie('utm_campaign', '' + utm_campaign + '', { expires: 365 });
    //        $.cookie('utm_term', '' + utm_term + '', { expires: 365 });
    //        $.cookie('utm_content', '' + utm_content + '', { expires: 365 });
    //    }
    //}
    //else {
    //    //电脑
    //    window.location.href = "http://www.vwbeetle.cn/pc/" + url_param;
    //}
});


//var url = location.href;
//var pos = url.indexOf("?");
//var str = "";
//if (pos != -1) {
//    str = url.substr(pos);
//}
//if (browser.versions.ios || browser.versions.android || browser.versions.iPhone || browser.versions.iPad) {
//    //手机 
//    window.location.href = "/valentine/mobi/" + str;
//} else {
//    //电脑
//    // window.location.href = "/xingzuo/" + str;
//}

$(function () {
    //var picsize = $('#downLoadMain .pic').size();
    //$("#count").html("1/"+picsize);
   // if ($("#slider_big a").size() > 0) {
//
//        var str = $("#slider_big").html();
//        $("#slider_small").html(str);
//
//
//        $('#slider_big').slidesjs({
//            width: 507,
//            height: 472,
//            callback: {
//                complete: function (n) {
//                    $("#slider_small a").removeClass("cur");
//                    $("#slider_small a").eq(n - 1).addClass("cur");
//                }
//            }
//        });
//        $("#slider_small a").eq(0).addClass("cur");
//        $("#slider_small a").click(function () {
//            var index = $(this).index();
//            $(".slidesjs-pagination li").eq(index).find("a").click();
//        });
//    }
//
//    $(window).bind('orientationchange', function (e) {
//        ort();
//    });
//    function ort() {
//        if (window.orientation == 0 || window.orientation == 180) {
//          //  $("#view-potrait").show();
//        } else {
//         //   $("#view-potrait").hide();
//        }
//    }
//    ort();
});