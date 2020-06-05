/* eslint-disable no-undef */
$(window).on('load',function () {
	let data;
	let i = 0;
	//Ajax call to quotes API
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://cors-anywhere.herokuapp.com/https://type.fit/api/quotes",
		"method": "GET"
	}

	$.ajax(settings).then(function (response) {
		data = response
		//Generate random quote from array
		i = Math.floor(Math.random() * (data.length - 0 + 1));
		$(".quote").text(data[i].text);
		$(".quote-author").text("- " + data[i].author);
	}).fail(function (err) {
		console.log(err);
		toastr.error('Error retrieving quotes API', {timeOut:300})
	});
   
	const updateTime = function () {
		$("#date").text(moment().format('dddd, MMMM Do YYYY'));
	}
	setInterval(updateTime, 1000);

	//Sets the default viewed gratitude as the current day
	let day = moment();
	let date = day.format("YYYY-MM-DD");
	showGratitude(date);
	countGratitudes();

	//Adding modal functionality when login button is clicked
	$("#login-button").click(function () {
		$(".login").addClass("is-active");
	});

	//Closes the modal when cross is clicked  
	$(".modal-close").click(function () {
		$(".modal").removeClass("is-active");
	});

	//Closes the modal when close button is clicked  
	$(".cancel-button").click(function () {
		$(".modal").removeClass("is-active");
	});

	//Adding modal functionality when signup button is clicked
	$("#signup-button").click(function () {
		$(".signup").addClass("is-active");
	});

	//Return to main screen when logout button is clicked.
	$("#logout-button").click(function () {
		$.post("/api/logout")
			.then(function (res) {
				console.log("response to logout" + res);
				window.location.replace("/");
				toastr.info('Logged out successfully', {timeOut:300})
			})
			.catch(function (err) {
				console.log(err);
				toastr.error('Error logging out!', {timeOut:300})
			});
	});

	$("#view-button").click(function () {
		window.location.replace("/viewGratitude");
	});

	$("#write-button").click(function () {
		window.location.replace("/newGratitude");
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
		if(gratitudeData.description === ""){
			toastr.warning("You need to add a gratitude", {timeOut:300})
			return;
		}else if (gratitudeData.action === ""){
			toastr.warning("Add an act of kindness or type 'none'", {timeOut:300})
			return;
		}else{
			saveGratitude(gratitudeData);
			gratitudeInput.val(""); //Clear input
			actionInput.val("");
		}
	});

	//Send description, action and shareable input to the server
	function saveGratitude(gratitudeData) {
		$.post("/api/submitted", {
			description: gratitudeData.description,
			action: gratitudeData.action,
			shareable: gratitudeData.shareable
		}).then(function () {
			window.location.replace("/viewGratitude");
		}).catch(function (err) {
			console.log(err);
			toastr.warning(err.responseJSON.msg, {timeOut:300})
		});
	}

	//If not on login page render count to viewgratitudes page
	function countGratitudes() {
		if(window.location.href[window.location.href.length -1] === '/') {
			return;
		}
		$.get("/api/count", function(data){
			console.log(data);
		}).then(function (res) {
			$(".count").text(res);
		}).catch(function (err) {
			console.log(err);
		});
	}

	//Calendar function need user authentication details to complete
	const my_calendar = new TavoCalendar(".calendar");
	$(".calendar").on("calendar-select", function () {
		showGratitude(my_calendar.getSelected());
	})

	//On calendar click of date send date to server and add response to specific parts of the html 
	function showGratitude(createdAt) {
		//500 error on slash
		if(window.location.href[window.location.href.length -1] === '/') {
			return;
		}
      
		//Date clicked displayed in correct order
		let clickedDate = createdAt.split("-");
		$("#search-date").text(clickedDate[2] + "-" + clickedDate[1] + "-" + clickedDate[0]);

		//Searching for date clicked in database createdAt column.
		$.post("/api/searched", {
			createdAt: createdAt
		}).then(function (res) {
			//No gratitudes saved on day (createdAt)
			if (res == null) {
				$("#search-action").text("No act of kindness written on this day");
				$("#search-gratitude").text("No gratitude written on this day");
				//Brings up saved gratitude ofr particular date
			} else {
				$("#search-gratitude").text(res.description);
				$("#search-action").text(res.action);
			}
		}).catch(function (err) {
			console.log(err);
			toastr.error('Error retrieving gratitudes', {timeOut:300})
		});
	}
});

