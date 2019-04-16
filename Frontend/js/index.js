/*assuming data is the reponse we get from the server in json format*/
let data = {
    'cars': []
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

// Get the modal
var modal = document.getElementById('login-modal');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

$("#modal-cancel").click(function () {
    document.getElementById('login-modal').style.display = 'none';
});
$("#login-modal-open").click(function () {
    document.getElementById('login-modal').style.display = 'block'
});
$("#login-form-submit").click(function () {
    var $inputs = $('#login-form :input');

    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    var values = {};
    $inputs.each(function () {
        values[this.id] = $(this).val();
    });
    values['userId'] = "1";
    console.log(values);
    add_car_DB(values);

    $.ajax({
        type: 'POST',
        url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/authenticateuser',
        crossDomain: true,
        contentType: 'application/json',
        dataType: 'json',
        success: function (data, status) {
            data_global = JSON.parse(JSON.parse(data.body).vehicleList);
            data_global = data_global.vehicles;
            console.log(data);
            populateResponse(data_global);
            setupFilterInformation(data_global);
        },
        complete: function () {
            console.log("Login auth post request made to server");
        },
        error: function (error) {
            console.log("login post FAIL....=================");
        }
    });
});


$(document).ready(function () {
    // var json = jQuery.parseJSON( sample_response.body );

    var json = JSON.parse(sample_response.body);
    console.log(json);


    console.log("log from index2.js");
    let cars = data.cars;
    console.log(cars.length);
    $carsContainer = $(".cars-container").html('<h1 class="mt-4">Simple Sidebar</h1>');

    let divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> ' +
        '<img class="car_info_image" src="http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg">' +
        '<div class="car_info_details align-middle">' +
        'image of car <br/>' +
        'description of car <br/>' +
        'seller of car<br/>' +
        'btn 1' +
        '</div>' +
        '<div class="car_more_info_button">More Info</div>' +
        '<div class="car_purchase_button">Buy</div>' +
        '<button class="btn btn-primary" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button>' +
        '<div class="row">' +
        '<div class="col">' +
        '<div class="collapse multi-collapse" id="multiCollapseExample1">' +
        '<div class="card card-body">' +
        'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.' +
        '</div></div></div></div></div>';
    let divBreak = '<div class="w-100"></div>';

    for (let i = 0; i < cars.length; i++) {
        let car = cars[i];
        if (i > 0 && i % 2 == 0) {
            $carsContainer.append(divBreak);
        }
        divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> ' +
            '<div class="row">' +
            '<img class="car_info_image" src="' + car.links[0] + '">' +
            '<div class="car_info_details align-middle">' +
            car.owner + '<br/>' +
            car['contact-info'] + '<br/>' +
            car['car-type'] + '<br/>' +
            car.Manufacturer +
            '<button class="car_purchase_button">Buy</button>' +
            '<button class="car_more_info_button" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">More Info</button>' +
            '</div>' +
            '</div>' +
            '<div class="row row_custom_info">' +
            '<div class="col">' +
            '<div class="collapse multi-collapse" id="multiCollapseExample1">' +
            '<div class="card card-body">' +
            'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.' +
            '</div></div></div></div></div>';
        $carsContainer.append(divCarInfo);
    }

    var json_data = {
        'year': '1990',
        'makeId': '1234123',
        'modelId': '123',
        'trimId': '123',
        'vin': 'aeiou',
        'mile': 'abcde',
        'color': 'black and blue',
        'price': '100',
        'desc': 'lalalala',
        'userId': 'Monkey Kong'
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
            data_global = JSON.parse(JSON.parse(data.body).vehicleList);
            data_global = data_global.vehicles;
            console.log(data);
            populateResponse(data_global);
            setupFilterInformation(data_global);
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

    function populateResponse(cars) {
        $carsContainer.html("");
        for (let i = 0; i < cars.length; i++) {
            let car = cars[i];
            if (i > 0 && i % 2 == 0) {
                $carsContainer.append(divBreak);
            }
            divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> ' +
                '<div class="row">' +
                '<img class="car_info_image" src="' + imglnk + '">' +
                '<div class="car_info_details align-middle">' +
                ' Owner :  ' + car.userId + '<br/>' +
                ' Make :  ' + car.make + '<br/>' +
                ' Model :  ' + car.model + '<br/>' +
                ' Price :  $' + car.price + '<br/>' +
                ' Year :  ' + car.year + '<br/>' +
                ' Mileage :  ' + car.mile + ' miles<br/>' +
                '<button class="car_purchase_button">Buy</button>' +
                '<button class="car_more_info_button" type="button" data-toggle="collapse" data-target="#info' + i + '" aria-expanded="false" aria-controls="info' + i + '">More Info</button>' +
                '</div>' +
                '</div>' +
                '<div class="row row_custom_info">' +
                '<div class="col">' +
                '<div class="collapse multi-collapse" id="info' + i + '">' +
                '<div class="card card-body">' +
                ' Description :  ' + car.description + '<br/>' +
                ' Contact Info :  ' + car.email + '<br/>' +
                ' VIN :  ' + car.vin + '<br/>' +
                ' Color :  ' + car.color + '<br/>' +
                // ' modelId :  '+car.modelId +'<br/>'+
                '</div></div></div></div></div>';
            $carsContainer.append(divCarInfo);
        }

        $(".car_more_info_button").click(function () {
            var $this = $(this);
            if ($this.html() == "More Info") {
                $this.html("Less Info");
            } else {
                $this.html("More Info");
            }
        });
    }

    function setupFilterInformation(cars) {
        filter_global = {};
        var filter;
        for (let i = 0; i < filters.length; i++) {
            filter = filters[i];
            filter_global[filter] = [];
        }

        for (let j = 0; j < cars.length; j++) {
            let car = cars[j];
            for (var i = 0; i < filters.length; i++) {
                let filter = filters[i];
                if (!filter_global[filter].hasOwnProperty(car[filter])) {
                    filter_global[filter][car[filter]] = 1;
                } else {
                    filter_global[filter][car[filter]]++;
                }
            }
        }


        for (let k = 0; k < filters.length; k++) {
            let filter_values = Object.keys(filter_global[filters[k]]);
            $("#" + filters[k]).html("");
            for (let l = 0; l < filter_values.length; l++) {
                $("#" + filters[k]).append('<div class="checkbox list-group-item"><label><input type="checkbox" value="' + filter_values[l] + '" id="' + filter_values[l] + '-filter-id"> &nbsp; ' + filter_values[l] + ' (' + filter_global[filters[k]][filter_values[l]] + ') </label></div>');
            }
        }
    }

    $("#honda-filter-id").click(function () {
        var temp_data = [];
        for (let i = 0; i < data_global.length; i++) {
            let car = data_global[i];
            console.log(car);
            if (car.make == "Honda") {
                temp_data.push(car);
            }
        }
        populateResponse(temp_data);
    });
    $("#undo-filder-id").click(function () {
        populateResponse(data_global);
    });

    $('.list-group-item').on('click', function () {
        $('.glyphicon', this)
            .toggleClass('glyphicon-chevron-right')
            .toggleClass('glyphicon-chevron-down');
    });

});
