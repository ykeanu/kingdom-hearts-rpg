//~~~~~~~Global Variables~~~~~~~

var sora = {
    name: "sora",
    healthPoints: 200,
    attackPoints: 5,
    counterAttackPoints: 5
}
var riku = {
    name: "riku",
    healthPoints: 190,
    attackPoints: 4,
    counterAttackPoints: 5
}
var cloud = {
    name: "cloud",
    healthPoints: 250,
    attackPoints: 8,
    counterAttackPoints: 4
}
var axel = {
    name: "axel",
    healthPoints: 220,
    attackPoints: 3,
    counterAttackPoints: 7
}

var attackPower = 0;
var counterPower = 0;
var charactersArray = [sora, riku, cloud, axel];
var enemiesArray = [];
var chosenCharacter;
var chosenEnemy;
var defeatedArray = [];
var isCharacterChosen = false;
var isEnemyChosen = false;
var enemiesLeft = 4;
var placeHolder;
var enemyHP;
var yourHP;

//~~~~~~~Functions~~~~~~~

// Function allows random variation with enemy counter attacks.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//~~~~~~~Main Process~~~~~~~
$(document).ready(function() {
    // User chooses a character
    $(".character").on("click", function() {
        if (isCharacterChosen == false) {
            isCharacterChosen = true;
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
            yourHP = chosenCharacter.healthPoints;
            $("#chosen-hp").html(yourHP);
            // Changes text to choose your enemy.
            $("#information").html("Choose your <strong id='red-text'>Enemy</strong>");
            // Capitalizes first letter and adds character name on top of chosen player image
            $("#yourCharName").html(chosenCharacter.name.charAt(0).toUpperCase() + chosenCharacter.name.slice(1));
            window.scrollBy(0, 100);
            // Moves all remaining characters into enemies section
            for (var i = 0; i < charactersArray.length; i++) {
                // Only executes on objects in characters array that are NOT chosen character
                if (charactersArray[i] != chosenCharacter) {
                    //Pushes items that are not the character into an item array
                    enemiesArray.push(charactersArray[i]);
                    //Moves these characters to the remaning enemies section
                    $("#" + charactersArray[i].name).appendTo(".remainingEnemies");
                    //Adds an attribute of enemny to the character
                    $("#" + charactersArray[i].name).attr("class", "enemy");
                }
            }
        }
    });

    // User chooses an enemy AFTER choosing a character
    $(document).on('click', '.enemy', function() {

        if (isEnemyChosen == false) {
            isEnemyChosen = true;
            var thisEnemyId = this.id;
            chosenEnemy = eval(this.id);
            $("#" + chosenEnemy.name).appendTo(".yourEnemy");
            var attackEnemyImage = "<img src='assets/images/" + thisEnemyId + "-attack.gif'" + ">";
            $("#" + chosenEnemy.name).html(attackEnemyImage + "<div class='hpBar'><a id='enemy-hp'>0</a></div>");
            enemyHP = chosenEnemy.healthPoints;
            $("#enemy-hp").html(enemyHP);
            //Changes information text
            $("#information").html("<strong>Click <strong id='red-text'>Enemy</strong> To Attack!</strong>");
            $("#yourEnemyName").html(chosenEnemy.name.charAt(0).toUpperCase() + chosenEnemy.name.slice(1));
            // TESTING
            console.log(chosenEnemy);
        }

        // Click on enemy character to attack
        $(document).on('click', '.yourEnemy img', function() {
            if (isCharacterChosen == true && isEnemyChosen == true) {
                $(".yourCharacter img").animate({ left: "+=300px" }, 100);
                // Lowers enemy HP based on attack power of selected character
                attackPower += chosenCharacter.attackPoints;
                console.log(attackPower, "Test Attack");
                chosenEnemy.healthPoints -= attackPower;
                enemyHP = chosenEnemy.healthPoints;
                $("#enemy-hp").html(enemyHP);
                // Lowers selected HP based on counter attack power of enemy character plus a randomly generated number
                counterPower = (chosenEnemy.counterAttackPoints + getRandomInt(1, 10));
                chosenCharacter.healthPoints -= counterPower;
                yourHP = chosenCharacter.healthPoints;
                $("#chosen-hp").html(yourHP);
                $(".infoBox").html("<p> You dealt <strong id='green-text'>" + attackPower + " points</strong> of damage, while " + (chosenEnemy.name.charAt(0).toUpperCase() + chosenEnemy.name.slice(1)) + " counter-attacked for <strong id='red-text'>" + counterPower + " points</strong>.");
                $(".yourCharacter img").animate({ left: "-=300px" }, 100);
            };

            // If user defeats an enemy
            if (enemyHP <= 0) {
                isEnemyChosen = false;
                enemiesLeft--;
                console.log(enemiesLeft);
                // $("#" + chosenEnemy.name).appendTo("#wins");
                $('.yourEnemy').empty();
                $(".infoBox").html("<h2>You have defeated <strong id='red-text'>" + chosenEnemy.name + "</strong>! Choose a new enemy from the list!</h2>");
                // $("#" + chosenEnemy.name).appendTo("#wins");
                // $("#" + chosenEnemy.name + "HP").text("Defeated");
                // $("#attack").css("display", "none");
                defeatedArray.push(chosenEnemy);
                chosenEnemy = undefined;
                console.log(isEnemyChosen);
            };

            // If user loses all health, info box diplays "You Lose!" and provides option to try again
            if (yourHP <= 0) {
                $(".infoBox").html("<h2>You Lose! <strong id='red-text'>Click to Try Again.</strong></h2>");
                $(document).on('click', '.infoBox', function() {
                    window.location.reload();
                });
            };

            // If user defeats ALL enemies, info box diplays "You Win!" and provides option to play again
            if (enemiesLeft <= 0) {
                $(".infoBox").html("<h2>You Win! <strong id='green-text'>Click to Play Again.</strong></h2>");
                $(document).on('click', '.infoBox', function() {
                    window.location.reload();
                });
            };
        });
    });
});

// jQuery bubble pop animation
// Ben Ridout (c) 2013 - http://BenRidout.com/?q=bubblepop
// You're free to use this code with above attribution (in source is fine).

$(function() {
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
        x = Math.cos(rad) * (80 + Math.random() * 20);
        y = Math.sin(rad) * (80 + Math.random() * 20);
        arr.push([start_x + x, start_y + y]);
        z = $('<div class="debris" />');
        z.css({
            "left": start_x - offset_x,
            "top": start_y - offset_x
        }).appendTo($("#content"));
        particles.push(z);
        angle += 360 / particle_count;
    }

    $.each(particles, function(i, v) {
        $(v).show();
        $(v).animate({
            top: arr[i][1],
            left: arr[i][0],
            width: 4,
            height: 4,
            opacity: 0
        }, 600, function() {
            $(v).remove()
        });
    });
}