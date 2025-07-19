// login.script.js

// بيانات المستخدمين (ثابتة للتجربة)
const users = [
  { email: "student1@example.com", password: "1234", role: "student" },
  { email: "student2@example.com", password: "abcd", role: "student" },
  { email: "instructor1@example.com", password: "admin1", role: "instructor" },
  { email: "instructor2@example.com", password: "admin2", role: "instructor" },
];

// عناصر من الـ DOM
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

// إضافة مستمع لحدث إرسال النموذج
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const role = document.querySelector('input[name="role"]:checked')?.value;

  // التحقق من ملء جميع الحقول
  if (!email || !password || !role) {
    showError("⚠️ Please fill in all fields.");
    return;
  }

  // البحث عن المستخدم بالبريد فقط
  const userByEmail = users.find(u => u.email === email);

  if (!userByEmail) {
    showError("❌ Email not found. Please check your email address.");
    return;
  }

  // تحقق من كلمة السر
  if (userByEmail.password !== password) {
    showError("❌ Incorrect password. Please try again.");
    return;
  }

  // تحقق من الدور
  if (userByEmail.role !== role) {
    showError(`❌ Incorrect role selected. This email is registered as a "${userByEmail.role}".`);
    return;
  }

  // ✅ تسجيل دخول ناجح
  showSuccess(`✅ Login successful as ${role}!`);

  // التوجيه حسب الدور
  if (role === 'student') {
    window.location.href = 'index.html';
  } else if (role === 'instructor') {
    window.location.href = 'return.html';
  }
});

// دالة لعرض رسالة الخطأ
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  errorMessage.style.color = "red";
}

// دالة لعرض رسالة النجاح
function showSuccess(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  errorMessage.style.color = "green";
}
