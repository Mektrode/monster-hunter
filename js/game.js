

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 400//$('#gamediv').width();
canvas.height = 500 //$('#gamediv').height();
document.getElementById('gamediv').appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//stops scroll if arrow keys are pressed
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


var setup = function () {
	hero.x = 256;
	hero.y = 240;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
}

// Reset the monster when the player catches a monster
var reset = function () {
	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Reset the player
var resetPlayerPlus = function () {
	// Center hero
	hero.x;
	hero.y;	
};

// Reset the player
var resetPlayerMinus = function () {
	// Center hero
	hero.x;
	hero.y;
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}

	//Is hero outside box?
	if (
		(hero.x + 32) > canvas.width
		|| (hero.y + 32) >= canvas.height
		) {
		resetPlayerPlus();
	};
/*
	if (
		(hero.x * 2) <= canvas.width
		|| (hero.y + 32) <= canvas.height
		) {
		resetPlayerMinus();
	};
	*/
	/*
	if (
		((hero.x + 32) - (canvas.width / 2)) <= canvas.width
		|| ((hero.y + 32) - (canvas.height / 2)) <= canvas.height
		) {
		resetPlayerMinus();
	};
	*/
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
setup();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible

/* 
DONE GAME ENGINE CODE.

		    ^^
		   ^.*^
		  ^*...^
		 ^....*.^
		^.$......^
	   ^..*......*^
	  ^..*.........^
	 ^..........$...^
	^.$......*.......^
   ^..*...$.......*...^
  ^......^....$........^
  -----|...|.|...|------
	   |...|.|...|
	   |...|.|...|
	   -----------
	   
*/
