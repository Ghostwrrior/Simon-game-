var userClickPattern = [];
var level = 0;
var started = false;
var colorButton = ["red", "blue", "green", "yellow"];
var gamePattern = [];


$(document).keydown(function(event){
    if(!started){
        nextSequence();
        started = true;
        $("h1").text("Level " + level);
    }
});


function nextSequence(){
    userClickPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomnumber = Math.floor(Math.random()*4);
    var randomChosenColor = colorButton[randomnumber];
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
   playSound(randomChosenColor);   
   animatePress(randomChosenColor);
   console.log(randomChosenColor);
}

$(".btn").on("click", function(){
    var userChosenbutton = this.id;
    $("." + userChosenbutton).fadeIn(100).fadeOut(100).fadeIn(100);
    userClickPattern.push(userChosenbutton);
    
    animatePress(userChosenbutton);
    console.log(userChosenbutton);
    checkAnswer(userClickPattern.length-1);
});

function playSound(name){
    var audio = new Audio("./sounds/"+ name + ".mp3");
    audio.play();
}



function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
  setTimeout(function(){
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
if (gamePattern[currentLevel] === userClickPattern[currentLevel]){
    console.log("true");
    playSound(userClickPattern[currentLevel]);
    if(userClickPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();},1000
        );
    }
}
else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        restart();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        console.log("false");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
    }
}

function restart(){
    level = 0;
    gamePattern = [];
    started = false;
}