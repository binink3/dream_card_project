$(document).ready(function(){

$("#restaurant-data-wrap").css("display", "none");
	$(".restaurant-name-search").on("click", function(){
		// let fund_input_val = $("#fund-input").val();
		$("#restaurant-data-wrap").css("display", "block");
		$("html, body").animate(
			{scrollTop:$("#restaurant-data-wrap").offset().top
		}, 1000, "swing");
		$(".cities-list-group").css("display", "none");
	});
	
	$("#first-page-scroll").css({ height: $(window).innerHeight() });
			$(window).resize(function(){
			$("#first-page-scroll").css({ height: $(window).innerHeight() });
		});
});