// const config = require("../../config/config");

// console.log(config);
console.log(window.config);

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
    // Prepare data to send
    const data = { url: inputValue };

    fetch(`${config.Server_URL}/new-news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((err) => {
            console.error("Server Error Response:", err);
            throw new Error(err.error || "Unknown server error");
          });
        }
      })
      .then((responseData) => {
        alert("Data submitted successfully");
        closeModal();
        inputElement.value = "";
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert("An error occurred: " + error.message);
      });
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
