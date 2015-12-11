define(['jquery'],function($){
	$('.left_menu_title').on('click', function () {
		$(this).parent('.left_menu_set').toggleClass("open");
	})
})