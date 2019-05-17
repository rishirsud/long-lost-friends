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

    case "XBL":
      $('#search').on("click", searchXbox);
      break;

    case "Steam":
      $('#search').on("click", searchSteam);
      break;

    default:
      console.log("nothing selected");
      break;
  }
});


// function signup(err) {
//   err.preventDefault();

//   const firstName = $('#firstname-input')
//     .val()
//     .trim();
//   const lastName = $('#lastname-input')
//     .val()
//     .trim();
//   const email = $('#email-input')
//     .val()
//     .trim();
//   const password = $('#password-input')
//     .val()
//     .trim();

//   // const photo = document.getElementById('profile-pic').files[0];

//   const signUpData = new FormData();
//   signUpData.append('firstName', firstName);
//   signUpData.append('lastName', lastName);
//   signUpData.append('email', email);
//   signUpData.append('password', password);
//   signUpData.append('profilePic', photo);

//   console.log(signUpData);

//   $.ajax({
//       url: '/api/user/register',
//       method: 'post',
//       data: signUpData,
//       contentType: false,
//       processData: false
//     })
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }


//set variable for login
// var isLoggedIn = true; 
// console.log(isLoggedIn)


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

function searchPSN() {
  let search = $("#search-user").val().trim();

  console.log(search);

  $.ajax({
      url: '/api/search/psn?psn=' + search,
      method: 'get',
    })
    .then(searches => {
      console.log(searches);
      printSearch(searches, "psn")
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
      printSearch(searches, "xbox")
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
      printSearch(searches, "steam")
    })
    .catch(err => {
      console.log(err);
    });
}

checkWindowSize = function () {
  if ($(window).width() < 992) {
    $('#nav-login').removeClass("dropdown-menu-right")
  } else {
    $('#nav-login').addClass("dropdown-menu-right")
  }
};

const printSearch = (arr, plat) => {
  let cardDisplay = $("#displayCards");

  cardDisplay.empty();
  arr.forEach(results => {

    let col = $("<div class='col-lg-4 col-md-6 col-12' style='margin-top: 10px'>");
    let $card = $("<div class='card'>");
    let $cardBody = $("<div class='card-body'>");
    let $cardTitle = $("<h5 class='card-title'>");
    let $cardList = $("<ul class='list-group list-group-flush'>");
    let $cardLi = $("<li class='list-group-item'>");


    // console.log(results.firstName)
    // console.log(results.location)
    // game ign 


    $card.append($cardBody);

    results[plat].forEach(platform => {
      $cardBody.append($cardTitle.clone().text(platform));
      // console.log(platform)
    });
    $cardBody.after($cardList);
    $cardList.append($cardLi.text(`Name: ${results.firstName}`));
    $cardList.append($cardLi.clone().text(`Location: ${results.location}`));

    col.append($card)
    cardDisplay.append(col);
  })

}

$(document).ready(function () {
  checkWindowSize();
  // $('#signup-form').on('submit', signup);
  $('#signInButton').on('click', login);
  // $('#toProfile').on('click', navToProfile);
});