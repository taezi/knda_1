const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.counter || 0);
      let current = 0;
      const step = Math.max(1, Math.round(target / 48));

      const tick = () => {
        current = Math.min(target, current + step);
        element.textContent = String(current);

        if (current < target) {
          requestAnimationFrame(tick);
        }
      };

      tick();
      observer.unobserve(element);
    });
  },
  { threshold: 0.35 }
);

document.querySelectorAll("[data-counter]").forEach((counter) => {
  counterObserver.observe(counter);
});

const carousel = document.querySelector("[data-carousel]");
const cards = Array.from(document.querySelectorAll(".news-card"));
const prevButton = carousel?.querySelector(".prev");
const nextButton = carousel?.querySelector(".next");
let activeIndex = 0;
let timerId;

const showCard = (index) => {
  activeIndex = (index + cards.length) % cards.length;
  cards.forEach((card, cardIndex) => {
    card.classList.toggle("active", cardIndex === activeIndex);
  });
};

const startCarousel = () => {
  window.clearInterval(timerId);
  timerId = window.setInterval(() => showCard(activeIndex + 1), 5000);
};

prevButton?.addEventListener("click", () => {
  showCard(activeIndex - 1);
  startCarousel();
});

nextButton?.addEventListener("click", () => {
  showCard(activeIndex + 1);
  startCarousel();
});

if (cards.length > 0) {
  showCard(0);
  startCarousel();
}
