// ===== DOM操作和工具函数 =====

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// 主要初始化函数
function initializeWebsite() {
    // 初始化导航栏
    initializeNavigation();
    
    // 初始化滚动效果
    initializeScrollEffects();
    
    // 初始化动画效果
    initializeAnimations();
    
    // 初始化表单处理
    initializeContactForm();
    
    // 初始化返回顶部按钮
    initializeBackToTop();
    
    // 初始化平滑滚动
    initializeSmoothScroll();
    
    console.log('网站初始化完成！');
}

// ===== 导航栏功能 =====
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 移动端菜单切换
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            // 切换菜单显示状态
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // 添加动画效果
            if (navMenu.classList.contains('active')) {
                navMenu.style.animation = 'slideDown 0.3s ease forwards';
            } else {
                navMenu.style.animation = 'slideUp 0.3s ease forwards';
            }
        });
    }
    
    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ===== 滚动效果 =====
function initializeScrollEffects() {
    // 创建Intersection Observer用于滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // 为作品集项目添加延迟动画
                if (entry.target.classList.contains('portfolio-item')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.portfolio-item, .about-content, .contact-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== 动画效果 =====
function initializeAnimations() {
    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .portfolio-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .portfolio-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // 技能列表悬停效果
    const skillItems = document.querySelectorAll('.skills-list li');
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.05)';
            this.style.background = 'linear-gradient(45deg, #3498db, #2ecc71)';
            this.style.color = 'white';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.background = 'white';
            this.style.color = '#333';
        });
    });
}

// ===== 联系表单处理 =====
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // 基本表单验证
            if (!validateForm(name, email, message)) {
                return;
            }
            
            // 模拟表单提交
            submitForm(name, email, message);
        });
    }
    
    // 实时表单验证
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // 移除错误样式
            this.style.borderColor = '#e1e8ed';
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
}

// 表单验证函数
function validateForm(name, email, message) {
    let isValid = true;
    
    // 验证姓名
    if (!name || name.trim().length < 2) {
        showFieldError('name', '请输入至少2个字符的姓名');
        isValid = false;
    }
    
    // 验证邮箱
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', '请输入有效的邮箱地址');
        isValid = false;
    }
    
    // 验证消息
    if (!message || message.trim().length < 10) {
        showFieldError('message', '请输入至少10个字符的消息');
        isValid = false;
    }
    
    return isValid;
}

// 单个字段验证
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(fieldName, '姓名至少需要2个字符');
                return false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(fieldName, '请输入有效的邮箱地址');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError(fieldName, '消息至少需要10个字符');
                return false;
            }
            break;
    }
    
    // 移除错误提示
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
    field.style.borderColor = '#2ecc71';
    
    return true;
}

// 显示字段错误
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const formGroup = field.parentNode;
    
    // 移除现有错误消息
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // 添加错误样式
    field.style.borderColor = '#e74c3c';
    
    // 创建错误消息
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
}

// 模拟表单提交
function submitForm(name, email, message) {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // 显示提交状态
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // 模拟网络请求延迟
    setTimeout(() => {
        // 重置按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        
        // 显示成功消息
        showNotification('消息发送成功！我会尽快回复您。', 'success');
        
        // 重置表单
        document.querySelector('.contact-form').reset();
        
        console.log('表单提交数据:', { name, email, message });
    }, 2000);
}

// ===== 返回顶部功能 =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // 监听滚动事件
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // 点击返回顶部
        backToTopBtn.addEventListener('click', function() {
            scrollToTop();
        });
    }
}

// 平滑滚动到顶部
function scrollToTop() {
    const scrollDuration = 800;
    const scrollHeight = window.pageYOffset;
    const scrollStep = Math.PI / (scrollDuration / 15);
    const cosParameter = scrollHeight / 2;
    let scrollCount = 0;
    let scrollMargin;
    
    const scrollInterval = setInterval(function() {
        if (window.pageYOffset != 0) {
            scrollCount = scrollCount + 1;
            scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
            window.scrollTo(0, (scrollHeight - scrollMargin));
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}

// ===== 平滑滚动导航 =====
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const ctaButton = document.querySelector('.cta-button');
    
    // 导航链接平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
    
    // CTA按钮滚动到作品集
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const portfolioSection = document.querySelector('#portfolio');
            if (portfolioSection) {
                smoothScrollTo(portfolioSection);
            }
        });
    }
}

// 平滑滚动到指定元素
function smoothScrollTo(element) {
    const targetPosition = element.offsetTop - 80; // 考虑固定导航栏高度
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    requestAnimationFrame(animation);
}

// 缓动函数
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

// ===== 通知系统 =====
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动移除
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== 工具函数 =====

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 检查元素是否在视口中
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== 性能优化 =====

// 优化滚动事件
const optimizedScrollHandler = throttle(function() {
    // 滚动相关的处理逻辑
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// 延迟加载图片
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 初始化延迟加载
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===== 键盘导航支持 =====
document.addEventListener('keydown', function(e) {
    // ESC键关闭移动端菜单
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// ===== 错误处理 =====
window.addEventListener('error', function(e) {
    console.error('网站运行错误:', e.error);
    // 可以在这里添加错误上报逻辑
});

// ===== 控制台欢迎信息 =====
console.log('%c欢迎访问我的作品集网站！', 'color: #3498db; font-size: 16px; font-weight: bold;');
console.log('%c如果您对我的工作感兴趣，请随时联系我！', 'color: #2ecc71; font-size: 14px;');

// ===== 多语言切换 =====
const i18nData = {
    zh: {
        'nav-home': '首页',
        'nav-about': '关于我',
        'nav-portfolio': '作品集',
        'nav-contact': '联系我',
        'hero-title': '欢迎来到我的作品集',
        'hero-subtitle': 'UI设计师，专注于创造美观且功能丰富的用户体验',
        'cta-button': '查看我的作品',
        'about-title': '关于我',
        'about-desc': 'UI设计师，擅长用户界面设计、交互设计、团队协作。热爱用设计提升产品体验，注重细节与创新，善于与开发团队高效沟通协作。',
        'skills-title': '技能',
        'timeline-title': '专业经历',
        'timeline-1': '<span class="timeline-date">2023-2025年</span> 广东科学技术职业学院 · 大专',
        'timeline-2': '<span class="timeline-date">2025-2027年</span> 广州软件学院 · 本科',
        'timeline-3': '<span class="timeline-date">2023-2025年</span> UI设计师',
        'timeline-4': '<span class="timeline-date">2025-2027年</span> 软件工程师',
        'achievement-title': '个人成就',
        'achievement-badge': '中级UI设计师',
        'portfolio-title': '我的作品',
        'project1-title': '现代化Web应用',
        'project1-desc': '这是一个使用React开发的现代化Web应用程序，具有响应式设计和优雅的用户界面。',
        'project2-title': '响应式电商网站',
        'project2-desc': '一个功能完整的电商平台，使用Vue.js和Node.js开发，支持在线购物和支付。',
        'project3-title': '智能天气应用',
        'project3-desc': '一个移动端优先的天气应用，集成了地理位置API和实时天气数据。',
        'contact-title': '联系我',
        'contact-info-title': '联系信息',
        'form-name-label': '姓名',
        'form-name-placeholder': '请输入您的姓名',
        'form-email-label': '邮箱',
        'form-email-placeholder': '请输入您的邮箱',
        'form-message-label': '留言',
        'form-message-placeholder': '请输入您的留言',
        'form-submit': '发送消息',
    },
    en: {
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-portfolio': 'Portfolio',
        'nav-contact': 'Contact',
        'hero-title': 'Welcome to My Portfolio',
        'hero-subtitle': 'UI Designer, focusing on beautiful and functional user experiences',
        'cta-button': 'View My Work',
        'about-title': 'About Me',
        'about-desc': 'UI designer skilled in interface design, interaction design, and teamwork. Passionate about improving product experience through design, detail-oriented and innovative, and good at collaborating with development teams.',
        'skills-title': 'Skills',
        'timeline-title': 'Experience',
        'timeline-1': '<span class="timeline-date">2023-2025</span> Guangdong Polytechnic · Associate',
        'timeline-2': '<span class="timeline-date">2025-2027</span> Guangzhou Software College · Bachelor',
        'timeline-3': '<span class="timeline-date">2023-2025</span> UI Designer',
        'timeline-4': '<span class="timeline-date">2025-2027</span> Software Engineer',
        'achievement-title': 'Achievement',
        'achievement-badge': 'Intermediate UI Designer',
        'portfolio-title': 'Portfolio',
        'project1-title': 'Modern Web App',
        'project1-desc': 'A modern web application built with React, featuring responsive design and elegant UI.',
        'project2-title': 'Responsive E-commerce',
        'project2-desc': 'A full-featured e-commerce platform built with Vue.js and Node.js, supporting online shopping and payment.',
        'project3-title': 'Smart Weather App',
        'project3-desc': 'A mobile-first weather app integrating geolocation API and real-time weather data.',
        'contact-title': 'Contact',
        'contact-info-title': 'Contact Info',
        'form-name-label': 'Name',
        'form-name-placeholder': 'Enter your name',
        'form-email-label': 'Email',
        'form-email-placeholder': 'Enter your email',
        'form-message-label': 'Message',
        'form-message-placeholder': 'Enter your message',
        'form-submit': 'Send Message',
    }
};

function setLanguage(lang) {
    // 文本内容
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nData[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                // 跳过input/textarea
            } else {
                el.innerHTML = i18nData[lang][key];
            }
        }
    });
    // 占位符
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (i18nData[lang][key]) {
            el.setAttribute('placeholder', i18nData[lang][key]);
        }
    });
    // 按钮高亮
    document.getElementById('lang-zh').classList.toggle('active', lang === 'zh');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
}

document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    // 多语言切换
    document.getElementById('lang-zh').addEventListener('click', function() {
        setLanguage('zh');
    });
    document.getElementById('lang-en').addEventListener('click', function() {
        setLanguage('en');
    });
});