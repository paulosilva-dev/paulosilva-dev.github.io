// score var:
var score = 0;

// grid object:
var grid = {
  //  initializing grid dimensions
  width : 400,
  cols : 20,
  state : [],
  
  
  //  initializing grid state to 0
  //  0 - empty
  //  1 - snake
  //  2 - food  
  init : function(){
    for(var y = 0; y<this.cols;y++){
      this.state.push([]);
      for(var x = 0; x < this.cols; x++){
        this.state[y].push(0);
      }
    }
  },
  reset : function(){
    for(var y = 0; y<this.cols;y++){
      for(var x = 0; x < this.cols; x++){
        this.state[y][x] = 0;
      }
    }
  },
  check : function(p){
    return this.state[p[1]][p[0]];
  },
  flip : function(p){
    this.state[p[1]][p[0]] = !this.state[p[1]][p[0]];
  },
  draw : function(){
    var $grid=$('.level');
    for(var y=0, l=this.cols;y<l;y++){
      for(var x=0; x<l; x++){
        if(this.state[y][x]===1){
          paintGridSnake($grid.children()[y*l+x]);
        } else if(this.state[y][x]===2){
          paintGridFood($grid.children()[y*l+x]);          
        } else{
          paintGridBlack($grid.children()[y*l+x]);
        }
      }
    }
  },
  
  update : function(s, f){
    this.reset();
    for(var i = 0, l = s.position.length; i < l;i++){
      this.state[s.position[i][1]][s.position[i][0]] = 1;
    }
    this.state[f.position[1]][f.position[0]] = 2;
  }

}

var snake = {
  alive: true,
  position: [[3,3]],
  size: 4, 
  direction: {
    x : 1,
    y : 0 
  },
  top: function(){
    // cant turn back on itself
    if(this.direction.y !== 1 && this.alive){
      this.direction.x = 0;
      this.direction.y = -1;
    }
  },
  bot: function(){
    if(this.direction.y !== -1 && this.alive){
      this.direction.x = 0;
      this.direction.y = 1;
    }
  },
  left: function(){
    if(this.direction.x !== 1 && this.alive){
      this.direction.x = -1;
      this.direction.y = 0;
    }
  },
  right: function(){
    if(this.direction.x !== -1 && this.alive){
      this.direction.x = 1;
      this.direction.y = 0;
    }
  },
  die : function(){
    this.alive = false;
    this.direction.x = 0;
    this.direction.y = 0;
  },
  update : function(grd, fud){
    var nextPos = [this.position[0][0]+this.direction.x, this.position[0][1]+this.direction.y];
    //infinite edge:
    if(nextPos[0]<0){
      nextPos[0] = grd.cols-1;
    }
    if(nextPos[0]>grd.cols-1){
      nextPos[0] = 0;
    }
    if(nextPos[1]<0){
      nextPos[1] = grd.cols-1;
    }
    if(nextPos[1]>grd.cols-1){
      nextPos[1] = 0;
    }
    
    if(fud.eaten(grd, nextPos)){
      this.size += 1;
      score++;
      $('.score').text(score);
    }
    // die when colliding with its body
    for(var i = 0, l = this.position.length; i<l;i++){
      if(nextPos[0]===this.position[i][0] && nextPos[1]===this.position[i][1]){
        this.die();
      }
    }
    
    
    this.position.unshift(nextPos);
    if(this.position.length>this.size){
      this.position.pop();
    }
  }
  
  
};

var food = {
  position: [4,4],
  newFood: function(grd){
    do {
      this.position = randomPos();
    } while (grd.check(this.position));
  },
  init: function(grd){
    this.newFood(grd);
  },
  eaten : function(grd, p){
    // sanity check to avoid infinite loop
    // in the case someone actually manages to
    // get the snake to fill the board 
    if( score+4+1 >= grd.cols*grd.cols-2){
      console.log('board full');
      return true;
    }
    
    if(p[0]===this.position[0] && p[1]===this.position[1] ){
      this.newFood(grd);
      return true;
    }
    return false;
  } 
}
//  "pixel" unit of the grid:
var mySquare = '<div class="square"></div>';

// paints the snake squares
var paintGridSnake = function(s){
  $(s).css('background-color', '#fff');
};

// paints the food square
var paintGridFood = function(s){
  $(s).css('background-color', '#ee9933');
};

// paints the square black
var paintGridBlack = function(s){
  $(s).css('background-color', '#000');
};


// generates a grid with l squares on each side
var generateGrid = function(totalWidth, l){
  var squareWidth=(totalWidth/l)+'px';
  var $grid=$('.level');
  // squaring side size 
  l = l*l;
  $grid[0].innerHTML="";
  for(var i=0;i<l;i++){
    $grid.append(mySquare);
  }
  $('.square').css('width',squareWidth);
  $('.square').css('height', squareWidth);
};

function randomPos() {
  var x = Math.floor(Math.random()*grid.cols);
  var y = Math.floor(Math.random()*grid.cols);
  return [x,y];
}


var main = function() {
  // set size of the grid:
  grid.cols = 20;
  generateGrid(grid.width, grid.cols);
  grid.init();
  food.init(grid);
  grid.update(snake, food);
  grid.draw();
  
  $( "html" ).keydown(function( event ) {
    if(event.which === 39){
      snake.right();
    }
    if(event.which === 37){
      snake.left();
    }
    if(event.which === 38){
      snake.top();
    }
    if(event.which === 40){
      snake.bot();
    }
    
  });
   
  
  var gameLoop = setInterval(function(){
    snake.update(grid, food);
    grid.update(snake, food);
    grid.draw();
    if(!snake.alive){
      $('.game-title').text("LOST");
      clearInterval( gameLoop );
    }    
  }, 80);
  
};
// end of main function


$(document).ready(main);