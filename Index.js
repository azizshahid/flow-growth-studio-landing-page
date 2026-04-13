// ── Problem Swiper ──
const problemSwiper = new Swiper("#problemSwiper", {
  slidesPerView: 1.08,
  spaceBetween: 14,
  grabCursor: true,
  breakpoints: {
    480: { slidesPerView: 1.5 },
    640: { slidesPerView: 2.1 },
    960: { slidesPerView: 3.1 },
  },
});
const total = problemSwiper.slides.length;
const counter = document.getElementById("problemCounter");
const fill = document.getElementById("problemFill");

function updateProblemUI() {
  const i = problemSwiper.realIndex;
  counter.textContent = `${i + 1} / ${total}`;
  fill.style.width = `${((i + 1) / total) * 100}%`;
}
problemSwiper.on("slideChange", updateProblemUI);
document
  .getElementById("problemPrev")
  .addEventListener("click", () => problemSwiper.slidePrev());
document
  .getElementById("problemNext")
  .addEventListener("click", () => problemSwiper.slideNext());
updateProblemUI();

// ── Solution Tabs ──
document.querySelectorAll(".sol-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".sol-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".sol-panel")
      .forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document
      .querySelector(`.sol-panel[data-panel="${tab.dataset.tab}"]`)
      .classList.add("active");
  });
});

// ── Testimonial Swiper ──
const testiSwiper = new Swiper("#testiSwiper", {
  slidesPerView: 1.06,
  spaceBetween: 14,
  grabCursor: true,
  autoplay: { delay: 4500, disableOnInteraction: true },
  breakpoints: {
    600: { slidesPerView: 1.5 },
    780: { slidesPerView: 2.1 },
    1000: { slidesPerView: 3 },
  },
});
const dots = document.querySelectorAll(".testi-dot");
function updateDots() {
  dots.forEach((d) => d.classList.remove("active"));
  const active = document.querySelector(
    `.testi-dot[data-i="${testiSwiper.realIndex}"]`,
  );
  if (active) active.classList.add("active");
}
testiSwiper.on("slideChange", updateDots);
document
  .getElementById("testiPrev")
  .addEventListener("click", () => testiSwiper.slidePrev());
document
  .getElementById("testiNext")
  .addEventListener("click", () => testiSwiper.slideNext());
dots.forEach((d) =>
  d.addEventListener("click", () => testiSwiper.slideTo(+d.dataset.i)),
);

// ── Form ──
document.getElementById("auditForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const website = document.getElementById("website").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!name || !website || !email) return;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  // TODO: replace with Formspree / EmailJS / backend endpoint
  console.log("Audit request:", { name, website, email });
  this.style.display = "none";
  document.getElementById("successMsg").style.display = "block";
});
