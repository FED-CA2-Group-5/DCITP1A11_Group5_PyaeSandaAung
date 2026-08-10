document.addEventListener('DOMContentLoaded', function () {
  setupToggles();
  setupStepChecklists();
  setupRecipeForm();
  setupLikeButtons();
  showRecipeOfTheWeek();
});

/* ---------- 1. Header dropdown menus ---------- */

var dropdowns = document.querySelectorAll('.dropdown');

function closeAllDropdowns() {
  dropdowns.forEach(function (dropdown) {
    var btn = dropdown.querySelector('.dropdown-btn');
    var menu = dropdown.querySelector('.dropdown-menu');
    if (menu) menu.classList.add('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
}

dropdowns.forEach(function (dropdown) {
  var btn = dropdown.querySelector('.dropdown-btn');
  var menu = dropdown.querySelector('.dropdown-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = !menu.classList.contains('hidden');
    closeAllDropdowns();
    menu.classList.toggle('hidden', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });
});

/* ---------- Mobile hamburger toggle ---------- */

var hamburgerBtn = document.getElementById('hamburgerBtn');
var primaryNav = document.getElementById('primaryNav');

function closeMobileNav() {
  primaryNav.classList.add('hidden');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
}

function syncNavForViewport() {
  if (window.innerWidth >= 1024) {
    primaryNav.classList.remove('hidden');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  } else {
    primaryNav.classList.add('hidden');
  }
}

hamburgerBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  var isOpen = !primaryNav.classList.contains('hidden');
  if (isOpen) {
    closeMobileNav();
    closeAllDropdowns();
  } else {
    primaryNav.classList.remove('hidden');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }
});

document.addEventListener('click', function (e) {
  closeAllDropdowns();
  if (window.innerWidth < 1024 &&
      !primaryNav.contains(e.target) &&
      !hamburgerBtn.contains(e.target)) {
    closeMobileNav();
  }
});

window.addEventListener('resize', syncNavForViewport);
syncNavForViewport();

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeAllDropdowns();
    closeMobileNav();
  }
});

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

/* ---------- 3. Step checklists ---------- */

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

/* ---------- 4. Recipe submission form ---------- */

 // Recipe Submission Form //
document.getElementById("btnsubmit").addEventListener("click", function(event) { 
  event.preventDefault(); var name = document.getElementById("name"); 
  var email = document.getElementById("email"); var recipe = document.getElementById("recipe"); 
  var ingredients = document.getElementById("ingredients"); 
  var steps = document.getElementById("steps"); 
  var valid = true; // Check Name 
  if (name.value === "") { 
  document.getElementById("recipeErrorMessage1").classList.value = "show text-red-600 m-4"; 
  name.classList.remove("border-stone-300", "border-green-600"); 
  name.classList.add("border-red-600"); 
  name.focus(); 
  valid = false; 
} else { 

  document.getElementById("recipeErrorMessage1").classList.value = "hidden text-red-600"; 
  name.classList.remove("border-stone-300", "border-red-600"); 
  name.classList.add("border-green-600"); 
} 
// Check Email 
if (!email.value.includes("@")) { 
  document.getElementById("recipeErrorMessage2").classList.value = "show text-red-600 m-4";
   email.classList.remove("border-stone-300", "border-green-600"); 
   email.classList.add("border-red-600"); email.focus(); valid = false; 
  } else { 
    document.getElementById("recipeErrorMessage2").classList.value = "hidden text-red-600"; 
    email.classList.remove("border-stone-300", "border-red-600"); 
    email.classList.add("border-green-600"); } 
    // Check Recipe Name 
    if (recipe.value === "") { 
      document.getElementById("recipeErrorMessage3").classList.value = "show text-red-600 m-4"; 
      recipe.classList.remove("border-stone-300", "border-green-600"); 
      recipe.classList.add("border-red-600"); recipe.focus(); valid = false; 
    } else { 
      document.getElementById("recipeErrorMessage3").classList.value = "hidden text-red-600"; 
      recipe.classList.remove("border-stone-300", "border-red-600"); 
      recipe.classList.add("border-green-600"); } 
      // Check Ingredients 
      if (ingredients.value === "") { 
        document.getElementById("recipeErrorMessage4").classList.value = "show text-red-600 m-4"; 
        ingredients.classList.remove("border-stone-300", "border-green-600"); 
        ingredients.classList.add("border-red-600"); 
        ingredients.focus(); valid = false; 
      } else {
         document.getElementById("recipeErrorMessage4").classList.value = "hidden text-red-600"; 
         ingredients.classList.remove("border-stone-300", "border-red-600"); 
         ingredients.classList.add("border-green-600"); } 
         // Check Cooking Steps 
         if (steps.value.length < 10) { document.getElementById("recipeErrorMessage5").classList.value = "show text-red-600 m-4"; 
          steps.classList.remove("border-stone-300", "border-green-600"); steps.classList.add("border-red-600"); 
          steps.focus(); valid = false; 
        } else { 
            document.getElementById("recipeErrorMessage5").classList.value = "hidden text-red-600"; 
            steps.classList.remove("border-stone-300", "border-red-600"); steps.classList.add("border-green-600"); } 
            // Show success message 
            if (valid) { document.getElementById("recipeSuccess").classList.value = "show text-green-600 m-4"; } 
          }
        ); 
         // Feedback Form //
         document.getElementById("btnfeedback").addEventListener("click", function(event) { 
          event.preventDefault(); 
          var name = document.getElementById("fb-name"); 
          var email = document.getElementById("fb-email"); 
          var message = document.getElementById("fb-message"); 
          var rating = document.querySelector('input[name="rating"]:checked'); 
          var valid = true; 
          // Check Name 
          if (name.value === "") { 
            document.getElementById("feedbackErrorMessage1").classList.value = "show text-red-600 m-4"; 
            name.classList.remove("border-stone-300", "border-green-600"); 
            name.classList.add("border-red-600"); name.focus(); valid = false; 
          } else { 
            document.getElementById("feedbackErrorMessage1").classList.value = "hidden text-red-600"; 
            name.classList.remove("border-stone-300", "border-red-600"); name.classList.add("border-green-600"); } 
            // Check Email 
            if (!email.value.includes("@")) { 
              document.getElementById("feedbackErrorMessage2").classList.value = "show text-red-600 m-4"; 
              email.classList.remove("border-stone-300", "border-green-600"); 
              email.classList.add("border-red-600"); email.focus(); valid = false; 
            } else { 
              document.getElementById("feedbackErrorMessage2").classList.value = "hidden text-red-600"; 
              email.classList.remove("border-stone-300", "border-red-600"); 
              email.classList.add("border-green-600"); } 
              // Check Rating 
              if (rating === null) { 
                document.getElementById("feedbackErrorMessage3").classList.value = "show text-red-600 m-4"; 
                valid = false; 
              } else { document.getElementById("feedbackErrorMessage3").classList.value = "hidden text-red-600"; } 
              // Check Message 
              if (message.value.length < 10) { 
                document.getElementById("feedbackErrorMessage4").classList.value = "show text-red-600 m-4"; 
                message.classList.remove("border-stone-300", "border-green-600"); 
                message.classList.add("border-red-600"); message.focus(); valid = false; 
              } else { 
                document.getElementById("feedbackErrorMessage4").classList.value = "hidden text-red-600"; 
                message.classList.remove("border-stone-300", "border-red-600"); 
                message.classList.add("border-green-600"); } 
                // Show success message 
                if (valid) { document.getElementById("feedbackSuccess").classList.value = "show text-green-600 m-4"; 

                } 
         });

/* ---------- 5. Like buttons + Recipe of the Week ---------- */

var RECIPE_OF_THE_WEEK_KEY = 'ss-recipe-of-the-week';

function setupLikeButtons() {
  var likeButtons = document.querySelectorAll('.like-btn');

  console.log('Like buttons found:', likeButtons.length);

  likeButtons.forEach(function (button) {
    var recipeId = button.getAttribute('data-recipe-id');

    if (!recipeId) {
      console.warn('Like button has no recipe ID:', button);
      return;
    }

    // Set initial appearance
    var alreadyLiked = wasLikedBefore(recipeId);
    setLikedLook(button, alreadyLiked);

    // Add click event
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      var nowLiked = button.getAttribute('aria-pressed') !== 'true';

      console.log('Like clicked:', recipeId, nowLiked);

      setLikedLook(button, nowLiked);
      rememberLike(recipeId, nowLiked);

      if (nowLiked) {
        saveRecipeOfTheWeek({
          title: button.getAttribute('data-recipe-title'),
          page: button.getAttribute('data-recipe-page'),
          desc: button.getAttribute('data-recipe-desc'),
          image: button.getAttribute('data-recipe-image')
        });
      }
    });
  });
}


function setLikedLook(button, liked) {
  button.setAttribute('aria-pressed', liked ? 'true' : 'false');

  if (liked) {
    button.style.color = '#dc2626';
  } else {
    button.style.color = '#d6d3d1';
  }
}


function wasLikedBefore(recipeId) {
  try {
    return localStorage.getItem('ss-like-' + recipeId) === 'true';
  } catch (error) {
    console.warn('localStorage is unavailable:', error);
    return false;
  }
}


function rememberLike(recipeId, liked) {
  try {
    localStorage.setItem(
      'ss-like-' + recipeId,
      liked ? 'true' : 'false'
    );
  } catch (error) {
    console.warn('Could not save like:', error);
  }
}


function saveRecipeOfTheWeek(recipe) {
  try {
    localStorage.setItem(
      RECIPE_OF_THE_WEEK_KEY,
      JSON.stringify(recipe)
    );
  } catch (error) {
    console.warn('Could not save recipe of the week:', error);
  }
}


function showRecipeOfTheWeek() {
  var section = document.getElementById('recipe-of-the-week');

  if (!section) return;

  var recipe = readRecipeOfTheWeek();

  if (!recipe || !recipe.title) return;

  var title = section.querySelector('.rotw-title');
  var desc = section.querySelector('.rotw-desc');
  var link = section.querySelector('.rotw-link');
  var empty = section.querySelector('.rotw-empty');
  var content = section.querySelector('.rotw-content');

  if (title) title.textContent = recipe.title;
  if (desc) desc.textContent = recipe.desc || '';
  if (link) {
    link.setAttribute(
      'href',
      recipe.page || './pages/breakfast.html'
    );
  }

  var image = section.querySelector('.rotw-image');

  if (image) {
    if (recipe.image) {
      image.src = recipe.image;
      image.alt = recipe.title;
      image.classList.remove('hidden');
    } else {
      image.classList.add('hidden');
    }
  }

  if (empty) empty.classList.add('hidden');
  if (content) content.classList.remove('hidden');
}


function readRecipeOfTheWeek() {
  try {
    return JSON.parse(
      localStorage.getItem(RECIPE_OF_THE_WEEK_KEY)
    );
  } catch (error) {
    return null;
  }
}

/* ---------- 6. Meal Planning Progress ---------- */

const STORAGE_KEY = 'mealplan-progress';

const cards = document.querySelectorAll('.tip-card');
const progressLabel = document.getElementById('progressLabel');
const progressFill = document.getElementById('progressFill');
const resetProgress = document.getElementById('resetProgress');

function loadState() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
}

function render() {
    const state = loadState();
    let doneCount = 0;

    cards.forEach(function (card) {
        const step = card.dataset.step;
        const isDone = !!state[step];

        if (isDone) {
            doneCount++;
        }

        const toggle = card.querySelector('.done-toggle');
        const check = card.querySelector('.check-icon');
        const title = card.querySelector('.tip-title');

        if (isDone) {
            toggle.style.backgroundColor = '#15803d';
            toggle.style.borderColor = '#15803d';

            check.style.opacity = '1';
            check.style.transform = 'scale(1)';

            title.style.textDecoration = 'line-through';
            title.style.textDecorationColor = '#15803d';
            title.style.textDecorationThickness = '2px';
        } else {
            toggle.style.backgroundColor = '';
            toggle.style.borderColor = '';

            check.style.opacity = '0';
            check.style.transform = 'scale(0.5)';

            title.style.textDecoration = '';
            title.style.textDecorationColor = '';
            title.style.textDecorationThickness = '';
        }
    });

    progressLabel.textContent =
        doneCount + ' of ' + cards.length + ' tips checked off';

    progressFill.style.width =
        (doneCount / cards.length * 100) + '%';
}


/* Check off a tip */

cards.forEach(function (card) {

    const doneButton = card.querySelector('.done-toggle');

    doneButton.addEventListener('click', function () {

        const state = loadState();
        const step = card.dataset.step;

        state[step] = !state[step];

        saveState(state);
        render();
    });


    /* Show example */

    const exampleButton = card.querySelector('.example-toggle');
    const exampleLabel = exampleButton.querySelector('span');
    const chevron = exampleButton.querySelector('.chevron');
    const examplePanel = card.querySelector('.example-panel');

    exampleButton.addEventListener('click', function () {

        const isOpen =
            examplePanel.style.maxHeight &&
            examplePanel.style.maxHeight !== '0px';

        if (isOpen) {
            examplePanel.style.maxHeight = '0px';
            exampleLabel.textContent = 'See an example';
        } else {
            examplePanel.style.maxHeight =
                examplePanel.scrollHeight + 'px';

            exampleLabel.textContent = 'Hide example';
        }

        chevron.classList.toggle('rotate-180', !isOpen);
    });
});


/* Reset */

if (resetProgress) {
    resetProgress.addEventListener('click', function () {
        saveState({});
        render();
    });
}


/* Run when page loads */

render();


/* Scroll reveal */

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.remove(
                'opacity-0',
                'translate-y-6'
            );

            observer.unobserve(entry.target);
        }
    });

}, {
    threshold: 0.15
});

cards.forEach(function (card) {
    observer.observe(card);
});



