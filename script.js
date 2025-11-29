    // Three.js Scene Setup - Twinkling Stars
    const canvas = document.getElementById('three-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 50;

    // Create star texture
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 32;
    starCanvas.height = 32;
    const starCtx = starCanvas.getContext('2d');
    
    // Draw star shape
    starCtx.fillStyle = 'white';
    starCtx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const x = 16 + Math.cos(angle) * 14;
      const y = 16 + Math.sin(angle) * 14;
      if (i === 0) starCtx.moveTo(x, y);
      else starCtx.lineTo(x, y);
    }
    starCtx.closePath();
    starCtx.fill();
    
    const starTexture = new THREE.CanvasTexture(starCanvas);

    // Create twinkling stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 2000;
    const posArray = new Float32Array(starsCount * 3);
    const colorsArray = new Float32Array(starsCount * 3);
    const sizesArray = new Float32Array(starsCount);
    const twinklePhase = new Float32Array(starsCount);

    // Vibrant star colors
    const starColors = [
      new THREE.Color(0x00d9ff), // cyan
      new THREE.Color(0x0080ff), // blue
      new THREE.Color(0x00fff9), // teal
      new THREE.Color(0x00ff88), // green
      new THREE.Color(0xffd700), // gold
      new THREE.Color(0xff00ff), // magenta
      new THREE.Color(0xffffff), // white
    ];

    for (let i = 0; i < starsCount; i++) {
      // Spread stars across the scene
      posArray[i * 3] = (Math.random() - 0.5) * 300;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 300;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 300;

      // Assign random colors
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      colorsArray[i * 3] = color.r;
      colorsArray[i * 3 + 1] = color.g;
      colorsArray[i * 3 + 2] = color.b;

      // Random size
      sizesArray[i] = Math.random() * 3 + 1;
      
      // Random twinkle phase
      twinklePhase[i] = Math.random() * Math.PI * 2;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));

    const starsMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      map: starTexture,
      blending: THREE.AdditiveBlending,
    });

    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // Mouse movement and 3D position
    let mouseX = 0;
    let mouseY = 0;
    let mouse3D = new THREE.Vector3();

    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Convert 2D mouse to 3D world position
      mouse3D.set(mouseX * 50, mouseY * 50, 0);
    });

    // Animation loop with twinkling
    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      // Slow rotation
      starsMesh.rotation.y += 0.0005;
      starsMesh.rotation.x += 0.0002;

      // Twinkling and mouse repulsion effect
      const positions = starsGeometry.attributes.position.array;
      const sizes = starsGeometry.attributes.size.array;
      
      for (let i = 0; i < starsCount; i++) {
        const i3 = i * 3;
        
        // Get star position
        const starX = positions[i3];
        const starY = positions[i3 + 1];
        const starZ = positions[i3 + 2];
        
        // Calculate distance to mouse
        const dx = starX - mouse3D.x;
        const dy = starY - mouse3D.y;
        const dz = starZ - mouse3D.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        // Apply repulsion force if close to mouse
        const repulsionRadius = 30; // How far the effect reaches
        const repulsionStrength = 0.5; // How strong the push is
        
        if (distance < repulsionRadius && distance > 0) {
          const force = (1 - distance / repulsionRadius) * repulsionStrength;
          
          // Push stars away from mouse
          positions[i3] += (dx / distance) * force;
          positions[i3 + 1] += (dy / distance) * force;
          positions[i3 + 2] += (dz / distance) * force;
        }
        
        // Twinkling effect
        const phase = twinklePhase[i];
        const twinkle = Math.sin(time + phase) * 0.5 + 1;
        sizes[i] = (Math.random() * 3 + 1) * twinkle;
      }
      
      starsGeometry.attributes.position.needsUpdate = true;
      starsGeometry.attributes.size.needsUpdate = true;

      // Camera follows mouse
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Star Trail Effect on Mouse Move - Enhanced Visibility
    const trailColors = ['#00d9ff', '#0080ff', '#00f5ff', '#00fff9', '#00ff88', '#ffd700'];
    document.addEventListener('mousemove', (e) => {
      // Increased probability from 0.2 to 0.6 for more frequent stars
      if (Math.random() < 0.6) {
        const star = document.createElement('div');
        star.innerHTML = '✦';
        star.style.position = 'fixed';
        star.style.left = e.clientX + 'px';
        star.style.top = e.clientY + 'px';
        // Increased size range from 10-30 to 20-40
        star.style.fontSize = (Math.random() * 20 + 20) + 'px';
        star.style.color = trailColors[Math.floor(Math.random() * trailColors.length)];
        star.style.pointerEvents = 'none';
        star.style.zIndex = '9999';
        star.style.opacity = '1';
        // Increased duration from 1s to 1.5s
        star.style.transition = 'all 1.5s ease-out';
        // Enhanced glow with multiple shadow layers for more visibility
        star.style.textShadow = `
          0 0 10px currentColor,
          0 0 20px currentColor,
          0 0 30px currentColor,
          0 0 40px currentColor
        `;
        star.style.filter = 'brightness(1.5)';
        document.body.appendChild(star);
        
        setTimeout(() => {
          star.style.opacity = '0';
          star.style.transform = `scale(0.3) rotate(${Math.random() * 360}deg) translateY(-${Math.random() * 100 + 50}px)`;
        }, 10);
        
        // Increased cleanup time from 1000ms to 1500ms to match duration
        setTimeout(() => {
          star.remove();
        }, 1500);
      }
    });

    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
      const scrollProgress = document.getElementById('scrollProgress');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    });

    // Fade-in on Scroll
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.content-section').forEach(section => {
      observer.observe(section);
    });

    // Form Submission - Opens Gmail with pre-filled template
    document.getElementById('emailForm').addEventListener('submit', (e) => {
      e.preventDefault();
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

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });

    // Custom Star Cursor
    const cursor = document.querySelector('.cursor');
    
    let cursorX = 0;
    let cursorY = 0;

    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      
      // Update cursor position immediately
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
    });

    // Add hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .project-card, .stat-card, .skills-list li');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });

    // Add click animation
    document.addEventListener('mousedown', () => {
      cursor.classList.add('cursor-click');
      setTimeout(() => {
        cursor.classList.remove('cursor-click');
      }, 300);
    });

    // Hide cursor on mobile/tablet
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
      cursor.style.display = 'none';
      document.body.style.cursor = 'default';
    }

    // Terminal Typing Animation
    const terminalBody = document.getElementById('terminalBody');
    const commands = [
      { cmd: 'whoami', output: 'usama-ahmad' },
      { cmd: 'pwd', output: '/home/usama/portfolio' },
      { cmd: 'ls -la skills/', output: 'HTML5  CSS3  JavaScript  React  Node.js  Three.js' },
      { cmd: 'cat about.txt', output: 'Computer Science Graduate | Web Developer | Creative Designer\n\nPassionate about building stunning, user-friendly web experiences.\nConstantly learning and pushing the boundaries of web development.' },
      { cmd: 'echo $PASSION', output: 'Web Development & Innovation ✨' },
      { cmd: 'neofetch', output: `<span class="terminal-ascii">╔═══════════════════════════╗
║   USAMA AHMAD PORTFOLIO   ║
╚═══════════════════════════╝</span>
<span class="terminal-output info">OS:</span> <span class="terminal-output highlight">Web Developer</span>
<span class="terminal-output info">Specialization:</span> <span class="terminal-output highlight">Front-End Development</span>
<span class="terminal-output info">Technologies:</span> <span class="terminal-output highlight">6+ Skills</span>
<span class="terminal-output info">Projects:</span> <span class="terminal-output highlight">3+ Completed</span>
<span class="terminal-output info">Status:</span> <span class="terminal-output highlight">Ready to innovate</span>` }
    ];

    let currentCommandIndex = 0;
    let currentCharIndex = 0;
    let isTypingCommand = true;
    let currentLine = null;

    function typeTerminal() {
      if (currentCommandIndex >= commands.length) {
        // Add final cursor
        const cursorEl = document.createElement('span');
        cursorEl.className = 'terminal-cursor';
        terminalBody.appendChild(cursorEl);
        return;
      }

      const currentCmd = commands[currentCommandIndex];

      if (isTypingCommand) {
        // Create new line if needed
        if (!currentLine) {
          currentLine = document.createElement('div');
          currentLine.className = 'terminal-line';
          
          const prompt = document.createElement('span');
          prompt.className = 'terminal-prompt';
          prompt.textContent = 'usama@portfolio:~$ ';
          currentLine.appendChild(prompt);
          
          const commandSpan = document.createElement('span');
          commandSpan.className = 'terminal-command';
          currentLine.appendChild(commandSpan);
          
          terminalBody.appendChild(currentLine);
        }

        // Type command character by character
        const commandSpan = currentLine.querySelector('.terminal-command');
        if (currentCharIndex < currentCmd.cmd.length) {
          commandSpan.textContent += currentCmd.cmd[currentCharIndex];
          currentCharIndex++;
          setTimeout(typeTerminal, 50); // Typing speed
        } else {
          // Command finished, show output
          isTypingCommand = false;
          currentCharIndex = 0;
          currentLine = null;
          setTimeout(typeTerminal, 200);
        }
      } else {
        // Show output
        const outputDiv = document.createElement('div');
        outputDiv.className = 'terminal-output';
        outputDiv.innerHTML = currentCmd.output;
        terminalBody.appendChild(outputDiv);

        // Move to next command
        currentCommandIndex++;
        isTypingCommand = true;
        currentLine = null;
        setTimeout(typeTerminal, 400);
      }
    }

    // Start typing animation when terminal is in view
    const terminalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && currentCommandIndex === 0) {
          setTimeout(typeTerminal, 500);
        }
      });
    }, { threshold: 0.5 });

    terminalObserver.observe(document.getElementById('terminal'));
  
