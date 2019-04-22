/*assuming data is the reponse we get from the server in json format*/
$(document).ready(function () {

    check_login_status();
    let data = {
        'cars': []
    }
    var data_global;
    var filter_global;
    let filters = ['make', 'model', 'color'];
    let userId = 1; //TODO: T0mi: userId field should only be retrieved from localStorage instead of this fixed value.
    $("#modal-cancel").click(function () {
        modal.style.display = 'none';
    });
    $("#login-modal-open").click(function () {
        modal.style.display = 'block'
    });
    $("#login_form_submit").click(function (e) {
				e.preventDefault();
        var $inputs = $('#login-form :input');
        // var json = JSON.parse(sample_response.body);
        console.log("Login-submit: Clicked");

        // not sure if you wanted this, but I thought I'd add it.
        // get an associative array of just the values.
        var values = {};
        $inputs.each(function () {
            values[this.id] = $(this).val();
        });
        console.log("Sent value: "+values.user_name+" "+values.password);
        auth_user(values);
    });
    $("#logout_button").click(function (){
        console.log("logging out");
        localStorage.clear();
        check_login_status();

    });


    let imglnk = "http://fordauthority.com/wp-content/uploads/2017/12/1966-Shelby-GT350-Mecum-Kissimmee-720x340.jpg";
    imglnk = "https://s3.us-east-2.amazonaws.com/car-images-cs542/car-images//";
    var addToWatchlist = "images/add-to-watch2.png";

// Get the modal
    var modal = document.getElementById('login-modal');
// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };



    // TODO: T0mi: These 3 functions are required for login in all scripts.
    // auth_user(): action for "login" button onClick event
    // check_login_status(): should be put in the document.onReady() which calls getItem() to determine login status
    // get/setItem(): utility function for get/set login storage

    function auth_user(data) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/authenticateuser',

            success: function (data) {
                // Create cookie if login auth success
                let object = JSON.parse(data.body);
                console.log("Returned from Auth_User: " + object.userId);
                setItem("userId", object.userId);
                setItem("userName", object.user_name);
                setItem("email", object.email);
            },
            complete: function () {
                console.log("Login auth post request made to server");
                $('#login-form').trigger('reset');
                check_login_status();
                modal.style.display = 'none';
            },
            error: function () {
                console.log("login post FAIL....=================");
            }
        });
    }

    function check_login_status() {
        let login_cliche = '<a class="dropdown-toggle nav-link" href="#" role="button" id="login-modal-open">Login</a>';
        let username_cliche = '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Account</a>' +
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



    let cars = data.cars;
    console.log(cars.length);
    $carsContainer = $(".cars-container");
    $carsContainer.html("<img class='pageloading' src='images/loader-spinning.gif' />");

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
        '<img class="add_to_watchlist" src=' + addToWatchlist + ' />' +
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
            // getWatchlist();
        },
        error: function (error) {
            console.log("FAIL....=================");
        }
    });

    function getWatchlist() {
        let data = {'userId': userId};
        $.ajax({
            type: 'GET',
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getwatchlist',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            // data: JSON.stringify(data),
            // url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getcars',

            // url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/addwatchlist',
            // url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getwatchlist',
            // url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/addcar',

            success: function (data, status) {
                console.log(data);
                alreadyInWatchlist(data);
            },
            complete: function () {
                console.log("Post request made to server");
                // $dialog_container.hide(0);
                // $delete_event_dialog.hide(0);
                // loadCalendarInfo(selected_calendar);
                getWatchlist();
            },
            error: function (error) {
                console.log("FAIL....=================");
            }
        });
    }

    function alreadyInWatchlist(data) {
        console.log(data);
    }

    // Populate car-container with DB-pulled car info.
    function populateResponse(cars) {
        $carsContainer.html("");
        for (let i = 0; i < cars.length; i++) {
            let car = cars[i];
            if (i > 0 && i % 2 == 0) {
                $carsContainer.append(divBreak);
            }
            divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> ' +
                '<div class="row">' +
                '<img class="car_info_image" src="' + imglnk+car.img_name.trim() + '">' +
                '<div class="car_info_details align-middle">' +
                ' Make :  ' + car.make + '<br/>' +
                ' Model :  ' + car.model + '<br/>' +
                ' Price :  ' + car.price + '<br/>' +
                ' Year :  ' + car.year + '<br/>' +
                ' Mileage :  ' + car.mile +
                '<button class="car_purchase_button">Buy</button>' +
                '<button class="car_more_info_button" type="button" data-toggle="collapse" data-target="#info' + i + '" aria-expanded="false" aria-controls="info' + i + '">More Info</button>' +
                '</div>' +
                '</div>' +
                '<div class="row row_custom_info">' +
                '<div class="col">' +
                '<div class="collapse multi-collapse" id="info' + i + '">' +
                '<div class="card card-body">' +
                ' Owner :  ' + car.userName + '<br/>' +
                ' Description :  ' + car.description + '<br/>' +
                ' Contact Info :  ' + car.email + '<br/>' +
                ' VIN :  ' + car.vin + '<br/>' +
                ' Color : ' + car.color + '<br/>' +
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

        $(".add_to_watchlist").click(function () {
            let $this = $(this);
            let $parent = $this.parent();
            let data = {
                'userId': userId + 4 + "",
                'carId': $($parent.find(".car_info_details")).data('carid') + ""
            };
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/addwatchlist',
                crossDomain: true,
                contentType: 'application/json',
                dataType: 'json',

                success: function (data, status) {
                    console.log(data);
                    $this.hide(0);
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
                $("#" + filters[k]).append('<div class="checkbox list-group-item"><label class="filter-label" ><input type="checkbox" data-parentfilter = "'+filters[k].toLowerCase() +'" value="' + filter_values[l].toLowerCase() + '" id="' + filter_values[l].toLowerCase() + '-filter-id"> &nbsp; ' + filter_values[l] + ' (' + filter_global[filters[k]][filter_values[l]] + ') </label></div>');
            }
        }
				setFiltersClickable();
    }


		var activefilters = [];
		function setFiltersClickable(){
			$(".filter-label > input").click(function (e) {
				// e.preventDefault();
				// var $input = $(this).find('input');
				// var filterVal = $input.val();
				// var $input = $(this).find('input');
				var filterVal = $(this).val();
				if(activefilters.indexOf(filterVal) == -1){
					activefilters.push(filterVal);
				} else {
					activefilters.splice(activefilters.indexOf(filterVal), 1);
				}


				// eval() makes string get evaluated as a js code
				var ifconditions = "";

				for(let j=0; j<activefilters.length; j++){
					if(j == 0)
						ifconditions += "(car[ '"+$('#'+activefilters[j]+'-filter-id').data('parentfilter').toLowerCase()+"']).toLowerCase() == '"+ activefilters[j]+"'";
					else
						ifconditions += "|| (car[ '"+$('#'+activefilters[j]+'-filter-id').data('parentfilter').toLowerCase() +"']).toLowerCase() == '"+ activefilters[j]+"'";

				}

				var temp_data = [];
				let carIds = [];
				for (let i = 0; i < data_global.length; i++) {
					let car = data_global[i];
					console.log(car);
					if ( eval(ifconditions) ) {
						if(carIds.indexOf(car.carId) == -1)
							temp_data.push(car);
					}
				}
				if(temp_data.length == 0 && activefilters.length == 0)
					temp_data = data_global;
				populateResponse(temp_data);
				return true;
			});
		}

    $("#undo-filder-id").click(function () {
        populateResponse(data_global);
    });

    $('.list-group-item').on('click', function () {
        $('.glyphicon', this)
            .toggleClass('glyphicon-chevron-right')
            .toggleClass('glyphicon-chevron-down');
    });

});
