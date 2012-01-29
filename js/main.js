$(document).ready(function() {
  // Build the projects menu from GitHub so I don't have to update
  // what I've been working on.
  var menu = null;
  if (typeof localStorage === 'undefined') {
    getGitHubMenu(false);
  }
  else {
    //menu = localStorage.getItem('menu');
    if (typeof menu === 'undefined' || menu === null) {
      getGitHubMenu(true);
    }
    else {
      setMenu(menu);
    }
  }

  $('.menu-content').hide();
  $('.menu-toggle').click(function() {
    var parentMenu = $(this).parents('.menu');
    $(parentMenu).toggleClass('menu-active');
    $('.menu-content', parentMenu).fadeToggle('fast');
  });
});

/**
 * Grabs info from GitHub about recent repositories.
 *
 * @param {boolean} store
 *   true if the menu should be stored.
 */
function getGitHubMenu(store) {
  $.getJSON(
    'https://api.github.com/users/elliotttf/repos',
    function onGet(res) {
      if (store) {
        localStorage.setItem('menu', res);
      }
      setMenu(menu);
    }
  );
}

/**
 * Sets the items in the projects menu.
 *
 * @param {array} menu
 *   Array of menu items to add to the projects menu.
 */
function setMenu(menu) {
  for (var x in menu) {
    $('.menu-content .menu-items').append(
      '<li class="item"><a href="' + menu[x].href + '">' + menu[x].title + '</a></li>'
    );
  }
}
