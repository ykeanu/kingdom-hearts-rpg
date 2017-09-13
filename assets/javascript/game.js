//~~~~~~~Global Variables~~~~~~~

var sora = {
	name: "sora",
	healthPoints: 200,
	attackPoints: 9,
	counterAttackPoints: 5
}
var riku = {
	name: "riku",
	healthPoints: 190,
	attackPoints: 8,
	counterAttackPoints: 5
}
var cloud = {
	name: "cloud",
	healthPoints: 250,
	attackPoints: 11,
	counterAttackPoints: 4
}
var axel = {
	name: "axel",
	healthPoints: 220,
	attackPoints: 8,
	counterAttackPoints: 7
}

var attackPower = 0;
var counterPower = 0;
var charactersArray = [sora, riku, cloud, axel];
var enemiesArray = [];
var chosenCharacter;
var chosenEnemy;
var defeatedArray = [];
var gameOver = false;
//~~~~~~~Functions~~~~~~~

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;}

console.log(sora.attackPoints);

//~~~~~~~Main Process~~~~~~~
$( document ).ready(function() {

	// User chooses a character
	$(".character").on("click", function() {
		if (chosenCharacter===undefined) {
			var thisChosenId = this.id;
			// Allows value to have all of the properties available
			chosenCharacter = eval(this.id);
			// Appends chosencharacter to your characterdiv
			$("#" + chosenCharacter.name).appendTo(".yourCharacter");
			// Variable that holds HTML code of images in standing position, depending on click event
			var standingImage = "<img src='assets/images/" + thisChosenId + "-stand.gif'" + ">";
			// Generates HTML code with HP bar and standing image into
			$("#" + chosenCharacter.name).html(standingImage + "<div class='hpBar'><a id='chosen-hp'>0</a></div>");
			// Variable that holds value for HP
			var yourHP = chosenCharacter.healthPoints;
			$("#chosen-hp").html(yourHP);
			// Changes text to choose your enemy.
			$("#information").html("Choose your <strong id='red-text'>Enemy</strong>");
			// Capitalizes first letter and adds character name on top of chosen player image
			$("#yourCharName").html(chosenCharacter.name.charAt(0).toUpperCase() + chosenCharacter.name.slice(1));
			window.scrollBy(0, 100);

			// Moves all remaining characters into enemies section
			for(var i=0; i < charactersArray.length; i++) {
					// Only executes on objects in characters array that are NOT chosen character
					if(charactersArray[i] != chosenCharacter){
	    			//Pushes items that are not the character into an item array
	    			enemiesArray.push(charactersArray[i]);
	    			//Moves these characters to the remaning enemies section
	    			$("#" + charactersArray[i].name).appendTo(".remainingEnemies");
	    			//Adds an attribute of enemny to the character
	    			$("#" + charactersArray[i].name).attr("class", "enemy");
	    		}
			}
			// ~~~~~~~TESTING
			console.log(thisChosenId);
			console.log(chosenCharacter, "Objects with properies");
			console.log(chosenCharacter.name), "Object Name";
			console.log(charactersArray), "charactersArray";
		}

	});

	// User chooses an enemy AFTER choosing a character
	$(document).on('click','.enemy',function() {
		//
		if (chosenEnemy===undefined) {
			var thisEnemyId = this.id;
			chosenEnemy = eval(this.id);
			$("#" + chosenEnemy.name).appendTo(".yourEnemy");
			var attackEnemyImage = "<img src='assets/images/" + thisEnemyId + "-attack.gif'" + ">";
			$("#" + chosenEnemy.name).html(attackEnemyImage + "<div class='hpBar'><a id='enemy-hp'>0</a></div>");
			var enemyHP = chosenEnemy.healthPoints;
			$("#enemy-hp").html(enemyHP);
			//Changes information text
			$("#information").html("<strong>Click <strong id='red-text'>Enemy</strong> To Attack!</strong>");
			$("#yourEnemyName").html(chosenEnemy.name.charAt(0).toUpperCase() + chosenEnemy.name.slice(1));
			


			// TESTING
			// for(var i=0; i < enemiesArray.length, i++) {

			// }
			// console.log( "enemy!" );
			// console.log(thisEnemyId);
			// console.log(chosenEnemy);
		}
	});


// Attack functionality

	$(document).on('click','.yourEnemy img',function() {
		// $(".yourCharacter img").animate({left: '250px'});
		if(chosenCharacter !== undefined && chosenEnemy !==undefined) {
		$(".yourCharacter img").animate({left: "+=300px"}, 1000);

		attackPower+=chosenCharacter.attackPoints;
		console.log(attackPower, "Test Attack");
		chosenEnemy.healthPoints-=attackPower;
		var enemyHP = chosenEnemy.healthPoints;
		$("#enemy-hp").html(enemyHP);

		counterPower = (chosenEnemy.counterAttackPoints + getRandomInt(1,10));
		chosenCharacter.healthPoints-= counterPower;
		var yourHP = chosenCharacter.healthPoints;
		$("#chosen-hp").html(yourHP);

		$(".infoBox").html("<p> You dealt <strong id='green-text'>" + attackPower + " points</strong> of damage, while " + (chosenEnemy.name.charAt(0).toUpperCase() + chosenEnemy.name.slice(1)) + " counter-attacked for <strong id='red-text'>" + counterPower + " points</strong>.");
		

    	$(".yourCharacter img").animate({left: "-=300px"}, 1000);


    	}


		//checks to see if user has lost//
		// if(chosenCharacter.healthPoints <= 0){
		// 	GameOver = true;
		// 	hasUserLost = true;
		// 	$(".infoBox").html("<h2> You Lose!");
		// 	$("#attack").attr("id", "play_again");
		// 	$("#play_again").text("Play Again");
		// 	$("#" + chosenCharacter.name + "HP").text("Defeated");
		// 	$("#" + chosenEnemy.name + "HP").text("Winner");
		// 	$("#play_again").on("click", function(){
		// 		location.reload();
		// 	});
		// }

		//checks to see if the user has defeated the enemy//
		if(chosenEnemy.healthPoints <= 0 && gameOver === false){
			$("#" + chosenEnemy.name).appendTo("#wins");
			$(".infoBox").html("<h2>You have defeated <strong id='red-text'>" + chosenEnemy.name + "</strong>! Choose a new enemy from the list!</h2>");
			// $("#" + chosenEnemy.name).appendTo("#wins");
			// $("#" + chosenEnemy.name + "HP").text("Defeated");
			// $("#attack").css("display", "none");
			defeatedArray.push(chosenEnemy);
			chosenEnemy = undefined;
		}

		//checks to see if user has defeated all enemies//

		// if(defeated.length === characters.length - 1){
		// 	isGameOver = true;
		// 	$("#instructions").text("You have defeated every enemy! YOU WIN!");
		// 	$("#attack").css("display", "block");
		// 	$("#attack").attr("id", "play_again");
		// 	$("#play_again").text("Play Again");
		// 	$("#" + chosenCharacter.name + "HP").text("Winner");
		// 	$("#play_again").on("click", function(){
		// 		location.reload();
		// 	});
		// }


    });



});

// jQuery bubble pop animation
// Ben Ridout (c) 2013 - http://BenRidout.com/?q=bubblepop
// You're free to use this code with above attribution (in source is fine).

$(function(){
  // Document is ready
  $(".yourEnemy").on("click", function(e) {
    pop(e.pageX, e.pageY, 13);
  });
});

function r2d(x) {
    return x / (Math.PI / 180);
  }

  function d2r(x) {
    return x * (Math.PI / 180);
  }

  function pop(start_x, start_y, particle_count) {
    arr = [];
    angle = 0;
    particles = [];
    offset_x = $("#dummy_debris").width() / 2;
    offset_y = $("#dummy_debris").height() / 2;

    for (i = 0; i < particle_count; i++) {
      rad = d2r(angle);
      x = Math.cos(rad)*(80+Math.random()*20);
      y = Math.sin(rad)*(80+Math.random()*20);
      arr.push([start_x + x, start_y + y]);
      z = $('<div class="debris" />');
      z.css({
          "left": start_x - offset_x,
          "top": start_y - offset_x
      }).appendTo($("#content"));
      particles.push(z);
      angle += 360/particle_count;
    }
    
    $.each(particles, function(i, v){
      $(v).show();
      $(v).animate(
        {
          top: arr[i][1], 
          left: arr[i][0],
          width: 4, 
          height: 4, 
          opacity: 0
        }, 600, function(){$(v).remove()
      });
    });
  }