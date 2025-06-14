// Initialize EmailJS
(function () {
  emailjs.init("YOUR_EMAILJS_USER_ID");
})();

// Motion graphic functionality
document.addEventListener("DOMContentLoaded", function () {
  const motionContainer = document.getElementById("motionContainer");
  const modeButtons = document.querySelectorAll(".control-btn");
  let particles = [];
  let currentMode = 1;

  // Create particles
  function createParticles() {
    particles.forEach((p) => p.remove());
    particles = [];

    const count = currentMode === 1 ? 30 : currentMode === 2 ? 50 : 70;
    const sizeMin = currentMode === 1 ? 3 : currentMode === 2 ? 2 : 1;
    const sizeMax = currentMode === 1 ? 8 : currentMode === 2 ? 6 : 4;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      const size = Math.random() * (sizeMax - sizeMin) + sizeMin;
      const tx = (Math.random() * 0.02 - 0.01) * (currentMode === 3 ? 3 : 1);
      const ty = (Math.random() * 0.02 - 0.01) * (currentMode === 3 ? 3 : 1);

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.setProperty("--tx", tx);
      particle.style.setProperty("--ty", ty);
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      motionContainer.appendChild(particle);
      particles.push(particle);
    }
  }

  createParticles();

  // Mode switching
  modeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      modeButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      if (this.id === "mode1") currentMode = 1;
      if (this.id === "mode2") currentMode = 2;
      if (this.id === "mode3") currentMode = 3;

      createParticles();
    });
  });

  // Form submission
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = document.getElementById("submitBtn");
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
        to_email: "ismailadesholaharun@gmail.com",
      };

      emailjs
        .send("default_service", "template_12345", formData)
        .then(function (response) {
          showNotification(
            "Your message has been sent successfully!",
            "success"
          );
          document.getElementById("contactForm").reset();
        })
        .catch(function (error) {
          showNotification(
            "Failed to send message. Please try again.",
            "error"
          );
        })
        .finally(function () {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        });
    });

  // Show notification
  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `<i class="fas fa-${
      type === "success" ? "check" : "exclamation"
    }-circle"></i> ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "1";
    }, 10);

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  mobileMenuBtn.addEventListener("click", function () {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
  });

  // Create floating particles for footer
  function createFooterParticles() {
    const particlesContainer = document.getElementById("footerParticles");
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      const size = Math.random() * 8 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.opacity = Math.random() * 0.7 + 0.1;

      const colors = [
        "rgba(76, 201, 240, 0.3)",
        "rgba(0, 219, 222, 0.3)",
        "rgba(252, 0, 255, 0.3)",
        "rgba(255, 107, 107, 0.3)",
      ];
      particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      particlesContainer.appendChild(particle);
    }
  }

  createFooterParticles();
});

// Filter functionality
function setupFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // In a real implementation, you would filter the portfolio items here
      // For this demo, we'll just simulate the effect
      simulateFilterEffect();
    });
  });
}

function simulateFilterEffect() {
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  // Hide all items with fade out
  portfolioItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(50px)";
  });

  // After a delay, show them again with falling animation
  setTimeout(() => {
    portfolioItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(-100vh) rotate(20deg)";

      // Re-apply the falling animation with staggered delay
      setTimeout(() => {
        item.style.animation = "none";
        void item.offsetWidth; // Trigger reflow
        item.style.animation =
          "fallIn 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards";
        item.style.animationDelay = `${index * 0.2}s`;
      }, 50);
    });
  }, 300);
}
