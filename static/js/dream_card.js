let all_restaurants_infos;
$(document).ready(function(){
	$("#restaurant-data-wrap").css("display", "none");
	$(".restaurant-name-search").on("click", function(){
		$("#restaurant-data-wrap").css("display", "block");
		$("html, body").animate(
			{scrollTop:$("#restaurant-data-wrap").offset().top
		}, 1000, "swing");
		$(".restaurants-names-list").css("display", "none");
	});

	$("#first-page-scroll").css({ height: $(window).innerHeight() });
		$(window).resize(function(){
		$("#first-page-scroll").css({ height: $(window).innerHeight() });
	});

	$(".restaurants-names-list").css("display", "none");
	$("#restaurant-input").keyup(function(){
		let restaurantSearched = $(this).val();
		if(restaurantSearched == ""){
			$(".restaurants-names-list").css("display", "none");	
		} else{
			$(".restaurants-names-list").css("display", "block");
			$(".restaurants-names-list > li").mouseenter(function(){
				$(this).css("background-color", "#5a4a4a2e");
				$(this).css("cursor", "pointer");
			});
			$(".restaurants-names-list > li").mouseleave(function(){
				$(this).css("background-color", "transparent");
			});
		}
	});

	$("#restaurant-input").on("keyup", function() {
	    let restuarnats_list_match = $(this).val();
	    $(".restaurants-names-list li").filter(function() {
	      $(this).toggle($(this).text().indexOf(restuarnats_list_match) > -1)
	    });
  	});

	let restaurant_name_val = $("#restaurant-input").val();
	// let selected_county = $(".county-button").text();
	$.ajax({
		type: "GET",
		url: "/county?restaurant_name_give="+restaurant_name_val,
		data:{},
		success: function(response){
			all_restaurants_infos = response['info'];
			console.log(response);
			for (let i = 0; i < response['info'].length; i++){
				let name = response['info'][i]['restaurant_name'];

				let restaurants_infos_list = '<li class="restaurant_names list-group-item" onclick="restaurantNameValue(this)">'+name+'</li>'
				$("#restaurants-list").append(restaurants_infos_list);
			}
		}
	});

});

function restaurantNameValue(input){
	let selected_restaurant = $(input).text();
	$("#restaurant-input").val(selected_restaurant);
	// alert(selected_restaurant);
}

// 클릭 된 "구" 보여주기
$(function(){
	$(".county-list").on("click",function(){
		$("#dropdownMenuButton").text($(this).text());
		let county_text = $("#dropdownMenuButton").val($(this).text());
		// alert("clicked");
	});
});

function restaurantSearch(response){
	// let all_restaurants_infos = response['restaurants'];
	let restaurant_name_val = $("#restaurant-input").val();
 	let restaurant_type = $(".restaurant-type-span").text();
 	let restaurant_address = $(".restaurant-address-span").text();
 	let restaurant_phoneNumber = $(".restaurant_phoneNumber-span").text();
 	let selected_county = $(".county-button").text();

	let restaurants_names;
	for (let i = 0; i < all_restaurants_infos.length; i++){
		if(all_restaurants_infos[i]['restaurant_name'] == restaurant_name_val){
			restaurants_names = all_restaurants_infos[i];
			break;
		}
	}
	// let selected_county2 = restaurants_names['county_name'];
	let county_name_based_restaurant_span = '<span class="county-name-based-restaurant-span">'+selected_county+'에 있는 식당 정보입니다</span>'
	$("#county-name-based-restaurant-wrap").html(county_name_based_restaurant_span);

	$.ajax({
		type: "POST",
		url: "/county",
		data: {
				restaurant_name_give : restaurant_name_val,
				restaurant_type_give : restaurant_type,
				restaurant_phoneNumber_give : restaurant_phoneNumber,
				restaurant_address_give : restaurant_address,
				county_name_give : selected_county
			},
		success: function(response){
			for (let i = 0; i < response.length; i++){

				let restaurant_name = restaurants[i]["restaurant_name"];
				let restaurant_address = restaurants[i]["restaurant_address"];
				let restaurant_phoneNumber = restaurants[i]["restaurant_phoneNumber"]
				let restaurant_type = restaurants[i]["restaurant_type"];

		
				let restaurant_data_lists = '<div class="restaurant-info-box">\
					<img src="https://nrbe.pstatic.net/styles/basic/1582161745/11/1747/793@2x.png?mt=ar.bg.ol.sw.lko"/>\
					<div class="res-info">\
						<div class="restaurant-name">\
							<span class="restaurant-address-span">'+restaurant_name+'</span>\
						</div>\
						<div class="restaurant-address">\
							<span>'+restaurant_address+'</span>\
						</div>\
						<div class="restaurant-phonenumber">\
							<i class="fas fa-phone-square"></i>\
							<span class="restaurant_phoneNumber-span">'+restaurant_phoneNumber+'</span>\
						</div>\
						<div class="restaurant-type">\
							<span class="restaurant-type-span">'+restaurant_type+'</span>\
						</div>\
					</div>\
				</div>'

				$("#restaurant-data-lists").append(restaurant_data_lists);
				// console.log(JSON.stringfy(data));
			}
		}
	});
}










