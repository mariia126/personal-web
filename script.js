// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.themeIcon = document.querySelector('.theme-icon');
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    
    this.init();
  }

  init() {
    // Set initial theme
    this.setTheme(this.currentTheme);
    
    // Add event listener for theme toggle
    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Add keyboard support
    this.themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(this.currentTheme);
    this.saveTheme();
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update icon
    if (theme === 'dark') {
      this.themeIcon.textContent = '◐';
    } else {
      this.themeIcon.textContent = '◑';
    }
    
    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Remove transition after animation completes
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  saveTheme() {
    localStorage.setItem('theme', this.currentTheme);
  }
}

// Smooth scrolling for navigation
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Intersection Observer for animations
class AnimationObserver {
  constructor() {
    this.init();
  }

  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  }
}

// Typing animation for the name
class TypingAnimation {
  constructor() {
    this.nameElement = document.querySelector('.name');
    this.init();
  }

  init() {
    if (this.nameElement) {
      const text = this.nameElement.textContent;
      this.nameElement.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          this.nameElement.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      // Start typing animation after a short delay
      setTimeout(typeWriter, 500);
    }
  }
}

// Particle background effect
class ParticleBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.init();
  }

  init() {
    this.createCanvas();
    this.createParticles();
    this.animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.opacity = '0.1';
    
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary');
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Skill tags hover effect
class SkillTagsEffect {
  constructor() {
    this.init();
  }

  init() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.05) translateY(-2px)';
      });
      
      tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1) translateY(0)';
      });
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new SmoothScroll();
  new AnimationObserver();
  new TypingAnimation();
  new ParticleBackground();
  new SkillTagsEffect();
  
  // Add loading animation completion
  document.body.classList.add('loaded');
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
  // Add hover effects to cards
  const cards = document.querySelectorAll('.experience-item, .education-item, .skill-category, .project-item, .blog-post, .language-item, .certification-item');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
  
  // Add click effect to theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      themeToggle.style.transform = 'scale(1)';
    }, 150);
  });
});
