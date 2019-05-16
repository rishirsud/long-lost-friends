$(document).ready(function () {
  $('#saveProfile').on('click', function (event) {
    event.preventDefault();
    $('.toast').toast('show');
  });
});