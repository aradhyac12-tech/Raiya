// ===============================
// AUTHORITATIVE DEVICE CHECK
// ===============================

(function () {
  function isMobileDevice() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    // HARD mobile OS check (phones & tablets only)
    const mobileOS =
      /android|iphone|ipad|ipod|windows phone/i.test(ua);

    // Screen size check (phones only)
    const smallScreen =
      Math.min(screen.width, screen.height) < 768;

    // Touch-only devices
    const coarsePointer =
      window.matchMedia("(pointer: coarse)").matches;

    // FINAL DECISION
    return mobileOS && smallScreen && coarsePointer;
  }

  // ADMIN OVERRIDE
  const isAdmin =
    location.search.includes("admin") ||
    localStorage.getItem("adminAccess") === "true";

  if (!isAdmin && isMobileDevice()) {
    document.documentElement.innerHTML = `
      <head>
        <title>Restricted</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="
        margin:0;
        background:black;
        color:#8B0000;
        display:flex;
        align-items:center;
        justify-content:center;
        height:100vh;
        font-size:22px;
        font-family:-apple-system;
        text-align:center;">
        Laptop experience only ❤️
      </body>
    `;
    throw new Error("Mobile blocked");
  }
})();
