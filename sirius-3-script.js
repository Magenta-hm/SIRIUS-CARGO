
    // скрипт для формы обратной связи
        function getFormData() {
            const data = document.getElementById('client_data').value || "Не указано";
            const cargo = document.getElementById('cargo_info').value || "Не указано";
            return { data, cargo };
        }

        function sendToMail() {
            const { data, cargo } = getFormData();
            const subject = encodeURIComponent("Запрос расчета: SIRIUS CARGO");
            const body = encodeURIComponent("Клиент: " + data + "\nГруз: " + cargo);
            window.location.href = "mailto:info@siriuscargo.ru?subject=" + subject + "&body=" + body;
        }

        function sendToTG() {
            const { data, cargo } = getFormData();
            const text = encodeURIComponent("🚀 *Новый запрос расчета*\n\n👤 *Клиент:* " + data + "\n📦 *Груз:* " + cargo);
            // Замените 'sirius_cargo_bot' или имя профиля на ваше
            window.open("https://t.me" + text, "_blank");
        }

        // звезды
        function createStars() {
            const starfield = document.getElementById('starfield');
            const starCount = 100; // Количество звезд

            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                
                // Случайный размер от 1 до 3 пикселей
                const size = (Math.random() * 2.5 + 1.5) + 'px';
                star.style.width = size;
                star.style.height = size;
                
                // Случайная позиция
                star.style.top = Math.random() * 100 + '%';
                star.style.left = Math.random() * 100 + '%';
                
                // Случайная длительность мерцания от 2 до 7 секунд
                star.style.setProperty('--duration', (Math.random() * 5 + 2) + 's');
                star.style.animationDuration = (Math.random() * 5 + 2) + 's';
                
                // Случайная задержка начала, чтобы не мерцали одновременно
                star.style.animationDelay = (Math.random() * 5) + 's';
                
                starfield.appendChild(star);
            }
        }

        // Запускаем создание звезд при загрузке
        document.addEventListener('DOMContentLoaded', createStars);

    // созвездия канвас
    const canvas = document.getElementById('constellationCanvas');
    const ctx = canvas.getContext('2d');

    let stars = [];
    const starCount = 120; // Оптимальное количество для созвездий
    const connectionDist = 150; // Максимальная дистанция для линии

    function resizeCanvas() {
        const section = document.getElementById('services');
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    class Star {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.opacity = Math.random();
            this.speed = Math.random() * 0.01 + 0.005;
            this.direction = Math.random() > 0.5 ? 1 : -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }

        update() {
            this.opacity += this.speed * this.direction;
            if (this.opacity >= 0.8 || this.opacity <= 0.1) {
                this.direction *= -1;
            }
        }
    }

    function drawLines() {
        for (let a = 0; a < stars.length; a++) {
            for (let b = a + 1; b < stars.length; b++) {
                const dx = stars[a].x - stars[b].x;
                const dy = stars[a].y - stars[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDist) {
                    // Прозрачность линии зависит от расстояния и яркости обеих звезд
                    const alpha = (1 - distance / connectionDist) * (stars[a].opacity * 0.3);
                    ctx.beginPath();
                    ctx.moveTo(stars[a].x, stars[a].y);
                    ctx.lineTo(stars[b].x, stars[b].y);
                    // Сделаем линии бледно-оранжевыми, как ты хотела ранее
                    ctx.strokeStyle = `rgba(255, 107, 0, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Сначала рисуем линии (они будут под звездами)
        drawLines();
        
        // Затем рисуем и обновляем звезды
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initStars();
    });

    resizeCanvas();
    initStars();
    animate();
