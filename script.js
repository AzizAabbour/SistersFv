document.addEventListener('DOMContentLoaded', () => {
    // --- Custom Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        follower.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
    });

    // Hover effect
    const clickables = document.querySelectorAll('a, button, .gallery-item, #password-submit');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hover'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });

    // Click effect (Ripple)
    document.addEventListener('mousedown', (e) => {
        cursor.classList.add('active');
        const ripple = document.createElement('div');
        ripple.classList.add('cursor-ripple');
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
    document.addEventListener('mouseup', () => cursor.classList.remove('active'));

    // --- Password Protection ---
    const passwordOverlay = document.getElementById('password-overlay');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordError = document.getElementById('password-error');
    const correctPassword = 'safaeandmarwa';

    passwordSubmit.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    function checkPassword() {
        if (passwordInput.value === correctPassword) {
            passwordOverlay.classList.add('hidden');
            // Remove after animation
            setTimeout(() => {
                passwordOverlay.style.display = 'none';
            }, 1000);
        } else {
            passwordError.textContent = 'Incorrect password. Try again with love.';
            passwordInput.value = '';
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 500);
        }
    }

    // --- Loader ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 1000);
        }, 1500);
    });





    // --- Scroll Progress ---
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progressBar').style.width = scrolled + "%";
    });

    // --- Animate On Scroll (AOS) ---
    const aosElements = document.querySelectorAll('[data-aos], .image-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    aosElements.forEach(el => observer.observe(el));

    // --- Subtle Parallax for Story Images ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxImgs = document.querySelectorAll('.gallery-item img');
        parallaxImgs.forEach(img => {
            const speed = 0.05;
            img.style.transform = `translateY(${scrolled * speed}px) scale(1.1)`;
        });
    });

    // --- Gallery Logic ---
    function initGallery(galleryId) {
        const wrapper = document.getElementById(galleryId);
        const items = wrapper.querySelectorAll('.gallery-item');
        const prevBtn = wrapper.closest('.gallery-container').querySelector('.prev-btn');
        const nextBtn = wrapper.closest('.gallery-container').querySelector('.next-btn');
        let currentIndex = 0;

        function updateGallery() {
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            updateGallery();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateGallery();
        });

        // Auto play
        setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            updateGallery();
        }, 5000);
    }

    initGallery('marwa-gallery');
    initGallery('safaa-gallery');

    // --- Typing Quote ---
    const quotes = [
        "Sisters are different flowers from the same garden.",
        "A sister is both your mirror and your opposite.",
        "In the cookies of life, sisters are the chocolate chips.",
        "Side by side or miles apart, sisters will always be connected by the heart.",
        "Having a sister is like having a best friend you can't get rid of."
    ];
    let quoteIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById('typing-quote');

    function type() {
        if (charIndex < quotes[quoteIndex].length) {
            typingElement.textContent += quotes[quoteIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 3000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = quotes[quoteIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            setTimeout(type, 500);
        }
    }

    type();

    // --- Particles System ---
    const canvas = document.getElementById('canvas-particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#D4AF37', '#FFC0CB', '#9370DB', '#ffffff'];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.type = Math.random() > 0.7 ? 'heart' : (Math.random() > 0.5 ? 'circle' : 'star');
            this.opacity = Math.random();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width + 50) this.x = -50;
            if (this.x < -50) this.x = canvas.width + 50;
            if (this.y > canvas.height + 50) this.y = -50;
            if (this.y < -50) this.y = canvas.height + 50;
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            if (this.type === 'circle') {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.type === 'heart') {
                const d = this.size * 2;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + d / 4);
                ctx.quadraticCurveTo(this.x, this.y, this.x + d / 4, this.y);
                ctx.quadraticCurveTo(this.x + d / 2, this.y, this.x + d / 2, this.y + d / 4);
                ctx.quadraticCurveTo(this.x + d / 2, this.y + d / 2, this.x, this.y + d);
                ctx.quadraticCurveTo(this.x - d / 2, this.y + d / 2, this.x - d / 2, this.y + d / 4);
                ctx.quadraticCurveTo(this.x - d / 2, this.y, this.x - d / 4, this.y);
                ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + d / 4);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function initParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    // --- Love Game Logic ---
    const clickHeart = document.getElementById('click-heart');
    const heartFill = document.getElementById('heart-fill');
    const bondScore = document.getElementById('bond-score');
    const successMsg = document.getElementById('game-success-message');
    let clicks = 0;
    const maxClicks = 10;

    if (clickHeart) {
        clickHeart.addEventListener('click', () => {
            if (clicks < maxClicks) {
                clicks++;
                const percentage = (clicks / maxClicks) * 100;
                bondScore.textContent = Math.round(percentage);
                
                // TranslateY starts at 100% (empty) and goes to 0% (full)
                const fillValue = 100 - percentage;
                heartFill.style.transform = `translateY(${fillValue}%)`;
                
                // Add a little pop effect
                clickHeart.style.transform = 'rotate(-45deg) scale(1.1)';
                setTimeout(() => {
                    clickHeart.style.transform = 'rotate(-45deg) scale(1)';
                }, 100);

                if (clicks === maxClicks) {
                    setTimeout(() => {
                        successMsg.classList.remove('hidden');
                        clickHeart.style.boxShadow = '0 0 40px #ff4d4d';
                        createConfetti();
                    }, 300);
                }
            }
        });
    }

    function createConfetti() {
        for(let i=0; i<30; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('cursor-ripple'); // reuse ripple animation style
            confetti.style.background = Math.random() > 0.5 ? '#ff4d4d' : '#C5A028';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.left = (window.innerWidth / 2) + (Math.random() * 200 - 100) + 'px';
            confetti.style.top = (window.innerHeight - 100) + (Math.random() * 100 - 50) + 'px';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 600);
        }
    }
});
