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

// Testimonials carousel: auto-advance when section is visible
(function () {
  const section = document.getElementById('section9');
  const navButtons = document.querySelectorAll('.carousel-wrapper .nav');
  if (!section || !slides.length) return;

  const autoAdvanceIntervalMs = 5000;
  const pauseAfterClickMs = 8000;
  let intervalId = null;
  let resumeTimeout = null;

  function startAutoAdvance() {
    if (intervalId) return;
    intervalId = setInterval(function () {
      moveSlide(1);
    }, autoAdvanceIntervalMs);
  }

  function stopAutoAdvance() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function pauseAndResumeLater() {
    stopAutoAdvance();
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(function () {
      resumeTimeout = null;
      if (isInView) startAutoAdvance();
    }, pauseAfterClickMs);
  }

  let isInView = false;
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        isInView = entry.isIntersecting;
        if (isInView) startAutoAdvance();
        else stopAutoAdvance();
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.25 }
  );
  observer.observe(section);

  navButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      pauseAndResumeLater();
    });
  });
})();

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

// Portfolio carousel: arrow navigation, auto-scroll when in view, infinite loop
(function () {
  const section = document.getElementById('section5');
  const slider = document.getElementById('slider2');
  const track = document.getElementById('portfolioTrack');
  const arrowLeft = document.getElementById('portfolioArrowLeft');
  const arrowRight = document.getElementById('portfolioArrowRight');
  const customCursor = document.getElementById('portfolioCursor');
  if (!section || !slider || !track || !arrowLeft || !arrowRight) return;

  const gap = 30;
  const autoScrollSpeedPxPerMs = 0.06; // ~60px per second
  const resumeDelayMs = 4000;

  let slides = Array.from(track.querySelectorAll('.slide2'));
  const slideCount = slides.length;
  if (slideCount === 0) return;

  // Clone slides for seamless infinite loop
  slides.forEach(function (slide) {
    track.appendChild(slide.cloneNode(true));
  });
  slides = Array.from(track.querySelectorAll('.slide2'));

  // Video playback on hover only: disable autoplay and ensure only hovered video plays
  const videos = Array.from(slider.querySelectorAll('.slide2 video'));
  if (videos.length) {
    videos.forEach(function (video) {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (err) {}

      video.addEventListener('mouseenter', function () {
        videos.forEach(function (v) {
          if (v === video) return;
          try {
            v.pause();
            v.currentTime = 0;
          } catch (err) {}
        });
        try {
          video.currentTime = 0;
          video.play();
        } catch (err) {}
      });

      video.addEventListener('mouseleave', function () {
        try {
          video.pause();
          video.currentTime = 0;
        } catch (err) {}
      });
    });
  }

  function getSlideStepPx() {
    const first = track.querySelector('.slide2');
    return first ? first.offsetWidth + gap : 450 + gap;
  }

  let currentTranslate = 0;
  let oneSetWidth = 0;
  let rafId = null;
  let isInView = false;
  let isPaused = false;
  let resumeTimeout = null;
  let lastTime = 0;
  let currentIndex = 0; // logical index for wheel/arrow navigation (0..slideCount-1)
  let lockMode = null; // 'down' | 'up' | null

  function setTrackTransform(px, useTransition, durationMs) {
    if (useTransition) {
      var d = durationMs != null ? durationMs : 500;
      track.style.transition = 'transform ' + d + 'ms ease';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = 'translate3d(' + px + 'px, 0, 0)';
  }

  function clampToLoop(translate) {
    if (oneSetWidth <= 0) return translate;
    while (translate > 0) translate -= oneSetWidth;
    while (translate < -oneSetWidth) translate += oneSetWidth;
    return translate;
  }

  function go(offsetPx, useTransition, durationMs) {
    oneSetWidth = getSlideStepPx() * slideCount;
    currentTranslate = clampToLoop(currentTranslate + offsetPx);
    setTrackTransform(currentTranslate, useTransition, durationMs);
  }

  function stepByIndex(direction, useTransition, durationMs) {
    // finite navigation: clamp between first and last logical slide
    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= slideCount) return;
    currentIndex = nextIndex;
    const offset = direction > 0 ? -getSlideStepPx() : getSlideStepPx();
    go(offset, useTransition, durationMs);
    pauseAutoScroll();
  }

  function pauseAutoScroll() {
    isPaused = true;
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(function () {
    resumeTimeout = null;
    isPaused = false;
    }, resumeDelayMs);
  }

  function autoScrollStep(timestamp) {
    if (!isInView || isPaused) {
    rafId = null;
    return;
    }
    const delta = lastTime ? Math.min(timestamp - lastTime, 50) : 16;
    lastTime = timestamp;
    oneSetWidth = getSlideStepPx() * slideCount;
    if (oneSetWidth <= 0) {
    rafId = requestAnimationFrame(autoScrollStep);
    return;
    }
    currentTranslate -= autoScrollSpeedPxPerMs * delta;
    if (currentTranslate <= -oneSetWidth) currentTranslate += oneSetWidth;
    setTrackTransform(currentTranslate, false);
    rafId = requestAnimationFrame(autoScrollStep);
  }

  function startAutoScroll() {
    lastTime = 0;
    if (!rafId) rafId = requestAnimationFrame(autoScrollStep);
  }

  function stopAutoScroll() {
    if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
    }
  }

  const observer = new IntersectionObserver(
    function (entries) {
    entries.forEach(function (entry) {
      isInView = entry.isIntersecting;
      if (isInView && !isPaused) startAutoScroll();
      else {
        stopAutoScroll();
        lockMode = null;
      }
    });
    },
    { root: null, rootMargin: '0px', threshold: 0.2 }
  );
  observer.observe(section);

  arrowLeft.addEventListener('click', function () {
    stepByIndex(-1, true);
  });
  arrowRight.addEventListener('click', function () {
    stepByIndex(1, true);
  });

  slider.addEventListener('mouseenter', function () {
    isPaused = true;
    if (resumeTimeout) clearTimeout(resumeTimeout);
    if (customCursor) {
      slider.classList.add('cursor-visible');
    }
  });
  slider.addEventListener('mouseleave', function () {
    if (customCursor) {
      slider.classList.remove('cursor-visible');
    }
    if (isInView) {
    resumeTimeout = setTimeout(function () {
      resumeTimeout = null;
      isPaused = false;
      startAutoScroll();
    }, resumeDelayMs);
    }
  });

  // Custom circular cursor following the mouse inside the slider
  if (customCursor) {
    slider.addEventListener('mousemove', function (e) {
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      customCursor.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
  }

  // Global wheel handler: while the portfolio section is in view, lock page scroll
  // and use the wheel exclusively for horizontal slider navigation, until the
  // first/last slide is reached in the current scroll direction.
  function handleWheel(e) {
    if (!isInView) return;

    const deltaY = e.deltaY;
    if (!deltaY) return;

    const direction = deltaY > 0 ? 1 : -1; // 1 = forward (next), -1 = back (prev)

    // Initialize lock mode based on initial scroll direction
    if (!lockMode) {
      lockMode = direction > 0 ? 'down' : 'up';
    }

    if (lockMode === 'down') {
      if (direction > 0) {
        // scrolling down / next
        if (currentIndex >= slideCount - 1) {
          // last slide reached in this direction – unlock for further page scroll
          lockMode = null;
          return;
        }
        e.preventDefault();
        stepByIndex(1, true, 5000); // slow transition for wheel
      } else {
        // user reversed direction while moving down: walk back through slides
        if (currentIndex <= 0) {
          lockMode = null;
          return;
        }
        e.preventDefault();
        stepByIndex(-1, true, 5000);
      }
    } else if (lockMode === 'up') {
      if (direction < 0) {
        // scrolling up / previous
        if (currentIndex <= 0) {
          // first slide reached in this direction – unlock for further page scroll
          lockMode = null;
          return;
        }
        e.preventDefault();
        stepByIndex(-1, true, 5000); // slow transition for wheel
      } else {
        // user reversed direction while moving up: walk forward through slides
        if (currentIndex >= slideCount - 1) {
          lockMode = null;
          return;
        }
        e.preventDefault();
        stepByIndex(1, true, 5000);
      }
    }
  }

  window.addEventListener('wheel', handleWheel, { passive: false });

  oneSetWidth = getSlideStepPx() * slideCount;
  setTrackTransform(0, false);
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

