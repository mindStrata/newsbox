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

      alert(data.message || "Login successful!");
      window.location.href = "/home";
    } catch (error) {
      // console.error("Login Error:", error.message);
      alert(`Error: ${error.message}`);
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
