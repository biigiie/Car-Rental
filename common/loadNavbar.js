// common/loadNavbar.js
function loadNavbar(
  selector = "#navbar-placeholder",
  file = "/shared/navbar.html"
) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load navbar");
      return response.text();
    })
    .then((html) => {
      document.querySelector(selector).innerHTML = html;
      console.log("Navbar loaded successfully");

      // Call updateNavbar only after navbar HTML is in DOM
      updateNavbar();
    })
    .catch((err) => console.error("Navbar error:", err));
}

function isLoggedIn() {
  return !!localStorage.getItem("idToken");
}

function updateNavbar() {
  const isUserLoggedIn = isLoggedIn();
  const currentPath = window.location.pathname;
  console.log("User logged in:", isUserLoggedIn);

  // Guest elements
  const login = document.getElementById("nav-login");
  const register = document.getElementById("nav-register");

  // Auth elements
  const dashboard = document.getElementById("nav-dashboard");
  const logoutBtn = document.getElementById("nav-logout");

  if (isUserLoggedIn) {
    login?.classList.add("d-none");
    register?.classList.add("d-none");
    dashboard?.classList.remove("d-none");
    logoutBtn?.classList.remove("d-none");
  } else {
    login?.classList.remove("d-none");
    register?.classList.remove("d-none");
    dashboard?.classList.add("d-none");
    logoutBtn?.classList.add("d-none");
  }

  // Attach logout handler
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  // Handle "active" class
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function logout() {
  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("localId");
  localStorage.removeItem("tokenExpiresIn");

  alert("Logged out successfully!");
  window.location.href = "/index.html";
}

// Run on load
document.addEventListener("DOMContentLoaded", () => {
  loadNavbar(); // Automatically loads and updates the navbar
});
