const items = document.querySelectorAll(".pricing-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }

    });
  },
  {
    threshold: 0.25
  }
);

items.forEach((item) => observer.observe(item));
