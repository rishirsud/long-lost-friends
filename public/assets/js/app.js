$("#platform-select-menu a").click(function () {

  let value = $(this).html()

  $("#btn-platform-select").html(`${value} <span class="caret"></span>`);

  let platformText = value.split(" ");
  platformText = platformText[3].trim();
  console.log(platformText);

  switch (platformText) {
    case "PSN":
      $('#search').on("click", searchPSN);
      break;

    case "Xbox":
      $('#search').on("click", searcXbox);
      break;

    case "Steam":
      $('#search').on("click", searchSteam);
      break;

    default:
      console.log("nothing selected");
      break;
  }
});


function signup(err) {
  err.preventDefault();

  const firstName = $('#firstname-input')
    .val()
    .trim();
  const lastName = $('#lastname-input')
    .val()
    .trim();
  const email = $('#email-input')
    .val()
    .trim();
  const password = $('#password-input')
    .val()
    .trim();

  // const photo = document.getElementById('profile-pic').files[0];

  const signUpData = new FormData();
  signUpData.append('firstName', firstName);
  signUpData.append('lastName', lastName);
  signUpData.append('email', email);
  signUpData.append('password', password);
  signUpData.append('profilePic', photo);

  console.log(signUpData);

  $.ajax({
      url: '/api/user/register',
      method: 'post',
      data: signUpData,
      contentType: false,
      processData: false
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

function login(err) {
  err.preventDefault();

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

  $.ajax({
      url: '/api/user/login',
      method: 'post',
      data: loginData
    })
    .then(token => {
      console.log(token);
      localStorage.setItem('accessToken', token);
      getProfileData();
    })
    .catch(err => {
      console.log(err);
    });
}

function getProfileData() {
  const token = localStorage.getItem('accessToken');

  $.ajax({
      url: '/api/user',
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

function searchPSN() {
  let search = $("#search-user").val().trim();

  console.log(search);

  $.ajax({
      url: '/api/search/psn?psn=' + search,
      method: 'get',
    })
    .then(searches => {
      console.log(searches);
    })
    .catch(err => {
      console.log(err);
    });
}

function searchXbox() {
  let search = $("#search-user").val().trim();

  console.log(search);

  $.ajax({
      url: '/api/search/xbox?xbox=' + search,
      method: 'get',
    })
    .then(searches => {
      console.log(searches);
    })
    .catch(err => {
      console.log(err);
    });
}

function searchSteam() {
  let search = $("#search-user").val().trim();

  console.log(search);

  $.ajax({
      url: '/api/search/steam?steam=' + search,
      method: 'get',
    })
    .then(searches => {
      console.log(searches);
    })
    .catch(err => {
      console.log(err);
    });
}


$(document).ready(function () {
  $('#signup-form').on('submit', signup);
  $('#login-form').on('submit', login);
});