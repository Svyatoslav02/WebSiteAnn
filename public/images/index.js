
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const section3 = document.getElementById('section3');
    const img2 = document.querySelector('.img2');

    const maxScroll = vh;

    const progress = Math.min(scrollY / maxScroll, 1);

    section1.style.transform = `scale(${1 - progress * 0.2})`;
    section1.style.opacity = `${1 - progress}`;

    section2.style.transform = `scale(${0.9 + progress * 0.1})`;
    section2.style.opacity = `${progress}`;

    const section3Top = section3.offsetTop;
    const progress3 = Math.min(Math.max((scrollY - section3Top + vh) / vh, 0), 1);

    const scale = 1 + progress3 * 3.5; 
    img2.style.transform = `scale(${scale})`;
  });

