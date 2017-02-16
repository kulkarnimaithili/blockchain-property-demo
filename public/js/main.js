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
/*
function showAlert(){
  if($("#myAlert").find("div#myAlert2").length==0){
    $("#myAlert").append("<div class='alert alert-success alert-dismissable' id='myAlert2'> <button type='button' class='close' data-dismiss='alert'  aria-hidden='true'>&times;</button> Success! message sent successfully.</div>");
  }
  $("#myAlert").css("display", "");
}
*/
/*$("#registerButton").click(function(){
  
  $(".alert").hide().show('medium');
});*/

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

    // Sales Page - Buy from
    $('#buyFrom').on('change', function() {

        var selectedPostion = $("#buyFrom").prop('selectedIndex');
        var selectedOwner = $('#buyFrom').find(":selected").text();
        
        var ownersList = document.getElementById(selectedOwner);
        
        var str = ownersList.innerHTML;
        var res = str.split(",");

        $("#survey").empty();
        $('#survey').append('<option>' + "Select Survey No" + '</option>');
        for (var i = 0; i < res.length; i++) {
            //$('<option/>').val(res[i]).html(res[i]).appendTo('#survey');
            $('#survey').append('<option>' + res[i] + '</option>');
        }

        var owners = $(".ownersBx");
        $('#sellTo').empty();
        $('#sellTo').append('<option>' + "Select Buyer" + '</option>');
        for (var j = 0; j <owners.length; j++) {
            if(owners[j].innerHTML != selectedOwner){
              $('#sellTo').append('<option>' + owners[j].innerHTML + '</option>');
            }
        } 

    });

    // On Click survey dropdown, populate area and location

    $('#survey').on('change', function() {
        // References to textFields
        var areaField = document.getElementById("areaField");
        var addressField = document.getElementById("addressField");

        var selectedSurvey = $('#survey').find(":selected").text();

        var owners = document.getElementsByClassName(selectedSurvey);

        var str = owners[0].innerHTML;  // Contains 'Location/Area'
        var result = str.split("/");

        areaField.value = result[1];
        addressField.value = result[0];
    });
});