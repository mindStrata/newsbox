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
  const spinner = document.getElementById("spinner");

  if (inputValue) {
    // Display the spinner
    spinner.style.display = "flex";

    fetch(`/new-news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: inputValue }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((err) => {
            // console.error("Server Error Response:", err);
            const errorMessage =
              err.error?.message || err.error || "Unknown server error";
            throw new Error(errorMessage);
          });
        }
      })
      .then((response) => {
        // alert(response.message);
        // alert(response.description);
        showToast(response.message, response.description, response.success);
        refreshNews();
        closeModal();
        inputElement.value = "";
      })
      .catch((error) => {
        // console.error("Client-Side Error:", error.message); // Log the actual error message
        // alert(`Error: ${error.message}`); // Show the error message to the user
        showToast("Error occured", error.message, error.success);
        closeModal();
        inputElement.value = "";
      })
      .finally(() => {
        spinner.style.display = "none";
      });
  } else {
    // alert("Please enter something.");
    showToast("Error occured", "Please enter valid url", false);
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

async function logoutUser() {
  try {
    const response = await fetch("/logout", {
      method: "POST",
    });

    if (response.ok) {
      // alert("You have been logged out successfully.");
      showToast(
        "Logout Successfull",
        "You have been logged out successfully",
        true
      );

      const modal = document.getElementById("modal");
      if (modal) modal.style.display = "none";

      // Redirect to login page
      window.location.href = "/login";
    } else {
      const errorData = await response.json();
      // alert(errorData.message || "Failed to log out. Please try again.");
      showToast("Error occured", errorData.message, false);
    }
  } catch (error) {
    // console.error("Error during logout:", error);
    // alert("An error occurred while logging out. Please try again.");
    showToast(
      "Error occured",
      "An error occurred while logging out. Please try again.",
      false
    );
  }
}

async function refreshNews() {
  try {
    // Fetch the latest news items
    const response = await fetch("/api/news");
    const data = await response.json();

    if (data.success) {
      const newsItems = data.newsItem;

      // Get the container to update
      const cardSection = document.querySelector(".card-section");

      // Clear existing content
      cardSection.innerHTML = "";

      // Populate the new content dynamically
      if (newsItems.length === 0) {
        cardSection.innerHTML = `<h3>You do not have any bookmarked news articles, <%= user %>.</h3>`;
      } else {
        newsItems.forEach((article) => {
          const articleHTML = `
        <a
          href="${article.link}"
          target="_blank"
          style="text-decoration: none; color: inherit"
        >
          <div class="card container">
            <div class="card-image-container">
              <img
                src="${article.image}"
                alt="News Image"
                class="card-image"
              />
              <div class="card-source-overlay">
                ${article.source || article.siteName || "Unknown"}
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">${article.title}</h3>
              <p class="card-description">
                ${
                  article.description.length > 200
                    ? article.description.slice(0, 200) + "..."
                    : article.description
                }
              </p>
            </div>
          </div>
        </a>`;
          cardSection.insertAdjacentHTML("beforeend", articleHTML);
        });
      }
    }
  } catch (error) {
    // console.error("Error refreshing news:", error);
  }
}

////////////////////////////////////////////////////////
/* Show and hide toast */
////////////////////////////////////////////////////////

const toast = document.querySelector(".toast-container");
const toastHeading = document.getElementById("toast-heading");
const toastParagraph = document.getElementById("toast-paragraph");

// Show the toast
function showToast(heading = "Error Occured", paragraph = "", success) {
  // console.log(success);
  if (success && success === true) {
    toast.classList.add("toast-success");
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
  toastParagraph.textContent = paragraph + "added";

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
