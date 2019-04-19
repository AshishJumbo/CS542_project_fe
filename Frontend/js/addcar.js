// add upload image functionality for the userId
// UML model designs
// lambda functions 


$(document).ready(function () {
    let makeList_global;
    let modelList_global;

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $("#side-bar-basic").click(function () {
        document.getElementById("basic-info-content").style.display = "block";
        document.getElementById("detailed-info-content").style.display = "none";
        return false;
    });
    $("#side-bar-detailed").click(function () {
        document.getElementById("detailed-info-content").style.display = "block";
        document.getElementById("basic-info-content").style.display = "none";
        return false;
    });
    $("#create-new-listing").click(function () {
        let $inputs = $('#new-car :input');

        // not sure if you wanted this, but I thought I'd add it.
        // get an associative array of just the values.
        let values = {};
        $inputs.each(function () {
            values[this.id] = $(this).val();
        });
        values['userId'] = localStorage.getItem("userId");
        console.log(values);
        add_car_DB(values);
        // return false;
    });

    $("#makeId").mouseenter(function () {
        if (makeList_global == null) {
            console.log("Empty Make List, fetching...")
            get_make_DB();
        }
        // If already populated, do nothing.
    });
    $("#makeId").mousedown(function () {
        populateMakes(makeList_global);
    });
    $("#makeId").change(function(){
        $("#modelId").html("");
    });
    $("#modelId").mouseenter(function () {

        let makeId = $("#makeId").val();
        if(makeId!="-"){
            get_model_DB(makeId);
            console.log("getting models for makeID=" + makeId);
        }
    });

    $("#next").click(function () {
        document.getElementById("detailed-info-content").style.display = "block";
        document.getElementById("basic-info-content").style.display = "none";
        return false;
    });
    $("#prev").click(function () {
        document.getElementById("detailed-info-content").style.display = "none";
        document.getElementById("basic-info-content").style.display = "block";
        return false;
    });

    function populateMakes(makes) {
        $("#makeId").html("");
        let cliche;
        for (let i = 0; i < makes.length; i++) {
            cliche = "<option value=" + makes[i].makeId + ">" + makes[i].makeName + "</option>";
            $("#makeId").append(cliche);
        }
    }
    function populateModels(models){
        $("#modelId").html("");
        let cliche;
        for (let i = 0; i < models.length; i++) {
            cliche="<option value="+models[i].modelId+">"+models[i].modelName+"</option>";
            $("#modelId").append(cliche);
        }
    }
    function get_model_DB(make){
        $.ajax({
            type: 'GET',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getmodel',
            success: function (make) {
                let models = JSON.parse(JSON.parse(make.body).modelList);
                models = models.models;
                populateModels(models);
            },
            complete: function () {
                console.log("Get Make DB request made to server");
            },
            error: function () {
                console.log("FAIL....=================");
            }

        })
    }
    function get_make_DB() {
        $.ajax({
            type: 'GET',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getmake',
            success: function (data) {
                makeList_global = JSON.parse(JSON.parse(data.body).makeList);
                makeList_global = makeList_global.makes;
            },
            complete: function () {
                console.log("Get Make DB request made to server");
            },
            error: function () {
                console.log("FAIL....=================");
            }

        })
    }

    function add_car_DB(data) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/addcar',

            success: function (data, status) {
                console.log(data);
                bootbox.alert("Congratulation!!! The car has been added to our database.");
                // populateResponse(JSON.parse(JSON.parse(data.body).vehicleList));
            },
            complete: function () {
                console.log("Post request made to server");
                $('#new-car').trigger('reset');
                // $dialog_container.hide(0);
                // $delete_event_dialog.hide(0);
                // loadCalendarInfo(selected_calendar);
            },
            error: function () {
                console.log("FAIL....=================");
            }
        });
    }

});
