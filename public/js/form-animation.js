document.addEventListener("DOMContentLoaded", function () {
  // Multi-step form with Framer Motion animations
  let currentStep = 1;
  const totalSteps = 5;

  // Simple next step function without animations first
  function nextStep() {
    console.log("nextStep called, current step:", currentStep);

    if (currentStep < totalSteps) {
      // Hide current step
      const currentStepElement = document.querySelector(
        `[data-step="${currentStep}"]`
      );
      if (currentStepElement) {
        currentStepElement.classList.add("hidden");
        console.log("Hidden step:", currentStep);
      }

      // Move to next step
      currentStep++;

      // Show next step
      const nextStepElement = document.querySelector(
        `[data-step="${currentStep}"]`
      );
      if (nextStepElement) {
        nextStepElement.classList.remove("hidden");
        console.log("Showed step:", currentStep);
      }

      // Update progress indicator
      const progressIndicator = document.getElementById("progress-indicator");
      if (progressIndicator) {
        progressIndicator.textContent = `${currentStep} of ${totalSteps}`;
        console.log("Updated progress to:", `${currentStep} of ${totalSteps}`);
      }

      // Focus on the new input
      const currentInput = document.querySelector(
        `[data-step="${currentStep}"] input, [data-step="${currentStep}"] textarea`
      );
      if (currentInput) {
        console.log("Found input:", currentInput.id);
      }
    } else {
      console.log("Already at last step");
    }
  }

  // Simple submit function
  function submitForm() {
    console.log("submitForm called");

    // Collect form data
    const formData = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };

    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");

    // Reset form
    resetForm();
  }

  // Reset form
  function resetForm() {
    console.log("resetForm called");

    // Reset all inputs
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("message").value = "";

    // Reset to first step
    document
      .querySelectorAll(".form-step")
      .forEach((step) => step.classList.add("hidden"));
    document.querySelector('[data-step="1"]').classList.remove("hidden");

    // Reset progress
    currentStep = 1;
    document.getElementById("progress-indicator").textContent = "1 of 5";

    // Focus on first input
    const firstInput = document.getElementById("first-name");
    if (firstInput) {
      console.log("Found first input");
    }
  }

  // Initialize form
  function initializeForm() {
    console.log("Form script loaded");

    // Check if form elements exist
    const firstInput = document.getElementById("first-name");
    const progressIndicator = document.getElementById("progress-indicator");
    const formSteps = document.querySelectorAll(".form-step");

    // Add focus and blur event listeners to all inputs
    document.querySelectorAll("input, textarea").forEach((input) => {
      const placeholder = input.placeholder;

      input.addEventListener("focus", () => {
        input.placeholder = "";
      });

      input.addEventListener("blur", () => {
        input.placeholder = placeholder;
      });
    });

    console.log("Form elements found:", {
      firstInput: !!firstInput,
      progressIndicator: !!progressIndicator,
      formSteps: formSteps.length,
    });

    // Focus on first input
    setTimeout(() => {
      if (firstInput) {
        console.log("Found first input after delay");
      } else {
        console.error("First input not found!");
      }
    }, 100);

    // Add Enter key support
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        nextStep();
      }
    });

    // Test if functions are accessible
    console.log("Functions available:", {
      nextStep: typeof nextStep,
      submitForm: typeof submitForm,
      resetForm: typeof resetForm,
    });
  }

  // Make functions globally accessible
  window.nextStep = nextStep;
  window.submitForm = submitForm;
  window.resetForm = resetForm;

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeForm);
  } else {
    initializeForm();
  }

  // Also try to initialize after a delay in case the content is loaded dynamically
  setTimeout(() => {
    console.log("Checking for form elements after delay...");
    const firstInput = document.getElementById("first-name");
    if (firstInput) {
      console.log("Form found after delay, initializing...");
      initializeForm();
    } else {
      console.log("Form not found after delay");
    }
  }, 2000);

  console.log("Form script loaded and functions set globally");
});
