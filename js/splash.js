// ===============================
// DEVICE CHECK (FIXED – NO FALSE BLOCK)
// ===============================

function isRealMobile() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;

  const isMobileOS =
    /android|iphone|ipad|ipod|windows phone/i.test(ua);

  const isCoarsePointer =
    window.matchMedia("(pointer: coarse)").matches;

  const isSmallScreen =
    Math.min(screen.width, screen.height) < 768;

  return isMobileOS && isCoarsePointer && isSmallScreen;
}

// ===============================
// ADMIN OVERRIDE
// ===============================
const isAdmin =
  location.search.includes("admin") ||
  localStorage.getItem("adminAccess") === "true";

// ===============================
// APPLY GATE
// ===============================
if (!isAdmin && isRealMobile()) {
  document.body.innerHTML = `
    <div style="
      background:black;
      color:#8B0000;
      height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:22px;
      text-align:center;
      font-family:-apple-system;">
      Laptop experience only ❤️
    </div>
  `;
}

// ===============================
// PASSWORD LOGIC (UNCHANGED)
// ===============================

const PASSWORD = "0102";
const input = document.getElementById("password");
const btn = document.getElementById("unlock");

if (btn) {
  btn.onclick = () => {
    const attempts =
      Number(localStorage.getItem("attempts") || 0) + 1;
    localStorage.setItem("attempts", attempts);

    if (input.value === PASSWORD) {
      localStorage.setItem("openedAt", new Date().toISOString());
      window.location.href = "pages/quiz.html";
    } else if (input.value.toLowerCase() === "admin") {
      localStorage.setItem("adminAccess", "true");
      window.location.href = "admin.html";
    } else {
      localStorage.setItem("wrongAnswers", input.value);
      alert("Wrong password");
    }
  };
}
