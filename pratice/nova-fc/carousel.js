// 구장 이미지 3장을 한 장씩 순환합니다.
const carousel = document.querySelector(".stadium-carousel");

if (carousel) {
  const track = carousel.querySelector(".stadium-track");
  const slides = [...carousel.querySelectorAll(".stadium-slide")];
  const dots = [...carousel.querySelectorAll(".stadium-dots button")];
  const count = carousel.querySelector(".stadium-count");
  let currentIndex = 0;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, i) => {
      const active = i === currentIndex;
      slide.setAttribute("aria-hidden", String(!active));
      slide.inert = !active;
      if (active) dots[i].setAttribute("aria-current", "true");
      else dots[i].removeAttribute("aria-current");
    });
    count.textContent = `${currentIndex + 1} / ${slides.length}`;
  }

  carousel
    .querySelector(".stadium-prev")
    .addEventListener("click", () => showSlide(currentIndex - 1));
  carousel
    .querySelector(".stadium-next")
    .addEventListener("click", () => showSlide(currentIndex + 1));
  dots.forEach((dot, index) =>
    dot.addEventListener("click", () => showSlide(index)),
  );

  // 캐러셀에 키보드 초점이 있을 때 방향키로도 이동합니다.
  carousel.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    if (event.target.closest(".stadium-slide")) carousel.focus();
    showSlide(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
  });
}
