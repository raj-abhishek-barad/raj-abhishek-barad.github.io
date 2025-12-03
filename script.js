// ===== Typed Text =====
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
  "a control engineer focused on autonomous systems.",
  "a research intern in space technology.",
  "a developer of real-time flight control software.",
  "passionate about innovation and learning."
];

const typingDelay = 70;
const erasingDelay = 50;
const newTextDelay = 1000; // delay between texts
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (!typedTextSpan) return;

  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (!typedTextSpan) return;

  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, newTextDelay + 250);
});

// ===== Services Carousel =====
const track = document.querySelector(".carousel-track");
const cards = track ? Array.from(track.children) : [];
const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");

let currentIndex = 0;

function updateCarousel() {
  if (!track || cards.length === 0) return;
  const cardWidth = cards[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
}

if (prevButton) {
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
}

// ===== "Contact Me" toggle form (if used) =====
const hireMeBtn = document.getElementById("hire-button");
const formWrapper = document.getElementById("contact-form-wrapper");

if (hireMeBtn && formWrapper) {
  hireMeBtn.addEventListener("click", () => {
    if (formWrapper.style.display === "none" || formWrapper.style.display === "") {
      formWrapper.style.display = "block";
      formWrapper.scrollIntoView({ behavior: "smooth" });
    } else {
      formWrapper.style.display = "none";
    }
  });
}

// ===== Google Scholar tooltip (if used) =====
const scholarBtn = document.getElementById("scholarBtn");
const scholarTooltip = document.getElementById("scholarTooltip");

if (scholarBtn && scholarTooltip) {
  scholarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    scholarTooltip.style.display =
      scholarTooltip.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (
      !scholarBtn.contains(e.target) &&
      !scholarTooltip.contains(e.target)
    ) {
      scholarTooltip.style.display = "none";
    }
  });
}
// ===== Scroll reveal for sections =====
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("reveal-visible"));
}

