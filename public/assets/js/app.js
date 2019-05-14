
$("#platform-select-menu a").click(function () {
  $("#btn-platform-select").html($(this).html() + ' <span class="caret"></span>');
});