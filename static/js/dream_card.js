$(document).ready(function(){
	let all_restaurants_infos;

	$("#restaurant-data-wrap").css("display", "none");
	$(".restaurant-name-search").on("click", function(){
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

	$(".restaurants_names_list").css("display", "none");
	$("#restaurant-search-input").keyup(function(){
		let restaurantSearched = $(this).val();
		if(restaurantSearched == ""){
			$(".restaurants_names_list").css("display", "none");	
		} else{
			$(".restaurants_names_list").css("display", "block");
			$(".restaurants_names_list > li").mouseenter(function(){
				$(this).css("background-color", "#5a4a4a2e");
				$(this).css("cursor", "pointer");
			});
			$(".restaurants_names_list > li").mouseleave(function(){
				$(this).css("background-color", "transparent");
			});
		}
	});

	$.ajax({
		type: "GET",
		url: "/county",
		data:{},
		success: function(response){
			all_restaurants_infos = response;
			for (let i = 0; i < response.length; i++){
				let restaurant_name = response[i]["restaurant_name"];
				let restaurants_infos_list = '<li class="restaurant_names" onclick="restaurant_name_value(this)">'+restaurant_name+'</li>'
				$(".restaurants_names_list").append(restaurants_infos_list);
				console.log(restaurants_infos_list);
			}
		}
	});

});

// 클릭 된 "구" 보여주기
$(function(){
	$(".cities-list").on("click",function(){
		$("#dropdownMenuButton").text($(this).text());
	});
});

function restaurantSearch(){
	let restaurants_names;
	let restaurant_name_val = $("#restaurant-input").val();
	for (let i = 0; i < all_restaurants_infos.length; i++){
		if(all_restaurants_infos[i]['restaurant_name'] == restaurant_name){
			restaurants_names = all_restaurants_infos[i];
			break;
		}
	}
	let county_name_span = restaurants_names["restaurant_name"];
	let county_name_based_restaurant_span = '<span class="county-name-based-restaurant-span">'+county_name_span+'에 있는 식당 정보입니다</span>'

	$(".county-name-based-restaurant-wrap").text(county_name_based_restaurant_span);

	$.ajax({
		type: "POST",
		url: "/county",
		data: {county_name_give: restaurant_name_val},
		success: function(response){
			$(".restaurant-data-lists").empty();
			for (let i = 0; i < response.length; i++){
				let restaurant_name = response[i]["restaurant_name"];
				let restaurant_address = response[i]["restaurant_address"];
				let restaurant_phoneNumber = response[i]["restaurant_phoneNumber"];
				let restaurant_type = response[i]["restaurant_type"];

				let restaurant_data_lists = '<div class="restaurant-info-box">\
					<img src="https://nrbe.pstatic.net/styles/basic/1582161745/11/1747/793@2x.png?mt=ar.bg.ol.sw.lko"/>\
					<div class="res-info">\
						<div class="restaurant-name">\
							<span>'+restaurant_name+'</span>\
						</div>\
						<div class="restaurant-address">\
							<span>'+restaurant_address+'</span>\
						</div>\
						<div class="restaurant-phonenumber">\
							<i class="fas fa-phone-square"></i>\
							<span>'+restaurant_phoneNumber+'</span>\
						</div>\
						<div class="restaurant-type">\
							<span>'+restaurant_type+'</span>\
						</div>\
					</div>\
				</div>'

				$(".restaurant-data-lists").append(restaurant_data_lists);
			}
		}
	});
}











