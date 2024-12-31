/* Add link modal */
function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Add link
function submitInput() {
  const inputElement = document.getElementById("userInput");
  const inputValue = inputElement.value;

  if (inputValue) {
    alert("You entered: " + inputValue);
    closeModal();
    inputElement.value = "";
  } else {
    alert("Please enter something.");
  }
}

/* Logout modal */
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

openModalBtn.onclick = function () {
  modal.style.display = "block";
};

closeModalBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function logoutUser() {
  alert("You have been logged out.");
  modal.style.display = "none";
}
