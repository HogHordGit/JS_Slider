$(document).ready(function(){
	$('.menu__btn').on('click', function(){
		$(this).toggleClass('menu__btn--active');
		$('.menu__list').stop(true, true).slideToggle(300);
	});
});
