$(document).ready(function() {
  $('.accomplishments ul, .responsibilities ul').hide()
  $('.accomplishments h4, .responsibilities h4')
    .css({'cursor': 'pointer', 'text-decoration': 'underline'})
    .click(function() {
      $(this).siblings('ul').slideToggle();
    });
});
