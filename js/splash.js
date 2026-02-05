// ===============================
// PASSWORD + LOGGING (NO DEVICE LOGIC HERE)
// ===============================

const PASSWORD = "0102";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("password");
  const btn = document.getElementById("unlock");

  if (!btn || !input) return;

  btn.onclick = () => {
    const attempts =
      Number(localStorage.getItem("attempts") || 0) + 1;
    localStorage.setItem("attempts", attempts);

    if (input.value === PASSWORD) {
      localStorage.setItem("openedAt", new Date().toISOString());
      window.location.href = "pages/quiz.html";
      return;
    }

    if (input.value.toLowerCase() === "admin") {
      localStorage.setItem("adminAccess", "true");
      window.location.href = "admin.html";
      return;
    }

    let wrong = JSON.parse(localStorage.getItem("wrongAnswers") || "[]");
    wrong.push(input.value);
    localStorage.setItem("wrongAnswers", JSON.stringify(wrong));

    alert("Wrong password");
  };
});
