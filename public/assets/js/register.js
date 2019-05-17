checkWindowSize = function () {
  if ($(window).width() < 992) {
    $('#nav-login').removeClass("dropdown-menu-right")
  } else {
    $('#nav-login').addClass("dropdown-menu-right")
  }
};

registerUser = function (event) {
  console.log('trying to register');
  event.preventDefault(event);

  const email = $('#registerEmail').val().trim();
  const password = $('#registerPassword').val();

  $.ajax({
      url: '/api/user/register',
      method: 'post',
      data: {
        email: email,
        password: password
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

$(document).ready(function () {
  console.log('loaded js');
  checkWindowSize();
  $('#submitRegister').on('click', registerUser);
});