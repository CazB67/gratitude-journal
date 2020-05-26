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