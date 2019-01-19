
function findDivisors(number){
	divisors = [];
	if (number === 1){
		divisors = [1];
	} else {
		for (var i=1; i<=floor(sqrt(number)); i+=1){
			if (number % i === 0){
				divisors.push(i);
				divisors.push(number/i);
			}
		}
	}
}

function displayNum(){
    col = [random(64,192),random(64,192),random(64,192)];
    switch (arithType){
			case 1: num = round(random(10**(digitCount-1),10**digitCount)); break;
			case 2: num = round(random(0,total[total.length-1])); break;
			case 3: num = round(random(10**(digitCount-1),10**digitCount)); break;
			case 4: findDivisors(total[total.length-1]); num = divisors[round(random(divisors.length-1))]; break;
		}
};

function doOperation(n){
	switch (arithType){
		case 1: total.push(total[n]+num); break;
		case 2: total.push(total[n]-num); break;
		case 3: total.push(total[n]*num); break;
		case 4: total.push(total[n]/num); break;
	}
}

function movingLines(){
    stroke(247, 247, 247);
    ofInterval = (t-prevSlidesT)/timeInterval;
    if (ofInterval<0.25){
        line(0.3*W,H/2-0.2*W,0.3*W+0.41*W*4*ofInterval,H/2-0.2*W);
    } else if (ofInterval>0.25) {
        line(0.3*W,H/2-0.2*W,0.7*W,H/2-0.2*W);
    }
    if (ofInterval>0.25 && ofInterval<0.5){
        line(0.7*W,H/2-0.2*W,0.7*W,H/2-0.2*W+(0.41*W*4*(ofInterval-0.25)));
    } else if (ofInterval>0.5) {
        line(0.7*W,H/2-0.2*W,0.7*W,H/2+0.2*W);
    }
    
    if (ofInterval>0.5 && ofInterval<0.75){
        line(0.7*W,H/2+0.2*W,0.7*W-0.41*W*4*(ofInterval-0.5),H/2+0.2*W);
    } else if (ofInterval>0.75) {
        line(0.7*W,H/2+0.2*W,0.3*W,H/2+0.2*W);
    }
    
    if (ofInterval>0.75){
        line(0.3*W,H/2+0.2*W,0.3*W,H/2+0.2*W-0.41*W*4*(ofInterval-0.75));
    }
    stroke(255, 255, 255,50);
    line(0.3*W,H/2-0.2*W,0.7*W,H/2-0.2*W);
    line(0.7*W,H/2-0.2*W,0.7*W,H/2+0.2*W);
    line(0.7*W,H/2+0.2*W,0.3*W,H/2+0.2*W);
    line(0.3*W,H/2+0.2*W,0.3*W,H/2-0.2*W);
};


function pauseIt(){
	if (pause){
        pause = false;
        startTime += millis()-pauseStart;
    } else {
        pause = true;
        pauseStart = millis();
    }
}


var timeInterval;
var digitCount;
var arithType;

var startTime;
var just;
var dark;
var t;
var prevSlidesT;
var pause;
var pauseStart;
var ofInterval;

var col;
var r;
var g;
var b;

var num;
var total;
var divisors;

var beginning;

var n;

var keyRel;

// Declare VAR'S up here


function setup() {
  // put setup code here

	timeInterval = int(prompt("Time interval (in seconds): "));
	digitCount = int(prompt("How many digits would you like the numbers to have: "));
	arithType = int(prompt("Addition = 1, Subtraction = 2, Multiplication = 3, Division = 4: "));

	startTime = millis();
	just = false;
	dark = false;
	prevSlidesT = 0;
	pause = true;
	pauseStart = startTime;

	col = [];
	r = 128;
	g = 128;
	b = 128;

	num = 0;
	switch (arithType) {
		case 1: total = [0]; break;
		case 2: total = [10**(digitCount)]; break;
		case 3: total = [1]; break;
		case 4: total = [10**(digitCount)]; break;
	}
	divisors = [];
	
	beginning = true;
		
	n = 1;

  // Initialize VAR'S here (give them values)
  W = window.innerWidth;
	H = window.innerHeight;
  canvas = createCanvas(W, H);
  
  textFont("Alegreya Sans");
	textAlign(CENTER,CENTER);
	
	displayNum();
	doOperation(0);
}


function draw() {
	// draw in here
		
		if (keyRel && keyCode === 32){
			pauseIt();
		}
		
		r += (col[0]-r)/256;
		g += (col[1]-g)/256;
		b += (col[2]-b)/256;
	
		cursor("pointer");
    background(r,g,b);
    
    if (!pause){
        t = (millis()-startTime)/1000;
/*
        if (!round((round(t) % timeInterval)) && dark){
            just = true;
            dark = false;
        } else if (round(t) % timeInterval){
            dark = true;
        }
*/
				if (round(ofInterval*100)/100 === 1 && dark){
            just = true;
            dark = false;
        } else if (round(ofInterval*100)/100 !== 1 || ofInterval>1){
            dark = true;
        }
        if ((round(t) && just) || (keyRel && keyCode === 39)){		
						beginning = false;
            displayNum();
            doOperation(n);
            just = false;
            prevSlidesT = t;
            n += 1;
        }
        movingLines();
        fill(255, 255, 255);
        textAlign(CENTER,CENTER);
        textSize((W+H)/20);
        text("  "+num,W/2,H/2);
        var txtW = textWidth(str(num));
        textSize((W+H)/40);
        switch (arithType) {
					case 1: text("+",W/2-txtW/2-10,H/2); break;
					case 2: text("-",W/2-txtW/2-10,H/2); break;
					case 3: text("x",W/2-txtW/2-10,H/2); break;
					case 4: text("/",W/2-txtW/2-10,H/2); break;
				}
    } else {
        noStroke();
        fill(255, 255, 255);
        ellipse(W/2,H/2,W/4+H/4,W/4+H/4);
        fill(r,g,b);
        triangle(0.44*W,H/2-0.10*W,0.60*W,0.5*H,0.44*W,H/2+0.10*W);
    }
    
    textSize((W+H)/60);
    noFill();
    stroke(255);
    rectMode(CENTER);
    var nWidth = textWidth(str(n));
    rect(W/20 + nWidth/2,H-W/20,W/30 + nWidth,W/20);
    var finalTotalWidth = textWidth(str(total[total.length-1]));
    rect(19*W/20 - finalTotalWidth/2,H-W/20,W/30 + finalTotalWidth,W/20);
    
    noStroke();
    fill(255);
    textAlign(LEFT,CENTER);
    text(n,W/20,H-W/20);
    
    
    textSize((W+H)/60);
    textAlign(RIGHT,CENTER);
    for (var s=0; s<total.length-1; s+=1){
	    fill(255,255,255,(205*(s-total.length+10))/(10)+50);
    	text("=  "+total[s],77*W/80,H-(2+total.length-s)*W/30);
		}
		fill(255);
		text(total[total.length-1],19*W/20,H-W/20);
		
		noFill();
		textAlign(CENTER,CENTER);
		textSize((W+H)/40);
		stroke(255,200);
		textFont("Alegreya Sans SC");
		text("TB",W/20,W/20);
		textFont("Alegreya Sans");
		
    keyRel = false;
}


window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
  W = windowWidth;
  H = windowHeight
  textSize((W+H)/20);
};

function mouseClicked(){
	pauseIt();
};

function keyReleased() {
  keyRel = true;
}
// Other functions down here