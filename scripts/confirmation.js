import { fetchWithAuth } from "../common/auth.js";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const idToken = localStorage.getItem("idToken");

document
  .getElementById("bookingForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
    if (!selectedCar) {
      alert("No car selected. Please go back and select a car first.");
      return;
    }

    // Collect form data
    const color = document.getElementById("colorSelect").value;
    const fuelType = document.querySelector(
      "input[name='fuelType']:checked"
    )?.value;
    const modelYear = document.getElementById("yearSelect").value;
    const specialRequests = document.getElementById("specialRequests").value;
    const paymentMethod = document.querySelector(
      "input[name='paymentMethod']:checked"
    )?.value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const cardData =
      paymentMethod === "card"
        ? {
            cardName: document.getElementById("cardName").value,
            cardNumber: document.getElementById("cardNumber").value,
            expiry: document.getElementById("expiry").value,
            cvv: document.getElementById("cvv").value,
          }
        : null;

    // Prepare data payload
    const formData = {
      carId: selectedCar.id,
      color,
      fuelType,
      modelYear,
      specialRequests,
      paymentMethod,
      startDate,
      endDate,
      ...(cardData && {
        cardName: cardData.cardName,
        cardNumber: cardData.cardNumber,
        expiry: cardData.expiry,
        cvv: cardData.cvv,
      }),
    };

    try {
      console.log(formData);
      console.log();
      const response = await fetchWithAuth(`${backendURL}/api/cars/rent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit booking");

      alert(
        "✅ Booking and Payment Confirmed! You will receive an email shortly."
      );
      localStorage.removeItem("selectedCar");
      window.location.href = "index.html";
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Please try again.");
    }
  });
