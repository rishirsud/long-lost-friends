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

function checkLoggedIn() {
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
    })
    .catch(err => {
      console.log(err);
    });
}


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
  // console.log(loginData)


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
      $('#dropdownMenuOffset').dropdown('toggle')
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
  checkLoggedIn();
  $('#signInButton').on('click', login);
});