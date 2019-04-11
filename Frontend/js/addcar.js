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
$("#create-new-listing").click(function (){
    console.log('Validate new addcar form...')
    // Do the validation before submission.

    return false;
});
$("#next").click(function(){
	document.getElementById("detailed-info-content").style.display = "block";
    document.getElementById("basic-info-content").style.display = "none";
    return false;
});
$("#prev").click(function(){
    document.getElementById("detailed-info-content").style.display = "none";
    document.getElementById("basic-info-content").style.display = "block";
    return false;
});

$(document).ready(function(){

  	let data = {
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
      data: JSON.stringify( data ),
      contentType: 'application/json',
      // url: 'https://riznqyiyeb.execute-api.us-east-2.amazonaws.com/CMS/scheduleMeeting',
      //   url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/test1/getcars',
        // url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/test1/addwatchlist',
        // url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/test1/getwatchlist',
        // url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/test1/listvehicle',
        url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/test1/addcar',
      xhrFields: {
        withCredentials: false
      },
      headers: {
      },
      fail: function(xhr, textStatus, errorThrown){
        alert('Addcar request failed');
      },
      success: function (data) {
        console.log(data);
      },
      complete: function () {
        console.log("Addcar Post request made to server");
        $dialog_container.hide(0);
        $delete_event_dialog.hide(0);
        loadCalendarInfo(selected_calendar);
      },
      error: function (error) {
        console.log("FAIL....=================");
      }
    });
});
