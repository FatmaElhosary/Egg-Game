/* to move basket with the mouse move */
var basketImage = document.querySelector(".basket");
document.addEventListener("mousemove", function (e) {
  basketImage.style.left = e.clientX;
});

///////////////////variables i will use ////////////////////
const egg1 = document.getElementById("egg1");
const egg2 = document.getElementById("egg2");
const egg3 = document.getElementById("egg3");
const floor = document.querySelector("#floor");
var score = Number(document.getElementById("score").innerHTML);
var navScore = Number(document.getElementById("navscore").innerHTML);
var navLife = Number(document.getElementById("navlife").innerHTML);
let eggTop = 50;
/////
const brokenegg1 = document.querySelector("#brokenegg1");
const brokenegg2 = document.querySelector("#brokenegg2");
const brokenegg3 = document.querySelector("#brokenegg3");
/////
brokenegg1.style.left = egg1.getBoundingClientRect().x;
brokenegg2.style.left = egg2.getBoundingClientRect().x;
brokenegg2.style.left = egg3.getBoundingClientRect().x;
//////////////////////////////////////////////////////////////
function increaseScore() {}
function decreseScore() {}
function chechHitPasket(egg, basket) {
  //egg top position
  var eggTop = Math.round(egg.getBoundingClientRect().top);
  let basketTop = Math.round(basket.getBoundingClientRect().top);
  //get top scope height
  let basketTopScope = Math.round(
    basketTop + basket.getBoundingClientRect().height
  );

  //egg left position
  var eggLeft = Math.round(
    egg.getBoundingClientRect().left + egg.getBoundingClientRect().width
  );
  var bascketLeft = Math.round(basket.getBoundingClientRect().left);
  var bascketLeftScope = Math.round(
    bascketLeft + basket.getBoundingClientRect().width
  );
  if (
    eggTop >= basketTop &&
    eggTop <= basketTopScope &&
    eggLeft >= bascketLeft &&
    eggLeft <= bascketLeftScope
  ) {
    return true;
  } else if (eggTop > basketTopScope) {
    return false;
  }
}
var startGame;
function startGame() {
  document.querySelector(".start-game").style.display = "none";
  startGame = setInterval( function() { moveEggs(egg1); }, 200);
  startGame = setInterval( function() { moveEggs(egg2); }, 200);
  startGame = setInterval( function() { moveEggs(egg3); }, 200);
}
//move egss//

function moveEggs(egg) {
  eggTop += 50;
  egg.style.top = eggTop;

  if (chechHitPasket(egg, basketImage)) {
    score++;
    document.getElementById("score").innerHTML = score;
    $("#navscore").text(score);
    eggTop = 50;
    egg.style.top = eggTop;
  } else if (chechHitFloor(egg)) {
    navLife--;
    if (navLife < 1) {
      gameOver();
    } else {
      document.getElementById("navlife").innerHTML = navLife;
    }

    eggTop = 50;
    egg.style.top = eggTop;
    brokenegg1.classList.add("d-block");
    setTimeout(function () {
      brokenegg1.classList.remove("d-block");
    }, 500);
  }
}

function chechHitFloor(egg) {
  let floorTop = Math.round(floor.getBoundingClientRect().top);
  let eggTop = Math.round(egg.getBoundingClientRect().top);
  if (eggTop >= floorTop) {
    return true;
  } else {
    return false;
  }
}

function playAgain() {
  ///
  document.querySelector(".game-over").style.display = "none";
  document.querySelector(".start-game").style.display = "block";
    //set initial values
  score = 0;
  document.getElementById("score").innerHTML = score;
  $("#navscore").text(score);
  navLife = 10;
  document.getElementById("navlife").innerHTML = navLife;
  $('.container ,nav').show();
}
function gameOver() {
  $('.game-over h3').text(score);
  document.querySelector(".game-over").style.display = "block";
  clearInterval(startGame);
  $('.container ,nav').css("display","none");

}
