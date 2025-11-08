const API_URL = "http://localhost:5000/api/users";
const token = localStorage.getItem("token");

if (!token) {
  alert("You must be logged in to view your profile.");
  window.location.href = "login.html";
}

const loadProfile = async () => {
  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      document.getElementById("name").textContent = data.name;
      document.getElementById("email").textContent = data.email;
      document.getElementById("adminStatus").textContent = data.isAdmin ? "Yes" : "No";
    } else {
      alert(data.message || "Failed to load profile");
      window.location.href = "login.html";
    }
  } catch (err) {
    console.error(err);
    alert("Error loading profile");
  }
};

loadProfile();

// Logout function
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "login.html";
  });
}
