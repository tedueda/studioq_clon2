// Studio Q クローンサイト JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニュー
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // ナビゲーションリンクをクリックしたらメニューを閉じる
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ヒーロースライダー
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // 自動スライド
    if (slides.length > 0) {
        showSlide(0);
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // お客様の声スライダー
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;

    function showTestimonial(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[currentTestimonial].classList.add('active');
    }

    if (testimonialSlides.length > 0) {
        showTestimonial(0);

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showTestimonial(currentTestimonial - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showTestimonial(currentTestimonial + 1);
            });
        }
    }

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // コンタクトフォームのバリデーション
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // 名前のバリデーション
            if (!nameInput.value.trim()) {
                showError(nameInput, '名前を入力してください');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            // メールのバリデーション
            if (!emailInput.value.trim()) {
                showError(emailInput, 'メールアドレスを入力してください');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, '有効なメールアドレスを入力してください');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // メッセージのバリデーション
            if (!messageInput.value.trim()) {
                showError(messageInput, 'メッセージを入力してください');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // フォーム送信処理（実際にはサーバーに送信する処理を追加）
                alert('お問い合わせありがとうございます。メッセージが送信されました。');
                contactForm.reset();
            }
        });
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // スクロール時のヘッダーアニメーション
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Lightbox ギャラリー
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${imgSrc}" alt="拡大画像">
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Lightboxを閉じる
            lightbox.querySelector('.close-lightbox').addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            // 背景をクリックしても閉じる
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
});
