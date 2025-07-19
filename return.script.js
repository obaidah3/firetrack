import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjfH9vsh9jXwRoFz2Y3X4bWcYfCt9eG9Y",
  authDomain: "attendance-system-72015.firebaseapp.com",
  databaseURL: "https://attendance-system-72015-default-rtdb.firebaseio.com",
  projectId: "attendance-system-72015",
  storageBucket: "attendance-system-72015.appspot.com",
  messagingSenderId: "460205983648",
  appId: "1:460205983648:web:bda960ab79a0bfa38de4a1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const studentsRef = ref(db, 'students');
let currentData = {};
const tableBody = document.querySelector("#attendanceTable tbody");

onValue(studentsRef, (snapshot) => {
  currentData = snapshot.val() || {};
  renderTable();
});

// ✅ Validation Functions
function isValidID(id) {
  return /^\d+$/.test(id); // Digits only
}

function isValidName(name) {
  return /^[a-zA-Z\u0600-\u06FF\s]+$/.test(name); // Arabic/English letters only
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Valid email format
}

window.renderTable = function () {
  const officialHour = parseInt(document.getElementById('hourInput').value);
  const officialMinute = parseInt(document.getElementById('minuteInput').value);
  tableBody.innerHTML = '';

  for (const id in currentData) {
    const student = currentData[id];
    const name = student.name || "N/A";
    const studentId = student.studentId || id;
    const email = student.email || "";

    // ✅ Validate fields before rendering
    if (!isValidID(studentId) || !isValidName(name) || !isValidEmail(email)) {
      console.warn(`⚠️ Skipped invalid entry: ${studentId} - ${name}`);
      continue; // skip invalid row
    }

    const timestamp = student.timestamp || null;
    let dateStr = "N/A";
    let status = "N/A";
    let className = "";

    if (timestamp) {
      const date = new Date(timestamp);
      dateStr = date.toLocaleString();
      const hour = date.getHours();
      const minute = date.getMinutes();

      if (hour > officialHour || (hour === officialHour && minute > officialMinute)) {
        status = "Late";
        className = "late";
      } else {
        status = "In Time";
        className = "ontime";
      }
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${studentId}</td>
      <td>${name}</td>
      <td>${dateStr}</td>
      <td class="${className}">${status}</td>
    `;
    tableBody.appendChild(row);
  }
};

window.downloadExcel = function () {
  const table = document.getElementById("attendanceTable");
  const wb = XLSX.utils.table_to_book(table, { sheet: "Attendance" });
  XLSX.writeFile(wb, "AttendanceData.xlsx");
};
