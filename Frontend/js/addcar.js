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
    console.log('Validate new addcar form...')
    // Do the validation before submission.
    var $inputs = $('#new-car :input');

    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    var values = {};
    $inputs.each(function () {
        values[this.id] = $(this).val();
    });
    values['userId'] = "1";
    console.log(values);
    add_car_DB(values);
    // return false;
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
        error: function (error) {
            console.log("FAIL....=================");
        }
    });
}

$(document).ready(function () {
});
