// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800, // Animation duration in milliseconds
    easing: "ease-out-quad", // Easing function
    once: true, // Animation only happens once
    offset: 100, // Offset (in px) from the original trigger point
    delay: 100, // Default delay for all animations
  });
});

// Lightweight tsParticles Configuration for Hero Section
if (typeof tsParticles !== "undefined") {
  tsParticles.load("particles-js", {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#cccccc",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#cccccc",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        out_mode: "out",
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
      },
    },
  });
}

// Custom Cursor Animation
document.addEventListener("DOMContentLoaded", function () {
  const cursorInner = document.querySelector(".cursor-inner");
  const cursorOuter = document.querySelector(".cursor-outer");

  // Only initialize if not on touch device
  if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let isMoving = false;

    // Inner cursor follows mouse directly
    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      if (!isMoving) {
        isMoving = true;
        animateCursor();
      }
    };

    // Outer cursor follows with delay (trailing effect)
    const animateCursor = () => {
      // Easing function for smooth follow
      outerX += (mouseX - outerX) * 0.2;
      outerY += (mouseY - outerY) * 0.2;

      cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;

      // Continue animation if still moving
      if (Math.abs(mouseX - outerX) > 0.1 || Math.abs(mouseY - outerY) > 0.1) {
        requestAnimationFrame(animateCursor);
      } else {
        isMoving = false;
      }
    };

    // Mouse move event listener
    document.addEventListener("mousemove", moveCursor);

    // Mouse leave window
    document.addEventListener("mouseleave", () => {
      cursorInner.style.opacity = "0";
      cursorOuter.style.opacity = "0";
    });

    // Mouse enter window
    document.addEventListener("mouseenter", () => {
      cursorInner.style.opacity = "1";
      cursorOuter.style.opacity = "1";
    });

    // Click effect
    document.addEventListener("mousedown", () => {
      cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(0.8)`;
      cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px) scale(1.2)`;
    });

    document.addEventListener("mouseup", () => {
      cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
      cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px) scale(1)`;
    });
  } else {
    // Hide custom cursor elements on touch devices
    cursorInner.style.display = "none";
    cursorOuter.style.display = "none";
    document.documentElement.style.cursor = "auto";
  }
});

// ===== Theme toggle functionality =====
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check for saved theme preference or use dark theme as default
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial theme
  if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
    themeToggle.checked = savedTheme === "light";
  } else if (!prefersDark) {
    body.setAttribute("data-theme", "light");
    themeToggle.checked = true;
  }

  // Theme toggle event listener
  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      body.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    }
  });
});

// Typing Effect
document.addEventListener("DOMContentLoaded", function () {
  const typingText = document.getElementById("typing-text");
  const texts = [
    "Aspiring Game Developer",
    "IT Student (AI/ML honours)",
    "Web & Game-Dev Enthusiast",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;
  let deleteSpeed = 30;
  let pauseTime = 1600;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = deleteSpeed;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);

  // Mobile Navigation
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active");
      }
    });
  });
});
