$(document).ready(function(){
    let data = {
      'cars' : []
    };
    var data_global;
    var filter_global;
    let filters = ['make', 'model', 'color'];

    let imglnk = "http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg";
    var sample_response = {
		  "isBase64Encoded": false,
		  "body": "{\"input\":\"{}\",\"vehicleList\":\"{\\\"vehicles\\\":[{\\\"makeId\\\":\\\"3\\\",\\\"trim\\\":\\\"Sport\\\",\\\"trimId\\\":\\\"1\\\",\\\"year\\\":\\\"2019\\\",\\\"modelId\\\":\\\"7\\\",\\\"price\\\":\\\"35000\\\",\\\"mile\\\":4000,\\\"description\\\":\\\"Please contact me if you are interested\\\",\\\"model\\\":\\\"MX-5\\\",\\\"make\\\":\\\"Mazda\\\",\\\"email\\\":\\\"kshao2@wpi.edu\\\",\\\"carId\\\":\\\"3\\\"},{\\\"makeId\\\":\\\"1\\\",\\\"trim\\\":\\\"Hybrid\\\",\\\"trimId\\\":\\\"12\\\",\\\"year\\\":\\\"2015\\\",\\\"modelId\\\":\\\"2\\\",\\\"price\\\":\\\"29987\\\",\\\"mile\\\":29938,\\\"description\\\":\\\"A bargain. Please contact me for more information!\\\",\\\"model\\\":\\\"Camry\\\",\\\"make\\\":\\\"Toyota\\\",\\\"email\\\":\\\"wlm3@wpi.edu\\\",\\\"carId\\\":\\\"4\\\"},{\\\"makeId\\\":\\\"1\\\",\\\"trim\\\":\\\"Limited\\\",\\\"trimId\\\":\\\"16\\\",\\\"year\\\":\\\"2014\\\",\\\"modelId\\\":\\\"2\\\",\\\"price\\\":\\\"25699\\\",\\\"mile\\\":46771,\\\"description\\\":\\\"Contact ackme@wpi.edu plz.\\\",\\\"model\\\":\\\"Camry\\\",\\\"make\\\":\\\"Toyota\\\",\\\"email\\\":\\\"wlm5@wpi.edu\\\",\\\"carId\\\":\\\"6\\\"},{\\\"makeId\\\":\\\"4\\\",\\\"trim\\\":\\\"EX-L\\\",\\\"trimId\\\":\\\"9\\\",\\\"year\\\":\\\"2008\\\",\\\"modelId\\\":\\\"10\\\",\\\"price\\\":\\\"20199\\\",\\\"mile\\\":92039,\\\"description\\\":\\\"A nice car, it runs perfectly and the brake pads are new. Please let me know if you are interested. erk3@wpi.edu\\\",\\\"model\\\":\\\"Accord\\\",\\\"make\\\":\\\"Honda\\\",\\\"email\\\":\\\"test.wpi.edu\\\",\\\"carId\\\":\\\"7\\\"},{\\\"makeId\\\":\\\"4\\\",\\\"trim\\\":\\\"EX\\\",\\\"trimId\\\":\\\"7\\\",\\\"year\\\":\\\"2003\\\",\\\"modelId\\\":\\\"10\\\",\\\"price\\\":\\\"8700\\\",\\\"mile\\\":100392,\\\"description\\\":\\\"You can contact brm12@wpi.edu for testdrive.\\\",\\\"model\\\":\\\"Accord\\\",\\\"make\\\":\\\"Honda\\\",\\\"email\\\":\\\"admin@wpi-car.com\\\",\\\"carId\\\":\\\"8\\\"}]}\"}",
		  "statusCode": "200"
		};

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $("#side-bar-my-account").click(function () {
        $('#account-details-content').show(0);
        $('#list-container').hide(0);
        $('#watchlist-container').hide(0);
        return false;
    });
    $("#side-bar-my-listings").click(function () {
        $('#list-container').show(0);
        $('#account-details-content').hide(0);
        $('#watchlist-container').hide(0);
        return false;
    });
    $("#side-bar-my-watchlist").click(function () {
        $('#watchlist-container').show(0);
        $('#account-details-content').hide(0);
        $('#list-container').hide(0);
        return false;
    });


    var json = JSON.parse(sample_response.body);
    console.log(json);

    console.log("log from index2.js");
    let cars = data.cars;
    console.log(cars.length);
    let $selllistContainer = $("#selllist").html('<h1 class="mt-4">Sell List</h1>');
    let $watchlistContainer = $("#watchlist").html('<h1 class="mt-4">Watch List</h1>');

    let divCarInfo;
    let divBreak = '<div class="w-100"></div>';

    // TODO: agurung clear this during clean up.
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

  	$.ajax({
        type: 'GET',
        url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getwatchlist',
        crossDomain: true,
        contentType: 'application/json',
        dataType: 'json',

        success: function (data, status) {
            console.log(data);
            // populateResponse(JSON.parse(JSON.parse(data.body).vehicleList));
            data_global = JSON.parse(JSON.parse(sample_response.body).vehicleList).vehicles;
            populateResponse(data_global);
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
    function populateResponse (cars){
      $selllistContainer = $("#selllist").html('');//<h1 class="mt-4">Sell List</h1>
      $watchlistContainer = $("#watchlist").html('');//<h1 class="mt-4">Watch List</h1>
        for( let i = 0; i < cars.length; i++){
            let car = cars[i];
            if(i > 0 && i%2 == 0 ){
                $selllistContainer.append(divBreak);
                $watchlistContainer.append(divBreak);
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
                '<button class="car_purchase_button">Sold</button>'+
                '<button class="car_more_info_button" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Remove from list</button>'+
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
            $selllistContainer.append(divCarInfo);
            $watchlistContainer.append(divCarInfo);
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
    function populateWatchlistResponse (data){
        cars=data.vehicles;
        $watchlistContainer.html("");
        for( let i = 0; i < cars.length; i++){
            let car = cars[i];
            if(i > 0 && i%2 == 0 ){
                $watchlistContainer.append(divBreak);
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
            $watchlistContainer.append(divCarInfo);
        }
    }
});
