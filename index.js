var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["green", "red", "yellow", "blue"];

var level = 0;
var gameStarted = false;

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 500);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key or Header to Restart");
        startOver();
    }
}

$(".btn").click(function() {
    if (gameStarted) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
});



$(document).keypress(function() {
    if (!gameStarted) {
        $("h1").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

$("h1").click(function() {
    if (!gameStarted) {
        $("h1").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});







