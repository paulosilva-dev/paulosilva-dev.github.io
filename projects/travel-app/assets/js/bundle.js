var main = function() {
	$('.mpics').click(function(){
		var currentPics = $('.active-pics');
		currentPics.hide();
		currentPics.removeClass('active-pics');
		$('.fa-circle').removeClass('fa-circle').addClass('fa-circle-o');
		$(this).addClass('fa-circle');
		if($(this).hasClass('opt-1')){
			$('.pics-1').fadeIn(200).addClass('active-pics');
		} else if($(this).hasClass('opt-2')){
			$('.pics-2').fadeIn(200).addClass('active-pics');		
		}else {
			$('.pics-3').fadeIn(200).addClass('active-pics');			
		}
	});
}

$(document).ready(main);

