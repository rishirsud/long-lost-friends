checkWindowSize = function () {
  if ($(window).width() < 992) {
    $('#nav-login').removeClass("dropdown-menu-right")
  } else {
    $('#nav-login').addClass("dropdown-menu-right")
  }
};

function login(event) {
  event.preventDefault();

  const email = $('#email-input-login')
    .val()
    .trim();
  const password = $('#password-input-login')
    .val()
    .trim();

  const loginData = {
    email,
    password
  };
  console.log(loginData)


  $.ajax({
      url: '/api/user/login',
      method: 'POST',
      data: loginData
    })
    .then(token => {
      console.log(token);
      localStorage.setItem('accessToken', token);
      $("#toProfile").attr('href', `/profile?token=${token}`)
      getProfileData();
      $('.dropdown-toggle').dropdown('toggle')
      $("#dropdownMenuOffset").text("Logged In");
    })
    .catch(err => {
      console.log(err);
    });
}

function getProfileData() {
  const token = localStorage.getItem('accessToken');

  $.ajax({
      url: '/api/user/profile',
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(userData => {
      console.log(userData);
    })
    .catch(err => {
      console.log(err);
    });
}

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
      // email.val("");
      // password.val("")
      $('.toast').toast('show');
    })
    .catch(err => {
      console.log(err);
    });
};

$(document).ready(function () {
  console.log('loaded js');
  checkWindowSize();
  $('#submitRegister').on('click', registerUser);
  $('#signInButton').on('click', login);
});