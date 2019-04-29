// add upload image functionality for the userId
// UML model designs
// lambda functions

$(document).ready(function () {

    /* NOTE: Ashish mod starts */
    $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;

        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }

    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgName").change(function(){
        readURL(this);
    });
    /* NOTE: Ashish mod ends */

    let makeList_global;
    let modelList_global;
    let trimList_global;

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
        values['imgName'] = $('input[type=file]').val().split('\\').pop();
        values['userId'] = localStorage.getItem("userId");
        console.log(values);
        addPhoto('car-images');
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
    $("#makeId").change(function () {
        console.log("Changed makeID");
        $("#modelId").html("");
        modelList_global = null;
    });
    $("#modelId").mouseenter(function () {
        let makeId = $("#makeId").val();
        // if (makeId != "-" && modelList_global == null) {
            let values = {};
            values['makeId'] = makeId;
            get_model_DB(values);
            console.log("makeId={" + values.makeId);
        // }
    });
    $("#modelId").mousedown(function () {
        populateModels(modelList_global);
    });
    $("#modelId").change(function () {
        console.log("Changed modelId");
        $("#trimId").html("");
        trimList_global = null;
    });
    $("#trimId").mouseenter(function () {
        let modelId = $("#modelId").val();
        // if(modelId=="-"){
        //     return false;
        // }
        // if (modelId != "" && trimList_global == null) {
            let values = {};
            values['modelId'] = modelId;
            get_trim_DB(values);
            console.log("modelId={" + values.modelId);
        // }
    });
    $("#trimId").mousedown(function () {
        populateTrims(trimList_global);
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

    function populateModels(models) {
        $("#modelId").html("");
        let cliche;
        for (let i = 0; i < models.length; i++) {
            cliche = "<option value=" + models[i].modelId + ">" + models[i].modelName + "</option>";
            $("#modelId").append(cliche);
        }
    }

    function populateTrims(trims) {
        $("#trimId").html("");
        let cliche;
        for (let i = 0; i < trims.length; i++) {
            cliche = "<option value=" + trims[i].trimId + ">" + trims[i].trimName + "</option>";
            $("#trimId").append(cliche);
        }
    }

    function get_trim_DB(data) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            // url: url,
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/gettrim',
            success: function (data) {
                trimList_global = JSON.parse(JSON.parse(data.body).trimList);
                trimList_global = trimList_global.trims;
                console.log(trimList_global)
            },
            complete: function () {
                console.log("Get trim DB request made to server ");
            },
            error: function () {
                console.log("FAIL....=================");
            }

        })
    }

    function get_model_DB(data) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            // url: url,
            url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/getmodel',
            success: function (data) {
                modelList_global = JSON.parse(JSON.parse(data.body).modelList);
                modelList_global = modelList_global.models;
                console.log(modelList_global)
            },
            complete: function () {
                console.log("Get model DB request made to server ");
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

            success: function (data) {
                console.log(data);
                bootbox.alert("Congratulation!!! The car has been added to our database.");
            },
            complete: function () {
                console.log("Post request made to server");
                $('#new-car').trigger('reset');
                $('#img-upload').attr('src','');
            },
            error: function () {
                console.log("FAIL....=================");
            }
        });
    }

});
