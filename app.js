/*The keycodes are:

left = 37
up = 38
right = 39
down = 40

*/

//own Code

var objImage = null;
var fooImage = null;
var enemy = null;
var score = 100;
var level = 1;
var timeLeft = 60;
var time = 40;
var randomValue = 0;
var timerId;
var timeforReload = 5;

//own code
// First execution of the code
function init() {
  //sound = new Audio("music.mp3").play();
  timerId = setInterval(countdown, 1000);

  function random() {
    ran = Math.ceil(Math.random() * (+1200 - 70) + 70);
    if (
      (ran > 183 && ran < 204) ||
      (ran > 633 && ran < 653) ||
      (ran > 1308 && ran < 1330) ||
      (ran > 409 && ran < 420) ||
      (ran > 858 && ran < 870) ||
      (ran > 1083 && ran < 1110)
    )
      random();
    else return ran;
  }
  objImage = document.getElementById("man");
  fooImage = document.getElementById("burger");
  objImage.style.position = "relative";
  objImage.style.left = "0px";
  objImage.style.top = "0px";
  fooImage.style.top = "120px";
  fooImage.style.left = "0px";
  fooImage.style.position = "absolute";
  randomValue = random();
  fooImage.style.left = parseInt(fooImage.style.left) + randomValue + "px";
  var enemy1 = (document.getElementById("enemy1").style.display = "none");
  var enemy2 = (document.getElementById("enemy2").style.display = "none");
  var enemy3 = (document.getElementById("enemy3").style.display = "none");
  var enemy4 = (document.getElementById("enemy4").style.display = "none");
  var enemy5 = (document.getElementById("enemy5").style.display = "none");
  var enemy6 = (document.getElementById("enemy6").style.display = "none");
}

// keycodes takes from the MDN
//For moving the forward
function move(e) {
  //new Audio("music.wav").play();
  var key_code = e.which || e.keyCode;
  switch (key_code) {
    case 37: //left arrow key
      moveLeft();
      break;
    case 38: //Up arrow key
      moveUp();
      break;
    case 39: //right arrow key
      moveRight();
      break;
    case 40: //down arrow key
      moveDown();
      break;
  }
}

//own Codes
//left arrow key
function moveLeft() {
  if (parseInt(objImage.style.left) - 5 >= 0)
    objImage.style.left = parseInt(objImage.style.left) - 20 + "px";
  Win();
}

//Up arrow key
function moveUp() {
  if (parseInt(objImage.style.top) - 5 >= -400)
    objImage.style.top = parseInt(objImage.style.top) - 20 + "px";
  Win();
}

//right arrow key
function moveRight() {
  console.log(objImage.offsetLeft);
  if (parseInt(objImage.style.left) + 5 < 1300)
    objImage.style.left = parseInt(objImage.style.left) + 20 + "px";
  Win();
}

//down arrow key
function moveDown() {
  if (parseInt(objImage.style.top) + 5 <= 0)
    objImage.style.top = parseInt(objImage.style.top) + 20 + "px";
  Win();
}

// checking win or not
function Win() {
  var scores = document.getElementById("score");
  var levelValue = document.getElementById("levels");
  if (collide(objImage, fooImage)) {
    scores.innerHTML = score;
    window.alert("Congratulations You win the  level " + level);
    timeLeft = 60;
    level++;
    score += 100;
    levelValue.innerHTML = "Level-" + level;
    init();
    enemyFire();
  } else return true;
}

// countdown for the time in the game
function countdown() {
  var elem = document.getElementById("some_div");
  if (timeLeft == -1) {
    clearInterval(timerId);
    lose();
  } else {
    elem.innerHTML = timeLeft + " seconds remaining";
    timeLeft--;
  }
}

// Lose the game
function lose() {
  var timeToLose;
  var elem = document.getElementById("some_div");
  elem.innerHTML = "Game over and your score is " + (score - 100);
  window.location.href = "index.html";
}

// enemy starts flow on screen
function enemyFire() {
  var enemy1 = document.getElementById("enemy1");
  levels(enemy1);
  var enemy3 = document.getElementById("enemy3");
  levels(enemy3);
  var enemy6 = document.getElementById("enemy6");
  levels(enemy6);
  var enemy2 = document.getElementById("enemy2");
  levels(enemy2);
  var enemy4 = document.getElementById("enemy4");
  levels(enemy4);
  var enemy5 = document.getElementById("enemy5");
  levels(enemy5);
}

// Initialized as enemy showing on the screen
function levels(en) {
  en.style.display = "";
  en.style.top = "0px";
  en.style.position = "relative";
  timerId = setInterval(imageMoving, 1500);
}

//moving motion based on the time
function imageMoving() {
  if (time == 0) {
    enemy1.style.display = "none";
    enemy3.style.display = "none";
    enemy6.style.display = "none";
    enemy2.style.display = "none";
    enemy4.style.display = "none";
    enemy5.style.display = "none";
    clearTimeout(timerId);
    time = 40;
    levels(enemy1);
    levels(enemy3);
    levels(enemy6);
    levels(enemy2);
    levels(enemy4);
    levels(enemy5);
  } else {
    moveTenPixels(enemy1);
    moveTenPixels(enemy2);
    moveTenPixels(enemy3);
    moveTenPixels(enemy4);
    moveTenPixels(enemy5);
    moveTenPixels(enemy6);
    if (collide(enemy1, objImage)) return lose();
    if (collide(enemy3, objImage)) return lose();
    if (collide(enemy6, objImage)) return lose();
    if (collide(enemy2, objImage)) return lose();
    if (collide(enemy4, objImage)) return lose();
    if (collide(enemy5, objImage)) return lose();
    time--;
  }
}

// move by 10 pixels forward
function moveTenPixels(en) {
  en.style.top = parseInt(en.style.top) + 10 + "px";
}

//checking collide refer from stackoverflow
function collide(object1, object2) {
  var left1 = object1.offsetLeft;
  var left2 = object2.offsetLeft;
  var right1 = object1.offsetLeft + object1.offsetWidth;
  var right2 = object2.offsetLeft + object2.offsetWidth;
  var top1 = object1.offsetTop;
  var top2 = object2.offsetTop;
  var bottom1 = object1.offsetTop + object1.offsetHeight;
  var bottom2 = object2.offsetTop + object2.offsetHeight;
  if (bottom1 < top2) return false;
  if (top1 > bottom2) return false;
  if (right1 < left2) return false;
  if (left1 > right2) return false;
  return true;
}
window.onload = init;
