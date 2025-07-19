document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  const users = [
    { email: "student1@school.com", password: "1234", role: "student" },
    { email: "student2@school.com", password: "5678", role: "student" },
    { email: "instructor1@school.com", password: "admin123", role: "instructor" },
  ];

  const matchedUser = users.find(
    (user) => user.email === email && user.password === password && user.role === role
  );

  if (matchedUser) {
    if (role === "student") {
      window.location.href = "index.html";
    } else if (role === "instructor") {
      window.location.href = "return.html";
    }
  } else {
    document.getElementById("error").innerText = "Incorrect email, password, or role.";
  }
});
