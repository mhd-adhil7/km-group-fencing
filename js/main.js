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

    const nameInput = document.getElementById('form-name');
    const phoneInput = document.getElementById('form-phone');
    const serviceSelect = document.getElementById('form-service');
    const locationInput = document.getElementById('form-location');
    const messageInput = document.getElementById('form-message');

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const serviceVal = serviceSelect.value;
    const location = locationInput.value.trim();
    const details = messageInput.value.trim();

    // Reset status
    formStatus.style.display = 'none';
    formStatus.className = 'form-status';

    function showError(message, element) {
      formStatus.innerText = message;
      formStatus.classList.add('error');
      formStatus.style.display = 'block';
      if (element) element.focus();
    }

    // 1. Required field validation
    if (!name) {
      showError('Please enter your full name.', nameInput);
      return;
    }
    if (name.length < 2) {
      showError('Name must be at least 2 characters long.', nameInput);
      return;
    }
    if (!phone) {
      showError('Please enter your phone number.', phoneInput);
      return;
    }
    
    // Indian phone validation: allows +91, 0, or just 10 digits
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      showError('Please enter a valid 10-digit phone number.', phoneInput);
      return;
    }

    if (!serviceVal) {
      showError('Please select the type of fencing needed.', serviceSelect);
      return;
    }
    if (!location) {
      showError('Please enter your site location.', locationInput);
      return;
    }

    // Get readable text for the selected fencing type
    const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;

    // Format the professional enquiry message
    const whatsappMessage = `*KM Group Fencing - New Quotation Request*
----------------------------------------
*Full Name:* ${name}
*Phone Number:* ${phone}
*Fencing Type:* ${serviceText}
*Site Location:* ${location}
*Project Details:* ${details ? details : 'No additional details provided'}
----------------------------------------
_Sent from KM Group Fencing Solutions website_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919645298000?text=${encodedMessage}`;

    // Success styling and trigger redirect
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = 'Opening WhatsApp...';
    submitBtn.disabled = true;

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank');

    formStatus.innerHTML = `<strong>Success!</strong> Your quotation request has been generated. WhatsApp has been opened to chat directly with Riyas K.M.`;
    formStatus.classList.add('success');
    formStatus.style.display = 'block';

    // Reset form and button after a short delay
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
    }, 1500);
  });

});
