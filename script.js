
window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("src_img");
   ctx.drawImage(img, 10, 10);
};

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
var dragging = false;
var lastX;
var lastY;
var marginLeft = 0;
var marginTop = 0;

canvas.addEventListener('mousedown', function(e) {
    var evt = e || event;
    dragging = true;
    lastX = evt.clientX;
    lastY = evt.clientY;
    e.preventDefault();
}, false);

window.addEventListener('mousemove', function(e) {
    var evt = e || event;
    if (dragging) {

        var deltaX = evt.clientX - lastX;
        lastX = evt.clientX;
        marginLeft += deltaX;
        canvas.style.marginLeft = marginLeft + "px";

        var deltaY = evt.clientY- lastY;
        lastY = evt.clientY;
        marginTop += deltaY;
        canvas.style.marginTop = marginTop + "px";
    }
    e.preventDefault();
}, false);

window.addEventListener('mouseup', function() {
    dragging = false;
}, false);

// Touch

canvas.addEventListener('touchstart', function(e) {
    var evt = e || event;
   	var touch = evt.touches[0];

    dragging = true;
    lastX = touch.clientX;
    lastY = touch.clientY;
    e.preventDefault();
}, false);

window.addEventListener('touchmove', function(e) {
    var evt = e || event;
    if (dragging) {

    	var touch = evt.touches[0];

        var deltaX = touch.clientX - lastX;
        lastX = touch.clientX;
        marginLeft = Math.min(marginLeft + deltaX, 0);
        canvas.style.marginLeft = marginLeft + "px";

        var deltaY = touch.clientY- lastY;
        lastY = touch.clientY;
        marginTop = Math.min(marginTop + deltaY, 0);
        canvas.style.marginTop = marginTop + "px";

        document.getElementById("dx").innerHTML = Math.round(marginLeft);
        document.getElementById("dy").innerHTML = Math.round(marginTop);
    }
    e.preventDefault();
}, false);

window.addEventListener('touchend', function() {
    dragging = false;
}, false);


