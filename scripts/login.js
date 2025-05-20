// This script handles the login form submission
// and sends the data to the server for processing.
// It uses the Fetch API to send a POST request with the form data

const backendURL = import.meta.env.VITE_BACKEND_URL;

document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${backendURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save tokens to localStorage
      localStorage.setItem("idToken", data.idToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("localId", data.localId);
      localStorage.setItem("tokenExpiresIn", data.expiresIn);

      alert("Login successful!");
      window.location.href = "dashboard.html"; // redirect after login
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  });
