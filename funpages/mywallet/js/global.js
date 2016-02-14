

function log(msg) {
	if (window["console"]) {
		if ((typeof msg) == "string") {
			console.log(msg);
		} else {
			console.log(String(msg));
		};
	}
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURI(r[2]);
	return null;
}

function ismobile() {

	var ismobile = (/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase()));
	var istablet = (/ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase()));
	if ((/tablet pc/i.test(navigator.userAgent.toLowerCase()))) {istablet = false;}
	if(ismobile || istablet) return true;
	else return false;

}

function isIEMobile() {
    var regExp = new RegExp("IEMobile", "i");
    if (navigator.userAgent.match(regExp) == "IEMobile")
    {
		return true;
    }
	else
	{
		return false;
	}
}