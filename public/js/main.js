$(document).ready(function() {

  $('#form-register').on('submit', function(ev) {

    // prevent from auto-submitting  
    ev.preventDefault();
    ev.stopPropagation();

    // if all is good, then submit.
    sendData();

  });

  //function to send data 
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
        $('#result').text(JSON.stringify(response));
      },
      error: function(xhr, textStatus, error){
          console.log(xhr.statusText);
          console.log(textStatus);
          console.log(error);
        }
    });
    return;
  };

});