// Import Firebase SDK v9
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBTUoAPcUMua3h36ITXPxpxlYFunYVV4p8",
  authDomain: "attendance-system-72015.firebaseapp.com",
  databaseURL: "https://attendance-system-72015-default-rtdb.firebaseio.com",
  projectId: "attendance-system-72015",
  storageBucket: "attendance-system-72015.appspot.com",
  messagingSenderId: "1022549698776",
  appId: "1:1022549698776:web:e62b81cba2e09dd99e8fad"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Form handler
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const messageElement = document.getElementById("message");

  // Regex checks
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const idRegex = /^[0-9]+$/;

  // Validation
  if (!name || !email || !studentId) {
    messageElement.innerText = "❌ Please fill in all fields.";
    return;
  }

  if (!nameRegex.test(name)) {
    messageElement.innerText = "❌ Name must contain only letters.";
    return;
  }

  if (!emailRegex.test(email)) {
    messageElement.innerText = "❌ Please enter a valid email address.";
    return;
  }

  if (!idRegex.test(studentId)) {
    messageElement.innerText = "❌ Student ID must contain numbers only.";
    return;
  }

  // Save to Firebase
  try {
    await set(ref(database, "students/" + studentId), {
      name,
      email,
      studentId,
      timestamp: new Date().toISOString()
    });

    messageElement.innerText = "✅ User registered successfully!";
    document.getElementById("registerForm").reset();
  } catch (error) {
    console.error(error);
    messageElement.innerText = "❌ Error: " + error.message;
  }
});
