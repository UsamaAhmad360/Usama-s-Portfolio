 const projects = [
      {
        id: 1,
        title: 'Home SOC & SIEM Lab',
        description: 'Deployed Wazuh SIEM/XDR to centralize telemetry from Windows and Linux endpoints, using Sysmon to capture process, network, and registry activity.',
        category: 'soc',
        featured: true,
        tech: ['Wazuh', 'Sysmon', 'FIM', 'Alert Triage'],
        github: 'https://github.com/UsamaAhmad360/SOC-SIEM-Home-Lab',
        live: '',
        date: '2026',
        why: 'Why it matters: this is the core detection layer every SOC analyst works from day one - knowing how to read and correlate telemetry, not just collect it.',
        learned: 'What I learned: alert triage under noise, custom detection rule tuning, and separating genuine indicators from routine system activity.',
        meta: [{ label: 'Endpoints', value: 'Win + Linux' }, { label: 'Focus', value: 'Triage' }, { label: 'Tool', value: 'Wazuh' }]
      },
      {
        id: 2,
        title: 'DFIR & Memory Forensics Lab',
        description: 'Reconstructed system activity from acquired disk and memory images, recovering deleted files and analyzing memory dumps with Volatility to expose hidden processes and malicious connections.',
        category: 'forensics',
        featured: true,
        tech: ['Volatility', 'Autopsy', 'Chain of Custody'],
        github: 'https://github.com/UsamaAhmad360/DFIR-Memory-Forensics-CaseStudy',
        live: '',
        date: '2026',
        why: 'Why it matters: forensic soundness (write blocking, hash verification) is what separates a usable investigation from a compromised one.',
        learned: 'What I learned: timeline reconstruction, registry/browser artifact analysis, and hidden-process detection in memory dumps.',
        meta: [{ label: 'Evidence', value: 'Disk + RAM' }, { label: 'Integrity', value: 'Hash Verified' }, { label: 'Tool', value: 'Volatility' }]
      },
      {
        id: 3,
        title: 'Malware Analysis Lab',
        description: 'Built an isolated FLARE-VM environment to safely detonate and analyze suspicious executables using static and dynamic analysis techniques.',
        category: 'forensics',
        featured: true,
        tech: ['Ghidra', 'IDA Pro', 'x64dbg', 'FLARE-VM'],
        github: 'https://github.com/UsamaAhmad360/Malware-Analysis-Writeups',
        live: '',
        date: '2026',
        why: 'Why it matters: understanding how malware persists and communicates is what turns an alert into an actionable IOC.',
        learned: 'What I learned: PE analysis, packing/persistence detection, and documenting IOCs in a way an IR team could act on.',
        meta: [{ label: 'Environment', value: 'Isolated VM' }, { label: 'Analysis', value: 'Static + Dynamic' }, { label: 'Output', value: 'IOCs' }]
      },
      {
        id: 4,
        title: 'Network IDS & Suricata Lab',
        description: 'Integrated Suricata IDS/IPS with Wazuh, authored custom detection signatures, and validated coverage by simulating port scans and DoS floods.',
        category: 'network',
        featured: true,
        tech: ['Suricata', 'Wazuh', 'Wireshark'],
        github: 'https://github.com/UsamaAhmad360/Suricata-IDS-Rocky-Linux-Install',
        live: '',
        date: '2026',
        why: 'Why it matters: writing your own detection signatures - not just running defaults - is what proves you understand network-based threats.',
        learned: 'What I learned: custom Suricata rule syntax, and validating detections by cross-referencing Wireshark packet captures.',
        meta: [{ label: 'Rules', value: 'Custom' }, { label: 'Validated', value: 'Wireshark' }, { label: 'OS', value: 'Rocky Linux' }]
      },
      {
        id: 5,
        title: 'Cisco Network Infrastructure Lab',
        description: 'Designed multi-device enterprise network topologies in EVE-NG and Cisco Packet Tracer, implementing VLANs, OSPF, ACLs, and HSRP redundancy.',
        category: 'network',
        featured: false,
        tech: ['Cisco IOS', 'VLANs', 'OSPF', 'ACLs'],
        github: 'https://github.com/UsamaAhmad360/Cisco-Network-Lab-Topologies',
        live: '',
        date: '2026',
        why: 'Why it matters: you can\'t secure a network you don\'t understand - this lab covers the infrastructure a SOC actually monitors.',
        learned: 'What I learned: inter-VLAN routing, redundancy protocols (HSRP/STP), and hardening access with ACLs and NAT.',
        meta: [{ label: 'Topology', value: 'Multi-device' }, { label: 'Redundancy', value: 'HSRP' }, { label: 'Tool', value: 'EVE-NG' }]
      },
      {
        id: 6,
        title: 'Vulnerability Assessment Lab',
        description: 'Scanned Windows Server systems with Nessus and Nmap to enumerate exposed services and misconfigurations, then prioritized findings by CVSS severity.',
        category: 'assessment',
        featured: false,
        tech: ['Nessus', 'Nmap', 'CVSS'],
        github: 'https://github.com/UsamaAhmad360/Vulnerability-Assessment-Reports',
        live: '',
        date: '2026',
        why: 'Why it matters: finding a vulnerability is easy - prioritizing it correctly and writing a fix a sysadmin can act on is the actual job.',
        learned: 'What I learned: CVE research, CVSS scoring in practice, and writing remediation guidance non-security staff can follow.',
        meta: [{ label: 'Scope', value: 'Windows Server' }, { label: 'Scoring', value: 'CVSS' }, { label: 'Output', value: 'Remediation' }]
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

    const categoryGlyphs = {
      soc: '🛰',
      forensics: '🔍',
      network: '🛡',
      assessment: '📋'
    };

    const categoryLabels = {
      soc: 'SOC & SIEM',
      forensics: 'Forensics',
      network: 'Network',
      assessment: 'Assessment'
    };

    function createProjectCard(project) {
      const hasLiveLink = project.live && project.live.trim() !== '';

      return `
        <article class="project-card fade-in" data-category="${project.category}">
          <div class="project-media" style="display:flex;align-items:center;justify-content:center;">
            <span style="font-size:2.75rem;filter:drop-shadow(0 0 12px rgba(0,240,255,0.35));" aria-hidden="true">${categoryGlyphs[project.category] || '🖥'}</span>
            <div class="project-media-label">${categoryLabels[project.category] || project.category}</div>
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
                    Open demo
                  </a>
                ` : ''}
                <a href="${project.github}" target="_blank" rel="noreferrer" class="project-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-6.24 0-1.38.48-2.535 1.26-3.435-.405-1.26.09-3.135.99-3.135 0 0 1.08.345 3.54 1.62 1.035-.285 2.145-.435 3.255-.435s2.22.15 3.255.435c2.46-1.29 3.54-1.62 3.54-1.62.9 0 1.395 1.875.99 3.135.78.9 1.26 2.055 1.26 3.435 0 4.92-2.805 5.94-5.475 6.24.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12C24 5.37 18.63 0 12 0z"></path></svg>
                  Write-up
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
      event.target.reset();
    });

    document.addEventListener('DOMContentLoaded', () => {
      renderProjects();
      updateScrollProgress();
      updateNavState();
    });
