// ********************************************************************************************* VARIABLE(S)

// ID RETRIEVAL CONSTANT
const selectedId = window.location.search.replace("?id=", "");

// SELECTION CONSTANTS
const orderId = document.getElementById("orderId");

// ******************************************************************************************* CORE FUNCTION

(function coreFunction() {
  orderId.textContent = selectedId;

  localStorage.clear();
})();
