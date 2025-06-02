const backendURL = import.meta.env.VITE_BACKEND_URL;

document.addEventListener("DOMContentLoaded", async () => {
  const suvContainer = document.getElementById("suv-list");

  try {
    const response = await fetch(
      `${backendURL}/api/cars/?category=suv&available=true`
    );
    const data = await response.json();

    const cars = data.cars;

    if (!cars.length) {
      suvContainer.innerHTML = `<p class="text-center">No SUVs available right now.</p>`;
      return;
    }

    cars.forEach((car) => {
      const card = document.createElement("div");
      card.className = "col-md-4";

      const featuresList =
        car.features?.map((f) => `<li>${f}</li>`).join("") || "";

      card.innerHTML = `
          <div class="card h-100 car-card">
            <img src="${car.image}" class="card-img-top" alt="${car.title}" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${car.title}</h5>
              <p class="card-text">${car.description}</p>
              <ul class="list-unstyled mb-3">
                <li><i class="bi bi-person-fill me-2"></i><strong>Seats:</strong> ${car.seats}</li>
                <li><i class="bi bi-droplet-fill me-2"></i><strong>Fuel Economy:</strong> ${car.fuelEconomy}</li>
                <li><i class="bi bi-gear-fill me-2"></i><strong>Transmission:</strong> ${car.transmission}</li>
              </ul>
              <p class="mb-2"><strong>Features:</strong></p>
              <ul class="mb-3">
                ${featuresList}
              </ul>
              <p class="text-success fw-bold mt-auto">$${car.price} / day</p>
              <a href="confirmation.html" class="btn btn-primary btn-rent mt-2">Rent Now</a>
            </div>
          </div>
        `;

      suvContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading SUVs:", err);
    suvContainer.innerHTML = `<p class="text-danger text-center">Failed to load SUVs.</p>`;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const luxuryContainer = document.getElementById("luxury-list");

  try {
    const response = await fetch(
      `${backendURL}/api/cars/?category=luxury&available=true`
    );
    const data = await response.json();

    const cars = data.cars;

    if (!cars.length) {
      luxuryContainer.innerHTML = `<p class="text-center">No Luxury Cars available right now.</p>`;
      return;
    }

    cars.forEach((car) => {
      const card = document.createElement("div");
      card.className = "col-md-4";

      const featuresList =
        car.features?.map((f) => `<li>${f}</li>`).join("") || "";

      card.innerHTML = `
          <div class="card h-100 car-card">
            <img src="${car.image}" class="card-img-top" alt="${car.title}" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${car.title}</h5>
              <p class="card-text">${car.description}</p>
              <ul class="list-unstyled mb-3">
                <li><i class="bi bi-person-fill me-2"></i><strong>Seats:</strong> ${car.seats}</li>
                <li><i class="bi bi-droplet-fill me-2"></i><strong>Fuel Economy:</strong> ${car.fuelEconomy}</li>
                <li><i class="bi bi-gear-fill me-2"></i><strong>Transmission:</strong> ${car.transmission}</li>
              </ul>
              <p class="mb-2"><strong>Features:</strong></p>
              <ul class="mb-3">
                ${featuresList}
              </ul>
              <p class="text-success fw-bold mt-auto">$${car.price} / day</p>
              <a href="confirmation.html" class="btn btn-primary btn-rent mt-2">Rent Now</a>
            </div>
          </div>
        `;

      luxuryContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading SUVs:", err);
    luxuryContainer.innerHTML = `<p class="text-danger text-center">Failed to load SUVs.</p>`;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const economyContainer = document.getElementById("economy-list");

  try {
    const response = await fetch(
      `${backendURL}/api/cars/?category=economy&available=true`
    );
    const data = await response.json();

    const cars = data.cars;

    if (!cars.length) {
      economyContainer.innerHTML = `<p class="text-center">No Economy Cars available right now.</p>`;
      return;
    }

    cars.forEach((car) => {
      const card = document.createElement("div");
      card.className = "col-md-4";

      const featuresList =
        car.features?.map((f) => `<li>${f}</li>`).join("") || "";

      card.innerHTML = `
          <div class="card h-100 car-card">
            <img src="${car.image}" class="card-img-top" alt="${car.title}" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${car.title}</h5>
              <p class="card-text">${car.description}</p>
              <ul class="list-unstyled mb-3">
                <li><i class="bi bi-person-fill me-2"></i><strong>Seats:</strong> ${car.seats}</li>
                <li><i class="bi bi-droplet-fill me-2"></i><strong>Fuel Economy:</strong> ${car.fuelEconomy}</li>
                <li><i class="bi bi-gear-fill me-2"></i><strong>Transmission:</strong> ${car.transmission}</li>
              </ul>
              <p class="mb-2"><strong>Features:</strong></p>
              <ul class="mb-3">
                ${featuresList}
              </ul>
              <p class="text-success fw-bold mt-auto">$${car.price} / day</p>
              <a href="confirmation.html" class="btn btn-primary btn-rent mt-2">Rent Now</a>
            </div>
          </div>
        `;

      economyContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading SUVs:", err);
    economyContainer.innerHTML = `<p class="text-danger text-center">Failed to load SUVs.</p>`;
  }
});
