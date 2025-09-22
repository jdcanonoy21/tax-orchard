document.addEventListener("DOMContentLoaded", function () {
  // Converted from class to module pattern
  const ScrollRevealManager = (() => {
    // Private state
    const svgElements = {
      pathElement: null,
      maskRect: null,
      svgElement: null,
    };
    let isInitialized = false;
    let container = null;
    let title = null;
    let subtitle = null;
    let wasTreesHidden = false;

    function handleScroll() {
      if (!svgElements.svgElement || !isInitialized) return;
      requestAnimationFrame(() => {
        const progress = calculateScrollProgress();
        updateMaskPosition(progress);
      });
    }

    function updateOnScroll() {
      if (!isInitialized) {
        console.log(" Animation skipped: Not initialized");
        return;
      }
      const threeTrees = document.getElementById("threeTrees");
      const isTreesHidden =
        threeTrees && getComputedStyle(threeTrees).display === "none";
      if (!isTreesHidden) {
        console.log(" Waiting for threeTrees to be hidden");
        updateMaskPosition(0);
        return;
      }
      if (!wasTreesHidden && isTreesHidden) {
        console.log(" Trees just hidden, resetting mask position");
        wasTreesHidden = true;
        updateMaskPosition(0);
        return;
      }
      console.log(" Starting scroll animation update");
      requestAnimationFrame(() => {
        updateMaskPosition(calculateScrollProgress());
      });
    }

    function calculateScrollProgress() {
      const threeTrees = document.getElementById("threeTrees");
      const isTreesHidden =
        threeTrees && getComputedStyle(threeTrees).display === "none";
      if (!isTreesHidden) {
        return 0;
      }
      if (container) {
        const maxScroll = container.scrollHeight - container.clientHeight;
        const progress = Math.min(
          Math.max(container.scrollTop / maxScroll, 0),
          1
        );
        console.log(
          " Container Scroll Progress:",
          (progress * 100).toFixed(1) + "%"
        );
        return progress;
      }
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const startScrollPosition = 16500;
      const scrollRange = 1000;
      const relativeScroll = scrollTop - startScrollPosition;
      const progressPercentage = (relativeScroll / scrollRange) * 1000;
      const clampedProgress = Math.min(Math.max(progressPercentage, 0), 100);
      console.log(" Window Scroll Progress:", clampedProgress.toFixed(1) + "%");
      return clampedProgress / 100;
    }

    function updateMaskPosition(scrollProgress) {
      if (!svgElements.maskRect || !isInitialized) {
        console.log(" Mask update failed: Missing elements");
        return;
      }
      svgElements.maskRect.style.transition = "width 1s ease-out";
      const width = `${scrollProgress * 100}%`;
      console.log("🎭 Updating mask width:", width);
      svgElements.maskRect.setAttribute("width", width);
    }

    function setupSVGGradient(svgElement) {
      const defs = svgElement.querySelector("defs") || createDefs(svgElement);
      const { linearGradient, mask } = createGradientElements();
      defs.appendChild(linearGradient);
      defs.appendChild(mask);
      svgElements.pathElement.setAttribute("mask", "url(#revealMask)");
    }

    function createDefs(svgElement) {
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );
      svgElement.insertBefore(defs, svgElement.firstChild);
      return defs;
    }

    function createGradientElements() {
      const linearGradient = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      );
      linearGradient.id = "fillGradient";
      Object.entries({ x1: "0%", y1: "0%", x2: "100%", y2: "0%" }).forEach(
        ([attr, value]) => linearGradient.setAttribute(attr, value)
      );
      [
        { offset: "0%", opacity: 1 },
        { offset: "98%", opacity: 1 },
        { offset: "100%", opacity: 0 },
      ].forEach(({ offset, opacity }) => {
        const stop = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop.setAttribute("offset", offset);
        stop.setAttribute("style", `stop-color:white;stop-opacity:${opacity}`);
        linearGradient.appendChild(stop);
      });
      const mask = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "mask"
      );
      mask.id = "revealMask";
      svgElements.maskRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      Object.entries({
        x: "0",
        y: "0",
        width: "0%",
        height: "100%",
        fill: "url(#fillGradient)",
      }).forEach(([attr, value]) =>
        svgElements.maskRect.setAttribute(attr, value)
      );
      mask.appendChild(svgElements.maskRect);
      return { linearGradient, mask };
    }

    function setupEventListeners() {
      container = document.querySelector(".container");
      if (container) {
        container.addEventListener("scroll", handleScroll, {
          passive: true,
        });
      }
      window.addEventListener("scroll", updateOnScroll, { passive: true });
      window.addEventListener("resize", updateOnScroll, { passive: true });
      window.addEventListener("unload", () => {
        if (container) {
          container.removeEventListener("scroll", handleScroll);
        }
        window.removeEventListener("scroll", updateOnScroll);
        window.removeEventListener("resize", updateOnScroll);
        window.removeEventListener("scroll", checkScroll);
      });
    }

    function initScrollReveal() {
      title = document.getElementById("letsgrowtitle");
      subtitle = document.getElementById("letsgrosubtitle");
      if (!title || !subtitle) {
        console.warn("Title or subtitle elements not found");
        return false;
      }
      [title, subtitle].forEach((el) => {
        el.style.opacity = "0";
        el.style.transition = "opacity 0.3s ease-out";
      });
      window.addEventListener("scroll", () =>
        updateTextOpacity(calculateScrollProgress())
      );
      return true;
    }

    function updateTextOpacity(progress) {
      if (!title || !subtitle) return;
      const titleOpacity = Math.min(progress * 2, 1);
      title.style.opacity = titleOpacity;
      const subtitleProgress = (progress - 0.3) / 0.5;
      const subtitleOpacity = Math.max(0, Math.min(subtitleProgress, 1));
      subtitle.style.opacity = subtitleOpacity;
    }

    function checkScroll() {
      if (!title || !subtitle) return;
      const titleRect = title.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.8;
      if (titleRect.top < triggerPoint && title.classList.contains("hidden")) {
        revealElement(title);
        setTimeout(() => revealElement(subtitle), 500);
      }
    }

    function revealElement(element) {
      if (!element) return;
      element.classList.remove("hidden");
      element.style.transition = "opacity 1s ease";
      element.style.opacity = "1";
    }

    function initializeSVGElements() {
      const svgElement = document.getElementById("Logo");
      if (!svgElement) {
        console.warn("Logo SVG element not found");
        return false;
      }
      svgElements.svgElement = svgElement;
      svgElements.pathElement = svgElement.querySelector("#Path_1857");
      if (!svgElements.pathElement) {
        console.warn("Path element not found in Logo SVG");
        return false;
      }
      setupSVGGradient(svgElement);
      isInitialized = true;
      return true;
    }

    function init() {
      if (initializeSVGElements() && initScrollReveal()) {
        setupEventListeners();
        requestAnimationFrame(() => {
          updateOnScroll();
          checkScroll();
        });
      }
    }

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => init());
    } else {
      init();
    }

    // Expose for debugging if needed
    return {
      handleScroll,
      updateOnScroll,
      calculateScrollProgress,
      updateMaskPosition,
      setupSVGGradient,
      createDefs,
      createGradientElements,
      setupEventListeners,
      initScrollReveal,
      updateTextOpacity,
      checkScroll,
      revealElement,
      initializeSVGElements,
      init,
    };
  })();
});
