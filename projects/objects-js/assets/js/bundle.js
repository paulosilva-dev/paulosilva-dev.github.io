var moveSlide = function(slides, current, n){
  $(slides[current]).hide();
  current += n;
  if(current >= slides.length){
    current = 0;
  } else if (current < 0){
    current = slides.length-1;
  }
  $(slides[current]).fadeIn();  
  updateProgressBar(slides, current);
  return current;
};

var updateProgressBar = function(slides, current){  
  var totalSlides = slides.length;
  var percent = (((current+1)/totalSlides)*100).toString() + "%";
  $('.progress').css("width", percent);
};
var main = function () {
  var currentSlide = 0;
  var slides = $('.slide');
  updateProgressBar(slides, currentSlide);

  slides.hide();
  $(slides[0]).fadeIn();

  // keyboard events handling
  $('html').keydown(function(event) {
    if (event.which === 13) {
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
  
  
  // naviation arrows images:
  $('.arrow-l').click(function() {
      currentSlide = moveSlide(slides, currentSlide, -1);    
    }
  );
  $('.arrow-r').click(function() {
      currentSlide = moveSlide(slides, currentSlide, 1);    
    }  
  );
  


  // mouse click to advance
//  $('html').mousedown(function(event) {
//    if (event.which === 1) {
//            currentSlide = moveSlide(slides, currentSlide, 1);
//    }
//  });

};
// end of main function

$(document).ready(main);
