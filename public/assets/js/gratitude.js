/* eslint-disable no-undef */
$(document).ready(function() {
//Adding modal functionality when login button is clicked
$("#login-button").click(function() {
    $(".login").addClass("is-active");  
  });
  
//Closes the modal when cross is clicked  
$(".modal-close").click(function() {
   $(".modal").removeClass("is-active");
});

//Closes the modal when close button is clicked  
$(".cancel-button").click(function() {
   $(".modal").removeClass("is-active");
});

//Adding modal functionality when signup button is clicked
$("#signup-button").click(function() {
   $(".signup").addClass("is-active");  
});

//Grabbing save button and input text from html
const gratitudeForm = $("#save-button");
const gratitudeInput = $("#gratitude-input");
const actionInput = $("#action-input");
const shareGratitudes = $("#checkbox");
//On click function to get input
gratitudeForm.on("click", function(event) {
    event.preventDefault();
    let gratitudeData = {
       description: gratitudeInput.val().trim(),
       action: actionInput.val().trim(),
       shareable: shareGratitudes.prop("checked")

    };
    if(!gratitudeData.description || !gratitudeData.action){
       return
    }else{
       saveGratitude(gratitudeData.description, gratitudeData.action, gratitudeData.shareable);
       gratitudeInput.val(""); //Clear input
       actionInput.val("");
    }
});

function saveGratitude(description, action, shareable) {
   console.log(description, action, shareable );
   $.post("/api/submitted", {
      description: description,
      action: action,
      shareable: shareable
   }).then(function(){
      window.location.replace("/viewGratitude");
   }).catch(function(err) {
      console.log(err);
    });
}

//Return to main screen when logout button is clicked.
$("#logout-button").click(function() {
   window.location.replace("/");
 });

let data;
let i = 0; 

//Sets the date, updates the quote every minute
const updateTime = function() {
$("#date").text(moment().format('dddd, MMMM Do YYYY'));
$(".quote").text(data[i].text);
$(".quote-author").text("- " + data[i].author);
   i++;
   if(i === data.length){
      i=0;
   }
   }

   setInterval(updateTime, 1000);

const my_calendar = new TavoCalendar(".calendar");
$(".calendar").on("calendar-select", function(event){
   console.log(my_calendar.getSelected());
})

//Ajax call to quotes API
const settings = {
   "async": true,
   "crossDomain": true,
   "url": "https://type.fit/api/quotes",
   "method": "GET"
 }
 $.ajax(settings).then(function (response) {
   data = JSON.parse(response);
   //Generate random quote from array
   i = Math.floor(Math.random()*(data.length-0 + 1));
   $(".quote").text(data[i].text);
   $(".quote-author").text("- " + data[i].author);
 });
});

