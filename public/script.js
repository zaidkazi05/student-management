const form = document.querySelector("#contactForm");
const statusText = document.querySelector("#formStatus");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusText.textContent = "Saving...";
  statusText.className = "status";

  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Submission failed.");
    }

    form.reset();
    statusText.textContent = result.message;
    statusText.className = "status success";
  } catch (error) {
    statusText.textContent = error.message;
    statusText.className = "status error";
  }
});
