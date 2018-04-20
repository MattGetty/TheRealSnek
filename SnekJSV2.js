var s;//variable s
var scl = 20;//scale of 20
var vh = window.innerHeight;//sets var vh as entire screen height
var vw = window.innerWidth; //sets var vw as entire screen length
var w = 500; //global width
var h = 500; // global height
var food;
var fRate = 10;
function reload(){
  location.reload();
}
function setup(){ //setup function
  createCanvas(500,500);//creates canvas vw wide and vh height
  s = new Snek(); //tells it to call snek function
  foodLocation();
}

function draw(){//draw function
  background(0,0,128); // background color
    frameRate(fRate);
    s.show();
    s.update();
    s.death();
    fill(255,0,0); //food color
    rect(food.x, food.y, scl, scl); //shape of apple
    if (s.eat(food)) {
      foodLocation();
      document.body.onkeydown = function(e){
    if(e.keyCode == 32){
      reload();
    }
    }
    }
}
function Snek(){ //snek constructor function
  this.x = 0; //value of x
  this.y = 0; //value of y
  this.xspeed = 1; //start snek travel to the right
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  
  this.eat = function(pos) {//eating function
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) { //when the distance between snek and food is less than 1 pixel,
      this.total++;//adds 1 to the total
      document.getElementById('showScore').innerHTML = this.total;
      fRate *= 2;
      return true;
    }
    else {
      return false;
    }
  }
  this.dir = function(x,y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  this.update = function(){
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      //fuckin Add a Tail
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;
   // this.x = constrain(this.x, 0, width - scl);
  //  this.y = constrain(this.y, 0, height - scl);
  }
   this.show = function() { //this is the inherent design of snek :)
    fill(0,0,0);//color of snek
    for (var i = 0; i < this.tail.length; i++){
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x,this.y,scl,scl); // rect(start point of x, start point of y, how long x, how long y)
  }
  this.death = function(){
    //if (pos.x === 1 || pos.x === 499 || pos.y === 499 || pos.y === 1){
      //document.getElementById('showScore').innerHTML = "SNEK DED, Hit Spacebar to Restart";
      //noLoop;
  //  }
    if ((this.x > w - scl) || (this.x < 0) || (this.y > h - scl) || (this.y < 0)){
      this.tail = [];
      this.total = 0;
      document.getElementById('showScore').innerHTML = "SNEK DED, Hit Space to Restart";
      noLoop();
    }
    for (var i = 0; i < this.tail.length; i ++){
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1){
        this.tail = [];
        this.total = 0;
        document.getElementById('showScore').innerHTML = "SNEK DED, Hit Space to Restart";
        noLoop();
      }
    }
  }
}
function keyPressed(){
  if (keyCode === UP_ARROW) {//moves snek when up arrow gets pressed
    s.dir(0,-1);
  }
  else if (keyCode === DOWN_ARROW) {//moves snek when down arrow gets pressed
    s.dir(0,1);
  }
  else if (keyCode === LEFT_ARROW) {//moves snek when left arrow gets pressed
    s.dir(-1,0);
  }
  else if (keyCode === RIGHT_ARROW) {//moves snek when right arrow gets pressed
    s.dir(1,0);
  }
}
function foodLocation() {
  var cols = floor(width / scl);//columns 20 pixels wide
  var rows = floor(height / scl);//makes rows 20 pixels wide
  food = createVector(floor(random(cols)), floor(random(rows)));//generates random position for food
  food.mult(scl);
}
