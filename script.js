 const projects = [
      {
        id: 1,
        title: 'Memory Master',
        description: 'Built an interactive browser game with dynamic difficulty scaling, smooth rendering, and a replay-friendly loop designed to keep players engaged.',
        category: 'games',
        featured: true,
        tech: ['HTML', 'CSS', 'JavaScript', 'Levels'],
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'High quality board game scene for Memory Master',
        github: 'https://github.com/UsamaAhmad360/Memory-Master',
        live: 'https://usamaahmad360.github.io/Memory-Master/',
        date: 'Dec 2025',
        why: 'Why it matters: turns a quick session into a useful memory workout that feels fun instead of repetitive.',
        learned: 'What I learned: animation timing, state recovery, and keeping gameplay smooth across repeated rounds.',
        meta: [{ label: 'Levels', value: 'Infinite' }, { label: 'Latency', value: '16ms' }, { label: 'Focus', value: 'Memory' }]
      },
      {
        id: 2,
        title: 'Math Master',
        description: 'Built a fast-paced arithmetic challenge that sharpens calculation speed and accuracy under time pressure.',
        category: 'games',
        featured: true,
        tech: ['HTML', 'CSS', 'JavaScript', 'Game Logic'],
        image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'High quality workspace image for Math Master',
        github: 'https://github.com/UsamaAhmad360/Math-Master-Game',
        live: 'https://usamaahmad360.github.io/Math-Master-Game/',
        date: 'Jan 2026',
        why: 'Why it matters: turns practice into a short, repeatable drill for students, founders, and developers alike.',
        learned: 'What I learned: timer-driven state management and difficulty tuning that keeps the pace challenging.',
        meta: [{ label: 'Modes', value: '4' }, { label: 'Difficulty', value: 'Adaptive' }, { label: 'Timer', value: 'Live' }]
      },
      {
        id: 3,
        title: 'LAN File Share',
        description: 'Built a cross-device file sharing system that lets any browser on the same LAN transfer files without installation.',
        category: 'tools',
        featured: true,
        tech: ['Python', 'Sockets', 'HTTP'],
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'High quality networking hardware image for LAN File Share',
        github: 'https://github.com/UsamaAhmad360/LAN-File-Share',
        live: '',
        date: 'Mar 2026',
        why: 'Why it matters: removes install friction and makes file transfer feel instant on any device in the network.',
        learned: 'What I learned: LAN communication, socket handling, and using HTTP as a simple browser-based delivery layer.',
        meta: [{ label: 'License', value: 'MIT' }, { label: 'Cloud', value: 'None' }, { label: 'Sync', value: 'LAN' }]
      },
      {
        id: 4,
        title: 'Responsive Design Tester',
        description: 'Developed a responsive testing tool that simulates multiple device viewports in real time so layouts can be checked without DevTools.',
        category: 'tools',
        featured: true,
        tech: ['HTML', 'CSS', 'JavaScript'],
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'High quality coding workspace image for Responsive Design Tester',
        github: 'https://github.com/UsamaAhmad360/Responsive-Design-Tester',
        live: '',
        date: 'Feb 2026',
        why: 'Why it matters: speeds up layout QA by putting multiple breakpoints in one workspace.',
        learned: 'What I learned: viewport orchestration, layout syncing, and building a smooth multi-screen preview flow.',
        meta: [{ label: 'Viewports', value: '6+' }, { label: 'Setup', value: '0s' }, { label: 'Audit', value: 'Quick' }]
      }
    ];

    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarLinks = navbarMenu.querySelectorAll('a');
    const projectTabs = document.querySelectorAll('.project-tab');

    function updateScrollProgress() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      scrollProgress.style.width = value + '%';
    }

    function updateNavState() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      let currentId = 'home';

      sections.forEach(section => {
        const top = section.offsetTop - 130;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          currentId = section.id;
        }
      });

      navbarLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
      });
    }

    function createProjectCard(project) {
      const hasLiveLink = project.live && project.live.trim() !== '';

      return `
        <article class="project-card fade-in" data-category="${project.category}">
          <div class="project-media">
            <img src="${project.image}" alt="${project.imageAlt}" loading="lazy" decoding="async">
            <div class="project-media-label">${hasLiveLink ? 'Live demo' : project.category}</div>
          </div>
          <div class="project-content">
            ${project.featured ? '<span class="project-badge">Featured</span>' : ''}
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-story">
              <div class="project-story-row">
                <div class="project-story-label">Why it matters</div>
                <div class="project-story-value">${project.why}</div>
              </div>
              <div class="project-story-row">
                <div class="project-story-label">What I learned</div>
                <div class="project-story-value">${project.learned}</div>
              </div>
            </div>
            <div class="project-tech">
              ${project.tech.map(item => `<span class="tech-chip">${item}</span>`).join('')}
            </div>
            <div class="project-meta-grid">
              ${project.meta.map(item => `
                <div class="project-meta-item">
                  <div class="project-meta-label">${item.label}</div>
                  <div class="project-meta-value">${item.value}</div>
                </div>
              `).join('')}
            </div>
            <div class="project-footer">
              <span class="project-date">${project.date}</span>
              <div class="project-links">
                ${hasLiveLink ? `
                  <a href="${project.live}" target="_blank" rel="noreferrer" class="project-link primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
                    ${project.category === 'games' ? 'Play now' : 'Open demo'}
                  </a>
                ` : ''}
                <a href="${project.github}" target="_blank" rel="noreferrer" class="project-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-6.24 0-1.38.48-2.535 1.26-3.435-.405-1.26.09-3.135.99-3.135 0 0 1.08.345 3.54 1.62 1.035-.285 2.145-.435 3.255-.435s2.22.15 3.255.435c2.46-1.29 3.54-1.62 3.54-1.62.9 0 1.395 1.875.99 3.135.78.9 1.26 2.055 1.26 3.435 0 4.92-2.805 5.94-5.475 6.24.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12C24 5.37 18.63 0 12 0z"></path></svg>
                  Code
                </a>
              </div>
            </div>
          </div>
        </article>
      `;
    }

    function observeElements() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14 });

      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }

    function renderProjects(filter = 'all') {
      const grid = document.getElementById('projectGrid');
      const filtered = filter === 'all' ? projects : projects.filter(project => project.category === filter);
      grid.innerHTML = filtered.map(createProjectCard).join('');
      observeElements();
    }

    window.addEventListener('scroll', () => {
      updateScrollProgress();
      updateNavState();
    }, { passive: true });

    navbarToggle.addEventListener('click', () => {
      const isOpen = navbarMenu.classList.toggle('active');
      navbarToggle.classList.toggle('active', isOpen);
      navbarToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });

    navbarLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
        navbarToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
        navbarToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });

    projectTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        projectTabs.forEach(item => item.classList.remove('active'));
        tab.classList.add('active');
        renderProjects(tab.dataset.category);
      });
    });
	
	
	 // Form Submission - Opens Gmail with pre-filled template
    document.getElementById('contactForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Create email template
      const subject = `Portfolio Contact from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Usama Ahmad's Portfolio Website`;

      // Create Gmail compose URL with pre-filled data
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mlkusama360@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open Gmail in new tab
      window.open(gmailUrl, '_blank');
      
      // Show confirmation and reset form
      alert(`Thank you ${name}! Gmail will open with your message pre-filled. Just click Send!`);
      e.target.reset();
    });

    document.addEventListener('DOMContentLoaded', () => {
      renderProjects();
      updateScrollProgress();
      updateNavState();
    });
