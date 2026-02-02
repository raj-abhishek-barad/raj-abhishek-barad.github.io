(function () {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Theme toggle (persisted)
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  if (saved === "dark") root.setAttribute("data-theme", "dark");

  function toggleTheme() {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }
  if (btn) btn.addEventListener("click", toggleTheme);

  // Active nav link on scroll
  const navLinks = Array.from(document.querySelectorAll(".nav a"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      navLinks.forEach((a) => a.classList.remove("active"));
      const id = "#" + visible.target.id;
      const active = navLinks.find((a) => a.getAttribute("href") === id);
      if (active) active.classList.add("active");
    },
    { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
  );
  sections.forEach((s) => obs.observe(s));

  // Services slider
  const track = document.getElementById("sliderTrack");
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");
  if (track && prev && next) {
    const slides = Array.from(track.children);
    let i = 0;

    function render() {
      track.style.transform = `translateX(${-100 * i}%)`;
    }

    prev.addEventListener("click", () => {
      i = (i - 1 + slides.length) % slides.length;
      render();
    });
    next.addEventListener("click", () => {
      i = (i + 1) % slides.length;
      render();
    });

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prev.click();
      if (e.key === "ArrowRight") next.click();
    });
  }
})();
