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
