const menu=document.querySelector('.menu'),links=document.querySelector('.links');
menu?.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.opacity=1;e.target.style.transform='none';io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.lab,.skill-grid article,.pipeline>div,.education>div,.contact-links a').forEach((el,i)=>{el.style.opacity=0;el.style.transform='translateY(16px)';el.style.transition=`opacity .55s ease ${i%5*70}ms,transform .55s ease ${i%5*70}ms`;io.observe(el)});


const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('sender-name').value.trim();
  const email = document.getElementById('sender-email').value.trim();
  const message = document.getElementById('sender-message').value.trim();
  const subject = `Portfolio inquiry from ${name}`;
  const body = `Hi Usama,\n\n${message}\n\nFrom: ${name}\nReply email: ${email}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mlkusama360@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(gmailUrl, '_blank', 'noopener,noreferrer');
});
