function openDialog() {
  const customDialog = document.getElementById("customDialog");
  customDialog.style.display = "block";
}

function closeDialog() {
  const customDialog = document.getElementById("customDialog");
  customDialog.style.display = "none";
}

// Close the dialog if the user clicks outside of it
window.addEventListener("click", function (event) {
  const customDialog = document.getElementById("customDialog");
  if (event.target === customDialog) {
    customDialog.style.display = "none";
  }
});
