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
    console.log('Validate new listing form...')
    // Do the validation before submission.
    return false;
});
$("#next").click(function(){
	document.getElementById("detailed-info-content").style.display = "block";
    document.getElementById("basic-info-content").style.display = "none";
    return false;
})