checkWindowSize = function () {
  if ($(window).width() < 992) {
    $('#nav-login').removeClass("dropdown-menu-right")
  } else {
    $('#nav-login').addClass("dropdown-menu-right")
  }
};

$(document).ready(function () {
  checkWindowSize();
  $('#saveProfile').on('click', function (event) {
    event.preventDefault();
    $('.toast').toast('show');
  });
});

function getThisProfile(){
  const token = localStorage.getItem('accessToken'); 


  $.ajax({
    url: "/api/user/profile",
    method: "GET",
    headers: {
      authorization: `${token}`
    }
    
  }).then(res =>{
    
    console.log(res)
    
  }).catch (err => {
    console.log("THIS ISNT WORKING")
  })
}
getThisProfile();