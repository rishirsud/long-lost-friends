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