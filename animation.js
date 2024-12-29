// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.querySelector('body');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('overflow-hidden');
});

// Particles Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y, directionX, directionY) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 7 + 1;
        this.baseSize = this.size;
        this.speedX = directionX || (Math.random() * 2 - 1) * 0.5;
        this.speedY = directionY || (Math.random() * 2 - 1) * 0.5;
        this.life = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > this.baseSize) {
            this.size -= 0.1;
        }

        this.life -= 0.01;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    isAlive() {
        return this.life > 0;
    }
}

// Create particle array
const particles = [];
const particleCount = 50;

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Handle mouse interaction
let mouse = {
    x: null,
    y: null,
    radius: 100
};

function createParticlesAtPoint(x, y, count) {
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i;
        const directionX = Math.cos(angle);
        const directionY = Math.sin(angle);
        particles.push(new Particle(x, y, directionX, directionY));
    }
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createParticlesAtPoint(x, y, 10);
});

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();

        // Check particle interaction with mouse
        if (mouse.x && mouse.y) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const push = (mouse.radius - distance) / mouse.radius;

                particles[i].x += Math.cos(angle) * push;
                particles[i].y += Math.sin(angle) * push;
            }
        }

        if (particles[i].isAlive()) {
            particles[i].draw();
        } else {
            particles.splice(i, 1);
            if (particles.length < particleCount) {
                particles.push(new Particle());
            }
        }
    }

    requestAnimationFrame(animate);
}

// Start animation
animate();

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and elements that should fade in
document.querySelectorAll('section > div, .service-card').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('overflow-hidden');
        }
    });
});