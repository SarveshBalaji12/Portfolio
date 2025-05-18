document.addEventListener("DOMContentLoaded", function () {
  // ======= VIDEO INTERACTIONS =======
  const projectVideos = document.querySelectorAll('video[id^="project"]');

  projectVideos.forEach(function (video) {
    video.addEventListener('mouseover', function () {
      this.play();
    });

    video.addEventListener('mouseout', function () {
      this.pause();
    });
  });

  // ======= MOBILE MENU TOGGLE =======
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const backToTopBtn = document.getElementById('back-to-top');

  // Mobile menu functionality with improved touch handling
  if (mobileMenuToggle && mobileMenu) {
    const toggleMenu = (e) => {
      e.preventDefault();
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && 
          !mobileMenuToggle.contains(e.target) && 
          mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Improved touch handling for iOS
    document.addEventListener('touchstart', (e) => {
      if (!mobileMenu.contains(e.target) && 
          !mobileMenuToggle.contains(e.target) && 
          mobileMenu.classList.contains('active')) {
        e.preventDefault();
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    }, { passive: false });
  }

  // ======= SMOOTH SCROLLING =======
  const scrollToSection = (targetId) => {
    const target = document.querySelector(targetId);
    if (target) {
      const offset = window.innerWidth <= 768 ? 60 : 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      // Check if smooth scrolling is supported
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback for browsers that don't support smooth scrolling
        smoothScrollTo(targetPosition, 500);
      }
    }
  };

  // Smooth scroll fallback function
  function smoothScrollTo(targetPosition, duration) {
    const start = window.pageYOffset;
    const distance = targetPosition - start;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo(0, start + distance * easeInOutQuad(progress));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
  }

  // Event delegation for navigation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      e.preventDefault();
      scrollToSection(link.getAttribute('href'));
    }

    if (e.target.closest('#back-to-top')) {
      e.preventDefault();
      scrollToSection('#');
    }
  });

  // Optimize scroll event listeners using requestAnimationFrame
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (backToTopBtn) {
          backToTopBtn.classList.toggle('visible', window.scrollY > 300);
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ======= SKILLS SLIDER ANIMATION =======
  const skillsSlider = document.getElementById('skills-slider');

  if (skillsSlider) {
    const sliderItems = Array.from(skillsSlider.querySelectorAll('.item'));
    const itemCount = sliderItems.length;
    const isReverse = skillsSlider.getAttribute('reverse') === 'true';
    
    // Use CSS custom properties for smoother animations
    sliderItems.forEach((item, index) => {
      item.style.setProperty('--position', index + 1);
    });

    // Reduce animation interval for better performance
    let currentPosition = 0;
    const moveSlider = () => {
      requestAnimationFrame(() => {
        currentPosition = isReverse ? 
          (currentPosition - 1 + itemCount) % itemCount : 
          (currentPosition + 1) % itemCount;

        sliderItems.forEach((item, index) => {
          const newPosition = ((index - currentPosition + itemCount) % itemCount) + 1;
          item.style.setProperty('--position', newPosition);
        });
      });
    };

    setInterval(moveSlider, 3000);
  }

  // ======= PROJECT WEBSITE BUTTON =======
  const websiteBtn = document.querySelector('.website-btn');
  if (websiteBtn) {
    websiteBtn.addEventListener('click', function () {
      window.location.href = 'https://sarvesh-balaji-htmlcss.netlify.app';
    });
  }

  // Video Background Optimization
  const backVideo = document.querySelector('.back-video');
  if (backVideo) {
    // Optimize video loading
    backVideo.preload = "auto";
    
    // Handle video loading in the loader
    backVideo.addEventListener('loadeddata', () => {
      loadedAssets++;
      updateLoader();
    });
    
    // Optimize video playback
    backVideo.addEventListener('canplay', () => {
      // Use requestAnimationFrame for smooth playback
      requestAnimationFrame(() => {
        backVideo.play().catch(() => {
          // Fallback for browsers that block autoplay
          document.addEventListener('click', () => {
            backVideo.play();
          }, { once: true });
        });
      });
    });
    
    // Pause video when not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        backVideo.pause();
      } else {
        backVideo.play().catch(() => {});
      }
    });
    
    // Reduce video quality on mobile
    if (window.innerWidth <= 768) {
      backVideo.setAttribute('playbackQuality', 'small');
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const websiteBtn = document.querySelector('.website-btn');

  if (websiteBtn) {
    websiteBtn.addEventListener('click', function () {
      window.location.href = 'https://sarvesh-balaji-htmlcss.netlify.app'; // Replace with your actual project URL
    });
  }
});

// ======= RESPONSIVE VIDEO POSITIONING =======
const adjustVideoPositioning = () => {
  const blackholeVideo = document.querySelector('.blackhole-box video');
  if (blackholeVideo) {
    // Adjust video positioning based on screen width
    if (window.innerWidth <= 480) {
      // Very small screens
      blackholeVideo.style.marginTop = '-2%';
      blackholeVideo.style.width = '180%';
      blackholeVideo.style.transform = 'translateX(-22%)';
    } else if (window.innerWidth <= 768) {
      // Regular mobile screens
      blackholeVideo.style.marginTop = '-5%';
      blackholeVideo.style.width = '150%';
      blackholeVideo.style.transform = 'translateX(-15%)';
    } else if (window.innerWidth <= 1024) {
      // Tablets
      blackholeVideo.style.marginTop = '-15%';
      blackholeVideo.style.width = '120%';
      blackholeVideo.style.transform = 'translateX(-8%)';
    } else {
      // Desktop - use original styles
      blackholeVideo.style.marginTop = '-23.5%';
      blackholeVideo.style.width = '100%';
      blackholeVideo.style.transform = 'none';
    }
  }
};

// Run once on page load
adjustVideoPositioning();

// Run on window resize
window.addEventListener('resize', adjustVideoPositioning);

// ======= EXISTING CODE CONTINUES BELOW =======
// ======= VIDEO INTERACTIONS =======
const projectVideos = document.querySelectorAll('video[id^="project"]');

projectVideos.forEach(function (video) {
  video.addEventListener('mouseover', function () {
    this.play();
  });

  video.addEventListener('mouseout', function () {
    this.pause();
  });
});

// ======= MOBILE MENU TOGGLE =======
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && 
        !mobileMenuToggle.contains(event.target) && 
        mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
  });
}

// ======= SMOOTH SCROLLING =======
const scrollToSection = (targetId) => {
  const target = document.querySelector(targetId);
  if (target) {
    // Adjust offset for mobile vs desktop
    const offset = window.innerWidth <= 768 ? 60 : 80;
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth'
    });
  }
};

// All navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    scrollToSection(targetId);
  });
});

// Scroll down indicator
const scrollDown = document.getElementById('scroll-down');
if (scrollDown) {
  scrollDown.addEventListener('click', function () {
    scrollToSection('#about-section');
  });
}

// Contact buttons
const contactBtns = document.querySelectorAll('#contact-btn, #contact-card-btn');
contactBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    scrollToSection('#contact-section');
  });
});

// ======= BACK TO TOP BUTTON =======
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ======= SCROLL ANIMATIONS =======
const animateOnScroll = () => {
  const elementsToAnimate = document.querySelectorAll('.autoBlur, .autoDisplay');

  elementsToAnimate.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.8) {
      element.classList.add('in-view');
    }
  });
};

animateOnScroll();
window.addEventListener('scroll', animateOnScroll);

// ======= SKILLS SLIDER ANIMATION =======
const skillsSlider = document.getElementById('skills-slider');

if (skillsSlider) {
  const sliderItems = skillsSlider.querySelectorAll('.item');
  const itemCount = sliderItems.length;
  const isReverse = skillsSlider.getAttribute('reverse') === 'true';
  let currentPosition = 0;

  const moveSlider = () => {
    if (isReverse) {
      currentPosition = (currentPosition - 1 + itemCount) % itemCount;
    } else {
      currentPosition = (currentPosition + 1) % itemCount;
    }

    sliderItems.forEach((item, index) => {
      const newPosition = ((index - currentPosition + itemCount) % itemCount) + 1;
      item.style.setProperty('--position', newPosition);
    });
  };

  sliderItems.forEach((item, index) => {
    item.style.setProperty('--position', index + 1);
  });

  setInterval(moveSlider, 3000);
}

// ======= PROJECT WEBSITE BUTTON =======
const websiteBtn = document.querySelector('.website-btn');
if (websiteBtn) {
  websiteBtn.addEventListener('click', function () {
    window.location.href = 'https://sarvesh-balaji-htmlcss.netlify.app';
  });
}

// Loader functionality
const loaderWrapper = document.querySelector('.loader-wrapper');
const loaderProgress = document.querySelector('.loader-progress');
const loaderPercentage = document.querySelector('.loader-percentage');

let progress = 0;
const totalAssets = document.querySelectorAll('img, video').length;
let loadedAssets = 0;

function updateLoader() {
    progress = (loadedAssets / totalAssets) * 100;
    loaderProgress.style.width = `${progress}%`;
    loaderPercentage.textContent = `${Math.round(progress)}%`;
    
    if (progress >= 100) {
        setTimeout(() => {
            loaderWrapper.classList.add('fade-out');
            document.body.style.overflow = '';
            setTimeout(() => {
                loaderWrapper.style.display = 'none';
            }, 500);
        }, 500);
    }
}

// Track loading of images and videos
document.querySelectorAll('img, video').forEach(element => {
    if (element.complete) {
        loadedAssets++;
        updateLoader();
    } else {
        element.addEventListener('load', () => {
            loadedAssets++;
            updateLoader();
        });
        element.addEventListener('error', () => {
            loadedAssets++;
            updateLoader();
        });
    }
});

// Ensure loader disappears even if some assets fail to load
setTimeout(() => {
    if (progress < 100) {
        loadedAssets = totalAssets;
        updateLoader();
    }
}, 5000);