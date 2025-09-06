/* =========================================================
   TIMER A  –  aparece na seção azul
   ========================================================= */
(() => {
  const INITIAL_TIME = 46_800; // 13 h
  let timeLeft = INITIAL_TIME;

  const hrsEl = document.getElementById('hrs');
  const minEl = document.getElementById('min');
  const segEl = document.getElementById('seg');

  if (hrsEl && minEl && segEl) {
    const tickA = () => {
      if (timeLeft <= 0) return;
      timeLeft--;

      const h = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
      const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
      const s = String(timeLeft % 60).padStart(2, '0');

      hrsEl.textContent = h;
      minEl.textContent = m;
      segEl.textContent = s;
    };
    setInterval(tickA, 1000);
  }
})();

/* =========================================================
   TIMER B  –  contador adicional
   ========================================================= */
function startCountdownB(duration) {
  let remaining = duration;

  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  if (!hoursEl || !minutesEl || !secondsEl) return;

  const tickB = setInterval(() => {
    const h = String(Math.floor(remaining / 3600)).padStart(2, '0');
    const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
    const s = String(remaining % 60).padStart(2, '0');

    hoursEl.textContent = h;
    minutesEl.textContent = m;
    secondsEl.textContent = s;

    if (--remaining < 0) clearInterval(tickB);
  }, 1000);
}

/* =========================================================
   ANIMAÇÃO: scroll suave dos cartões
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.fade-in-xy9');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -20% 0px'
    }
  );

  cards.forEach(card => observer.observe(card));
});

/* =========================================================
   FAQ CAVEO: abrir e fechar respostas
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.caveo-faq-wrapper');

  items.forEach(item => {
    const button = item.querySelector('.caveo-faq-toggle');
    const icon = item.querySelector('.caveo-faq-icon');

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.caveo-faq-icon').textContent = '+';
      });

      if (!isActive) {
        item.classList.add('active');
        icon.textContent = '–';
      }
    });
  });
});

/* =========================================================
   CARROSSEL PERSONALIZADO – slides com ícones e botões
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  const slides = document.querySelectorAll('.nf-carousel-slide');
  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
  }

  window.nextSlide = function () {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  };

  window.prevSlide = function () {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  };

  function updateDots() {
    const allDotsContainers = document.querySelectorAll('.nf-dots');
    allDotsContainers.forEach(container => {
      container.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('span');
        if (index === currentIndex) dot.classList.add('active');
        container.appendChild(dot);
      });
    });
  }

  // inicializa carrossel
  updateCarousel();
  window.addEventListener('resize', updateCarousel);
});
