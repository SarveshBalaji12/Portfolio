// Loader functionality
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader-wrapper');
  const container = document.querySelector('.container');
  const progressText = document.querySelector('.loader-percentage');
  let progress = 0;
  let loadingComplete = false;

  // Hide container initially
  if (container) {
    container.style.visibility = 'hidden';
    container.style.opacity = '0';
  }

  // Function to simulate loading progress
  function updateLoader() {
    if (progress < 100) {
      // Increment progress more naturally
      const increment = (100 - progress) / 10;
      progress += Math.max(0.5, increment);
      
      // Update the text
      if (progressText) {
        progressText.textContent = `${Math.round(progress)}%`;
      }

      // Schedule next update with dynamic timing
      if (progress < 100) {
        setTimeout(updateLoader, 50);
      } else {
        finishLoading();
      }
    }
  }

  // Function to finish loading
  function finishLoading() {
    if (!loadingComplete && loader && container) {
      loadingComplete = true;
      loader.classList.add('fade-out');
      
      setTimeout(() => {
        loader.style.display = 'none';
        container.style.visibility = 'visible';
        container.classList.add('visible');
        container.style.opacity = '1';
      }, 500);
    }
  }

  // Start loading after a short delay
  setTimeout(() => {
    // Ensure resources are loaded
    Promise.all([
      // Wait for document ready
      new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve);
        }
      }),
      // Minimum display time
      new Promise(resolve => setTimeout(resolve, 1000))
    ]).then(() => {
      updateLoader();
    });
  }, 100);
});

// Typing Animation
document.addEventListener('DOMContentLoaded', () => {
  const typingText = document.querySelector('.typing-text');
  const text = "🚀 Launching ideas into scalable realities.";
  let index = 0;
  let isDeleting = false;
  let typingDelay = 70;
  let deletingDelay = 30;
  let pauseDelay = 1200;

  function getRandomDelay(base, variance) {
    return Math.random() * (variance/3) + base;
  }

  function typeText() {
    if (!typingText) return;

    if (!isDeleting && index <= text.length) {
      typingText.textContent = text.substring(0, index);
      index++;
      setTimeout(typeText, getRandomDelay(typingDelay, 30));
    } else if (!isDeleting && index > text.length) {
      isDeleting = true;
      setTimeout(typeText, pauseDelay);
    } else if (isDeleting && index > 0) {
      typingText.textContent = text.substring(0, index - 1);
      index--;
      setTimeout(typeText, deletingDelay);
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      setTimeout(typeText, 200);
    }
  }

  // Start the typing animation
  setTimeout(typeText, 1000);
});

// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in class to elements we want to animate
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.card, .hero-info, .project-card, .skills-box');
  
  animateElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
  });
});

// Handle scroll events efficiently
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Update scroll-based animations
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Handle resize events efficiently
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const handleResize = debounce(() => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}, 250);

window.addEventListener('resize', handleResize);
handleResize();

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}); 