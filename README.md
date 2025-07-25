# 📅 Firebase Attendance System

A real-time attendance tracking web app using **Firebase Realtime Database**, allowing students to register attendance and instructors to monitor it dynamically — with built-in validation, late detection logic, and Excel export.

![Made with Firebase](https://img.shields.io/badge/Made%20with-Firebase-FFCA28?logo=firebase)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

---
⚠️ Disclaimer: This project is for educational purposes only. The exposed API key has been revoked and does not pose any security threat.
---
---
## 🚀 Features

- ✅ **Real-time attendance sync** with Firebase.
- 📥 **Student registration** with auto timestamp.
- 🔍 **Input validation** for name, ID, and email.
- ⏰ **Late arrival detection** based on configurable cutoff time.
- 📊 **Instructor dashboard** with live updates.
- 📤 **Downloadable Excel report** using SheetJS.
- 👨‍🏫 **Role-based login simulation** (Student / Instructor).

---

## 🧭 How It Works – Full Workflow

### 🔐 Login Page
- Users land on `login.html`.
- They must enter their **Email** and **Password**.
- The system verifies credentials from a predefined list (stored in JavaScript).

---

### 👥 Role-Based Routing
After login:
- 👨‍🎓 **Students** are redirected to `register.html` to mark their attendance.
- 👨‍🏫 **Instructors** are redirected to `return.html` to view the dashboard.

---

### 📝 Student Attendance Submission
On the `register.html` page:
- Students fill in:
  - Name
  - Student ID
  - Email
- Upon form submission:
  - ✅ Inputs are validated using **Regular Expressions (Regex)**.
  - 📤 Data is sent to **Firebase Realtime Database** with a timestamp.

---

### ☁️ Cloud Database Sync
- Attendance data is instantly stored in Firebase.
- Data becomes **immediately available** to instructors via their dashboard.

---

### 📊 Instructor Dashboard (`return.html`)
Instructors can:
- 🔍 View a live-updating table of student entries.
- 🟡 Filter **late arrivals** based on submission timestamp.
- 🔴 Identify **absent students** who didn’t register before the cutoff time.
- 📥 Export attendance reports to **Excel (using SheetJS)**.

---

## 🔁 Summary Diagram (Flowchart)

```mermaid
graph TD
    A[User Opens login.html] --> B[Enter Email & Password]
    B --> C{Role Check}
    C -- Student --> D[Redirect to register.html]
    C -- Instructor --> E[Redirect to return.html]

    D --> F[Submit Attendance Form]
    F --> G[Data Stored in Firebase Realtime DB]

    G --> E
    E --> H[Live Dashboard with Filters + Excel Export]
```
---


## 📂 Project Structure

```plaintext
📁 FirebaseAttendanceSystem
├── index.html            # Instructor dashboard (read-only view)
├── login.html            # Login page for students/instructors
├── login.script.js       # JavaScript for login page
├── login.style.css       # CSS for login page
├── return.html           # Instructor redirect after login
├── return.script.js      # JavaScript for return page
├── return.style.css      # CSS for return page
├── script.js             # Main dashboard logic (data rendering)
├── style.css             # Global UI styling or main style file
├── login sample.xlsx     # Sample data file (likely for demo/import)
├── LICENSE               # License info
├── README.md             # Project description and usage
````

---

## 🧠 Tech Stack

| Category     | Technology                                   |
| ------------ | -------------------------------------------- |
| Frontend     | HTML5, CSS3, Vanilla JavaScript              |
| Backend (DB) | Firebase Realtime Database                   |
| Auth         | Simulated with JavaScript (no Firebase Auth) |
| Export       | SheetJS (XLSX library)                       |

---

## ⚙️ Firebase Setup

To use this project with your own Firebase project:

1. Go to [Firebase Console](https://console.firebase.google.com/), create a new project.
2. Enable **Realtime Database** and set rules like:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

> ⚠️ **Security Warning:** For production, replace these rules with proper authentication-based ones.

3. Copy your project’s Firebase config from Project Settings → Web App.
4. Replace the `firebaseConfig` objects in:

   * `script.js`
   * `register.js`

---

## 🖥️ How to Run Locally

### 🔹 Option 1: VS Code + Live Server

```bash
# Install Live Server extension
# Right-click register.html → "Open with Live Server"
```

### 🔹 Option 2: Manual Open

Simply double-click `register.html` or `index.html` in your browser.

---

## 📸 Screenshots
<img width="1919" height="892" alt="Image" src="https://github.com/user-attachments/assets/8f915c85-493c-4415-b699-ea66813da423" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/670de9bb-c24f-4435-990a-17041f01f69e" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/af26af8c-4905-474e-8bc3-e8b996ebb1c8" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/fa996cbe-c66b-4e9a-8811-97e35fd8ed65" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/b385fd07-723d-42f5-8c31-2c4ee9e9eb82" />

<img width="1919" height="895" alt="Image" src="https://github.com/user-attachments/assets/ac072d6b-e945-4923-a650-3fcd3d37afe8" />

<img width="1065" height="552" alt="Image" src="https://github.com/user-attachments/assets/4ae46d22-6176-4ea7-9e8c-dc491d2dea5c" />

<img width="1916" height="756" alt="Image" src="https://github.com/user-attachments/assets/2a071084-8df9-4aa7-a672-ffee011fb96c" />



---

## 📤 Excel Export

In `index.html`, instructors can click a button to **download an Excel sheet** of current attendance using:

```js
XLSX.utils.table_to_book(table, { sheet: "Attendance" });
XLSX.writeFile(workbook, "AttendanceData.xlsx");
```

---

## 🔐 Login Simulation 

```js
const users = [
  { email: "student1@example.com", password: "1234", role: "student" },
  { email: "student2@example.com", password: "abcd", role: "student" },
  { email: "instructor1@example.com", password: "admin1", role: "instructor" },
  { email: "instructor2@example.com", password: "admin2", role: "instructor" }
];

if (role === "instructor") window.location.href = "return.html";
```

> You can easily extend this to Firebase Authentication.

---

## ✅ Validation Logic

Each field is validated before data submission:

| Field | Validation Regex               |
| ----- | ------------------------------ |
| ID    | `/^\d+$/`                      |
| Name  | `/^[a-zA-Z\u0600-\u06FF\s]+$/` |
| Email | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |

---

## 📦 Example Firebase Entry

```json
"students": {
  "2025001": {
    "name": "Obaidah Essam",
    "email": "obaidah@example.com",
    "studentId": "2025001",
    "timestamp": "2025-07-18T09:15:32.123Z"
  }
}
```

---

## 📌 To-Do / Improvements

* [ ] Firebase Authentication integration
* [ ] Admin panel to edit/delete attendance records
* [ ] Store role-based user data in Firebase
* [ ] Improve security rules on database

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Free to use, modify, and distribute with attribution.

---

## ✨ Developed by

**Obaidah Essam**
🔧 Automotive Embedded Systems | IoT for Smart Vehicles | Cloud-Connected Mobility
🚗 Passionate about tech-driven intelligent transportation solutions.

---

## ⭐ Support & Contributions

Feel free to fork, star, and contribute!
Pull requests and suggestions are welcome 🙌
