$(document).ready(function() {
  $('.menu-content').hide();
  $('.menu-toggle').click(function() {
    var parentMenu = $(this).parents('.menu');
    $(parentMenu).toggleClass('menu-active');
    $('.menu-content', parentMenu).fadeToggle('fast');
  });
});

