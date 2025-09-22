// Logo
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");
  console.log("Motion object:", Motion);
  console.log("window.Motion:", window.Motion);

  const logo = document.getElementById("logo");
  const section1Subtitle = document.getElementById("section1-subtitle");
  const mainTitle = document.getElementById("main-title");

  // Test basic animation
  try {
    Motion.animate(logo, { x: -50 }, { duration: 1 });
    console.log("Basic animation works!");

    // Test scroll animation
    Motion.scroll(
      Motion.animate(logo, {
        x: [-100, 0, 0, -260],
        opacity: [0.7, 1, 1, 0.7],
      }),
      {
        target: logo,
        offset: ["start end", "10% start", "90% end", "end start"],
      }
    );
    console.log("Scroll animation applied!");

    // Add zoom-out animation for section1-subtitle when scrolling up
    if (section1Subtitle) {
      let lastScrollY = window.scrollY;
      let isZoomed = false;

      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY < lastScrollY ? "up" : "down";

        // Keep original size when scroll is less than 50px
        if (currentScrollY < 50) {
          Motion.animate(section1Subtitle, {
            scale: 1,
            duration: 0.3,
            easing: "ease-out",
          });
        }
        // Scroll up: Return to original size
        else if (scrollDirection === "up") {
          Motion.animate(section1Subtitle, {
            scale: 1,
            duration: 0.3,
            easing: "ease-out",
          });
        }
        // Scroll down: Zoom in based on scroll position
        else if (scrollDirection === "down") {
          // Calculate scale based on scroll position
          // Start at 1.0 at 50px, max out at 1.5 at 300px
          const maxScroll = 300;
          const minScale = 1.0;
          const maxScale = 1.25;

          const scrollProgress = Math.min(
            (currentScrollY - 50) / (maxScroll - 50),
            1
          );
          const scale = minScale + (maxScale - minScale) * scrollProgress;

          Motion.animate(section1Subtitle, {
            scale: scale,
            duration: 0.3,
            easing: "ease-out",
          });
        }

        lastScrollY = currentScrollY;
      });

      console.log("Zoom animation applied to section1-subtitle!");
    }

    // Add main-title animation when scroll > 400px
    if (mainTitle) {
      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
          // Calculate how much to move up based on scroll position
          const moveDistance = Math.min((currentScrollY - 50) / 100, 1); // Max movement over 200px of scroll
          const translateY = -250 * moveDistance; // Move up to 50px

          Motion.animate(mainTitle, {
            y: translateY,
            duration: 0.3,
            easing: "ease-out",
          });
        } else {
          // Return to original position when scroll < 400px
          Motion.animate(mainTitle, {
            y: 0,
            duration: 0.3,
            easing: "ease-out",
          });
        }
      });

      console.log("Main title animation applied!");
    }
  } catch (error) {
    console.error("Animation error:", error);

    // Fallback
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 30) {
        logo.style.transform = "translateX(0px)";
        logo.style.opacity = "1";
      } else if (currentScrollY < lastScrollY && currentScrollY < 30) {
        logo.style.transform = "translateX(-500px)";
        logo.style.opacity = "0.7";
      }
      lastScrollY = currentScrollY;
    });

    logo.style.transform = "translateX(-100px)";
    logo.style.opacity = "0.7";
  }
});
