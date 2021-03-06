// ********************************************************************************************* VARIABLE(S)

// ID retrieval constant
const selectedId = window.location.search.replace("?", "");

// HTML tag selection/navigation constant(s)
const orderId = document.getElementById("orderId");

// ******************************************************************************************* CORE FUNCTION

// Automatically applies major function(s)
(function coreFunction() {
  orderId.textContent = selectedId; // Defines content
  localStorage.clear(); // Completely empties the localStorage
})();
