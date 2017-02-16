$(document).ready(function() {

  $('#form-sales').on('submit', function(ev) {

    // prevent from auto-submitting  
    ev.preventDefault();
    ev.stopPropagation();

    // if all is good, then submit.
    sendData();

  });

  //function to send data 
  var sendData = function() {

    var seller = $('#buyFrom').find(":selected").text();
    var buyer = $('#sellTo').find(":selected").text();
    var survey = $('#survey').find(":selected").text();

    var data = {
      "seller": seller,
      "buyer": buyer,
      "survey": survey
    };

    console.log(data);


    $.ajax({
      type: "post",
      url: "/api/properties/transfer",
      data: data,
      success: function(response) {
        console.log(response);
        $(".alert").hide().show('medium');
      },
      error: function(xhr, textStatus, error) {
        $('#result').text("Registration Failed");
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);
      }
    });
    return;
  };
});