$(document).ready(function () {
    let sell_list_global;
    let watch_list_global;

    check_login_status(); // checks the status for login box content
    // Get the modal
    let modal = document.getElementById('login-modal');
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
    $("#login_form_submit").click(function (e) {
        e.preventDefault();
        let $inputs = $('#login-form :input');
        // var json = JSON.parse(sample_response.body);
        console.log("Login-submit: Clicked");

        // not sure if you wanted this, but I thought I'd add it.
        // get an associative array of just the values.
        let values = {};
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
        populateResponse(sell_list_global, watch_list_global);
        return false;
    });
    $("#side-bar-my-watchlist").click(function () {
        $('#watchlist-container').show(0);
        $('#account-details-content').hide(0);
        $('#list-container').hide(0);
        populateResponse(sell_list_global, watch_list_global);
        return false;
    });

    // TODO: T0mi: These 3 functions are required for login in all scripts.
    // auth_user(): action for "login" button onClick event
    // check_login_status(): should be put in the document.onReady() which calls getItem() to determine login status
    // get/setItem(): utility function for get/set login storage

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
                bootbox.alert("Welcome "+getItem("userName")+"!");
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
        // console.log("Read cookie with UserID=" + userId);
        if (userId != "Fail login" && userId != null) {
            // Logged in.
            // console.log("CLS: user_name cliche")
            $login_status_box.html("");
            $login_status_box.append(username_cliche);
            $("#user_info_box").html("<li>User ID="+localStorage.getItem("userId")+"</li><li>User Name="+localStorage.getItem("userName")+"</li>" +
                "<li>User Email="+localStorage.getItem("email")+"</li>");
            let values={};
            values['userId']=getItem("userId");
            console.log("CLS: Logged in, sending values object to DB:");
            console.log(values);
            if(sell_list_global==null && watch_list_global==null)
            {
                get_sell_list_DB(values);
                get_watch_list_DB(values);

            }
            else{
                populateResponse(sell_list_global, watch_list_global);
            }
        }
    }

    function setItem(cname, cvalue) {
        localStorage.setItem(cname, cvalue);
    }

    function getItem(cname) {
        return localStorage.getItem(cname);
    }


   //  let data = {
   //      'cars': []
   //  };
   //  var data_global;
   //  var filter_global;
   //  let filters = ['make', 'model', 'color'];
   //
    let imglnk = "https://s3.us-east-2.amazonaws.com/car-images-cs542/car-images//";
   // /* var sample_response = {
   //      "isBase64Encoded": false,
   //      "body": "{\"input\":\"{}\",\"vehicleList\":\"{\\\"vehicles\\\":[{\\\"makeId\\\":\\\"3\\\",\\\"trim\\\":\\\"Sport\\\",\\\"trimId\\\":\\\"1\\\",\\\"year\\\":\\\"2019\\\",\\\"modelId\\\":\\\"7\\\",\\\"price\\\":\\\"35000\\\",\\\"mile\\\":4000,\\\"description\\\":\\\"Please contact me if you are interested\\\",\\\"model\\\":\\\"MX-5\\\",\\\"make\\\":\\\"Mazda\\\",\\\"email\\\":\\\"kshao2@wpi.edu\\\",\\\"carId\\\":\\\"3\\\"},{\\\"makeId\\\":\\\"1\\\",\\\"trim\\\":\\\"Hybrid\\\",\\\"trimId\\\":\\\"12\\\",\\\"year\\\":\\\"2015\\\",\\\"modelId\\\":\\\"2\\\",\\\"price\\\":\\\"29987\\\",\\\"mile\\\":29938,\\\"description\\\":\\\"A bargain. Please contact me for more information!\\\",\\\"model\\\":\\\"Camry\\\",\\\"make\\\":\\\"Toyota\\\",\\\"email\\\":\\\"wlm3@wpi.edu\\\",\\\"carId\\\":\\\"4\\\"},{\\\"makeId\\\":\\\"1\\\",\\\"trim\\\":\\\"Limited\\\",\\\"trimId\\\":\\\"16\\\",\\\"year\\\":\\\"2014\\\",\\\"modelId\\\":\\\"2\\\",\\\"price\\\":\\\"25699\\\",\\\"mile\\\":46771,\\\"description\\\":\\\"Contact ackme@wpi.edu plz.\\\",\\\"model\\\":\\\"Camry\\\",\\\"make\\\":\\\"Toyota\\\",\\\"email\\\":\\\"wlm5@wpi.edu\\\",\\\"carId\\\":\\\"6\\\"},{\\\"makeId\\\":\\\"4\\\",\\\"trim\\\":\\\"EX-L\\\",\\\"trimId\\\":\\\"9\\\",\\\"year\\\":\\\"2008\\\",\\\"modelId\\\":\\\"10\\\",\\\"price\\\":\\\"20199\\\",\\\"mile\\\":92039,\\\"description\\\":\\\"A nice car, it runs perfectly and the brake pads are new. Please let me know if you are interested. erk3@wpi.edu\\\",\\\"model\\\":\\\"Accord\\\",\\\"make\\\":\\\"Honda\\\",\\\"email\\\":\\\"test.wpi.edu\\\",\\\"carId\\\":\\\"7\\\"},{\\\"makeId\\\":\\\"4\\\",\\\"trim\\\":\\\"EX\\\",\\\"trimId\\\":\\\"7\\\",\\\"year\\\":\\\"2003\\\",\\\"modelId\\\":\\\"10\\\",\\\"price\\\":\\\"8700\\\",\\\"mile\\\":100392,\\\"description\\\":\\\"You can contact brm12@wpi.edu for testdrive.\\\",\\\"model\\\":\\\"Accord\\\",\\\"make\\\":\\\"Honda\\\",\\\"email\\\":\\\"admin@wpi-car.com\\\",\\\"carId\\\":\\\"8\\\"}]}\"}",
   //      "statusCode": "200"
   //  };*/

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


    // var json = JSON.parse(sample_response.body);
    // console.log(json);

    console.log("log from user.js");
    //let cars = data.cars;
    //console.log(cars.length);
    let $selllistContainer = $("#selllist").html('<h1 class="mt-4">Sell List</h1>');
    let $watchlistContainer = $("#watchlist").html('<h1 class="mt-4">Watch List</h1>');

    let divCarInfo;
    let divBreak = '<div class="w-100"></div>';

    function mark_Sold_DB(data){
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/markassold',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            success: function () {
                let values={"userId":localStorage.getItem("userId")};
                get_sell_list_DB(values);
                populateResponse(sell_list_global, watch_list_global);
                bootbox.alert("Congratulation!!! The car has been marked as sold.");
            },
            complete: function () {
                console.log("mark_as_sold request made to server");
            },
            error: function () {
                console.log("FAIL....=================");
            }
        });
    }
    function remove_Watchlist_DB(data){
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/removefromwatchlist',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            success: function () {
                let values={"userId":localStorage.getItem("userId")};
                get_watch_list_DB(values);
                populateResponse(sell_list_global, watch_list_global);
                bootbox.alert("You have removed the car from your watchlist!");
            },
            complete: function () {
                console.log("remove_watchlist request made to server");
            },
            error: function () {
                console.log("FAIL....=================");
            }
        });

    }
    function get_watch_list_DB(data){
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getwatchlist',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {

                watch_list_global = JSON.parse(JSON.parse(data.body).vehicleList).vehicles;
                // console.log("watchlist get:");
                // console.log(watch_list_global);
            },
            complete: function () {
                console.log("watchlist get request made to server");
            },
            error: function () {
                console.log("FAIL....=================");
            }
        });
    }
    function get_sell_list_DB(data){
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getselllist',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {

                sell_list_global = JSON.parse(JSON.parse(data.body).vehicleList).vehicles;
                // console.log("sell list get:");
                // console.log(sell_list_global);
            },
            complete: function () {
                console.log("sell list get request made to server");
            },
            error: function () {
                console.log("FAIL....=================");
            }
        });
    }
    function populateResponse(sellList, watchList) {
        console.log("Populating sellList and watchList:");
        $("#selllist").html('');
        $("#watchlist").html('');
        for (let i = 0; i < sellList.length; i++) {
            let car = sellList[i];
            if (i > 0 && i % 2 == 0) {
                $("#selllist").append(divBreak);

            }
            divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> ' +
                '<div class="row">' +
                '<img class="car_info_image" src="' + imglnk+car.imgName.trim() + '">' +
                '<div class="car_info_details align-middle">' +
                ' Add Date :  ' + car.date + '<br/>' +
                ' Make :  ' + car.make + '<br/>' +
                ' Model :  ' + car.model + '<br/>' +
                ' Price :  ' + car.price + '<br/>' +
                ' Year :  ' + car.year + '<br/>' +
                ' Mileage :  ' + car.mile +
                '<button class="mark_as_sold_button" type="button" value="'+car.carId+'">Mark as Sold</button>' +
                '<button class="car_more_info_button" type="button" data-toggle="collapse" data-target="#info' + i + '" aria-expanded="false" aria-controls="info' + i + '">More Info</button>' +
                '</div>' +
                '</div>' +
                '<div class="row row_custom_info">' +
                '<div class="col">' +
                '<div class="collapse multi-collapse" id="info'+i+'">' +
                '<div class="card card-body">' +
                ' Description :  ' + car.description + '<br/>' +
                ' Contact Info :  ' + car.email + '<br/>' +
                ' modelId :  ' + car.modelId + '<br/>' +
                '</div></div></div></div></div>';
            $("#selllist").append(divCarInfo);

        }
        for (let j = 0; j < watchList.length; j++) {
            let car = watchList[j];
            if (j > 0 && j % 2 == 0) {
                $("#watchlist").append(divBreak);
            }
            divCarInfo = '<div class="car_info_div col-sm body-1 px-lg-5"> ' +
                '<div class="row">' +
                '<img class="car_info_image" src="' + imglnk+car.imgName.trim() + '">' +
                '<div class="car_info_details align-middle">' +
                ' Owner :  ' + car.userName + '<br/>' +
                ' Make :  ' + car.make + '<br/>' +
                ' Model :  ' + car.model + '<br/>' +
                ' Price :  ' + car.price + '<br/>' +
                ' Year :  ' + car.year + '<br/>' +
                ' Mileage :  ' + car.mile +
                '<button class="remove_from_watchlist_button" type="button" value="'+car.carId+'"">Remove From Watchlist</button>' +
                '<button class="car_more_info_button" type="button" data-toggle="collapse" data-target="#infoo' + j + '" aria-expanded="false" aria-controls="infoo' + j + '">More Info</button>' +
                '</div>' +
                '</div>' +
                '<div class="row row_custom_info">' +
                '<div class="col">' +
                '<div class="collapse multi-collapse" id="infoo'+j+'">' +
                '<div class="card card-body">' +
                ' Description :  ' + car.description + '<br/>' +
                ' Contact Info :  ' + car.email + '<br/>' +
                ' modelId :  ' + car.modelId + '<br/>' +
                '</div></div></div></div></div>';
            $("#watchlist").append(divCarInfo);
        }
        $(".car_more_info_button").click(function () {
            let $this = $(this);
            if ($this.html() == "More Info") {
                $this.html("Less Info");
            } else {
                $this.html("More Info");
            }
        });
        $(".mark_as_sold_button").click(function(){
            let $this = $(this);
            let values = {"carId":$this.val()};
            mark_Sold_DB(values);
            populateResponse(sell_list_global, watch_list_global);
            // console.log("Mark_as_sold pressed, carId=");
            // console.log(values);
        });
        $(".remove_from_watchlist_button").click(function(){
            let userId = localStorage.getItem("userId");
            let $this = $(this);
            let values= {"userId":userId, "carId":$this.val()};
            remove_Watchlist_DB(values);
            populateResponse(sell_list_global, watch_list_global);
            // console.log("Remove_from_watchlist pressed, values=");
            // console.log(values);
        });
    }

});
