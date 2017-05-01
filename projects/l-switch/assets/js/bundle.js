// gets the current time in milliseconds
var getTimeMs = function() {
	return (new Date()).getTime();
}
// returns random number btween 0 and n
var randomNum = function(n){
	return Math.floor(Math.random()*(n+1));
};
var main = function() {
	// get timer element
	var timerEl = $('.timer');
	
	$('.retry').hide();
	$('.game').hide();
	
	// flag for winning condition
	var won = false;
	var lost = false;
	// target number of updates per second:
	var ticksPerSec = 10;
	// set time per game in seconds
	var gameTime = 5; 
	var timer = gameTime * ticksPerSec;
	// converting game time from seconds to number of tics
	gameTime = gameTime * ticksPerSec;
		
	var frameTime = 1000/ ticksPerSec;
	
	var initTime = 0;
	var level = 1;
	
	//initialize blocks function
	var initBlocks= function(n){
		var blockA = '<li class="block rb"><i class="fa fa-chevron-right"></i></li>';
		var blockB = '<li class="block"><i class="fa fa-chevron-left"></i></li>';
		var blockSA = '<li class="block rb"><i class="fa fa-chevron-left"></i></li>';
		var blockSB = '<li class="block"><i class="fa fa-chevron-right"></i></li>';
		
		var listL = $('.game-left');
		var listR = $('.game-right');
		//removing all children nodes
		listL.empty();
		listR.empty();
		// number of blocks to switch (3 block variation, minimum blocks switched round(n/2))
		var blocksToSwitch = (n/2) + randomNum(2);
		var blockSwitch = [];
		
		for(var i=0;i<n;i++){
			blockSwitch.push(false);
		}
		
		// sanity check to avoid infinite loop
		if(n >= blocksToSwitch){
			// distributing random blocks
			for(var i=0, ri=0;i<blocksToSwitch;i++) {
				ri = randomNum(n-1);
				if(!blockSwitch[ri]){
					blockSwitch[ri] = true;
				}
				else {
					i--;
				}
			}
		}
		// filling out the list
		for(var i=0;i<n;i++){
			
			if(blockSwitch[i]){
				listL.append($(blockSB));
				listR.append($(blockSA));
			} else {
				listL.append($(blockA));
				listR.append($(blockB));			
			}
		}
		
	};
	
	$('h4.btn').click(function(){
		// creating blocks (max 8) 
		if (level < 5) {
			initBlocks(4+level);
		}else {
			initBlocks(8);
		}
		// set time per game in seconds
		gameTime = 4-level/4; 
		timer = Math.floor(gameTime * ticksPerSec);
		// converting game time from seconds to number of tics
		gameTime =  Math.floor(gameTime * ticksPerSec);
		$('h1').text('Level: '+level);
		$('.level').text('Level: '+level);
	
		$('.game-right').show();
		$('.game-left').show();
		$('.game').show();
		$('.menu').hide();
		initTime = getTimeMs();
		// switching function	
		$('.block').click(function () {
			$(this).toggleClass('rb');
			// finding current element order nr
			var o = $(this).prevAll().length;
			if($(this).parent().hasClass('game-left')){
				$($('.game-right').children()[o]).toggleClass('rb');
			}
			else {
				$($('.game-left').children()[o]).toggleClass('rb');
			}
			
			// checking if the win condition is met
			var bList = $('.game-right').children();
			won = true;
			for (var i=0, l=bList.length;i<l;i++) {
				if($(bList[i]).hasClass('rb')){
					won = false;
				};
			}
			if(won&&!lost){
				clearInterval(gameLoop);
				level++;			
				timerEl.text('WON!');
				$('.level').text('next Level: '+level);
				$('.game-right').hide();
				$('.game-left').hide();
				$('.menu').show();	
				$('.game').hide();
			}		
		});
		
		// Game loop: 
		var gameLoop = setInterval(function(){
			// game update logic
			timer = gameTime - Math.floor((getTimeMs()-initTime)/frameTime);
			// lose condition
			if (timer >= 0){ 
				timerEl.text(timer);
			}
			else {
				lost = true;
				timerEl.text('Lost').addClass('lost');
				$('.game-right').hide();
				$('.game-left').hide();
				$('.level').text('Final Level: '+level);
				$('.retry').show();
				$('.instructions').hide();
				$('.game').hide();
				clearInterval(gameLoop);
			}
		}, frameTime);
	
	});
	
};

$(document).ready(main);