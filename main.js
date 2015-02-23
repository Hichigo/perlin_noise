var cnv = document.getElementById('cnv'),
		w = cnv.width = 900,
		h = cnv.height = 900,
		ctx = cnv.getContext('2d');


var image = ctx.getImageData(0,0,w,h);
var pixel = image.data;
var obj = [];


for(var y = 0; y < h; y++) {
	obj[y] = [];
	for(var x = 0; x < w; x++) {
		obj[y][x] = 0;
	}
}

//for(y = 0; y < h; y++) {
//	for(x = 0; x < w; x++) {
//		var r = ((w * y) + x) * 4;
//		var g = r + 1;
//		var b = r + 2;
//		var a = r + 3;
//		pixel[r] = obj[y][x];
//		pixel[g] = obj[y][x];
//		pixel[b] = obj[y][x];
//		pixel[a] = 255;
//	}
//}
//
var leftTop = {
	x: 0,
	y: 0
};

var rightTop = {
	x: w-1,
	y: 0
};

var leftBot = {
	x: 0,
	y: h-1
};

var rightBot = {
	x: w-1,
	y: h-1
};

init();
midFourPoint(leftTop, rightBot, 10);

for(y = 0; y < h; y++) {
	for(x = 0; x < w; x++) {
		var r = ((w * y) + x) * 4;
		var g = r + 1;
		var b = r + 2;
		var a = r + 3;
		pixel[r] = obj[y][x];
		pixel[g] = obj[y][x];
		pixel[b] = obj[y][x];
		pixel[a] = 255;
	}
}

ctx.putImageData(image, 0, 0);

function midFourPoint(lt, rb, itr) {
	if(itr <= 0) {
		return;
	}
	
	var center = {
		x: (lt.x + rb.x) / 2,
		y: (lt.y + rb.y) / 2
	};
	
	var rt = {
		x: rb.x,
		y: lt.y
	};
	var lb = {
		x: lt.x,
		y: rb.y
	};
	
	var c_gray = (obj[lt.x>>0][lt.y>>0]+obj[rb.x>>0][lt.y>>0]+obj[rb.x>>0][rb.y>>0]+obj[lt.x>>0][rb.y>>0]) / 4;
	
	var eg = (obj[lt.x>>0][lt.y>>0]+obj[rt.x>>0][rt.y>>0]+obj[center.x>>0][center.y>>0]+255) / 4;
	obj[center.x>>0][lt.y>>0] = eg;
	
	eg = (obj[lt.x>>0][lt.y>>0]+obj[lb.x>>0][lb.y>>0]+obj[center.x>>0][center.y>>0]+255) / 4;
	obj[lt.x>>0][center.y>>0] = eg;
	
	eg = (obj[lb.x>>0][lb.y>>0]+obj[rb.x>>0][rb.y>>0]+obj[center.x>>0][center.y>>0]+255) / 4;
	obj[center.x>>0][rb.y>>0] = eg;
	
	eg = (obj[rt.x>>0][rt.y>>0]+obj[rb.x>>0][rb.y>>0]+obj[center.x>>0][center.y>>0]+255) / 4;
	obj[rb.x>>0][center.y>>0] = eg;
	
	obj[center.x>>0][center.y>>0] = c_gray;
	midFourPoint(lt, center, itr-1); 
	midFourPoint(center, rb, itr-1);
	midFourPoint(rt, center, itr-1); 
	midFourPoint(center, lb, itr-1);
}

function grayColor(r, g, b) {
	return (r + g + b) / 3;
}

function midColor(col1, col2, col3, col4) {
	return (col1 + col2 + col3 + col4) / 4;
}

function init() {
	var gray = Math.random() * 255 >> 0;
	putPixel(0, 0, gray, gray, gray);
	
	gray = Math.random() * 255 >> 0;
	putPixel(w-1, 0, gray, gray, gray);
	
	gray = Math.random() * 255 >> 0;
	putPixel(0, h-1, gray, gray, gray);
	
	gray = Math.random() * 255 >> 0;
	putPixel(w-1, h-1, gray, gray, gray);
}

function putPixel(x, y, red, green, blue) {
	var image = ctx.getImageData(0,0,w,h);
	var pixel = image.data;
	
	var r = posPixel(x, y);
	var g = r + 1;
	var b = r + 2;
	var a = r + 3;
	pixel[r] = red;
	pixel[g] = green;
	pixel[b] = blue;
	pixel[a] = 255;
	
	ctx.putImageData(image, 0, 0);
}

function posPixel(x, y, width) {
	width = width || w;
	x = x >> 0;
	y = y >> 0;
	return ((width * y) + x) * 4;
}