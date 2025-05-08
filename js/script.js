document.addEventListener("DOMContentLoaded", function () {
  // Navigation Menu Toggle for Mobile
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      // Change icon based on menu state
      const icon = this.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      navLinks &&
      navLinks.classList.contains("active") &&
      !navLinks.contains(event.target) &&
      event.target !== menuToggle &&
      !menuToggle.contains(event.target)
    ) {
      navLinks.classList.remove("active");
      // Reset icon
      if (menuToggle) {
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });

  // Navbar Effect on Scroll
  const navbar = document.querySelector(".navbar");

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);
  // Check initial state
  handleScroll();

  // App Screenshot Slider
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(n) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function startSlideShow() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startSlideShow();
    });
  });

  // Start the slideshow
  startSlideShow();

  // Chatbot Functionality
  const chatbotContainer = document.querySelector(".chatbot-container");
  const openChatbot = document.getElementById("open-chatbot");
  const closeChatbot = document.getElementById("close-chatbot");
  const chatbotBody = document.getElementById("chatbot-body");
  const chatbotInput = document.getElementById("chatbot-input");
  const sendMessage = document.getElementById("send-message");

  if (openChatbot) {
    openChatbot.addEventListener("click", function () {
      chatbotContainer.style.display = "flex";
      openChatbot.style.display = "none";
    });
  }

  if (closeChatbot) {
    closeChatbot.addEventListener("click", function () {
      chatbotContainer.style.display = "none";
      openChatbot.style.display = "flex";
    });
  }

  function addUserMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "user");
    messageElement.textContent = message;
    chatbotBody.appendChild(messageElement);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  function addBotMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "bot");
    messageElement.textContent = message;
    chatbotBody.appendChild(messageElement);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  function handleUserInput() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage !== "") {
      addUserMessage(userMessage);
      chatbotInput.value = "";
      setTimeout(() => {
        respondToUser(userMessage);
      }, 600);
    }
  }

  if (sendMessage) {
    sendMessage.addEventListener("click", handleUserInput);
  }

  if (chatbotInput) {
    chatbotInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        handleUserInput();
      }
    });
  }

  function respondToUser(message) {
    const lowerMessage = message.toLowerCase();
    let response = "";

    if (
      lowerMessage.includes("bonjour") ||
      lowerMessage.includes("salut") ||
      lowerMessage.includes("hello")
    ) {
      response =
        "Bonjour ! Comment puis-je vous aider avec PAYTOU aujourd'hui ?";
    } else if (
      lowerMessage.includes("tarif") ||
      lowerMessage.includes("prix") ||
      lowerMessage.includes("coût")
    ) {
      response =
        "PAYTOU propose des transferts gratuits entre utilisateurs PAYTOU. Pour les autres services, veuillez consulter notre page Tarifs pour plus de détails.";
    } else if (
      lowerMessage.includes("transfert") ||
      lowerMessage.includes("envoyer de l'argent") ||
      lowerMessage.includes("envoi")
    ) {
      response =
        "Avec PAYTOU, vous pouvez envoyer de l'argent instantanément à n'importe quel utilisateur. Les transferts entre utilisateurs PAYTOU sont gratuits !";
    } else if (
      lowerMessage.includes("télécharger") ||
      lowerMessage.includes("installer")
    ) {
      response =
        'Vous pouvez télécharger notre application sur Google Play Store ou Apple App Store. Cherchez simplement "PAYTOU" et profitez de notre expérience mobile !';
    } else if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("aide")
    ) {
      response =
        "Vous pouvez nous contacter par email à contact@paytou.com ou par téléphone au +XX XX XX XX XX. Notre équipe d'assistance est disponible 7j/7.";
    } else {
      response =
        "Merci pour votre message. Pour toute question spécifique sur PAYTOU, n'hésitez pas à nous contacter via notre page de contact ou à visiter notre FAQ pour plus d'informations.";
    }

    addBotMessage(response);
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Animation on Scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".feature-card, .testimonial, .section-header"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Initialize animation styles
  const animatedElements = document.querySelectorAll(
    ".feature-card, .testimonial, .section-header"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.6s ease";
  });

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll);
  // Run once on page load
  animateOnScroll();
});

// Fonction pour initialiser le carrousel d'écrans d'application
document.addEventListener("DOMContentLoaded", function () {
  // Sélection des éléments du carrousel
  const carousel = document.querySelector(".app-carousel");
  const items = document.querySelectorAll(".screen-item");
  const dotsContainer = document.querySelector(".carousel-dots");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const nextBtn = document.querySelector(".carousel-control.next");

  // Variables
  let currentIndex = 0;
  const totalItems = items.length;
  const itemWidth = items[0].offsetWidth + 30; // Largeur + gap
  const visibleItems =
    window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  const maxIndex = totalItems - visibleItems;
  let autoScrollInterval;

  // Création des points de navigation
  for (let i = 0; i < maxIndex + 1; i++) {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(i);
      resetAutoScroll();
    });
    dotsContainer.appendChild(dot);
  }

  // Défilement automatique
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        goToSlide(0);
      } else {
        goToSlide(currentIndex + 1);
      }
    }, 3000);
  }

  function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  }

  // Navigation vers une diapositive spécifique
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;

    currentIndex = index;
    carousel.style.transform = `translateX(-${itemWidth * currentIndex}px)`;

    // Mise à jour des points de navigation
    document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  // Événements des boutons de navigation
  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
    resetAutoScroll();
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
    resetAutoScroll();
  });

  // Gestion du swipe sur mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      resetAutoScroll();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe gauche
      goToSlide(currentIndex + 1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe droite
      goToSlide(currentIndex - 1);
    }
  }

  // Gestion du redimensionnement
  window.addEventListener("resize", () => {
    // Recalcul du nombre d'éléments visibles et réajustement
    const newVisibleItems =
      window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
    const newMaxIndex = totalItems - newVisibleItems;

    if (currentIndex > newMaxIndex) {
      currentIndex = newMaxIndex;
      goToSlide(currentIndex);
    }
  });

  // Initialisation du défilement automatique
  startAutoScroll();
});
