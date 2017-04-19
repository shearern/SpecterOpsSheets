
window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("src_img");
   ctx.drawImage(img, 10, 10);
};

// -- Globals ----------------------------------------------------------------

var canvas = document.getElementById("myCanvas");
var canvas_container = document.getElementById("canvasdiv");


// -- Canvas auto-sizing -----------------------------------------------------


function autosize_canvas()
{
    var w = window.innerWidth - 15;
    var h = window.innerHeight - 100;
    canvas_container.style.width = w + "px";
    canvas_container.style.height = h + "px";
}
window.onresize = function(event)
{
    autosize_canvas();
}
autosize_canvas();

// -- Pan Functions  ---------------------------------------------------------

var context = canvas.getContext('2d');
var dragging = false;
var lastX;
var lastY;
var marginLeft = 0;
var marginTop = 0;

function start_pan(from_x, from_y)
{
    dragging = true;
    lastX = from_x;
    lastY = from_y;
}

function update_pan(cur_x, cur_y)
{
    if (dragging)
    {
        var min_margin_left = canvas_container.offsetWidth - canvas.offsetWidth;

        var deltaX = cur_x - lastX;
        lastX = cur_x;
        marginLeft = Math.min(marginLeft + deltaX, 0);
        marginLeft = Math.max(min_margin_left, marginLeft);
        canvas.style.marginLeft = marginLeft + "px";

        var min_margin_top = canvas_container.offsetHeight - canvas.offsetHeight;

        var deltaY = cur_y- lastY;
        lastY = cur_y;
        marginTop = Math.min(marginTop + deltaY, 0);
        marginTop = Math.max(min_margin_top, marginTop);
        canvas.style.marginTop = marginTop + "px";

        // Debug:
        document.getElementById("dx").innerHTML = Math.round(marginLeft);
        document.getElementById("dy").innerHTML = Math.round(marginTop);
    }
}

function finsh_pan()
{
    dragging = false;
}


// -- Listeners fpr mouse panning

canvas.addEventListener('mousedown', function(e) {
    var evt = e || event;
    start_pan(evt.clientX, evt.clientY);
    e.preventDefault();
}, false);

window.addEventListener('mousemove', function(e) {
    var evt = e || event;
    update_pan(evt.clientX, evt.clientY);
    e.preventDefault();
}, false);

window.addEventListener('mouseup', function() {
    finsh_pan();
}, false);

// -- Listeners for Touch Panning

canvas.addEventListener('touchstart', function(e) {
    var evt = e || event;
    if (evt.touches.length == 1)
    {
   	    var touch = evt.touches[0];
        start_pan(touch.clientX, touch.clientY);
        e.preventDefault();
    }
}, false);

window.addEventListener('touchmove', function(e) {
    var evt = e || event;
    if (evt.touches.length == 1)
    {
        var touch = evt.touches[0];
        update_pan(touch.clientX, touch.clientY);
        e.preventDefault();
    }
}, false);

window.addEventListener('touchend', function(e) {
    var evt = e || event;
    finsh_pan();
    e.preventDefault();
}, false);


