$(document).ready(function() {
  
  $('#form-register').on('submit', function(ev) {

    // prevent from auto-submitting  
    ev.preventDefault();
    ev.stopPropagation();

    // if all is good, then submit.
    sendData();

  });

  //function to send data on click of REGISTER button on registration page
  var sendData = function() {
    var owner = $('#ownerName').find(":selected").text();
    var survey = $('#survey').val();
    var aadhar = $('#aadhar').val();
    var area = $('#area').val();
    var location = $('#location').val();

    var data = {
      owner,
      survey,
      aadhar,
      area,
      location
    };


    $.ajax({
      type: "post",
      url: "/api/properties",
      data: data,
      success: function(response) {
        console.log(response);
        $(".alert").hide().show('medium');
        //  $('#result').text("Registration Successful");
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


  $('#ownerName').on('change', function() {
    var aadhar = document.getElementById("aadhar");

    // Selected item from dropdown
    var selectedPostion = $("#ownerName").prop('selectedIndex');
    if (selectedPostion == 0) {
      aadhar.value = "";
    }
    var owners = $(".aadhar");

    aadhar.value = owners[--selectedPostion].innerHTML;

  });
});