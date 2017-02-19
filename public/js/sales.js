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
      "surveyNo": survey
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


  
  // Sales Page - Buy from
  $('#buyFrom').on('change', function() {

    var selectedPostion = $("#buyFrom").prop('selectedIndex');
    var selectedOwner = $('#buyFrom').find(":selected").text();
    
    var ownersList = document.getElementById(selectedOwner);
    
    var str = ownersList.innerHTML;
    //var res = str.split(",");

    // Convert survey nos from string to int
    var surveyNumbers = str.split(",").map(Number);
    // Sort in asc order
    var sortedSurveyNos = surveyNumbers.sort((a, b) => a - b);

    $("#survey").empty();
    $('#survey').append('<option>' + "Select Survey No" + '</option>');
    for (var i = 0; i < sortedSurveyNos.length; i++) {
      $('#survey').append('<option>' + sortedSurveyNos[i] + '</option>');
    }

    // Populate list of buyers based on seller 
    var owners = $(".ownersList");
    $('#sellTo').empty();
    $('#sellTo').append('<option>' + "Select Buyer" + '</option>');
    for (var j = 0; j < owners.length; j++) {
      if (owners[j].innerHTML != selectedOwner) {
        $('#sellTo').append('<option>' + owners[j].innerHTML + '</option>');
      }
    }

  });

/*  // Auto Resize "Address" textarea
  $('textarea').each(function () {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
  }).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';  
  });*/

  // On Click survey dropdown, populate area and location
  $('#survey').on('change', function() {
    // References to textFields
    var areaField = document.getElementById("areaField");
    var addressField = document.getElementById("addressField");

    var selectedSurvey = $('#survey').find(":selected").text();

    var owners = document.getElementsByClassName(selectedSurvey);

    var str = owners[0].innerHTML; // Contains 'Location/Area'
    var result = str.split("/");

    areaField.value = result[1];
    addressField.value = result[0];

    $('textarea').trigger('input');
  });

  

});