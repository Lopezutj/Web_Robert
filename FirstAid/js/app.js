
    document.addEventListener('DOMContentLoaded', function() {
      // Initialize AOS animations
      AOS.init({
        duration: 800,
        once: true,
        offset: 100
      });

      // Get elements
      const sidebar = document.getElementById('sidebar');
      const sidebarToggle = document.getElementById('sidebar-toggle');
      const backToMenuBtn = document.getElementById('back-to-menu');
      const navItems = document.querySelectorAll('.nav-item');
      const sections = document.querySelectorAll('.section-content');
      const loadingIndicator = document.getElementById('loading-indicator');

      // Toggle sidebar on mobile
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
      });

      // Handle navigation items click
      navItems.forEach(item => {
        item.addEventListener('click', function() {
          const sectionId = this.getAttribute('data-section');
          
          // Show loading indicator
          loadingIndicator.style.display = 'block';
          
          // Reset active state for all nav items
          navItems.forEach(navItem => navItem.classList.remove('active'));
          
          // Set this nav item as active
          this.classList.add('active');
          
          // On mobile, close the sidebar after selection
          if (window.innerWidth < 992) {
            sidebar.classList.remove('active');
          }
          
          // Simulate loading delay (would be replaced by actual API calls in final version)
          setTimeout(() => {
            // Hide all sections
            sections.forEach(section => section.classList.remove('section-active'));
            
            // Show selected section
            const targetSection = document.getElementById(`${sectionId}-section`);
            if (targetSection) {
              targetSection.classList.add('section-active');
              
              // Re-trigger AOS animations in the visible section
              AOS.refresh();
              
              // Show back to menu button except on intro section
              if (sectionId !== 'intro') {
                backToMenuBtn.style.display = 'flex';
              } else {
                backToMenuBtn.style.display = 'none';
              }
            }
            
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
            
            // Scroll to top of content
            document.getElementById('content-area').scrollTop = 0;
          }, 500);
        });
      });

      // Back to menu button click handler
      backToMenuBtn.addEventListener('click', function() {
        // Find intro nav item and trigger click
        const introNavItem = document.querySelector('[data-section="intro"]');
        if (introNavItem) {
          introNavItem.click();
        }
      });

      // Handle window resize
      window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
          sidebar.classList.add('active');
        } else {
          sidebar.classList.remove('active');
        }
      });
      
      // Lazy loading for images
      const lazyImages = document.querySelectorAll('.gallery-image');
      
      const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            lazyImageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(image => lazyImageObserver.observe(image));
    });

    
