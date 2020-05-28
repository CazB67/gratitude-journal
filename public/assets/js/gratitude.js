/* eslint-disable no-undef */
$(document).ready(function() {
//Adding modal functionality when login and signup buttons are clicked
$("#login-button").click(function() {
    $(".login").addClass("is-active");  
  });
  
$(".modal-close").click(function() {
   $(".modal").removeClass("is-active");
});

$(".cancel-button").click(function() {
   $(".modal").removeClass("is-active");
});

$("#signup-button").click(function() {
   $(".signup").addClass("is-active");  
});

//Return to main screen when logout button is clicked.
$("#logout-button").click(function() {
   window.location.replace("/");
 });

  //Sets the date
  const updateTime = function() {
   $("#date").text(moment().format('dddd, MMMM Do YYYY'));
   
   }
   setInterval(updateTime, 1000);
});