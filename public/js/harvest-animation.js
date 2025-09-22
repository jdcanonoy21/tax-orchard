document.addEventListener("DOMContentLoaded", () => {
  const harvestText = document.getElementById("theHarvest");
  const whiteSection = document.getElementById("section-white");
  const yearTenTres = document.getElementById("yearTenTres");
  const yearTen = document.getElementById("yearTen");
  const origitalTax = document.getElementById("origitalTax");
  const letsGrow = document.getElementById("letsGrow");
  const contact = document.getElementById("contact");

  // Initially hide yearTenTres with scale
  yearTenTres.style.opacity = "0";
  yearTenTres.style.position = "fixed";
  yearTenTres.style.top = "50%";
  yearTenTres.style.transform = "translate(100%, -50%) scale(0.8)";
  yearTenTres.style.transition =
    "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

  // Initially hide and position yearTen off-screen to the right with transition
  yearTen.style.opacity = "0";
  yearTen.style.transform = "translateX(120%)"; // Position further right, off-screen
  yearTen.style.top = "50%"; // Center vertically

  // Initially hide and position origitalTax off-screen to the right
  origitalTax.style.opacity = "0";
  origitalTax.style.display = "none";
  origitalTax.style.transform = "translateX(120%)";
  origitalTax.style.top = "50%"; // Center vertically

  // Initially hide and position letsGrow in center
  letsGrow.style.display = "none";
  letsGrow.style.position = "absolute";
  letsGrow.style.top = "50%";
  letsGrow.style.transform = "translate(0, -50%)";

  contact.style.opacity = "0";
  contact.style.display = "none";

  // Initialize SVG ellipses opacity
  const yearTenTreeImages = yearTenTres.querySelectorAll(
    'img[src*="year-ten-tree.svg"]'
  );

  yearTenTreeImages.forEach((img) => {
    fetch("/images/year-ten-tree.svg")
      .then((response) => response.text())
      .then((svgContent) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
        const ellipses = svgDoc.querySelectorAll('[id^="Ellipse_"]');

        ellipses.forEach((ellipse) => {
          ellipse.setAttribute("opacity", "0");
          ellipse.style.transition = "opacity 0.5s ease-in-out";
        });

        const serializer = new XMLSerializer();
        const newSvgContent = serializer.serializeToString(svgDoc);
        img.src = "data:image/svg+xml;base64," + btoa(newSvgContent);
      })
      .catch((error) => console.error("Error initializing SVG:", error));
  });

  window.addEventListener("scroll", () => {
    const whiteSectionRect = whiteSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // When white section comes into view
    if (whiteSectionRect.top <= viewportHeight) {
      // Calculate the midpoint of the white section's position
      const whiteSectionMidpoint =
        whiteSectionRect.top + whiteSectionRect.height / 2;
      const viewportMidpoint = viewportHeight / 2;

      if (whiteSectionMidpoint <= viewportMidpoint) {
        // White section's center has reached or passed viewport center
        harvestText.style.position = "fixed";
        harvestText.style.top = "50%";

        // Calculate how far past the midpoint we are (as a percentage)
        const pastMidpoint =
          (viewportMidpoint - whiteSectionMidpoint) / viewportHeight;
        // Move the harvest text to the left based on scroll position
        const translateX = Math.min(pastMidpoint * 200, 100); // Max 100% of movement
        harvestText.style.transform = `translate(-${translateX}%, -50%)`;

        // Show threeTrees first after harvest is gone
        if (translateX >= 85) {
          // Move threeTrees to center with zoom and fade effect
          yearTenTres.style.transform = `translate(0%, -50%) scale(1)`;
          yearTenTres.style.opacity = "1";

          // Get the scroll position relative to when trees become visible
          const scrollAfterTrees =
            whiteSectionMidpoint < viewportMidpoint - 300;

          if (scrollAfterTrees) {
            // Calculate how far we've scrolled past the trees (in pixels)
            const scrollAmount = Math.abs(
              whiteSectionMidpoint - viewportMidpoint
            );
            // Calculate move percentage (0 to 1) - use more scroll distance for smoother movement
            const scrollProgress = Math.min(scrollAmount / 600, 1); // Make movement faster and more responsive

            const scrollY = window.scrollY;

            // Calculate horizontal position from right (120%) to center (0%)
            const startX = 520; // Start from right
            const endX = 0; // Center position (0% means centered)
            const currentX = startX - scrollProgress * (startX - endX);

            // Get tree elements
            const tree1 = document.getElementById("tree1");
            const tree2 = document.getElementById("tree2");
            const tree3 = document.getElementById("tree3");

            // Handle tree animation when scrollY > 15200
            if (scrollY > 15200) {
              const treeStart = 15200;
              const treeEnd = 15500;
              const treeProgress = Math.min(
                (scrollY - treeStart) / (treeEnd - treeStart),
                1
              );

              // Set z-index to ensure tree2 is in front
              tree2.style.zIndex = "2";
              tree1.style.zIndex = "1";
              tree3.style.zIndex = "1";

              // Move tree1 and tree3 behind tree2 towards center
              const moveX = -210 * treeProgress; // Move even more towards center

              tree1.style.transform = `translateX(${-moveX}px) `; // Move right to center
              tree3.style.transform = `translateX(${moveX}px) `; // Move left to center
              tree2.style.transform = `none`; // Keep the flip but no scaling

              // Adjust opacity for subtle depth effect
              tree1.style.opacity = "1";
              tree3.style.opacity = "1";

              tree1.style.transition =
                "transform 0.3s ease-out, opacity 0.3s ease-out";
              tree2.style.transition = "transform 0.3s ease-out";
              tree3.style.transition =
                "transform 0.3s ease-out, opacity 0.3s ease-out";

              // Handle final fade out of trees and show letsGrow
              if (scrollY > 15800) {
                const fadeStart = 15800;
                const fadeEnd = 16300;
                const fadeProgress = Math.min(
                  (scrollY - fadeStart) / (fadeEnd - fadeStart),
                  1
                );

                // Fade out all trees
                const threeTrees = document.getElementById("threeTrees");
                threeTrees.style.opacity = "0";
                threeTrees.style.transition =
                  "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
                threeTrees.style.transform = `scale(${1 - fadeProgress * 0.2})`; // Slightly scale down while fading

                // Start showing letsGrow before trees are fully gone
                letsGrow.style.display = "block";
                letsGrow.style.position = "absolute";
                letsGrow.style.opacity = "1";
                letsGrow.style.transform = `translate(0, -50%)`; // Keep in center position

                // Handle contact section animation with smooth transitions
                if (scrollY > 17500) {
                  const contactStart = 17500;
                  const contactEnd = 18000;
                  const progress = Math.min(
                    (scrollY - contactStart) / (contactEnd - contactStart),
                    1
                  );

                  // Setup initial states if contact is not yet shown
                  if (
                    !contact.style.display ||
                    contact.style.display === "none"
                  ) {
                    contact.style.display = "flex";
                    contact.style.opacity = "0";
                    contact.style.transform = "translate(0, 100%)";
                  }

                  // Smooth easing function
                  const easeInOutCubic = (t) =>
                    t < 0.5
                      ? 4 * t * t * t
                      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                  const easedProgress = easeInOutCubic(progress);

                  // Move letsGrow up smoothly
                  letsGrow.style.opacity = "1";
                  letsGrow.style.transform = `translate(0, ${
                    -50 - easedProgress * 300
                  }%)`;
                  letsGrow.style.transition =
                    "transform 0.3s ease-out, opacity 0.3s ease-out";

                  // Move contact up to replace letsGrow
                  contact.style.opacity = "1";
                  contact.style.transform = `translate(0, ${
                    80 - easedProgress * 80
                  }%)`;
                  contact.style.transition =
                    "transform 0.3s ease-out, opacity 0.3s ease-out";
                } else {
                  // Reset contact when not in view
                  contact.style.opacity = "0";
                  contact.style.display = "none";
                  contact.style.transform = "translate(0, 100%)";
                }

                // Only hide trees when they're fully faded out
                if (fadeProgress === 1) {
                  threeTrees.style.display = "none";
                }
              } else {
                const threeTrees = document.getElementById("threeTrees");
                threeTrees.style.display = "flex";
                threeTrees.style.opacity = "1";
                threeTrees.style.transform = "none";
                letsGrow.style.display = "none";
                letsGrow.style.opacity = "0";
                letsGrow.style.transform = "translate(0, -50%)";
              }
            } else {
              // Reset trees to original position
              tree2.style.zIndex = "1";
              tree1.style.zIndex = "1";
              tree3.style.zIndex = "1";

              tree1.style.transform = "none";
              tree2.style.transform = "none";
              tree3.style.transform = "none";

              tree1.style.opacity = "1";
              tree3.style.opacity = "1";
            }

            // Handle origitalTax movement when scrollY > 14000
            if (scrollY > 14000) {
              origitalTax.style.display = "block";
              const enterStart = 14000;
              const enterEnd = 14500;
              const enterProgress = Math.min(
                (scrollY - enterStart) / (enterEnd - enterStart),
                1
              );

              // Handle exit animation when scrollY > 14600
              if (scrollY > 14600) {
                const exitStart = 14600;
                const exitEnd = 15100;
                const exitProgress = Math.min(
                  (scrollY - exitStart) / (exitEnd - exitStart),
                  1
                );
                const exitX = -100 * exitProgress; // Move from 0% to -100%
                origitalTax.style.transform = `translateX(${exitX}%)`;
                origitalTax.style.opacity = Math.max(0, 1 - exitProgress);

                if (exitProgress === 1) {
                  origitalTax.style.display = "none";
                }
              } else {
                const enterX = 120 - 120 * enterProgress; // Move from 120% to 0%
                origitalTax.style.transform = `translateX(${enterX}%)`;
                origitalTax.style.opacity = Math.min(1, enterProgress);
              }
            } else {
              origitalTax.style.display = "none";
              origitalTax.style.transform = "translateX(120%)";
              origitalTax.style.opacity = "0";
            }

            // Check if scrollY exceeds threshold
            if (scrollY > 13500) {
              // Calculate smooth transition from 0 to -100%
              const exitStart = 13500;
              const exitEnd = 14000; // Adjust this value to control transition distance
              const exitProgress = Math.min(
                (scrollY - exitStart) / (exitEnd - exitStart),
                1
              );
              const exitX = -100 * exitProgress; // Smooth transition from 0 to -100

              yearTen.style.transform = `translateX(${exitX}%)`;
              yearTen.style.opacity = Math.max(0, 1 - exitProgress);

              // Add display none after the element has fully faded out
              if (scrollY > 14000) {
                yearTen.style.display = "none";
              }
            } else {
              // Apply smooth transform to center (50%)
              yearTen.style.transform = `translateX(${currentX}%)`;
              yearTen.style.opacity = 1;
              yearTen.style.display = "block";
            }

            console.log("ScrollY:", scrollY);

            // Calculate opacity progress (0 at start, 1 at center)
            const moveProgress = Math.max(
              0,
              Math.min((startX - currentX) / (startX - endX), 1)
            );

            // Update ellipses opacity based on yearTen's movement progress
            yearTenTreeImages.forEach((img) => {
              fetch("/images/year-ten-tree.svg")
                .then((response) => response.text())
                .then((svgContent) => {
                  const parser = new DOMParser();
                  const svgDoc = parser.parseFromString(
                    svgContent,
                    "image/svg+xml"
                  );
                  const ellipses = svgDoc.querySelectorAll('[id^="Ellipse_"]');

                  // Only increase opacity if yearTen has moved past 130%
                  if (currentX < 130) {
                    ellipses.forEach((ellipse, index) => {
                      // Add a slight delay based on the ellipse index for a cascading effect
                      const delay = index * 0.1;
                      ellipse.style.transition = `opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;
                      // Apply easing to the opacity value for smoother transition
                      const easedOpacity = Math.pow(moveProgress, 2); // Quadratic easing
                      ellipse.setAttribute("opacity", easedOpacity.toString());
                    });
                  } else {
                    ellipses.forEach((ellipse) => {
                      ellipse.style.transition =
                        "opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)";
                      ellipse.setAttribute("opacity", "0");
                    });
                  }

                  const serializer = new XMLSerializer();
                  const newSvgContent = serializer.serializeToString(svgDoc);
                  img.src = "data:image/svg+xml;base64," + btoa(newSvgContent);
                });
            });
          } else {
            yearTen.style.transform = "translate(120%, -50%)";
            yearTen.style.opacity = "0";
            // Reset ellipses opacity when yearTen is not visible
            yearTenTreeImages.forEach((img) => {
              fetch("/images/year-ten-tree.svg")
                .then((response) => response.text())
                .then((svgContent) => {
                  const parser = new DOMParser();
                  const svgDoc = parser.parseFromString(
                    svgContent,
                    "image/svg+xml"
                  );
                  const ellipses = svgDoc.querySelectorAll('[id^="Ellipse_"]');

                  ellipses.forEach((ellipse) => {
                    ellipse.setAttribute("opacity", "0");
                  });

                  const serializer = new XMLSerializer();
                  const newSvgContent = serializer.serializeToString(svgDoc);
                  img.src = "data:image/svg+xml;base64," + btoa(newSvgContent);
                });
            });
          }
        } else {
          // Reset yearTen position when yearTenTres is not fully visible
          yearTen.style.transform = "translateX(120%)";
          // yearTen.style.opacity = "0";
          // Reset ellipses opacity
          yearTenTreeImages.forEach((img) => {
            fetch("/images/year-ten-tree.svg")
              .then((response) => response.text())
              .then((svgContent) => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(
                  svgContent,
                  "image/svg+xml"
                );
                const ellipses = svgDoc.querySelectorAll('[id^="Ellipse_"]');

                ellipses.forEach((ellipse) => {
                  ellipse.setAttribute("opacity", "0");
                });

                const serializer = new XMLSerializer();
                const newSvgContent = serializer.serializeToString(svgDoc);
                img.src = "data:image/svg+xml;base64," + btoa(newSvgContent);
              });
          });
        }
      } else {
        // White section is still moving up
        harvestText.style.position = "fixed";
        harvestText.style.top = "50%";
        harvestText.style.transform = "translateY(-50%)";
        yearTenTres.style.opacity = "0";
        // Reset yearTen position
        yearTen.style.transform = "translateX(100%)";
        yearTen.style.opacity = "0";
        // Reset SVG back to original images
        resetToOriginalImages();
      }
    } else {
      // Before white section comes into view
      harvestText.style.position = "absolute";
      harvestText.style.top = "50%";
      harvestText.style.transform = "translateY(-50%)";
      yearTenTres.style.opacity = "0";
      // Reset yearTen position
      yearTen.style.transform = "translateX(100%)";
      yearTen.style.opacity = "0";
      // Reset SVG back to original images
      resetToOriginalImages();
    }
  });

  // Function to reset SVG images to their original state
  const resetToOriginalImages = () => {
    const yearTenTreeImages = document.querySelectorAll(
      'img[src*="year-ten-tree.svg"]'
    );
    if (!yearTenTreeImages.length) return; // Guard clause if images aren't found

    yearTenTreeImages.forEach((img) => {
      fetch("/images/year-ten-tree.svg")
        .then((response) => response.text())
        .then((svgContent) => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
          const ellipses = svgDoc.querySelectorAll('[id^="Ellipse_"]');

          ellipses.forEach((ellipse) => {
            ellipse.setAttribute("opacity", "0");
          });

          const serializer = new XMLSerializer();
          const newSvgContent = serializer.serializeToString(svgDoc);
          img.src = "data:image/svg+xml;base64," + btoa(newSvgContent);
        })
        .catch((error) => console.warn("Error resetting SVG:", error));
    });
  };
});
