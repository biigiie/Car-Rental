// This script handles the registration form submission
// and sends the data to the server for processing.
// It uses the Fetch API to send a POST request with the form data

const backendURL = import.meta.env.VITE_BACKEND_URL;

document
  .getElementById("register-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${backendURL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      console.log(data);

      localStorage.setItem("idToken", data.idToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("localId", data.localId);
      localStorage.setItem("tokenExpiresIn", data.expiresIn);

      // Handle successful registration (e.g., redirect or show success message)
      alert("Registration successful!");
      window.location.href = "dashboard.html"; // change this to your desired location
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  });
