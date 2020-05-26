$("#login-button").click(function() {
    $(".modal").addClass("is-active");  
  });
  
  $(".modal-close").click(function() {
     $(".modal").removeClass("is-active");
  });

  $(".cancel-button").click(function() {
    $(".modal").removeClass("is-active");
 });

 $("#signup-button").click(function() {
    $(".modal").addClass("is-active");  
  });