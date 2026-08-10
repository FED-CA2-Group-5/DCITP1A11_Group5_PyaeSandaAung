document.addEventListener('DOMContentLoaded', function () {
  setupToggles();
  setupStepChecklists();
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

// This is the name used to save the user's progress in localStorage.
const STORAGE_KEY = 'mealplan-progress';

// Find all meal tip cards and the progress elements from the HTML.
const cards = document.querySelectorAll('.tip-card');
const progressLabel = document.getElementById('progressLabel');
const progressFill = document.getElementById('progressFill');
const resetProgress = document.getElementById('resetProgress');


// ---------- Load Saved Progress ----------

function loadState() {
    try {
        // Get the saved progress from localStorage.
        // JSON.parse converts the saved text back into a JavaScript object.
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
        // If there is an error, return an empty object.
        return {};
    }
}


// ---------- Save Progress ----------

function saveState(state) {
    try {
        // JSON.stringify converts the JavaScript object into text
        // so it can be stored in localStorage.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        // Ignore storage errors.
    }
}


// ---------- Update the Page ----------

function render() {
    // Load the user's saved progress.
    const state = loadState();

    // Keeps track of how many tips are completed.
    let doneCount = 0;


    // Go through every meal tip card.
    cards.forEach(function (card) {

        // Get the step number from data-step in the HTML.
        const step = card.dataset.step;

        // Check if this tip has already been completed.
        const isDone = !!state[step];

        // If completed, increase the counter.
        if (isDone) {
            doneCount++;
        }


        // Find the elements inside the current card.
        const toggle = card.querySelector('.done-toggle');
        const check = card.querySelector('.check-icon');
        const title = card.querySelector('.tip-title');


        // ---------- If Tip is Completed ----------

        if (isDone) {

            // Change the button to green.
            toggle.style.backgroundColor = '#15803d';
            toggle.style.borderColor = '#15803d';

            // Show the check icon.
            check.style.opacity = '1';
            check.style.transform = 'scale(1)';

            // Cross out the completed tip title.
            title.style.textDecoration = 'line-through';
            title.style.textDecorationColor = '#15803d';
            title.style.textDecorationThickness = '2px';


        // ---------- If Tip is Not Completed ----------

        } else {

            // Return the button to its original style.
            toggle.style.backgroundColor = '';
            toggle.style.borderColor = '';

            // Hide the check icon.
            check.style.opacity = '0';
            check.style.transform = 'scale(0.5)';

            // Remove the line-through from the title.
            title.style.textDecoration = '';
            title.style.textDecorationColor = '';
            title.style.textDecorationThickness = '';
        }
    });


    // Update the text showing the user's progress.
    // Example: "3 of 6 tips checked off"
    progressLabel.textContent =
        doneCount + ' of ' + cards.length + ' tips checked off';


    // Calculate the percentage and update the progress bar.
    // Example: 3 / 6 × 100 = 50%
    progressFill.style.width =
        (doneCount / cards.length * 100) + '%';
}


// ---------- Check Off a Tip ----------

// Add a click event to every meal tip card.
cards.forEach(function (card) {

    // Find the check button inside the card.
    const doneButton = card.querySelector('.done-toggle');


    // Run this code when the user clicks the check button.
    doneButton.addEventListener('click', function () {

        // Get the current saved progress.
        const state = loadState();

        // Get the current tip's step number.
        const step = card.dataset.step;

        // Change the status:
        // true becomes false, and false becomes true.
        state[step] = !state[step];

        // Save the new progress.
        saveState(state);

        // Update the page.
        render();
    });


    // ---------- Show Example ----------

    // Find the example button and its contents.
    const exampleButton = card.querySelector('.example-toggle');
    const exampleLabel = exampleButton.querySelector('span');
    const chevron = exampleButton.querySelector('.chevron');
    const examplePanel = card.querySelector('.example-panel');


    // Run when the user clicks "See an example".
    exampleButton.addEventListener('click', function () {

        // Check whether the example panel is currently open.
        const isOpen =
            examplePanel.style.maxHeight &&
            examplePanel.style.maxHeight !== '0px';


        // ---------- Close Example ----------

        if (isOpen) {

            // Hide the example panel.
            examplePanel.style.maxHeight = '0px';

            // Change the button text.
            exampleLabel.textContent = 'See an example';


        // ---------- Open Example ----------

        } else {

            // Open the panel based on the content's height.
            examplePanel.style.maxHeight =
                examplePanel.scrollHeight + 'px';

            // Change the button text.
            exampleLabel.textContent = 'Hide example';
        }


        // Rotate the chevron using the Tailwind rotate-180 class.
        chevron.classList.toggle('rotate-180', !isOpen);
    });
});


// ---------- Reset Progress ----------

if (resetProgress) {

    // Run when the Reset button is clicked.
    resetProgress.addEventListener('click', function () {

        // Clear all saved progress.
        saveState({});

        // Update the page so all tips become unchecked.
        render();
    });
}


// ---------- Run When Page Loads ----------

// Load and display the user's saved progress immediately.
render();


// ---------- Scroll Reveal ----------

// IntersectionObserver detects when an element becomes visible
// on the user's screen.
const observer = new IntersectionObserver(function (entries) {

    // Check every observed element.
    entries.forEach(function (entry) {

        // If the card is visible on the screen...
        if (entry.isIntersecting) {

            // Remove the Tailwind classes that hide and move the card.
            // This makes the card appear with the scroll animation.
            entry.target.classList.remove(
                'opacity-0',
                'translate-y-6'
            );

            // Stop watching this card because the animation
            // only needs to happen once.
            observer.unobserve(entry.target);
        }
    });

}, {
    // The animation starts when about 15% of the card is visible.
    threshold: 0.15
});


// Tell the observer to watch every meal tip card.
cards.forEach(function (card) {
    observer.observe(card);
});


