checkWindowSize = function () {
  if ($(window).width() < 992) {
    $('#nav-login').removeClass("dropdown-menu-right")
  } else {
    $('#nav-login').addClass("dropdown-menu-right")
  }
};

function showProfileInfo() {
  const token = localStorage.getItem('accessToken');

  $.ajax({
      url: '/api/user/profile',
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(userData => {
      $("#dropdownMenuOffset").text("Logged In");
      // console.log(userData);
      let $firstName = $('#firstName');
      let $profileEmail = $('#profileEmail');
      let $location = $('#location');
      let $steamID = $('#steamID');
      let $psnID = $('#psnID');
      let $xboxID = $('#xboxID');

      $firstName.val(userData.firstName);
      $profileEmail.val(userData.email);
      $location.val(userData.location);
      $steamID.val(userData.steam);
      $psnID.val(userData.psn);
      $xboxID.val(userData.xbox);

    })
    .catch(err => {
      console.log(err);
    });
}


function updateProfile(updatedData){
//holds user data
var userData = {


 firstName: $("#firstName").val().trim(),
 location: $("#location").val().trim(),
 steam: $("#steamID").val().trim(),
 psn: $("#psnID").val().trim(),
 xbox: $("#xboxIDs").val().trim()
}
 console.log(userData)
$.ajax({
  method: "PUT",
  url: "/api/user/update/",
  data: updatedData
})


}





$(document).ready(function () {
  checkWindowSize();
  $('#saveProfile').on('click', function (event) {
    event.preventDefault();
    $('.toast').toast('show');
    updateProfile()
  });
  
  showProfileInfo();

});
