// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Карусель для карточек
class KirbyCarousel {
    constructor() {
        this.cardsContainer = document.querySelector('.kirby-cards');
        this.cards = document.querySelectorAll('.kirby-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevArrow = document.querySelector('.carousel-arrow-prev');
        this.nextArrow = document.querySelector('.carousel-arrow-next');
        this.currentIndex = 0;
        this.isMobile = window.innerWidth <= 767;
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        if (this.isMobile) {
            this.updateCarousel();
            this.showArrows();
        } else {
            // На десктопе показываем все карточки
            this.cardsContainer.style.transform = 'translateX(0)';
            this.cards.forEach(card => card.classList.add('active'));
            this.hideArrows();
        }
    }

    showArrows() {
        if (this.prevArrow && this.nextArrow) {
            this.prevArrow.style.display = 'flex';
            this.nextArrow.style.display = 'flex';
        }
    }

    hideArrows() {
        if (this.prevArrow && this.nextArrow) {
            this.prevArrow.style.display = 'none';
            this.nextArrow.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Стрелки
        if (this.prevArrow) {
            this.prevArrow.addEventListener('click', () => {
                this.prevSlide();
            });
        }

        if (this.nextArrow) {
            this.nextArrow.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        // Свайп для мобильных
        let startX = 0;
        let currentX = 0;

        this.cardsContainer.addEventListener('touchstart', (e) => {
            if (!this.isMobile) return;
            startX = e.touches[0].clientX;
        });

        this.cardsContainer.addEventListener('touchmove', (e) => {
            if (!this.isMobile) return;
            currentX = e.touches[0].clientX;
        });

        this.cardsContainer.addEventListener('touchend', () => {
            if (!this.isMobile) return;
            
            const diff = startX - currentX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });

        // Клики по точкам
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (!this.isMobile) return;
                this.goToSlide(index);
            });
        });

        // Ресайз окна
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 767;
            this.init();
        });
    }

    nextSlide() {
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
        } else {
            // Если последняя карточка - переходим к первой
            this.currentIndex = 0;
        }
        this.updateCarousel();
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            // Если первая карточка - переходим к последней
            this.currentIndex = this.cards.length - 1;
        }
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        if (!this.isMobile) return;

        const translateX = -this.currentIndex * 100;
        this.cardsContainer.style.transform = `translateX(${translateX}%)`;

        // Обновляем активные классы
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });

        // Обновляем точки
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Убираем блокировку стрелок для бесконечной карусели
        if (this.prevArrow) {
            this.prevArrow.style.opacity = '1';
            this.prevArrow.style.cursor = 'pointer';
        }

        if (this.nextArrow) {
            this.nextArrow.style.opacity = '1';
            this.nextArrow.style.cursor = 'pointer';
        }
    }
}

// Инициализация карусели
document.addEventListener('DOMContentLoaded', () => {
    new KirbyCarousel();
});

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});