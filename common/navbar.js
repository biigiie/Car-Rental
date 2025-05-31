// common/navbar.js
function isLoggedIn() {
  return !!localStorage.getItem("idToken");
}

function updateNavbar() {
  const isUserLoggedIn = isLoggedIn();
  console.log("User logged in:", isUserLoggedIn);

  // Guest elements
  const login = document.getElementById("nav-login");
  const register = document.getElementById("nav-register");

  // Auth elements
  const dashboard = document.getElementById("nav-dashboard");
  const logoutBtn = document.getElementById("nav-logout");

  if (isUserLoggedIn) {
    login.classList.add("d-none");
    register.classList.add("d-none");

    dashboard.classList.remove("d-none");
    logoutBtn.classList.remove("d-none");
  } else {
    login.classList.remove("d-none");
    register.classList.remove("d-none");

    dashboard.classList.add("d-none");
    logoutBtn.classList.add("d-none");
  }
}

function logout() {
  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("localId");
  localStorage.removeItem("tokenExpiresIn");

  alert("Logged out successfully!");
  window.location.href = "/index.html";
}

document.addEventListener("DOMContentLoaded", updateNavbar);
