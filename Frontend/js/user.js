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




