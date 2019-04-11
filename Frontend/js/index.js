
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

let imglnk = "http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg";
var sample_response = {
  "isBase64Encoded": false,
  "body": "{\"input\":\"{}\",\"vehicleList\":\"{\\\"vehicles\\\":[{\\\"makeId\\\":\\\"3\\\",\\\"trim\\\":\\\"Sport\\\",\\\"trimId\\\":\\\"1\\\",\\\"year\\\":\\\"2019\\\",\\\"modelId\\\":\\\"7\\\",\\\"price\\\":\\\"35000\\\",\\\"mile\\\":4000,\\\"description\\\":\\\"Please contact me if you are interested\\\",\\\"model\\\":\\\"MX-5\\\",\\\"make\\\":\\\"Mazda\\\",\\\"email\\\":\\\"kshao2@wpi.edu\\\",\\\"carId\\\":\\\"3\\\"},{\\\"makeId\\\":\\\"1\\\",\\\"trim\\\":\\\"Hybrid\\\",\\\"trimId\\\":\\\"12\\\",\\\"year\\\":\\\"2015\\\",\\\"modelId\\\":\\\"2\\\",\\\"price\\\":\\\"29987\\\",\\\"mile\\\":29938,\\\"description\\\":\\\"A bargain. Please contact me for more information!\\\",\\\"model\\\":\\\"Camry\\\",\\\"make\\\":\\\"Toyota\\\",\\\"email\\\":\\\"wlm3@wpi.edu\\\",\\\"carId\\\":\\\"4\\\"},{\\\"makeId\\\":\\\"1\\\",\\\"trim\\\":\\\"Limited\\\",\\\"trimId\\\":\\\"16\\\",\\\"year\\\":\\\"2014\\\",\\\"modelId\\\":\\\"2\\\",\\\"price\\\":\\\"25699\\\",\\\"mile\\\":46771,\\\"description\\\":\\\"Contact ackme@wpi.edu plz.\\\",\\\"model\\\":\\\"Camry\\\",\\\"make\\\":\\\"Toyota\\\",\\\"email\\\":\\\"wlm5@wpi.edu\\\",\\\"carId\\\":\\\"6\\\"},{\\\"makeId\\\":\\\"4\\\",\\\"trim\\\":\\\"EX-L\\\",\\\"trimId\\\":\\\"9\\\",\\\"year\\\":\\\"2008\\\",\\\"modelId\\\":\\\"10\\\",\\\"price\\\":\\\"20199\\\",\\\"mile\\\":92039,\\\"description\\\":\\\"A nice car, it runs perfectly and the brake pads are new. Please let me know if you are interested. erk3@wpi.edu\\\",\\\"model\\\":\\\"Accord\\\",\\\"make\\\":\\\"Honda\\\",\\\"email\\\":\\\"test.wpi.edu\\\",\\\"carId\\\":\\\"7\\\"},{\\\"makeId\\\":\\\"4\\\",\\\"trim\\\":\\\"EX\\\",\\\"trimId\\\":\\\"7\\\",\\\"year\\\":\\\"2003\\\",\\\"modelId\\\":\\\"10\\\",\\\"price\\\":\\\"8700\\\",\\\"mile\\\":100392,\\\"description\\\":\\\"You can contact brm12@wpi.edu for testdrive.\\\",\\\"model\\\":\\\"Accord\\\",\\\"make\\\":\\\"Honda\\\",\\\"email\\\":\\\"admin@wpi-car.com\\\",\\\"carId\\\":\\\"8\\\"}]}\"}",
  "statusCode": "200"
};

$(document).ready(function(){
	// var json = jQuery.parseJSON( sample_response.body );

	var json = JSON.parse(sample_response.body);
	console.log(json);

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
						'<div class="car_more_info_button">More Info</div>'+
      			'<div class="car_purchase_button">Buy</div>'+
						'<button class="btn btn-primary" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button>'+
						'<div class="row">'+
						'<div class="col">'+
						'<div class="collapse multi-collapse" id="multiCollapseExample1">'+
			      '<div class="card card-body">'+
						 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.'+
						'</div></div></div></div></div>';
	let divBreak = '<div class="w-100"></div>';

	for( let i = 0; i < cars.length; i++){
		let car = cars[i];
		if(i > 0 && i%2 == 0 ){
			$carsContainer.append(divBreak);
		}
		divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> '+
						'<div class="row">'+
							'<img class="car_info_image" src="'+car.links[0]+'">'+
								'<div class="car_info_details align-middle">'+
										car.owner +'<br/>'+
										car['contact-info']+'<br/>'+
										car['car-type']+'<br/>'+
										car.Manufacturer+
										'<button class="car_purchase_button">Buy</button>'+
										'<button class="car_more_info_button" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">More Info</button>'+
		      			'</div>'+
						'</div>'+
						'<div class="row row_custom_info">'+
							'<div class="col">'+
								'<div class="collapse multi-collapse" id="multiCollapseExample1">'+
					      	'<div class="card card-body">'+
										'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.'+
						'</div></div></div></div></div>';
        $carsContainer.append(divCarInfo);
	}

	var json_data = {
	  'year' : '1990',
	  'makeId' : '1234123',
	  'modelId' : '123',
	  'trimId' : '123',
	  'vin' : 'aeiou',
	  'mile' : 'abcde',
	  'color' : 'black and blue',
	  'price' : '100',
	  'desc' : 'lalalala',
	  'userId' : 'Monkey Kong'
	};

	$.ajax({
    type: 'GET',
		url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/listvehicle',
		crossDomain: true,
    contentType: 'application/json',
		dataType: 'json',
		// url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getcars',

		// url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/addwatchlist',
		// url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getwatchlist',
		// url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/addcar',

    success: function (data, status) {
      console.log(data);
			populateResponse(JSON.parse(JSON.parse(data.body).vehicleList));
    },
    complete: function () {
      console.log("Post request made to server");
      // $dialog_container.hide(0);
      // $delete_event_dialog.hide(0);
      // loadCalendarInfo(selected_calendar);
    },
    error: function (error) {
      console.log("FAIL....=================");
    }
  });

	function populateResponse (data){
		cars = data.vehicles;
		$carsContainer.html("");
		for( let i = 0; i < cars.length; i++){
			let car = cars[i];
			if(i > 0 && i%2 == 0 ){
				$carsContainer.append(divBreak);
			}
			divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> '+
							'<div class="row">'+
								'<img class="car_info_image" src="'+imglnk+'">'+
									'<div class="car_info_details align-middle">'+
											' Make :  '+car.make +'<br/>'+
											' Model :  '+car.model+'<br/>'+
											' Price :  '+car.price+'<br/>'+
											' Year :  '+car.year+'<br/>'+
											' Mileage :  '+car.mile+
											'<button class="car_purchase_button">Buy</button>'+
											'<button class="car_more_info_button" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">More Info</button>'+
									'</div>'+
							'</div>'+
							'<div class="row row_custom_info">'+
								'<div class="col">'+
									'<div class="collapse multi-collapse" id="multiCollapseExample1">'+
										'<div class="card card-body">'+
											' Description :  '+car.description +'<br/>'+
											' Contact Info :  '+car.email +'<br/>'+
											' modelId :  '+car.modelId +'<br/>'+
							'</div></div></div></div></div>';
					$carsContainer.append(divCarInfo);
		}

		$(".car_more_info_button").click(function(){
			var $this = $(this);
			if ($this.html() == "More Info"){
				$this.html("Less Info");
			} else {
				$this.html("More Info");
			}
		});
	}

});
