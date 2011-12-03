$(document).ready(function() {
  $('.menu-content .menu-items').hide();
  $('.menu-toggle').click(function() {
    $(this).parent().parent().parent().toggleClass('menu-active');
    $(this).parent('.menu-head').toggleClass('menu-head-active');
    $(this).parent('.menu-head').siblings('.menu-items').slideToggle('fast');
  });
});

