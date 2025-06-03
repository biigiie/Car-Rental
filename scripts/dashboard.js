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

// import { fetchWithAuth } from "../common/auth.js";

// const backendURL = import.meta.env.VITE_BACKEND_URL;

const categories = ["current", "future", "past"];
// const idToken = localStorage.getItem("idToken");

async function fetchAndRenderRentals() {
  for (const type of categories) {
    try {
      const response = await fetchWithAuth(
        `${backendURL}/api/cars/rentals?type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch rentals");

      const rentals = await response.json();
      renderRentals(type, rentals);
    } catch (err) {
      console.error(`Failed to fetch ${type} rentals:`, err);
    }
  }
}

function renderRentals(type, rentals) {
  const container = document.getElementById(`${type}Rentals`);
  container.innerHTML = "";

  if (rentals.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info">No ${type} rentals found.</div>
      </div>`;
    return;
  }

  rentals.forEach((rental) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${rental.carName}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${rental.modelYear} • ${
      rental.fuelType
    }</h6>
          <p class="card-text mb-1"><strong>Color:</strong> ${rental.color}</p>
          <p class="card-text mb-1">
            <strong>From:</strong> ${new Date(
              rental.startDate
            ).toLocaleDateString()}<br>
            <strong>To:</strong> ${new Date(
              rental.endDate
            ).toLocaleDateString()}
          </p>
          
        </div>
        <div class="card-footer bg-transparent border-top-0 text-end">
          ${
            type === "current"
              ? `<button class="btn btn-warning btn-sm" onclick="returnRental('${rental.id}')">Return Car</button>`
              : type === "future"
              ? `<button class="btn btn-danger btn-sm" onclick="cancelRental('${rental.id}')">Cancel Booking</button>`
              : `<span class="badge bg-secondary">Completed</span>`
          }
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

// function renderRentals(type, rentals) {
//   const container = document.getElementById(`${type}Rentals`);
//   container.innerHTML = ""; // Clear old content

//   if (rentals.length === 0) {
//     container.innerHTML = "<p>No rentals found.</p>";
//     return;
//   }

//   rentals.forEach(rental => {
//     const rentalCard = document.createElement("div");
//     rentalCard.className = "rental-card";

//     rentalCard.innerHTML = `
//       <h3>${rental.carName}</h3>
//       <p><strong>Color:</strong> ${rental.color}</p>
//       <p><strong>Fuel:</strong> ${rental.fuelType}</p>
//       <p><strong>From:</strong> ${new Date(rental.startDate).toLocaleDateString()}</p>
//       <p><strong>To:</strong> ${new Date(rental.endDate).toLocaleDateString()}</p>
//       ${
//         type === "current"
//           ? `<button onclick="returnRental('${rental.id}')">Return Car</button>`
//           : type === "future"
//           ? `<button onclick="cancelRental('${rental.id}')">Cancel Booking</button>`
//           : ""
//       }
//     `;

//     container.appendChild(rentalCard);
//   });
// }

// Sample button handlers (to be implemented)
window.returnRental = async function (rentalId) {
  if (!confirm("Are you sure you want to return this car?")) return;

  try {
    const response = await fetchWithAuth(
      `${backendURL}/api/cars/rentals/${rentalId}/return`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to return rental");
    alert("✅ Rental returned successfully.");
    fetchAndRenderRentals(); // Refresh
  } catch (err) {
    console.error(err);
    alert("❌ Could not return rental.");
  }
};

window.cancelRental = async function (rentalId) {
  if (!confirm("Cancel this upcoming rental?")) return;

  try {
    const response = await fetchWithAuth(
      `${backendURL}/api/cars/rentals/${rentalId}/cancel`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to cancel rental");
    alert("✅ Rental cancelled.");
    fetchAndRenderRentals(); // Refresh
  } catch (err) {
    console.error(err);
    alert("❌ Could not cancel rental.");
  }
};

fetchAndRenderRentals();
