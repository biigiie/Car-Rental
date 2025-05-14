const form = document.getElementById("carForm");
const backendURL = import.meta.env.VITE_BACKEND_URL;

console.log("backend url", backendURL);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const imageFile = form.image.files[0];
    if (!imageFile || !imageFile.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    // Step 1: Upload the image file
    const formData = new FormData();
    formData.append("image", imageFile);

    const uploadRes = await fetch(`${backendURL}/api/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!uploadRes.ok) {
      const errorData = await uploadRes.json();
      throw new Error(errorData.error || "Image upload failed");
    }

    const uploadData = await uploadRes.json();
    const imageUrl = uploadData.url;

    // Step 2: Validate & prepare car data
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const seats = parseInt(form.seats.value, 10);
    const fuelEconomy = form.fuelEconomy.value.trim();
    const price = parseFloat(form.price.value);
    const transmission = form.transmission.value.trim();
    const features = form.features.value
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);
    const viewUrl = form.viewUrl.value.trim();
    const category = form.category.value;

    if (
      !title ||
      !description ||
      isNaN(seats) ||
      !fuelEconomy ||
      isNaN(price) ||
      !transmission ||
      features.length === 0 ||
      !viewUrl ||
      !category
    ) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    const carData = {
      image: imageUrl,
      title,
      description,
      seats,
      fuelEconomy,
      price,
      transmission,
      features,
      viewUrl,
      category,
    };

    console.log("saving car data", carData);

    const saveRes = await fetch(`${backendURL}/api/cars/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carData),
    });

    if (!saveRes.ok) {
      const errorData = await saveRes.json();
      throw new Error(errorData.error || "Failed to save car data");
    }

    alert("Car saved successfully!");
    form.reset();
  } catch (error) {
    console.error("Form submission error:", error);
    alert("An error occurred: " + error.message);
  }
});
