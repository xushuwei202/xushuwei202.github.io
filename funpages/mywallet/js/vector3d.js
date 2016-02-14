var HVector = (function () {
	function HVector (x, y, z) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}
	HVector.prototype = {
		scale : function (sc) {
			var s = this;
			s.x *= sc;
			s.y *= sc;
			s.z *= sc;
		},
		getLength : function () {
			var s = this;
			return Math.sqrt (s.x*s.x + s.y*s.y + s.z*s.z);
		},
		setLength : function (len) {
			var s = this;
			var r = s.getLength();
			r ? s.scale(len/r) : x = len;
		},
		dot : function (v) {
			var s = this;
			return s.x*v.x+s.y*v.y+s.z*v.z;
		},
		cross : function (v) {
			var s = this;
			var cx = s.y * v.z - s.z * v.y;
			var cy = s.z * v.x - s.x * v.z;
			var cz = s.x * v.y - s.y * v.x;
			return new HVector(cx, cy, cz);
		},
		angleBetween : function (v) {
			var s = this;
			var dp = s.dot (v);
			var cosAngle = dp / (s.getLength() * v.s.getLength());
			return HDegree.acosD (cosAngle);
		},
		getPerspective : function (radio) {
			var s = this;
			radio = radio ? radio : 300;
			return radio / (s.z + radio);
		},
		persProject : function (radio) {
			var s = this;
			radio = radio ? radio : s.getPerspective();
			s.x *= radio;
			s.y *= radio;
			s.z = 0;
		},
		persProjectNew : function (radio) {
			var s = this;
			radio = radio ? radio : s.getPerspective();
			var vector = {x:radio*s.x,y:radio*s.y};
			return vector;
			//return new HVector (radio*s.x, radio*s.y, 0);
		},
		rotateX : function (ang) {
			var s = this;
			var ca = HDegree.cosD (ang);
			var sa = HDegree.sinD (ang);				
			s.rotateXTrig(ca, sa);
		},
		rotateXTrig : function (ca,sa) {
			var s = this;
			var ry = s.y * ca - s.z * sa;
			var rz = s.y * sa + s.z * ca;
			s.y = ry;
			s.z = rz;
		},
		getAngleX : function () {
			var s = this;
			return HDegree.atan2D(s.z, s.y);
		},
		setAngleX : function (ang) {
			var s = this;
			var r = Math.sqrt (s.y*s.y + s.z*s.z);
			s.y = r * HDegree.cosD (ang);
			s.z = r * HDegree.sinD (ang);
		},
		rotateY : function (ang) {
			var s = this;
			var ca = HDegree.cosD (ang);
			var sa = HDegree.sinD (ang);
			s.rotateYTrig(ca, sa);
		},
		rotateYTrig : function (ca,sa) {
			var s = this;
			var rx = s.x * ca + s.z * sa;
			var rz = s.x * -sa + s.z * ca;
			s.x = rx;
			s.z = rz;
		},
		getAngleY : function () {
			var s = this;
			return HDegree.atan2D (s.z, s.x);
		},
		setAngleY : function (ang) {
			var s = this;
			var r = Math.sqrt (s.x*s.x + s.z*s.z);
			s.x = r * HDegree.cosD (ang);
			s.z = r * HDegree.sinD (ang);
		},
		rotateZ : function (ang) {
			var s = this;
			var ca = HDegree.cosD (ang);
			var sa = HDegree.sinD (ang);				
			s.rotateZTrig(ca, sa);
		},
		rotateZTrig : function (ca,sa) {
			var s = this;
			var rx = s.x * ca - s.y * sa;
			var ry = s.x * sa + s.y * ca;
			s.x = rx;
			s.y = ry;
		},
		getAngleZ : function () {
			var s = this;
			return HDegree.atan2D (s.y, s.x);
		},
		setAngleZ : function (ang) {
			var s = this;
			var r = Math.sqrt (s.y*s.y + s.x*s.x);
			s.y = r * HDegree.cosD (ang);
			s.x = r * HDegree.sinD (ang);
		},
		rotateXY : function (a,b) {
			var s = this;
			var ca = HDegree.cosD (a);
			var sa = HDegree.sinD (a);
			var cb = HDegree.cosD (b);
			var sb = HDegree.sinD (b);
			s.rotateXYTrig(ca, sa, cb, sb);
		},
		rotateZTrig : function (ca,sa) {
			var s = this;
			// x-axis rotation
			var rz = s.y * sa + s.z * ca;
			s.y = s.y * ca - s.z * sa;
			// y-axis rotation
			s.z = s.x * -sb + rz * cb;
			s.x = s.x * cb + rz * sb;
		},
		rotateXY : function (a,b) {
			var s = this;
			var ca = HDegree.cosD (a);
			var sa = HDegree.sinD (a);
			var cb = HDegree.cosD (b);
			var sb = HDegree.sinD (b);
			s.rotateXYTrig(ca, sa, cb, sb);
		},
		rotateXYTrig : function (ca, sa, cb, sb) {
			var s = this;
			// x-axis rotation
			var rz = s.y * sa + s.z * ca;
			s.y = s.y * ca - s.z * sa;
			// y-axis rotation
			s.z = s.x * -sb + rz * cb;
			s.x = s.x * cb + rz * sb;
		},
		rotateXYZ : function (a,b,c) {
			var s = this;
			var ca = HDegree.cosD (a);
			var sa = HDegree.sinD (a);
			var cb = HDegree.cosD (b);
			var sb = HDegree.sinD (b);
			var cc = HDegree.cosD (c);
			var sc = HDegree.sinD (c);
			s.rotateXYZTrig(ca, sa, cb, sb, cc, sc);
		},
		rotateXYZTrig : function (ca, sa, cb, sb,cc,sc) {
			var s = this;
			// x-axis rotation
			var ry = s.y * ca - s.z * sa;
			var rz = s.y * sa + s.z * ca;
			// y-axis rotation
			var rx = s.x * cb + rz * sb;
			s.z = s.x * -sb + rz * cb;
			// z-axis rotation
			s.x = rx * cc - ry * sc;
			s.y = rx * sc + ry * cc;
		}
	};
	return HVector;
})();
var HDegree = (function () {
	function HDegree () {
	}
	HDegree.sinD = function (angle) {
		return Math.sin (angle * (Math.PI / 180));
	};
	HDegree.cosD = function (angle) {
		return Math.cos (angle * (Math.PI / 180));
	};	
	HDegree.tanD = function (angle) {
		return Math.tan (angle * (Math.PI / 180));
	};
	HDegree.asinD = function (ratio) {
		return Math.asin (ratio) * (180 / Math.PI);
	};
	HDegree.acosD = function (ratio) {
		return Math.acos (ratio) * (180 / Math.PI);
	};
	HDegree.atanD = function (ratio) {
		return Math.atan (ratio) * (180 / Math.PI);
	};
	HDegree.atan2D = function (y,x) {
		return Math.atan2 (y, x) * (180 / Math.PI);
	};
	HDegree.distance = function  (x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.sqrt (dx*dx+dy*dy);
	};
	return HDegree;
})();