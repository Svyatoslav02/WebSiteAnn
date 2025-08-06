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

  const progress = Math.min(scrollY / maxScroll, 1);

  section1.style.transform = `scale(${1 - progress * 0.2})`;
  section1.style.opacity = `${1 - progress}`;

  section2.style.transform = `scale(${0.9 + progress * 0.1})`;
  section2.style.opacity = `${progress}`;

  projectPageSectionAboutContent.style.transform = `scale(${1 - progress * 0.2})`;
  projectPageSectionAboutContent.style.opacity = `${progress}`;

  const section3Top = section3.offsetTop;
  const progress3 = Math.min(Math.max((scrollY - section3Top + vh) / vh, 0), 1);

  const scale = 1 + progress3 * 3.5;
  img2.style.transform = `scale(${scale})`;
});

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

