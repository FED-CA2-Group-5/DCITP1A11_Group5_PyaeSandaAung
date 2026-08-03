/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function MenuFunction() {
  document.getElementById("MenuDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.menubtn')) {
    var dropdowns = document.getElementsByClassName("menu-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
} 

function RecipeFunction() {
  document.getElementById("RecipeDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.recipebtn')) {
    var dropdowns = document.getElementsByClassName("recipe-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

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



    function submitform(event){
        event.preventDefault();    //stops page form reloading after submission

        var state= getElementById("option");
        if(state.value===""){
            alert("Please choose one of the options");

            state.focus();
            return;
        }

    };



