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
  const token = localStorage.getItem('accessToken');


 const firstName = $("#firstName").val().trim();
 const location = $("#location").val().trim();
 const steam = $("#steamID").val().trim();
 const psn = $("#psnID").val().trim();
 const xbox = $("#xboxID").val().trim();

 
$.ajax({
  method: "PUT",
  url: `/api/user/update`,
  data: {
    firstName: firstName,
    location: location,
    steam: steam,
    psn: psn,
    xbox: xbox
  },
  headers: {
    authorization: `Bearer ${token}`
  }
})
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
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
