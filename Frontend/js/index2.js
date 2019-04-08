
/*assuming data is the reponse we get from the server in json format*/
let data = {
	'cars' : [
		{
			"owner": "user1",
			"contact-info": "1111111111",
			"car-type": "Mustang",
			"Manufacturer": "Ford",
			"links":[
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg"
			]
		},{
			"owner": "user1",
			"contact-info": "1111111111",
			"car-type": "Mustang",
			"Manufacturer": "Ford",
			"links":[
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg"
			]
		},{
			"owner": "user1",
			"contact-info": "1111111111",
			"car-type": "Mustang",
			"Manufacturer": "Ford",
			"links":[
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg"
			]
		},{
			"owner": "user1",
			"contact-info": "1111111111",
			"car-type": "Mustang",
			"Manufacturer": "Ford",
			"links":[
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg"
			]
		},{
			"owner": "user1",
			"contact-info": "1111111111",
			"car-type": "Mustang",
			"Manufacturer": "Ford",
			"links":[
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg",
				"http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg"
			]
		}
	]
}

$(document).ready(function(){
	console.log("log from index2.js");
	let cars = data.cars;
	console.log(cars.length);
	$carsContainer = $(".cars-container").html('<h1 class="mt-4">Simple Sidebar</h1>');

	let divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> '+
						'<img class="car_info_image" src="http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg">'+
						'<div class="car_info_details align-middle">'+
						'image of car <br/>'+
						'description of car <br/>'+
						'seller of car<br/>'+
						'btn 1'+
          			'</div>'+
          			'<div class="car_purchase_button">Buy</div></div>';
	let divBreak = '<div class="w-100"></div>';

	for( let i = 0; i < cars.length; i++){
		let car = cars[i];
		if(i > 0 && i%2 == 0 ){
			$carsContainer.append(divBreak);	
		}
		divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> '+
						'<img class="car_info_image" src="'+car.links[0]+'">'+
						'<div class="car_info_details align-middle">'+
						car.owner +'<br/>'+
						car['contact-info']+'<br/>'+
						car['car-type']+'<br/>'+
						car.Manufacturer+
          			'</div>'+
          			'<div class="car_purchase_button">Buy</div></div>';
        $carsContainer.append(divCarInfo);
	}
});