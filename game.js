

var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;


// ___________Game Started_______________
$(window).keypress( function(){
    if(started==false){
        $("#level-title").text("Level " + level);
        // -------------DELAY-------------
        setTimeout(function(){ nextSequence(); },1500);
        started=true; 
    }
});
// ___________uruchamianie gry_______________

$(".btn").click(function(){
    userChosenColour = this.id;
    userPattern.push(userChosenColour);
    //console.log(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnserw(userPattern.length-1);
})

// __________________FUNCTIONS__________________

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){ $("#" + currentColour).removeClass("pressed") },100);
    } 

function checkAnserw(currentLevel){
    //console.log(currentLevel);
    if (gamePattern[currentLevel] === userPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userPattern.length){
            setTimeout(function(){ nextSequence(); },1000);
        }
        
    }
    else{
        console.log("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $(document.body).addClass("game-over");
        setTimeout(function(){ $(document.body).removeClass("game-over") }, 200);
        // setTimeout(function(){ $("#" + currentColour).removeClass("pressed") },100);
        startAgain();
     }             
}


function nextSequence(){
    userPattern=[];
    level++; 
    $("#level-title").text("Level " + level);

    randomNumber = Math.floor(Math.random()*4);
    var lotery = colors[randomNumber];
    gamePattern.push(lotery);

    // ------------flash animation------------
    $("#" + lotery).fadeIn(100).fadeOut(100).fadeIn(100);
    // ------------sound------------
    playSound(lotery);
    console.log(lotery);
}

function startAgain(){
    started=false;
    gamePattern=[];
    level=0;
}
// __________________FUNCTIONS__________________