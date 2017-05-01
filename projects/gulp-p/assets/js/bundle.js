var moveSlide = function(slides, current, n){
  $(slides[current]).hide();
  current += n;
  if(current >= slides.length){
    current = 0;
  } else if (current < 0){
    current = slides.length-1;
  }
  $(slides[current]).fadeIn();
    
  return current;
};
var main = function() {
  var currentSlide = 0;
  var slides = $('.slide');
  
  slides.hide();  
  $(slides[0]).fadeIn();
  
  // keyboard events handeling
  $( 'html' ).keydown(function( event ) {
    if ( event.which == 13 ) {
    event.preventDefault();
    }
    if (event.which === 32 || event.which === 39 || event.which === 68)
    { 
      // move one slide forward
      currentSlide = moveSlide(slides, currentSlide, 1);
    }
    if (event.which === 37 || event.which === 65)
    { 
      // move one slide back
      currentSlide = moveSlide(slides, currentSlide, -1);
    }
      
  });
  
  
  // mouse click to advance
  // removed so it doen'st interfere with link clicking
  // $('html').mousedown(function(event) {
  //   if (event.which === 1) {        
  //           currentSlide = moveSlide(slides, currentSlide, 1);
  //   }
  // });
};
// end of main function

$(document).ready(main);