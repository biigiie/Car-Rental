import { fetchWithAuth } from "../common/auth";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"; // fallback for plain HTML
const idToken = localStorage.getItem("idToken");

console.log(backendURL);
async function fetchProfile() {
  if (!idToken) {
    alert("You are not logged in!");
    window.location.href = "/pages/login.html";
    return;
  }

  try {
    const response = await fetchWithAuth(`${backendURL}/api/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    console.log("Response:", response);
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();

    // Update DOM
    document.getElementById("user-name").textContent = data.name || "N/A";
    document.getElementById("profile-name").textContent = data.name || "N/A";
    document.getElementById("profile-email").textContent = data.email || "N/A";
  } catch (error) {
    console.error("Error fetching profile:", error);
    alert("Error loading profile data.");
  }
}

document.addEventListener("DOMContentLoaded", fetchProfile);
