var canvas = document.getElementById("canvas");
var processing = new Processing(canvas, function(processing) {
    processing.size(400, 400);
    processing.background(0xFFF);

    var mouseIsPressed = false;
    processing.mousePressed = function () { mouseIsPressed = true; };
    processing.mouseReleased = function () { mouseIsPressed = false; };

    var keyIsPressed = false;
    processing.keyPressed = function () { keyIsPressed = true; };
    processing.keyReleased = function () { keyIsPressed = false; };

    function getImage(s) {
        var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    function getLocalImage(url) {
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    // use degrees rather than radians in rotate function
    var rotateFn = processing.rotate;
    processing.rotate = function (angle) {
        rotateFn(processing.radians(angle));
    };

    with (processing) {
      //100 lines of code #2! Hills
var keys = [];
keyPressed = function()
{
    keys[keyCode] = true;
};
keyReleased = function()
{
    keys[keyCode] = false;
};

var lines = [];
lines.add = function(x, y, c)
{
    this.push([x, y, c]);
};
lines.draw = function() 
{
    beginShape();
    vertex(0, 400);
    for(var i = 0; i < this.length; i++)
    {
        fill(this[i][2]);
        vertex(this[i][0], this[i][1]);
    }
    vertex(400, 400);
    endShape(CLOSE);
};

var createHills = function(times)
{
    var i = 0;
    var hillAmt = random(1, 5);
    var h = -random(0, 100);
    var time = 0;
    while(i < 400)
    {
        var xDelta = random(0, 5);
        i += xDelta;
        var a = cos(i * hillAmt);
        var y = h * a;
        var c = color(143, 143, 143);
        h += random(-20, 20);
        if(a > 0.99)
        {
            h = -random(0, 100);
        }
        lines.add(i, 200 + y, c);
        time++;
        if(time > times)
        {
            break;   
        }
    }
};

createHills();
var ballI = 0;
var ball = new PVector(lines[ballI][0], lines[ballI][1]);
var ballSpeed = new PVector(1, 1);

var fc = 0;
var speed = 2;
var precision = 10 * speed;
draw = function() 
{
    background(255, 255, 255);
    lines.draw();
    
    if (keys[LEFT])
    {
        fc -= speed;
    }
    if (keys[RIGHT])
    {
        fc += speed;
    }
    
    fc = constrain(fc, 0, (lines.length - 1) * precision);
    
    var index = (fc / precision).toFixed(0);
    
    var target = lines[index];
    var targetX = target[0];
    var targetY = target[1];

    ball.add(ballSpeed);
    ball.x = round(ball.x);
    ball.y = round(ball.y);
    
    fill(0, 0, 0);
    ellipse(ball.x, ball.y, 5, 5);
    
    var theta = atan2(targetY - ball.y, targetX - ball.x);
    var c = cos(theta), s = sin(theta);
    
    ballSpeed.normalize();
    ballSpeed.add(c, s, 0);
    ballSpeed.limit(speed);
};

    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});