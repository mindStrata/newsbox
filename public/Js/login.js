document
  .getElementById("form_login")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple validation
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Login successful!");
        window.location.href = "/home"; // Redirect to dashboard
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  });
