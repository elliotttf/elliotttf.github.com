var MENU_ITEMS = 4;

$(document).ready(function() {
  // Build the projects menu from GitHub so I don't have to update
  // what I've been working on.
  var menu = null;
  if (typeof localStorage === 'undefined') {
    getGitHubMenu(false);
  }
  else {
    menu = localStorage.getItem('menu');
    if (typeof menu === 'undefined' || menu === null) {
      getGitHubMenu(true);
    }
    else {
      menu = JSON.parse(menu);
      setMenu(menu);
    }
  }

  $('.menu-toggle').click(function() {
    var parentMenu = $(this).parents('.menu');
    $(parentMenu).toggleClass('menu-active');
    $('.menu-content', parentMenu).fadeToggle('fast');
    return false;
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
    'https://api.github.com/users/elliotttf/repos?callback=?',
    function onGet(res) {
      var menu = [];
      $.each(res.data, function eachRepo(k, repo) {
        if (repo.name === 'elliotttf.github.com') {
          return;
        }
        var d = new Date(repo.pushed_at);
        var menuItem = {
          'href': repo.html_url,
          'title': repo.name,
          'date': d.getTime()
        };
        menu.push(menuItem);
      });

      menu.sort(function compare(left, right) {
        if (left.date < right.date) {
          return -1;
        }
        else if (left.date > right.date) {
          return 1;
        }
        return 0;
      });
      menu.reverse();

      if (store) {
        localStorage.setItem('menu', JSON.stringify(menu));
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
  for (var x = 0; x < menu.length && x < MENU_ITEMS; x++) {
    $('.menu-content .menu-items').append(
      '<li class="item"><a href="' + menu[x].href + '">' + menu[x].title + '</a></li>'
    );
  }
}
