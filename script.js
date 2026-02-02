/* Main JS: nav behavior + data-driven sections (publications, services) */

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const open = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu on click
    navList.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.tagName === "A") {
        navList.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active-section highlighting (IntersectionObserver)
  const navLinks = Array.from(document.querySelectorAll(".nav-list a[href^='#']"));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const obs = new IntersectionObserver((entries) => {
      // pick most visible in viewport
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const id = "#" + visible.target.id;
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
    }, { root: null, rootMargin: "-30% 0px -60% 0px", threshold: [0.05, 0.15, 0.35, 0.6] });

    sections.forEach(s => obs.observe(s));
  }

  // -----------------------------
  // Publications (edit here)
  // -----------------------------
  const publications = [
    {
      title: "Hybrid Closed‑Form and Time‑Optimized Guidance for Autonomous Planetary Soft Landing",
      authors: "A. Barad, S. Ghosh",
      venue: "Manuscript in preparation (2026)",
      links: [
        { label: "PDF", href: "#" },
        { label: "BibTeX", href: "#" }
      ],
      tags: ["Powered descent", "Free final time", "Constraints"]
    },
    {
      title: "Fuel‑Optimal Terrain‑Avoided Powered Descent with Online Replanning",
      authors: "A. Barad",
      venue: "Work in progress",
      links: [
        { label: "Code", href: "https://github.com/raj-abhishek-barad" }
      ],
      tags: ["MPC", "Barrier surfaces", "Simulation"]
    }
  ];

  const pubGrid = document.getElementById("pubGrid");
  if (pubGrid) {
    pubGrid.innerHTML = publications.map(p => `
      <article class="card">
        <h3>${escapeHtml(p.title)}</h3>
        <p class="kicker">${escapeHtml(p.authors)}</p>
        <p>${escapeHtml(p.venue)}</p>
        <div class="tags">
          ${(p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
        </div>
        <div class="actions">
          ${(p.links || []).map(l => `<a href="${escapeAttr(l.href)}" target="_blank" rel="noreferrer">${escapeHtml(l.label)}</a>`).join("")}
        </div>
      </article>
    `).join("");
  }

  // -----------------------------
  // Services carousel (edit here)
  // -----------------------------
  const services = [
    {
      title: "Autonomous Guidance & Navigation",
      kicker: "Trajectory design • obstacle avoidance",
      text: "Fuel‑efficient descent guidance, adaptive control concepts, and constraint‑aware design for safety‑critical flight."
    },
    {
      title: "Optimal Control & Real‑Time Flight Software",
      kicker: "MPC • replanning • constraints",
      text: "Receding/decreasing‑horizon strategies, numerical solvers, and implementation patterns for real‑time autonomy."
    },
    {
      title: "Aerospace Simulation & Validation",
      kicker: "Monte‑Carlo • uncertainty • propulsion",
      text: "High‑fidelity simulation setups with terrain, propulsion dynamics, and navigation/estimation uncertainty."
    },
    {
      title: "Technical Training & Mentorship",
      kicker: "Flight dynamics • control • coding",
      text: "Workshops and mentoring for building intuition and implementation skill in guidance, estimation, and simulation."
    }
  ];

  const track = document.getElementById("serviceTrack");
  if (track) {
    track.innerHTML = services.map(s => `
      <article class="card car-card">
        <h3>${escapeHtml(s.title)}</h3>
        <p class="kicker">${escapeHtml(s.kicker)}</p>
        <p>${escapeHtml(s.text)}</p>
      </article>
    `).join("");
  }

  const prev = document.getElementById("carPrev");
  const next = document.getElementById("carNext");
  if (track && prev && next) {
    const scrollByCard = (dir) => {
      const firstCard = track.querySelector(".car-card");
      const dx = firstCard ? (firstCard.getBoundingClientRect().width + 12) : 320;
      track.scrollBy({ left: dir * dx, behavior: "smooth" });
    };

    prev.addEventListener("click", () => scrollByCard(-1));
    next.addEventListener("click", () => scrollByCard(1));

    // Keyboard support
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") scrollByCard(-1);
      if (e.key === "ArrowRight") scrollByCard(1);
    });

    // Basic touch swipe (optional)
    let x0 = null;
    track.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const x1 = e.changedTouches[0].clientX;
      const dx = x1 - x0;
      x0 = null;
      if (Math.abs(dx) > 40) scrollByCard(dx > 0 ? -1 : 1);
    }, { passive: true });
  }

  // -----------------------------
  // helpers
  // -----------------------------
  function escapeHtml(s) {
    return String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replaceAll("`", "");
  }
})();
