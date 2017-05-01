var getAge = function (d, m, y) {
    var bd = new Date();
    bd.setFullYear(y, m, d);
    bd = bd.getTime();
    // 1000ms*60s*60m*24h*365.25y
    // 31557600000 ms per year
    return Math.floor((Date.now() - bd)/31557600000);
  };

// main function
// executed on document ready
var main = function () {

  // hidding back top arrow
  $('.back-top').hide();

  // set my current age
  $('.my-age').text(getAge(25, 9, 1985));

  // smooth scroll link
  $('a.scroll').click(function(e) {
        var $anchor = $(this);
        $('body, html').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
        if($anchor.hasClass('menu-btn')){
           // only if on hamburger mode
          if(window.innerWidth < 911) {
            menuToggle();
          }
        }
  });

  // show back to top arrow if scrolled down
  $(document).scroll(function(){
    if($(window).scrollTop() > 160) {
      $('.back-top').fadeIn(400);
    }
    else {
      $('.back-top').fadeOut(400);
    }
  });

  // change menu to fixed on scroll
  var toogleMenuFixed = function(height) {
    if($(window).scrollTop() > height){
          $('nav').addClass('fixed');
        } else {
          $('nav').removeClass('fixed');
        }
  };

  $(document).scroll(function(){
    var windowWidth = window.innerWidth;
    // only if not on hamburger mode
    if(windowWidth > 910) {
      // diferent breakpoints
      if(windowWidth > 1180) {
        toogleMenuFixed(260);
      } else if (windowWidth >1010){
        toogleMenuFixed(160);
      } else {
        toogleMenuFixed(110);
      }
    }
  });

  // active button on menu based on scroll
  var sections = ['#about', '#projects', '#tech-skills', '#presentations', '#education', '#experience', '#contact' ];
  $(document).scroll(function(){
      var sectionOffset = [];
      // getting all the offsets
      // minus a margin value (so it activates before going offscreen)
      // activates when title is on the top 1/5 of the screen
      var offsetMargin = -(window.innerHeight/5);
      for(var i=0, max=sections.length;i<max-1;i++){
        sectionOffset.push($(sections[i]).offset().top + offsetMargin);
      }
      //last one is special
      //needs to give have margin since he will never cross top screen
      sectionOffset.push($(sections[sections.length-1]).offset().top - window.innerHeight + $('#contact').height());

      // looking for the active section
      for(var i=0, max=sections.length;i<max;i++){
        if(sectionOffset[i] < $(window).scrollTop()) {
          $('.menu-btn').removeClass('active');
          $($('.menu-btn')[i]).addClass('active');
        }
      }

    });

  // menu toggle function
  var menuToggle = function(){
    var menu = $('nav');
    menu.toggleClass('menu-open');
  };

// hamburger click
  $('a.expand').click(function(e){
    menuToggle();
    e.preventDefault();
  });

  // project overlay page

  // open an overlay
  $('.overlay-btn').click(function(e){
    $('.'+this.id).addClass('overlay-enabled');
    $('.overlay-dark').addClass('overlay-enabled');
    e.preventDefault();
  });

  // stop all youtube videos
  var stopYt= function(){
    $('.yt-video').each(function(){
      this.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
    });
  };

  // close button on overlay
  $('.btn-close').click(function(e){
    $('.overlay-page').removeClass('overlay-enabled');
    $('.overlay-dark').removeClass('overlay-enabled');
    stopYt();
    e.preventDefault();
  });

  // close when clicking outside the project page
  $('.overlay-dark').click(function(e){
    $('.overlay-page').removeClass('overlay-enabled');
    $('.overlay-dark').removeClass('overlay-enabled');
    stopYt();
    e.preventDefault();
  });

  // scale up img on click
  $('.get-overlay-img').click(function(e){
    $('#full-img')[0].src=this.href;
    $('.img-overlay').addClass('overlay-enabled');
    e.preventDefault();
  });

  // close big image
  $('#full-img').click(function(e){
    $('#full-img')[0].src='#';
    $('.img-overlay').removeClass('overlay-enabled');
    e.preventDefault();
  });

  // close image when clicking outside the IMG
  $('.img-overlay').click(function(e){
    $('#full-img')[0].src='#';
    $('.img-overlay').removeClass('overlay-enabled');
    e.preventDefault();
  });

  // end main function
};

$(document).ready(main);
