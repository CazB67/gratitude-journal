// $(document).ready(function () {
//   // Getting references to our form and input
//   var signUpForm = $("#facebook-form");
//   var emailInput = $("input#email-facebook-input");
//   var passwordInput = $("input#password-facebook-input");

//   // When the signup button is clicked, we validate the email and password are not blank
//   signUpForm.on("click", function (event) {
//     event.preventDefault();
//     var userData = {
//       email: emailInput.val().trim(),
//       password: passwordInput.val().trim()
//     };
//     if (!userData.email || !userData.password) {
//       return;
//     }
//     // If we have an email and password, run the signUpUser function
//     authUser(userData.email, userData.password);
//     emailInput.val("");
//     passwordInput.val("");
//   });

//   // Does a post to the signup route. If successful, we are redirected to the members page
//   // Otherwise we log any errors
//   function authUser(email, password) {
//     // eslint-disable-next-line no-undef
//     $.get("/auth/facebook", {
//       email: email,
//       password: password
//     })
//       .then(function (res) {
//         console.log({res})
//         if(res){
//           window.location.replace("/newGratitude");
//         }else{
//         console.log(res);
//         }

//         // If there's an error, log the error
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
//   }
// });