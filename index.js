let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;

  const section1 = document.getElementById('section1');
  const section2 = document.getElementById('section2');
  const section3 = document.getElementById('section3');
  const section4 = document.getElementById('section4');

  const projectPageSectionAboutContent = document.getElementById('scrollText');

  const img2 = document.querySelector('.img2');

  const maxScroll = vh;

  // --- Перехід між секціями 1 і 2 ---
  const progress = Math.min(scrollY / maxScroll, 1);
  section1.style.transform = `scale(${1 - progress * 0.2})`;
  section1.style.opacity = `${1 - progress}`;

  section2.style.transform = `scale(${0.9 + progress * 0.1})`;
  section2.style.opacity = `${progress}`;

  // --- Анімація контенту у середині ---
  if (projectPageSectionAboutContent) {
    projectPageSectionAboutContent.style.transform = `scale(${1 - progress * 0.2})`;
    projectPageSectionAboutContent.style.opacity = `${progress}`;
  }

  // --- Ефект збільшення відео у секції 3 ---
  const section3Top = section3.offsetTop;
  const progress3 = Math.min(Math.max((scrollY - section3Top + vh) / vh, 0), 1);
  const scale = 1 + progress3 * 3.5;

  if (img2) {
    img2.style.transform = `scale(${scale})`;
  }
});

//функція.   назва.   
function updateSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('left', 'center', 'right');

    if (i === currentIndex) {
      slide.classList.add('center');
    } else if (i === (currentIndex - 1 + slides.length) % slides.length) {
      slide.classList.add('left');
    } else if (i === (currentIndex + 1) % slides.length) {
      slide.classList.add('right');
    }
  });
}

function moveSlide(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = slides.length - 1;
  if (currentIndex >= slides.length) currentIndex = 0;
  updateSlides();
}

updateSlides();

const tags = document.querySelectorAll('.tag');
const cards = document.querySelectorAll('.card');

tags.forEach(tag => {
  tag.addEventListener('click', () => {
    const filter = tag.getAttribute('data-filter');

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    tags.forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
  });
});


const openBtn = document.getElementById("btn-sec6");
const openBtn2 = document.getElementById("btn2-sec6"); /*+*/
const openBtn3 = document.getElementById("btn3-sec6");
const closeBtn = document.getElementById("btn-sec6-2");
const closeBtn2 = document.getElementById("btn2-sec6-2"); /*+*/
const closeBtn3 = document.getElementById("btn3-sec6-2");
const modal = document.getElementById("modalsec6");
const modal2 = document.getElementById("modal2sec6"); /*+*/
const modal3 = document.getElementById("modal3sec6");
const h1sec6 = document.getElementById("h1sec6-h");
const p44 = document.getElementById("p44y");
const h1sec62 = document.getElementById("h1sec6-h2");
const p442 = document.getElementById("p44y2");
const h1sec63 = document.getElementById("h1sec6-h3");
const p443 = document.getElementById("p44y3");
const slides3 = document.querySelectorAll(".slide3");
let current = 0;

openBtn.addEventListener("click", (e) => {
  // prevent the document click handler from immediately closing the modal
  e.stopPropagation();
  modal.style.display = "flex";
  openBtn.style.display = "none";
  h1sec6.style.display = "none";
  setTimeout(() => {
    p44.style.transform = "translateY(300px)";
    p44.style.opacity = "1";

    closeBtn.style.transform = "translateY(300px)";
    closeBtn.style.opacity = "1";
  }, 50);
});

// allow clicking the text block to open the modal as well
if (h1sec6) {
  h1sec6.addEventListener('click', (e) => {
    e.stopPropagation();
    // reuse existing open button logic
    openBtn.click();
  });
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  openBtn.style.display = "flex";
  h1sec6.style.display = "block";
  p44.style.transform = "translateY(-40px)";
  p44.style.opacity = "0";

  closeBtn.style.transform = "translateY(0px)";
  closeBtn.style.opacity = "0";
});


slides3[0].classList.add("active");

function changeSlide() {
  slides3[current].classList.remove("active");

  current = (current + 1) % slides3.length;

  slides3[current].classList.add("active");
}

setInterval(changeSlide, 1500);

openBtn2.addEventListener("click", (e) => {
  e.stopPropagation();
  modal2.style.display = "flex";
  openBtn2.style.display = "none";
  h1sec62.style.display = "none";
  setTimeout(() => {
    p442.style.transform = "translateY(300px)";
    p442.style.opacity = "1";

    closeBtn2.style.transform = "translateY(300px)";
    closeBtn2.style.opacity = "1";
  }, 50);
});

if (h1sec62) {
  h1sec62.addEventListener('click', (e) => {
    e.stopPropagation();
    openBtn2.click();
  });
}

closeBtn2.addEventListener("click", () => {
  modal2.style.display = "none";
  openBtn2.style.display = "flex";
  h1sec62.style.display = "block";
  p442.style.transform = "translateY(-40px)";
  p442.style.opacity = "0";

  closeBtn2.style.transform = "translateY(0px)";
  closeBtn2.style.opacity = "0";
});


openBtn3.addEventListener("click", (e) => {
  e.stopPropagation();
  modal3.style.display = "flex";
  openBtn3.style.display = "none";
  h1sec63.style.display = "none";
  setTimeout(() => {
    p443.style.transform = "translateY(300px)";
    p443.style.opacity = "1";

    closeBtn3.style.transform = "translateY(300px)";
    closeBtn3.style.opacity = "1";
  }, 50);
});

if (h1sec63) {
  h1sec63.addEventListener('click', (e) => {
    e.stopPropagation();
    openBtn3.click();
  });
}

closeBtn3.addEventListener("click", () => {
  modal3.style.display = "none";
  openBtn3.style.display = "flex";
  h1sec63.style.display = "block";
  p443.style.transform = "translateY(-40px)";
  p443.style.opacity = "0";

  closeBtn3.style.transform = "translateY(0px)";
  closeBtn3.style.opacity = "0";
});

// Close modal when clicking outside of it
document.addEventListener('click', (e) => {
  try {
    if (modal && modal.style.display === 'flex' && !modal.contains(e.target) && e.target !== openBtn) {
      closeBtn.click();
    }
    if (modal2 && modal2.style.display === 'flex' && !modal2.contains(e.target) && e.target !== openBtn2) {
      closeBtn2.click();
    }
    if (modal3 && modal3.style.display === 'flex' && !modal3.contains(e.target) && e.target !== openBtn3) {
      closeBtn3.click();
    }
  } catch (err) {
    // defensive: if elements aren't present, do nothing
  }
});

// Portfolio slider: scrollable with dot navigation for fast scroll (no infinite animation)
(function () {
  const slider = document.getElementById('slider2');
  const dotsContainer = document.getElementById('portfolioDots');
  if (!slider || !dotsContainer) return;

  const track = slider.querySelector('.slider-track2');
  const slides = track ? Array.from(track.querySelectorAll('.slide2')) : [];
  const dots = Array.from(dotsContainer.querySelectorAll('.portfolio-dot'));

  function getActiveIndex() {
    const scrollLeft = slider.scrollLeft;
    const slideWidth = slides[0] ? slides[0].offsetWidth + 30 : 450; // 30 = gap
    const index = Math.round(scrollLeft / slideWidth);
    return Math.min(Math.max(0, index), slides.length - 1);
  }

  function setActiveDot(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  }

  function scrollToSlide(index) {
    const slide = slides[index];
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    setActiveDot(index);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      scrollToSlide(index);
    });
  });

  let scrollTimeout;
  slider.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => setActiveDot(getActiveIndex()), 50);
  });

  // default to the middle-ish slide (index 1) so the centered dot appears active
  // and the corresponding slide is scrolled into view
  scrollToSlide(1);
})();

// Section7: toggle expand/collapse for approach items
(function () {
  const buttons = document.querySelectorAll('.learn-more-btn');
  if (!buttons || !buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const container = btn.closest('.div1sec7');
      if (!container) return;
  // toggle expanded on the container so revealed text (which is a sibling) affects layout
  const expanded = container.classList.toggle('expanded');
  // update aria attribute on the button for accessibility
  try { btn.setAttribute('aria-expanded', expanded ? 'true' : 'false'); } catch (err) {}
    });
  });
})();

// Section10: All FAQ items – click expand, hover shift text; only one expanded at a time
(function () {
  const container = document.querySelector('#section10 .sec9siv');
  if (!container) return;
  const triggers = container.querySelectorAll('.faq-trigger');
  triggers.forEach(function (trigger) {
    const faqItem = trigger.closest('.faq-item');
    const answer = faqItem ? faqItem.querySelector('.faq-answer') : null;
    if (!faqItem || !answer) return;
    trigger.addEventListener('click', function () {
      const isExpanded = faqItem.classList.toggle('expanded');
      trigger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      answer.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');
      document.querySelectorAll('#section10 .faq-item.expanded').forEach(function (other) {
        if (other !== faqItem) {
          other.classList.remove('expanded');
          const t = other.querySelector('.faq-trigger');
          const a = other.querySelector('.faq-answer');
          if (t) t.setAttribute('aria-expanded', 'false');
          if (a) a.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });
})();

// Add pointer-following spotlight for reveal panels
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals || !reveals.length) return;

  reveals.forEach(rev => {
    // pointermove updates CSS variables --x and --y (relative to the element)
    function onMove(e) {
      // support both mouse and touch
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] && e.touches[0].clientY);
      if (clientX == null || clientY == null) return;
      const rect = rev.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      rev.style.setProperty('--x', x + 'px');
      rev.style.setProperty('--y', y + 'px');
    }

    rev.addEventListener('mousemove', onMove);
    rev.addEventListener('touchmove', onMove, { passive: true });

    // add/remove helper class for when pointer is active (used by CSS to ensure opacity)
    rev.addEventListener('mouseenter', () => rev.classList.add('pointer-active'));
    rev.addEventListener('mouseleave', () => rev.classList.remove('pointer-active'));
    rev.addEventListener('touchstart', () => rev.classList.add('pointer-active'), { passive: true });
    rev.addEventListener('touchend', () => rev.classList.remove('pointer-active'));
  });
})();

