/* eslint-disable no-undef */
$(document).ready(function () {
  // Getting references to our form and inputs
  const loginForm = $("#login-form");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("click", function (event) {
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      toastr.warning('Invalid Credentials', {timeout: 300});
      return;
    } 
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
    
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the newGratitude page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function (res) {
        if (res) {
          window.location.replace("/newGratitude");
          toastr.success('Logged in succesfully', {timeOut: 300});
        } else {
          handleLoginErr(res);
        }

      // If there's an error, log the error
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    console.log(err.message)
    toastr.warning("Error Logging in", {timeOut:300});
  }
});
