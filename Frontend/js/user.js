$(document).ready(function () {
    // Get the modal
    var modal = document.getElementById('login-modal');
// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    $("#modal-cancel").click(function () {
        modal.style.display = 'none';
    });
    $("#login-modal-open").click(function () {
        modal.style.display = 'block'
    });
    $("#login_form_submit").click(function () {
        var $inputs = $('#login-form :input');
        // var json = JSON.parse(sample_response.body);
        console.log("Login-submit: Clicked");

        // not sure if you wanted this, but I thought I'd add it.
        // get an associative array of just the values.
        var values = {};
        $inputs.each(function () {
            values[this.id] = $(this).val();
        });
        console.log("Sent value: " + values.user_name + " " + values.password);
        auth_user(values);
    });
    $("#logout_button").click(function () {
        console.log("logging out");
        localStorage.clear();
        check_login_status();
        window.location = 'index.html';
    });

    function auth_user(data) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/authenticateuser',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                // Create cookie if login auth success
                let object = JSON.parse(data.body);
                console.log("Returned from Auth_User: " + object.userId);
                setItem("userId", object.userId);
            },
            complete: function () {
                console.log("Login auth post request made to server");
                $('#login-form').trigger('reset');
                check_login_status();
                modal.style.display = 'none';
            },
            error: function (error) {
                console.log("login post FAIL....=================");
            }
        });
    }

    function check_login_status() {
        let login_cliche = '<a class="dropdown-toggle nav-link" href="#" role="button" id="login-modal-open">Login</a>';
        let username_cliche = '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"\n' +
            '                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Account</a>' +
            '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">\n' +
            '<a class="dropdown-item" href="user.html">My Garage</a>\n' +
            '<div class="dropdown-divider"></div>\n' +
            '<a class="dropdown-item" href="#" id="logout_button">Log Out</a>\n' +
            '</div>';
        // If not logged in, display "Login" as default
        console.log("CLS: login_cliche");
        $login_status_box = $("#login_status_box").html(login_cliche);
        // If logged in, display "Username"
        let userId = getItem("userId");
        console.log("Read cookie with UserID=" + userId);
        if (userId != "Fail login" && userId != null) {
            // Logged in.
            console.log("CLS: user_name cliche")
            $login_status_box.html("");
            $login_status_box.append(username_cliche);
        }
    }

    function setItem(cname, cvalue) {
        localStorage.setItem(cname, cvalue);
    }

    function getItem(cname) {
        return localStorage.getItem(cname);
    }

    check_login_status(); // checks the status for login box content
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

    console.log("log from user.js");
    let cars = data.cars;
    console.log(cars.length);
    let $selllistContainer = $("#selllist").html('<h1 class="mt-4">Sell List</h1>');
    let $watchlistContainer = $("#watchlist").html('<h1 class="mt-4">Watch List</h1>');

    let divCarInfo;
    let divBreak = '<div class="w-100"></div>';

    // TODO: agurung clear this during clean up.
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

    $.ajax({
        type: 'GET',
        url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getwatchlist',
        crossDomain: true,
        contentType: 'application/json',
        dataType: 'json',
        // url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getcars',

        // url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/addwatchlist',
        // url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getwatchlist',
        // url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/addcar',
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

    function populateResponse(cars) {
        $selllistContainer = $("#selllist").html('');//<h1 class="mt-4">Sell List</h1>
        $watchlistContainer = $("#watchlist").html('');//<h1 class="mt-4">Watch List</h1>
        for (let i = 0; i < cars.length; i++) {
            let car = cars[i];
            if (i > 0 && i % 2 == 0) {
                $selllistContainer.append(divBreak);
                $watchlistContainer.append(divBreak);
            }
            divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> ' +
                '<div class="row">' +
                '<img class="car_info_image" src="' + imglnk + '">' +
                '<div class="car_info_details align-middle">' +
                ' Make :  ' + car.make + '<br/>' +
                ' Model :  ' + car.model + '<br/>' +
                ' Price :  ' + car.price + '<br/>' +
                ' Year :  ' + car.year + '<br/>' +
                ' Mileage :  ' + car.mile +
                '<button class="car_purchase_button">Sold</button>' +
                '<button class="car_more_info_button" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Remove from list</button>' +
                '</div>' +
                '</div>' +
                '<div class="row row_custom_info">' +
                '<div class="col">' +
                '<div class="collapse multi-collapse" id="multiCollapseExample1">' +
                '<div class="card card-body">' +
                ' Description :  ' + car.description + '<br/>' +
                ' Contact Info :  ' + car.email + '<br/>' +
                ' modelId :  ' + car.modelId + '<br/>' +
                '</div></div></div></div></div>';
            $selllistContainer.append(divCarInfo);
            $watchlistContainer.append(divCarInfo);
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

    function populateWatchlistResponse(data) {
        cars = data.vehicles;
        $watchlistContainer.html("");
        for (let i = 0; i < cars.length; i++) {
            let car = cars[i];
            if (i > 0 && i % 2 == 0) {
                $watchlistContainer.append(divBreak);
            }
            divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> ' +
                '<div class="row">' +
                '<img class="car_info_image" src="' + imglnk + '">' +
                '<div class="car_info_details align-middle">' +
                ' Make :  ' + car.make + '<br/>' +
                ' Model :  ' + car.model + '<br/>' +
                ' Price :  ' + car.price + '<br/>' +
                ' Year :  ' + car.year + '<br/>' +
                ' Mileage :  ' + car.mile +
                '<button class="car_purchase_button">Buy</button>' +
                '<button class="car_more_info_button" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">More Info</button>' +
                '</div>' +
                '</div>' +
                '<div class="row row_custom_info">' +
                '<div class="col">' +
                '<div class="collapse multi-collapse" id="multiCollapseExample1">' +
                '<div class="card card-body">' +
                ' Description :  ' + car.description + '<br/>' +
                ' Contact Info :  ' + car.email + '<br/>' +
                ' modelId :  ' + car.modelId + '<br/>' +
                '</div></div></div></div></div>';
            $watchlistContainer.append(divCarInfo);
        }
    }
});
