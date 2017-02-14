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


$('#ownerName').on('change', function() {
  var aadhar = document.getElementById("aadhar");

  // Selected item from dropdown
  var selectedPostion = $("#ownerName").prop('selectedIndex');
  if(selectedPostion==0){
    aadhar.value = "";
  }
  //console.log("Selected position : " + selectedPostion);

  var owners = $(".aadhar");
  //console.log(owners.length);

  aadhar.value = owners[--selectedPostion].innerHTML;

});

// Sales Page - Buy from
$('#buyFrom').on('change', function() {
  
  var selectedPostion = $("#buyFrom").prop('selectedIndex');
  var selectedOwner = $('#buyFrom').find(":selected").text();
  //console.log(selectedOwner);
  console.log("Selected Owner= " + selectedOwner +" Selected Position " + selectedPostion);
  var ownersList = document.getElementById(selectedOwner);
  console.log("\nOwnerslist= " + ownersList.innerHTML);
  var str = ownersList.innerHTML;
  var res = str.split(",");

 /* var dropD = document.getElementById("survey");
  var length = dropD.options.length;
  for (i = 0; i <= length; i++) {
    dropD.options[i] = null;
  }*/

  $("#survey").empty();
  $('#survey').append( '<option>' + "Select Survey No" + '</option>' );
  /*var propertiesOwned = $(".propertiesOwned");*/
  for (var i=0;i<res.length;i++){
   //  $('<option/>').val(res[i]).html(res[i]).appendTo('#survey');
     $('#survey').append( '<option>' + res[i] + '</option>' );
  }

  // Remove buyerName from sellTo list
  
/* var owners = $(".ownersBx");  //Get list of owners
  console.log(owners.length);

  $("#sellTo").empty();

  for (var i=0;i<owners.length;i++){
     $('#sellTo').append( '<option>' + owners[i].innerHTML + '</option>' );
  }
*/
 /* var dropD = document.getElementById("sellTo");
  dropD.remove(selectedOwner);

  $("#sellTo option[value='"+selectedOwner+"']").remove();*/

/*  var dropD = document.getElementById("sellTo");

  var owners = $(".ownersBx");

  $("#sellTo").empty();
  console.log(owners.length);
  for (var i=0;i<owners.length;i++){
     $('#sellTo').append( '<option>' + owners[i].innerHTML + '</option>' );
  }


 // alert(selectedPostion);
  dropD.remove(selectedPostion);
*/


  /*$.each(propertiesOwned, function (i, propertiesOwned) {
    $('#mySelect').append($('<option>', { 
        value: propertiesOwned.value,
        text : propertiesOwned.text 
    }));
  });*/

});

/*$('#sellTo').on('change', function() {
  
  alert("Hi");
  for (var i=0;i<ownersBx.length;i++){
   //  $('<option/>').val(res[i]).html(res[i]).appendTo('#survey');

     $('#sellTo').append( '<option>' + ownersBx[i] + '</option>' );
  }
});
*/
$('#survey').on('change', function() {
  var areaField = document.getElementById("areaField");
  var addressField = document.getElementById("addressField");

  areaField.value = "Test";
  addressField.value = "Test2";

  var selectedPostion = $("#survey").prop('selectedIndex');
  var selectedSurvey = $('#survey').find(":selected").text();
  console.log(selectedSurvey);

  var locations = $(".location");
  var areas = $(".area");

  areaField.value = locations[--selectedPostion].innerHTML;
  addressField.value = areas[--selectedPostion].innerHTML;

});





});
  /*
  $('#survey').html('');

       eval(selectedOwner).forEach(function(t) { 
            $('#survey').append('<option>'+ABCD+'</option>');
        });
    }*/

