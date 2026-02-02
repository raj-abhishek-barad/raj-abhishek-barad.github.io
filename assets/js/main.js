(function () {
  // Last update in footer (client-side)
  const el = document.getElementById("lastUpdate");
  if (el) {
    const d = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    el.textContent = `${months[d.getMonth()]} ${String(d.getDate()).padStart(2,'0')}, ${d.getFullYear()}`;
  }

  // Active nav link on scroll
  const navLinks = Array.from(document.querySelectorAll(".nav a"));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const obs = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(a => a.classList.remove("active"));
    const id = "#" + visible.target.id;
    const active = navLinks.find(a => a.getAttribute("href") === id);
    if (active) active.classList.add("active");
  }, { threshold: [0.25, 0.4, 0.55, 0.7] });

  sections.forEach(s => obs.observe(s));

  // Gallery carousel
  const car = document.querySelector("[data-carousel]");
  if (car) {
    const items = Array.from(car.querySelectorAll(".car-item"));
    const prev = car.querySelector("[data-prev]");
    const next = car.querySelector("[data-next]");
    let i = items.findIndex(x => x.classList.contains("is-active"));
    if (i < 0) i = 0;

    function show(k) {
      items.forEach(x => x.classList.remove("is-active"));
      items[k].classList.add("is-active");
    }

    prev?.addEventListener("click", () => {
      i = (i - 1 + items.length) % items.length;
      show(i);
    });
    next?.addEventListener("click", () => {
      i = (i + 1) % items.length;
      show(i);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prev?.click();
      if (e.key === "ArrowRight") next?.click();
    });
  }

  // BibTeX modal
  const modal = document.getElementById("bibtexModal");
  const pre = document.getElementById("bibtexText");

  function openModal(text) {
    if (!modal || !pre) return;
    pre.textContent = text.trim();
    modal.showModal();
  }
  function closeModal() { modal?.close(); }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a.bibtex");
    if (a) {
      e.preventDefault();
      const bib = a.getAttribute("data-bib") || "";
      openModal(bib);
      return;
    }
    if (e.target.matches("[data-close]")) closeModal();
    if (e.target.matches("[data-copy]")) {
      const t = pre?.textContent || "";
      navigator.clipboard?.writeText(t);
    }
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
})();
