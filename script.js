const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

menuBtn?.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

const dateInput = document.querySelector('input[name="travelDate"]');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

bookingForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  formMessage.textContent = "Submitting booking...";
  formMessage.style.color = "#555";

  const data = Object.fromEntries(new FormData(bookingForm).entries());

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Booking failed");

    formMessage.textContent = `${result.message} Booking ID: ${result.bookingId}`;
    formMessage.style.color = "green";
    bookingForm.reset();
    dateInput.min = new Date().toISOString().split("T")[0];
  } catch (error) {
    formMessage.textContent = error.message || "Something went wrong.";
    formMessage.style.color = "crimson";
  }
});
