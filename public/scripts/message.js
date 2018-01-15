$(window).on("load", function () {
  $(".alert").fadeOut(5000, function () {
    $(this).parent().remove();
  });
});
