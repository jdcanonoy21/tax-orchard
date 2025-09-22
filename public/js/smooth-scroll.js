// Simple Smooth Scrolling System
document.addEventListener("DOMContentLoaded", function () {
  // Add fade-in animation for elements with js-fade-right class
  const elementsToAnimateFromRight =
    document.querySelectorAll(".js-fade-right");
  if (elementsToAnimateFromRight.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const delay = index * 0;

            setTimeout(() => {
              entry.target.style.willChange = "transform, opacity";
              entry.target.classList.add("animate-fade-in-right");
              entry.target.addEventListener(
                "animationend",
                () => {
                  entry.target.style.willChange = "";
                },
                { once: true }
              );
            }, delay);

            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -70% 0px" }
    );

    elementsToAnimateFromRight.forEach((el) => observer.observe(el));
  }

  // Enhanced horizontal scroll for section 4
  const section = document.getElementById("section-4");
  if (section) {
    const track = section.querySelector(".track");
    if (track) {
      const sticky = section.querySelector(".sticky");

      let sectionTop = 0;
      let sectionHeight = 0;

      function recalc() {
        const rect = section.getBoundingClientRect();
        sectionTop = window.scrollY + rect.top;
        sectionHeight =
          section.offsetHeight -
          (sticky ? sticky.offsetHeight : window.innerHeight);
      }

      function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
      }

      function lerp(a, b, t) {
        return a + (b - a) * t;
      }

      let rafId = null;
      let currentXPercent = 0;
      let targetXPercent = 0;
      let currentYPercent = 0;
      let targetYPercent = 0;

      track.style.willChange = "transform";
      track.style.transform = "translate3d(0%, 0%, 0)";

      function animate() {
        rafId = requestAnimationFrame(() => {
          const smoothing = 0.1;
          currentXPercent =
            currentXPercent + (targetXPercent - currentXPercent) * smoothing;
          currentYPercent =
            currentYPercent + (targetYPercent - currentYPercent) * smoothing;

          if (
            Math.abs(targetXPercent - currentXPercent) < 0.5 &&
            Math.abs(targetYPercent - currentYPercent) < 0.5
          ) {
            currentXPercent = targetXPercent;
            currentYPercent = targetYPercent;
          }

          track.style.transform = `translate3d(${currentXPercent}%, ${currentYPercent}%, 0)`;

          if (
            currentXPercent !== targetXPercent ||
            currentYPercent !== targetYPercent
          ) {
            animate();
          } else {
            rafId = null;
          }
        });
      }

      function onScroll() {
        const scrollY = window.scrollY;
        const progress =
          sectionHeight > 0
            ? clamp((scrollY - sectionTop) / sectionHeight, 0, 1)
            : 0;
        const startX = 0;
        const endX = -65;
        const startY = 0;
        const endY = -15;

        targetXPercent = lerp(startX, endX, progress);
        targetYPercent = lerp(startY, endY, progress);

        if (progress <= 0 || progress >= 1) {
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          currentXPercent = targetXPercent;
          currentYPercent = targetYPercent;
          track.style.transform = `translate3d(${currentXPercent}%, ${currentYPercent}%, 0)`;
          return;
        }

        if (!rafId) animate();
      }

      recalc();
      window.addEventListener("resize", recalc, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }
});

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
  .animate-fade-in-right {
    animation: fadeInRight 0.8s ease-out forwards;
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .scroll-circle {
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .scroll-circle:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.1);
  }
`;

document.head.appendChild(style);
