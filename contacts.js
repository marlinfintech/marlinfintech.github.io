document.addEventListener("DOMContentLoaded", () =

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const status = document.createElement("div");

  status.style.margin = "1rem auto";
  status.style.fontWeight = "bold";
  status.style.color = "#1874CD";
  status.style.textAlign = "center";

  form.appendChild(status);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Sending…";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        status.textContent = "✅ Request sent successfully!";
        form.reset();
      } else {
        const data = await response.json();
        status.textContent =
          data.errors?.map(e => e.message).join(", ") ||
          "❌ Something went wrong. Please try again.";
      }
    } catch (error) {
      status.textContent = "❌ Network error. Please check your connection.";
    }
  });
});
