
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
    type: 'POST',
    data: JSON.stringify( json_data ),
    contentType: 'application/json',
		url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/test1/getcars',

		// url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/test1/addwatchlist',
		// url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/test1/getwatchlist',
		// url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/test1/listvehicle',
		// url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/test1/addcar',
    xhrFields: {
      withCredentials: false
    },
    headers: {
    },
    fail: function(xhr, textStatus, errorThrown){
      alert('request failed');
    },
    success: function (data) {
      console.log(data);
    },
    complete: function () {
      console.log("Post request made to server");
      $dialog_container.hide(0);
      $delete_event_dialog.hide(0);
      loadCalendarInfo(selected_calendar);
    },
    error: function (error) {
      console.log("FAIL....=================");
    }
  });


});
