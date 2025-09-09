// LivingWordHub - JavaScript para interactividad y navegación

document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header-fixed');

    // Navegación suave con scroll
    function scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Actualizar enlaces de navegación activos
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                }
            });

            // Cerrar menú móvil si está abierto
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }

    // Hacer la función global para uso desde botones
    window.scrollToSection = scrollToSection;

    // Event listeners para navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Menú hamburguesa para móvil
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    navMenu.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Efecto de scroll en el header y detección de sección activa
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Detectar sección activa
        const headerHeight = header.offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Dynamic verses functionality
    const verses = {
        hope: [
            { text: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.", reference: "Jeremiah 29:11" },
            { text: "And hope maketh not ashamed; because the love of God is shed abroad in our hearts.", reference: "Romans 5:5" },
            { text: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.", reference: "Isaiah 40:31" }
        ],
        strength: [
            { text: "I can do all things through Christ which strengtheneth me.", reference: "Philippians 4:13" },
            { text: "The Lord is my strength and my shield; my heart trusted in him, and I am helped.", reference: "Psalms 28:7" },
            { text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee.", reference: "Isaiah 41:10" }
        ],
        peace: [
            { text: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.", reference: "Philippians 4:7" },
            { text: "Therefore I say unto you, Take no thought for your life, what ye shall eat, or what ye shall drink; nor yet for your body, what ye shall put on.", reference: "Matthew 6:25" },
            { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", reference: "Matthew 11:28" }
        ],
        love: [
            { text: "For God so loved the world, that he gave his only begotten Son.", reference: "John 3:16" },
            { text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.", reference: "1 Corinthians 13:4" },
            { text: "And we have known and believed the love that God hath to us. God is love.", reference: "1 John 4:16" }
        ],
        faith: [
            { text: "Now faith is the substance of things hoped for, the evidence of things not seen.", reference: "Hebrews 11:1" },
            { text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.", reference: "Ephesians 2:8" },
            { text: "For we walk by faith, not by sight.", reference: "2 Corinthians 5:7" }
        ]
    };

    // Función para mostrar versículos por categoría
    function showVersesByCategory(category) {
        const versesGrid = document.querySelector('.verses-grid');
        if (!versesGrid) return;

        const categoryVerses = verses[category] || verses.hope;
        
        versesGrid.innerHTML = categoryVerses.map(verse => `
            <div class="verse-card">
                <p class="verse-text">"${verse.text}"</p>
                <p class="verse-reference">${verse.reference}</p>
            </div>
        `).join('');

        // Actualizar botones de categoría activos
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    // Event listeners para categorías de versículos
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.textContent.toLowerCase();
            showVersesByCategory(category);
        });
    });

    // Music functionality
    const musicData = {
        praise: [
            { title: "Amazing Grace", artist: "Classic Hymn", category: "Praise" },
            { title: "How Great Thou Art", artist: "Worship", category: "Praise" },
            { title: "Great Is Thy Faithfulness", artist: "Classic Hymn", category: "Praise" },
            { title: "Blessed Be Your Name", artist: "Contemporary", category: "Praise" }
        ],
        worship: [
            { title: "Here I Am to Worship", artist: "Tim Hughes", category: "Worship" },
            { title: "Open the Eyes of My Heart", artist: "Paul Baloche", category: "Worship" },
            { title: "I Could Sing of Your Love Forever", artist: "Delirious", category: "Worship" },
            { title: "Heart of Worship", artist: "Matt Redman", category: "Worship" }
        ],
        hymns: [
            { title: "Holy, Holy, Holy", artist: "Classic Hymn", category: "Hymns" },
            { title: "The Old Rugged Cross", artist: "Classic Hymn", category: "Hymns" },
            { title: "In the Garden", artist: "Classic Hymn", category: "Hymns" },
            { title: "What a Friend We Have in Jesus", artist: "Classic Hymn", category: "Hymns" }
        ],
        contemporary: [
            { title: "Oceans", artist: "Hillsong United", category: "Contemporary" },
            { title: "10,000 Reasons", artist: "Matt Redman", category: "Contemporary" },
            { title: "Good Good Father", artist: "Chris Tomlin", category: "Contemporary" },
            { title: "Reckless Love", artist: "Cory Asbury", category: "Contemporary" }
        ]
    };

    // Función para mostrar música por categoría
    function showMusicByCategory(category) {
        const musicGrid = document.querySelector('.music-grid');
        if (!musicGrid) return;

        const categoryMusic = musicData[category] || musicData.praise;
        
        musicGrid.innerHTML = categoryMusic.map(song => `
            <div class="music-card">
                <div class="music-cover">
                    <i class="fas fa-play-circle"></i>
                </div>
                <div class="music-info">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                    <div class="music-controls">
                        <button class="play-btn" onclick="playMusic('${song.title}')">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="favorite-btn" onclick="toggleFavorite('${song.title}')">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Actualizar pestañas activas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    // Event listeners para pestañas de música
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.textContent.toLowerCase();
            showMusicByCategory(category);
        });
    });

    // Podcasts functionality
    const podcasts = [
        {
            title: "Daily Reflections",
            description: "A moment of reflection and prayer to start your day with purpose",
            duration: "15 min",
            episode: "Episode 45",
            icon: "fas fa-microphone-alt"
        },
        {
            title: "Faith in Action",
            description: "Stories of how faith transforms lives and communities",
            duration: "25 min",
            episode: "Episode 32",
            icon: "fas fa-heart"
        },
        {
            title: "Prayer and Meditation",
            description: "Prayer guides and moments of silence to connect with God",
            duration: "20 min",
            episode: "Episode 28",
            icon: "fas fa-pray"
        },
        {
            title: "Bible Studies",
            description: "Deepen in God's Word with detailed studies",
            duration: "30 min",
            episode: "Episode 15",
            icon: "fas fa-bible"
        }
    ];

    // Función para reproducir podcast
    function playPodcast(title) {
        // Simular reproducción de podcast
        const podcast = podcasts.find(p => p.title === title);
        if (podcast) {
            showNotification(`Playing: ${podcast.title}`, 'success');
        }
    }

    // Event listeners para podcasts
    document.addEventListener('click', function(e) {
        if (e.target.closest('.play-podcast-btn')) {
            const podcastCard = e.target.closest('.podcast-card');
            const title = podcastCard.querySelector('h3').textContent;
            playPodcast(title);
        }
    });

    // Help functionality
    function showHelpModal(type) {
        const modals = {
            crisis: {
                title: "Crisis Line",
                content: "If you are in crisis, don't hesitate to contact:<br><br>📞 National Crisis Line: 988<br>📞 Hope Line: 1-800-273-8255<br><br>Remember that you are not alone and there are people who want to help you.",
                type: "emergency"
            },
            prayer: {
                title: "Emergency Prayer",
                content: "Heavenly Father, in this moment of difficulty, I ask that you give me peace and strength. Help me to trust in your perfect plan and find comfort in your love. Give me the wisdom to make the right decisions and the strength to overcome this trial. In Jesus' name, amen.",
                type: "prayer"
            },
            church: {
                title: "Find a Church",
                content: "To find a church near you, you can:<br><br>🔍 Search on Google Maps: 'Christian church near me'<br>📱 Use apps like Church Finder<br>🌐 Visit denomination websites<br><br>God will guide you to the perfect place for you!",
                type: "info"
            },
            support: {
                title: "Support Group",
                content: "Join our support community:<br><br>💬 WhatsApp: +1 (555) 123-4567<br>📧 Email: support@livingwordhub.com<br>🌐 Facebook: LivingWordHub Community<br><br>We are here to support you on your journey of faith!",
                type: "info"
            }
        };

        const modal = modals[type];
        if (modal) {
            showModal(modal.title, modal.content, modal.type);
        }
    }

    // Event listeners para botones de ayuda
    document.addEventListener('click', function(e) {
        if (e.target.closest('.help-btn')) {
            const helpCard = e.target.closest('.help-card');
            const cardType = helpCard.classList.contains('emergency') ? 'crisis' : 
                           helpCard.querySelector('h3').textContent.includes('Prayer') ? 'prayer' :
                           helpCard.querySelector('h3').textContent.includes('Church') ? 'church' : 'support';
            showHelpModal(cardType);
        }
    });

    // Función para mostrar modal
    function showModal(title, content, type = 'info') {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content ${type}">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary modal-close-btn">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'flex';

        // Event listeners para cerrar modal
        modal.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Función para enviar petición de oración
    function submitPrayerRequest() {
        const textarea = document.querySelector('.prayer-form textarea');
        const prayerText = textarea.value.trim();

        if (prayerText.length < 10) {
            showNotification('Please write a more detailed request (minimum 10 characters)', 'error');
            return;
        }

        // Simulate sending
        showNotification('Your prayer request has been sent. Our community will pray for you.', 'success');
        textarea.value = '';
    }

    // Event listener para formulario de oración
    document.querySelector('.prayer-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        submitPrayerRequest();
    });

    // Funcionalidad de notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Mostrar notificación
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Ocultar notificación después de 4 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Funciones globales para música
    window.playMusic = function(title) {
        showNotification(`Playing: ${title}`, 'success');
    };

    window.toggleFavorite = function(title) {
        const btn = event.target.closest('.favorite-btn');
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification(`"${title}" added to favorites`, 'success');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification(`"${title}" removed from favorites`, 'info');
        }
    };

    // Animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.feature-card, .verse-card, .music-card, .podcast-card, .creator-card, .help-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Versículo del día aleatorio
    function showDailyVerse() {
        const allVerses = Object.values(verses).flat();
        const randomVerse = allVerses[Math.floor(Math.random() * allVerses.length)];
        
        const featuredVerse = document.querySelector('.verse-card.featured .verse-text');
        const featuredReference = document.querySelector('.verse-card.featured .verse-reference');
        
        if (featuredVerse && featuredReference) {
            featuredVerse.textContent = `"${randomVerse.text}"`;
            featuredReference.textContent = randomVerse.reference;
        }
    }

    // Mostrar versículo del día al cargar
    showDailyVerse();

    // Cambiar versículo del día cada 24 horas
    setInterval(showDailyVerse, 24 * 60 * 60 * 1000);

    // Efecto de partículas doradas en el hero
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--gold);
                border-radius: 50%;
                opacity: 0.6;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }

    // Crear partículas después de un breve delay
    setTimeout(createParticles, 1000);

    console.log('LivingWordHub loaded successfully ✨');
});

// Estilos adicionales para modales y notificaciones
const additionalStyles = `
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal-overlay[style*="flex"] {
    opacity: 1;
}

.modal-content {
    background: white;
    border-radius: 1rem;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.modal-overlay[style*="flex"] .modal-content {
    transform: scale(1);
}

.modal-header {
    padding: 1.5rem 1.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    font-family: 'Playfair Display', serif;
    color: var(--primary-violet);
    margin: 0;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--dark-gray);
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-body {
    padding: 1.5rem;
    line-height: 1.6;
    color: var(--dark-gray);
}

.modal-footer {
    padding: 0 1.5rem 1.5rem;
    text-align: right;
}

.modal-content.emergency .modal-header h3 {
    color: var(--gold);
}

.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 10001;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    border-left: 4px solid var(--primary-violet);
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    border-left-color: #10B981;
}

.notification.error {
    border-left-color: #EF4444;
}

.notification-content {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.notification.success .notification-content i {
    color: #10B981;
}

.notification.error .notification-content i {
    color: #EF4444;
}

.particle {
    pointer-events: none;
}

@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        margin: 1rem;
    }
    
    .notification {
        right: 10px;
        left: 10px;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}
</style>
`;

// Agregar estilos adicionales al head
document.head.insertAdjacentHTML('beforeend', additionalStyles);
