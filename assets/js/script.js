/* ============================================================
   Simply Savory — main script.js

   Everything on the site that needs JavaScript lives in this one
   file. Each part below only runs if the elements it needs are
   actually on the current page, so the same script.js works on
   every page of the site without throwing errors.

   Sections in this file:
     1. Header dropdown menus (Menu / Recipes)
     2. Recipe card toggles (Description / Ingredients / Instructions)
     3. "Completed!" message once every step is checked off
     4. Recipe submission form validation (contact.html)
     5. Like buttons + Recipe of the Week (breakfast.html -> index.html)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  setupDropdowns();
  setupToggles();
  setupStepChecklists();
  setupRecipeForm();
  setupLikeButtons();
  showRecipeOfTheWeek();
});


/* ---------- 1. Header dropdown menus (Menu / Recipes) ---------- */

function setupDropdowns() {
  var dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(function (dropdown) {
    var button = dropdown.querySelector('.dropdown-btn');
    var menu = dropdown.querySelector('.dropdown-menu');
    if (!button || !menu) return;

    button.addEventListener('click', function (event) {
      event.stopPropagation(); // don't let this same click close the menu again below
      var wasOpen = !menu.classList.contains('hidden');
      closeAllDropdowns(dropdowns);
      if (!wasOpen) openDropdown(button, menu);
    });
  });

  // Clicking anywhere else on the page, or pressing Escape, closes them.
  document.addEventListener('click', function () {
    closeAllDropdowns(dropdowns);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAllDropdowns(dropdowns);
  });
}

function openDropdown(button, menu) {
  menu.classList.remove('hidden');
  button.setAttribute('aria-expanded', 'true');
  var arrow = button.querySelector('.chevron');
  if (arrow) arrow.classList.add('rotate-180');
}

function closeAllDropdowns(dropdowns) {
  dropdowns.forEach(function (dropdown) {
    var button = dropdown.querySelector('.dropdown-btn');
    var menu = dropdown.querySelector('.dropdown-menu');
    if (menu) menu.classList.add('hidden');
    if (button) button.setAttribute('aria-expanded', 'false');
    var arrow = button && button.querySelector('.chevron');
    if (arrow) arrow.classList.remove('rotate-180');
  });
}


/* ---------- 2. Recipe card toggles ---------- */

function setupToggles() {
  document.querySelectorAll('.toggle-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      var panel = document.getElementById(button.getAttribute('aria-controls'));
      var wasOpen = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', String(!wasOpen));
      if (panel) panel.classList.toggle('hidden');

      var arrow = button.querySelector('.chevron');
      if (arrow) arrow.classList.toggle('rotate-180');
    });
  });
}


/* ---------- 3. "Completed!" message for step checklists ---------- */

function setupStepChecklists() {
  document.querySelectorAll('ol[data-complete-target]').forEach(function (list) {
    var message = document.getElementById(list.getAttribute('data-complete-target'));
    if (!message) return;

    list.addEventListener('change', function () {
      var boxes = list.querySelectorAll('input[type="checkbox"]');
      var allChecked = Array.from(boxes).every(function (box) { return box.checked; });
      message.classList.toggle('hidden', !allChecked);
    });
  });
}


/* ---------- 4. Recipe submission form (contact.html) ---------- */

function setupRecipeForm() {
  var form = document.getElementById('submitRecipeForm');
  if (!form) return; // this page has no form — nothing to do

  var successMessage = document.getElementById('form-success');

  // One rule per field: how to check it.
  var rules = [
    { id: 'name', check: function (value) { return value.trim().length >= 3; } },
    { id: 'email', check: function (value) { return value.indexOf('@') !== -1; } },
    { id: 'recipe', check: function (value) { return value.trim().length >= 2; } },
    { id: 'ingredients', check: hasAtLeastOneLine },
    { id: 'steps', check: hasAtLeastOneLine },
  ];

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // don't actually reload the page

    var allFieldsValid = true;
    rules.forEach(function (rule) {
      var field = document.getElementById(rule.id);
      var isValid = rule.check(field.value);
      showFieldError(field, !isValid);
      if (!isValid) allFieldsValid = false;
    });

    if (!allFieldsValid) return;

    form.classList.add('hidden');
    if (successMessage) {
      successMessage.classList.remove('hidden');
      successMessage.focus();
    }
  });
}

// A line "counts" if it isn't just blank / whitespace.
function hasAtLeastOneLine(text) {
  return text.split('\n').some(function (line) { return line.trim().length > 0; });
}

// Shows or hides the red border + error message under one field.
function showFieldError(field, hasError) {
  var errorMessage = document.getElementById(field.id + '-error');
  field.classList.toggle('border-red-600', hasError);
  field.setAttribute('aria-invalid', hasError ? 'true' : 'false');
  if (errorMessage) errorMessage.classList.toggle('hidden', !hasError);
}


/* ---------- 5. Like buttons + Recipe of the Week ----------

   Tapping the heart on a recipe saves that recipe's info using the
   browser's own storage (localStorage). The homepage reads it back
   and displays it as the Recipe of the Week.

   Important: this only works when the site is hosted on a real (even
   local) web server, or opened as real files on your computer — not
   inside a chat preview panel. If two pages are on different origins,
   they don't share localStorage. */

var RECIPE_OF_THE_WEEK_KEY = 'ss-recipe-of-the-week';

function setupLikeButtons() {
  document.querySelectorAll('.like-btn').forEach(function (button) {
    var recipeId = button.getAttribute('data-recipe-id');
    if (!recipeId) return;

    // Show whether this recipe was already liked on a past visit.
    setLikedLook(button, wasLikedBefore(recipeId));

    button.addEventListener('click', function () {
      var nowLiked = button.getAttribute('aria-pressed') !== 'true';
      setLikedLook(button, nowLiked);
      rememberLike(recipeId, nowLiked);

      // Liking a recipe makes it the new Recipe of the Week. Un-liking
      // it does NOT clear the homepage — the last-liked recipe stays
      // featured until something else is liked.
      if (nowLiked) {
        saveRecipeOfTheWeek({
          title: button.getAttribute('data-recipe-title'),
          page: button.getAttribute('data-recipe-page'),
          desc: button.getAttribute('data-recipe-desc'),
          image: button.getAttribute('data-recipe-image'),
        });
      }
    });
  });
}

function setLikedLook(button, liked) {
  button.setAttribute('aria-pressed', liked ? 'true' : 'false');
  // Set the color directly rather than toggling two Tailwind classes —
  // this guarantees it wins over the button's own hover:text-red-400
  // class instead of the two fighting for specificity while the mouse
  // is still sitting on the button right after a click.
  button.style.color = liked ? '#ef4444' /* red-500 */ : '';
}

function wasLikedBefore(recipeId) {
  return localStorage.getItem('ss-like-' + recipeId) === 'true';
}

function rememberLike(recipeId, liked) {
  localStorage.setItem('ss-like-' + recipeId, liked ? 'true' : 'false');
}

function saveRecipeOfTheWeek(recipe) {
  localStorage.setItem(RECIPE_OF_THE_WEEK_KEY, JSON.stringify(recipe));
}

// Runs on the homepage. Fills in the Recipe of the Week section if one
// has been saved; otherwise the page's own "no favorite yet" message
// (already in the HTML) is left showing.
function showRecipeOfTheWeek() {
  var section = document.getElementById('recipe-of-the-week');
  if (!section) return; // not the homepage — nothing to do

  var recipe = readRecipeOfTheWeek();
  if (!recipe || !recipe.title) return;

  section.querySelector('.rotw-title').textContent = recipe.title;
  section.querySelector('.rotw-desc').textContent = recipe.desc || '';
  section.querySelector('.rotw-link').setAttribute('href', recipe.page || './pages/breakfast.html');

  var image = section.querySelector('.rotw-image');
  if (image) {
    if (recipe.image) {
      image.src = recipe.image;
      image.alt = recipe.title;
      image.classList.remove('hidden');
    } else {
      image.classList.add('hidden'); // no image saved — just skip it
    }
  }

  section.querySelector('.rotw-empty').classList.add('hidden');
  section.querySelector('.rotw-content').classList.remove('hidden');
}

function readRecipeOfTheWeek() {
  try {
    return JSON.parse(localStorage.getItem(RECIPE_OF_THE_WEEK_KEY));
  } catch (error) {
    return null;
  }
}




