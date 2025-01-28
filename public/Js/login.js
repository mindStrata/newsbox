document
  .getElementById("form_login")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await handleResponse(response);

      // alert(data.message || "Login successful!");
      showToast(data.message, data.description, data.success);
      window.location.href = "/home";
    } catch (error) {
      // console.error("Login Error:", error.message);
      // alert(`Error: ${error.message}`);
      showToast("Error occured", error.message, error.success);
    }
  });

// Throw the proper messages
async function handleResponse(response) {
  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(
      errorData.message ||
        errorData.error.message ||
        "An unknown error occurred."
    );
  }
}

const toast = document.querySelector(".toast-container");
const toastHeading = document.getElementById("toast-heading");
const toastParagraph = document.getElementById("toast-paragraph");

// Show the toast
function showToast(heading = "Error Occured", paragraph = "", success) {
  // console.log(success);
  if (success && success === true) {
    toast.classList.add("toast-login");
  } else if (
    !success ||
    success === undefined ||
    success !== true ||
    success === false
  ) {
    toast.classList.add("toast-error");
  }

  toast.classList.add("toast-show");
  // toast.classList.add
  toast.classList.remove("toast-hide");

  // Set the heading and paragraph text
  toastHeading.textContent = heading;
  toastParagraph.textContent = paragraph;

  setTimeout(() => {
    hideToast();
    toastHeading.textContent = "";
    toastParagraph.textContent = "";
  }, 8000);
}

// Hide the toast
function hideToast() {
  toast.classList.add("toast-hide");
  toast.classList.remove("toast-show");

  // Remove the toast element after the hide animation completes
  setTimeout(() => {
    toast.remove();
  }, 300);
}

// Close the toast manually
document.querySelector(".close-toast-btn").addEventListener("click", hideToast);
