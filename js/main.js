// KM Group Fencing Solutions - Client Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Sticky Header scroll effect
  // ==========================================
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger on load in case of refresh

  // ==========================================
  // 2. Mobile Menu Navigation
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = mobileNav.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    mobileToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileBackdrop.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    mobileToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileToggle.addEventListener('click', toggleMobileMenu);
  mobileBackdrop.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // ==========================================
  // 3. Navigation Active Link Tracking
  // ==========================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link, .mobile-nav .nav-link');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 120; // Offset for header height

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
        const currentId = section.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav);

  // ==========================================
  // 4. Portfolio Filter Logic
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Set active button style
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        // Hide/Show with fade animation
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // 5. Gallery Lightbox Modal
  // ==========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-image');
      const captionText = item.querySelector('.gallery-title').innerText;
      const categoryText = item.querySelector('.gallery-cat').innerText;

      lightboxImg.src = imgSrc;
      lightboxCaption.innerHTML = `<strong>${captionText}</strong> - ${categoryText}`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
      closeLightbox();
    }
  });

  // ==========================================
  // 6. Interactive District Map Highlights
  // ==========================================
  const districtPills = document.querySelectorAll('.district-pill');
  const mapNodes = document.querySelectorAll('.map-node');

  // Hovering over list pills highlights map nodes
  districtPills.forEach(pill => {
    const targetDistrict = pill.getAttribute('data-district');
    const correspondingNode = document.querySelector(`.map-node[data-district="${targetDistrict}"]`);

    pill.addEventListener('mouseenter', () => {
      if (correspondingNode) {
        correspondingNode.querySelector('circle:first-child').style.r = '18';
        correspondingNode.querySelector('circle:first-child').style.fill = 'var(--accent-gold)';
        correspondingNode.querySelector('circle:first-child').style.opacity = '0.6';
        pill.style.backgroundColor = 'var(--accent-gold)';
        pill.style.color = 'var(--primary-navy)';
      }
    });

    pill.addEventListener('mouseleave', () => {
      if (correspondingNode) {
        correspondingNode.querySelector('circle:first-child').style.r = '';
        correspondingNode.querySelector('circle:first-child').style.fill = '';
        correspondingNode.querySelector('circle:first-child').style.opacity = '';
        pill.style.backgroundColor = '';
        pill.style.color = '';
      }
    });
  });

  // Hovering over map nodes highlights list pills
  mapNodes.forEach(node => {
    const targetDistrict = node.getAttribute('data-district');
    const correspondingPill = document.querySelector(`.district-pill[data-district="${targetDistrict}"]`);

    node.addEventListener('mouseenter', () => {
      node.querySelector('circle:first-child').style.r = '18';
      node.querySelector('circle:first-child').style.fill = 'var(--accent-gold)';
      node.querySelector('circle:first-child').style.opacity = '0.6';
      
      if (correspondingPill) {
        correspondingPill.style.backgroundColor = 'var(--accent-gold)';
        correspondingPill.style.color = 'var(--primary-navy)';
        correspondingPill.style.transform = 'translateY(-2px)';
      }
    });

    node.addEventListener('mouseleave', () => {
      node.querySelector('circle:first-child').style.r = '';
      node.querySelector('circle:first-child').style.fill = '';
      node.querySelector('circle:first-child').style.opacity = '';

      if (correspondingPill) {
        correspondingPill.style.backgroundColor = '';
        correspondingPill.style.color = '';
        correspondingPill.style.transform = '';
      }
    });
  });

  // ==========================================
  // 7. Scroll Reveal Trigger
  // ==========================================
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;

      if (revealTop < triggerBottom) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  // Trigger on load for elements already in view
  revealOnScroll();

  // ==========================================
  // 8. Contact Form Handling
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const service = document.getElementById('form-service').value;
    const location = document.getElementById('form-location').value.trim();
    const details = document.getElementById('form-message').value.trim();

    // Reset status
    formStatus.style.display = 'none';
    formStatus.className = 'form-status';

    // Simple validation
    if (!name || !phone || !service || !location) {
      formStatus.innerText = 'Please fill out all required fields.';
      formStatus.classList.add('error');
      formStatus.style.display = 'block';
      return;
    }

    if (phone.length < 10) {
      formStatus.innerText = 'Please enter a valid 10-digit phone number.';
      formStatus.classList.add('error');
      formStatus.style.display = 'block';
      return;
    }

    // Success response simulation and WhatsApp redirect
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = 'Opening WhatsApp...';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Format message for WhatsApp
      const whatsappText = `Hi KM Group Fencing Solutions,

I would like to request a quote. Here are my details:
*Name*: ${name}
*Phone*: ${phone}
*Fencing Type*: ${service.toUpperCase()}
*Site Location*: ${location}
${details ? `*Project Details*: ${details}` : ''}`;

      const encodedText = encodeURIComponent(whatsappText);
      const whatsappUrl = `https://wa.me/919645298000?text=${encodedText}`;
      
      // Open WhatsApp chat in new window/tab
      window.open(whatsappUrl, '_blank');

      // Show success on screen
      formStatus.innerHTML = `<strong>Thank you, ${name}!</strong><br>Your quote request has been generated and opened in WhatsApp to chat directly with Riyas K.M at 96452 98000.`;
      formStatus.classList.add('success');
      formStatus.style.display = 'block';

      // Reset button and form
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
    }, 1200);
  });

});
