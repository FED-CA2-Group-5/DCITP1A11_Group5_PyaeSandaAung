//new function of fropdown menu and description, ingredients and instructions
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header dropdowns (Menu / Recipes) ---------- */
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
      closeAllDropdowns();          // close any other open dropdown first
      menu.classList.toggle('hidden', isOpen);
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
      // 1. Mobile Hamburger Menu Toggle Logic
      const mobileMenuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburgerIcon = document.getElementById('hamburger-icon');
      const closeIcon = document.getElementById('close-icon');

      mobileMenuBtn.addEventListener('click', () => {
        const isMenuOpen = !mobileMenu.classList.contains('hidden');
        
        if (isMenuOpen) {
          mobileMenu.classList.add('hidden');
          hamburgerIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        } else {
          mobileMenu.classList.remove('hidden');
          hamburgerIcon.classList.add('hidden');
          closeIcon.classList.remove('hidden');
        }
      })
    });

  // One shared outside-click handler for every dropdown (the duplicate
  // window.onclick assignments in the old script silently overwrote
  // each other, so only the last dropdown ever closed on outside click).
  document.addEventListener('click', closeAllDropdowns);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllDropdowns();
  });

  /* ---------- Description / Ingredients / Instructions toggles ---------- */
  document.querySelectorAll('.toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', (!expanded).toString());
      if (panel) panel.classList.toggle('hidden');
      var chevron = btn.querySelector('.chevron');
      if (chevron) chevron.classList.toggle('rotate-180');
    });
  });

  /* ---------- Step-checklist completion messages ---------- */
  document.querySelectorAll('ol[data-complete-target]').forEach(function (ol) {
    var message = document.getElementById(ol.getAttribute('data-complete-target'));
    if (!message) return;
    ol.addEventListener('change', function () {
      var checkboxes = ol.querySelectorAll('input[type="checkbox"]');
      var allChecked = Array.from(checkboxes).every(function (cb) { return cb.checked; });
      message.classList.toggle('hidden', !allChecked);
    });
  });
});
// /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
// function MenuFunction() {
//   document.getElementById("MenuDropdown").classList.toggle("show");
// }

// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.menubtn')) {
//     var dropdowns = document.getElementsByClassName("menu-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// } 

// function RecipeFunction() {
//   document.getElementById("RecipeDropdown").classList.toggle("show");
// }

// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.recipebtn')) {
//     var dropdowns = document.getElementsByClassName("recipe-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

//


// form
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("(form)")
            .addEventListener("submit", submitform);

    var btnSubmit= document.getElementById('btnSubmit');

    btnSubmit.disabled = true;
    //the one below is required in order to submit
    state.addEventListener('change', function(){
        if(state.value===""){
            btnSubmit.disabled = true;
        } else {
            btnSubmit.disabled = false;
        }

    })

})




//interactivity
 function toggleInfo(id) {
        const element = document.getElementById(id);
        element.classList.toggle("hidden");
    }

    function checkCompletion(listId, completeId) {
        const list = document.getElementById(listId);
        const checkboxes = list.querySelectorAll("input[type='checkbox']");
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        const completeMsg = document.getElementById(completeId);
        if (allChecked) {
            completeMsg.classList.remove("hidden");
        } else {
            completeMsg.classList.add("hidden");
        }
    }



    function submitform(event){
        event.preventDefault();    //stops page form reloading after submission

        var state= getElementById("option");
        if(state.value===""){
            alert("Please choose one of the options");

            state.focus();
            return;
        }

    };
const STORAGE_KEY = 'mealplan-progress';
const cards = document.querySelectorAll('.tip-card');
const progressLabel = document.getElementById('progressLabel');
const progressFill = document.getElementById('progressFill');

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch (e) { return {}; }
}
function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}

function render() {
  const state = loadState();
  let doneCount = 0;
  cards.forEach(card => {
    const step = card.dataset.step;
    const isDone = !!state[step];
    if (isDone) doneCount++;

    const toggle = card.querySelector('.done-toggle');
    const check = card.querySelector('.check-icon');
    const title = card.querySelector('.tip-title');

    toggle.classList.toggle('bg-green-700', isDone);
    toggle.classList.toggle('border-green-700', isDone);
    check.classList.toggle('opacity-0', !isDone);
    check.classList.toggle('scale-50', !isDone);
    check.classList.toggle('opacity-100', isDone);
    check.classList.toggle('scale-100', isDone);
    title.classList.toggle('line-through', isDone);
    title.classList.toggle('decoration-green-700', isDone);
    title.classList.toggle('decoration-2', isDone);
  });
  progressLabel.textContent = `${doneCount} of ${cards.length} tips checked off`;
  progressFill.style.width = (doneCount / cards.length * 100) + '%';
}

cards.forEach(card => {
  card.querySelector('.done-toggle').addEventListener('click', () => {
    const state = loadState();
    const step = card.dataset.step;
    state[step] = !state[step];
    saveState(state);
    render();
  });

  const exampleToggle = card.querySelector('.example-toggle');
  const exampleLabel = exampleToggle.querySelector('span');
  const chevron = exampleToggle.querySelector('.chevron');
  const examplePanel = card.querySelector('.example-panel');
  exampleToggle.addEventListener('click', () => {
    const isOpen = examplePanel.style.maxHeight && examplePanel.style.maxHeight !== '0px';
    examplePanel.style.maxHeight = isOpen ? '0px' : examplePanel.scrollHeight + 'px';
    chevron.classList.toggle('rotate-180', !isOpen);
    exampleLabel.textContent = isOpen ? 'See an example' : 'Hide example';
  });
});

document.getElementById('resetProgress').addEventListener('click', () => {
  saveState({});
  render();
});

render();

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.remove('opacity-0', 'translate-y-6');
      }, i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
cards.forEach(card => observer.observe(card));