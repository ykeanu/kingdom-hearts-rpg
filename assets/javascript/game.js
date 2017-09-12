//~~~~~~~Global Variables~~~~~~~

var sora = {
	name: "sora",
	healthPoints: 200,
	attackPoints: 30,
	counterAttackPoints: 25
}
var riku = {
	name: "riku",
	healthPoints: 190,
	attackPoints: 20,
	counterAttackPoints: 10
}
var cloud = {
	name: "cloud",
	healthPoints: 250,
	attackPoints: 40,
	counterAttackPoints: 5
}
var axel = {
	name: "axel",
	healthPoints: 220,
	attackPoints: 25,
	counterAttackPoints: 15
}

var charactersArray = [sora, riku, cloud, axel];
var enemiesArray = [];
var chosenCharacter;
var chosenEnemy;
//~~~~~~~Functions~~~~~~~





//~~~~~~~Main Process~~~~~~~
$( document ).ready(function() {

	// User chooses a character
	$(".character").on("click", function() {
		if (chosenCharacter===undefined) {
			var thisChosenId = this.id;
			chosenCharacter = eval(this.id);
			$("#" + chosenCharacter.name).appendTo(".yourCharacter");
			var standingImage = "<img src='assets/images/" + thisChosenId + "-stand.gif'" + ">";
			$("#" + chosenCharacter.name).html(standingImage + "<div class='hpBar'><a id='chosen-hp'>0</a></div>");
			var yourHP = chosenCharacter.healthPoints;
			$("#chosen-hp").html(yourHP);
			//Changes information text
			$("#information").html("Choose your <strong id='red-text'>Enemy</strong>");
			for(var i=0; i < charactersArray.length; i++) {
					if(charactersArray[i] != chosenCharacter){
	    			enemiesArray.push(charactersArray[i]);
	    			$("#" + charactersArray[i].name).appendTo(".remainingEnemies");
	    			$("#" + charactersArray[i].name).attr("class", "enemy");
	    			console.log(enemiesArray);
	    		}
			}
			// TESTING
			console.log( "ready!" );
			console.log(thisChosenId);
			console.log(chosenCharacter);
		}

	});

	// User chooses an enemy AFTER
	$(document).on('click','.enemy',function() {
		if (chosenEnemy===undefined) {
			var thisEnemyId = this.id;
			chosenEnemy = eval(this.id);
			$("#" + chosenEnemy.name).appendTo(".yourEnemy");
			var attackEnemyImage = "<img src='assets/images/" + thisEnemyId + "-attack.gif'" + ">";
			$("#" + chosenEnemy.name).html(attackEnemyImage + "<div class='hpBar'><a id='enemy-hp'>0</a></div>");
			var enemyHP = chosenEnemy.healthPoints;
			$("#enemy-hp").html(enemyHP);
			//Changes information text
			$("#information").html("<strong>Fight!</strong>");
			// TESTING
			console.log( "enemy!" );
			console.log(thisEnemyId);
			console.log(chosenEnemy);
		}
	});


});