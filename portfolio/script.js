// ============================================================================
// TYPING ANIMATION
// ============================================================================

const typingLines = [
  "Full-Stack Developer",
  "Problem Solver",
  "Coffee Enthusiast",
  "Tech Innovator"
];

let currentLineIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingSpeed = 50;
const deletingSpeed = 30;
const pauseTime = 2000;

function typeAnimation() {
  const typingTextElement = document.getElementById('typingText');
  const currentLine = typingLines[currentLineIndex];

  if (!isDeleting) {
    // Typing
    if (currentCharIndex < currentLine.length) {
      typingTextElement.textContent += currentLine[currentCharIndex];
      currentCharIndex++;
      setTimeout(typeAnimation, typingSpeed);
    } else {
      // Pause before deleting
      isDeleting = true;
      setTimeout(typeAnimation, pauseTime);
    }
  } else {
    // Deleting
    if (currentCharIndex > 0) {
      currentCharIndex--;
      typingTextElement.textContent = currentLine.substring(0, currentCharIndex);
      setTimeout(typeAnimation, deletingSpeed);
    } else {
      // Move to next line
      isDeleting = false;
      currentLineIndex = (currentLineIndex + 1) % typingLines.length;
      setTimeout(typeAnimation, 500);
    }
  }
}

// ============================================================================
// CHARACTER REVEAL ANIMATION
// ============================================================================

function revealCharacter() {
  const heading = "Hi, I'm Prajal Gautam";
  const charRevealElement = document.getElementById('charReveal');
  let charIndex = 0;

  function addCharacter() {
    if (charIndex < heading.length) {
      charRevealElement.textContent += heading[charIndex];
      charIndex++;
      setTimeout(addCharacter, 50);
    }
  }

  addCharacter();
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      
      // Animate skill bars
      if (entry.target.classList.contains('skill-bar')) {
        const skillValue = entry.target.getAttribute('data-value');
        entry.target.style.setProperty('--value', skillValue);
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ============================================================================
// BACK TO TOP BUTTON
// ============================================================================

const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.pointerEvents = 'auto';
      backToTopButton.style.transform = 'scale(1)';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.pointerEvents = 'none';
      backToTopButton.style.transform = 'scale(0.8)';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================================================
// NAVIGATION ACTIVE LINK
// ============================================================================

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-blue-400', 'font-semibold');
      
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('text-blue-400', 'font-semibold');
      } else {
        link.classList.add('text-slate-300');
      }
    });
  });
}

// ============================================================================
// FORM VALIDATION & SUBMISSION
// ============================================================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('error-name');
  const emailError = document.getElementById('error-email');
  const messageError = document.getElementById('error-message');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(inputField, errorElement, message) {
    inputField.classList.add('border-red-500');
    inputField.classList.add('bg-red-500', 'bg-opacity-5');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  function clearError(inputField, errorElement) {
    inputField.classList.remove('border-red-500');
    inputField.classList.remove('bg-red-500', 'bg-opacity-5');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Name is required');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'Email is required');
      isValid = false;
    } else if (!validateEmail(emailInput.value)) {
      showError(emailInput, emailError, 'Please provide a valid email');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      showError(messageInput, messageError, 'Message is required');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, messageError, 'Message must be at least 10 characters');
      isValid = false;
    } else {
      clearError(messageInput, messageError);
    }

    if (isValid) {
      // Form is valid - could send data here if you have a backend
      showToast('Message sent successfully!', 'success');
      contactForm.reset();
      nameInput.classList.remove('border-red-500', 'bg-red-500', 'bg-opacity-5');
      emailInput.classList.remove('border-red-500', 'bg-red-500', 'bg-opacity-5');
      messageInput.classList.remove('border-red-500', 'bg-red-500', 'bg-opacity-5');
    }
  });

  // Real-time validation
  nameInput.addEventListener('blur', () => {
    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Name is required');
    } else {
      clearError(nameInput, nameError);
    }
  });

  emailInput.addEventListener('blur', () => {
    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'Email is required');
    } else if (!validateEmail(emailInput.value)) {
      showError(emailInput, emailError, 'Please provide a valid email');
    } else {
      clearError(emailInput, emailError);
    }
  });

  messageInput.addEventListener('blur', () => {
    if (!messageInput.value.trim()) {
      showError(messageInput, messageError, 'Message is required');
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, messageError, 'Message must be at least 10 characters');
    } else {
      clearError(messageInput, messageError);
    }
  });
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = 'fixed bottom-6 right-6 px-6 py-3 rounded-lg font-medium z-50 transition-opacity duration-300';
  
  // Set background color based on type
  if (type === 'success') {
    toast.classList.add('bg-green-500', 'text-white');
  } else if (type === 'error') {
    toast.classList.add('bg-red-500', 'text-white');
  } else {
    toast.classList.add('bg-blue-500', 'text-white');
  }
  
  toast.style.opacity = '1';
  
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 3000);
}

// ============================================================================
// THEME TOGGLE
// ============================================================================

const themeToggle = document.getElementById('themeToggle');

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ============================================================================
// DOWNLOAD RESUME
// ============================================================================

const downloadButton = document.getElementById('downloadResume');

if (downloadButton) {
  downloadButton.addEventListener('click', async () => {
    try {
      const response = await fetch('resume.pdf', { method: 'HEAD' });
      
      if (response.ok) {
        const link = document.createElement('a');
        link.href = 'resume.pdf';
        link.download = 'Prajal_Gautam_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Resume downloaded successfully!', 'success');
      } else {
        showToast('Resume file not found', 'error');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      showToast('Failed to download resume', 'error');
    }
  });
}

// ============================================================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ============================================================================
// MOBILE MENU TOGGLE (if implemented)
// ============================================================================

const mobileMenuButton = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Start animations
  revealCharacter();
  setTimeout(typeAnimation, 500);
  updateActiveNavLink();
  initTheme();

  // Observe elements for scroll animations
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  document.querySelectorAll('.skill-bar').forEach(el => {
    observer.observe(el);
  });

  // Initial back-to-top state
  if (backToTopButton) {
    backToTopButton.style.opacity = '0';
    backToTopButton.style.transform = 'scale(0.8)';
    backToTopButton.style.transition = 'opacity 300ms, transform 300ms';
  }
});
