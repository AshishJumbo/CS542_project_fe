$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
$("#side-bar-my-account").click(function () {
    document.getElementById("account-details-content").style.display = "block";
    document.getElementById("list-container").style.display = "none";
    document.getElementById("watchlist-container").style.display = "none";
    return false;
});
$("#side-bar-my-listings").click(function () {
    document.getElementById("list-container").style.display = "block";
    document.getElementById("watchlist-container").style.display = "none";
    document.getElementById("account-details-content").style.display = "none";
    return false;
});
$("#side-bar-my-watchlist").click(function () {
    document.getElementById("watchlist-container").style.display = "block";
    document.getElementById("list-container").style.display = "none";
    document.getElementById("account-details-content").style.display = "none";
    return false;
});


$(document).ready(function(){

  	let data = {
  	  "year" : "1990",
  	  "makeId" : "1234123",
  	  "modelId" : "123",
  	  "trimId" : "123",
  	  "vin" : "aeiou",
  	  "mile" : "abcde",
  	  "color" : "black and blue",
  	  "price" : "100",
  	  "desc" : "lalalala",
  	  "userId" : "Monkey Kong"
  	};

  	$.ajax({
      type: 'POST',
      data: JSON.stringify( data ),
      contentType: 'application/json',
      url: 'https://w3vss4ok71.execute-api.us-east-2.amazonaws.com/cars/adduser',
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
