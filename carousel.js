(() => {
  const marquee = document.getElementById("creativeMarquee");
  if (!marquee) return;

  const images = [
    "images/card.png",
    "images/mokap.png",
    "images/8482918.jpg",
    "images/10832058.jpg",
    "images/Adropper-03.png"
  ];

  const phasePattern = [
    [2, 4],
    [1, 5],
    [3]
  ];

  const state = {
    cards: [],
    phaseIndex: 0,
    lastPhaseTime: 0,
    animationId: null
  };

  function gap() {
  if (window.innerWidth <= 768) return 10;
  if (window.innerWidth <= 1200) return 12;
  return 12;
}

function smallWidth() {
  if (window.innerWidth <= 768) return 70;
  if (window.innerWidth <= 1200) return 100;
  return 100    ;
}

function largeWidth() {
  if (window.innerWidth <= 768) return 170;
  if (window.innerWidth <= 1200) return 240;
  return 380;
}

  function speed() {
    if (window.innerWidth <= 768) return 0.32;
    if (window.innerWidth <= 1200) return 0.38;
    return 0.42;
  }

  function phaseDuration() {
    return 2200;
  }

  function lerp(current, target, factor) {
    return current + (target - current) * factor;
  }

  function createCard(src, visualIndex) {
    const el = document.createElement("div");
    el.className = "creative-card";
    el.dataset.visualIndex = String(visualIndex);

    const inner = document.createElement("div");
    inner.className = "creative-card-inner";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Visual ${visualIndex}`;

    inner.appendChild(img);
    el.appendChild(inner);
    marquee.appendChild(el);

    return {
      el,
      visualIndex,
      x: 0,
      width: smallWidth(),
      targetWidth: smallWidth()
    };
  }

  function applyCard(card) {
    card.el.style.left = `${card.x}px`;
    card.el.style.width = `${card.width}px`;
  }

  function applyPhase(activeSet) {
    state.cards.forEach(card => {
      const isWide = activeSet.includes(card.visualIndex);
      card.targetWidth = isWide ? largeWidth() : smallWidth();
      card.el.classList.toggle("is-wide", isWide);
    });
  }

  function build() {
    marquee.innerHTML = "";
    state.cards = [];

    const containerWidth = marquee.clientWidth;
    const minCards = Math.max(
      10,
      Math.ceil((containerWidth * 2.2) / (smallWidth() + gap()))
    );

    let currentX = 0;
    let visualIndex = 1;

    for (let i = 0; i < minCards; i++) {
      const src = images[(visualIndex - 1) % images.length];
      const card = createCard(src, visualIndex);
      state.cards.push(card);

      card.width = smallWidth();
      card.targetWidth = smallWidth();
      card.x = currentX;
      applyCard(card);

      currentX += card.width + gap();

      visualIndex++;
      if (visualIndex > images.length) {
        visualIndex = 1;
      }
    }

    state.phaseIndex = 0;
    state.lastPhaseTime = 0;
    applyPhase(phasePattern[state.phaseIndex]);
  }

  function updatePhase(timestamp) {
    if (!state.lastPhaseTime) {
      state.lastPhaseTime = timestamp;
    }

    if (timestamp - state.lastPhaseTime >= phaseDuration()) {
      state.phaseIndex = (state.phaseIndex + 1) % phasePattern.length;
      applyPhase(phasePattern[state.phaseIndex]);
      state.lastPhaseTime = timestamp;
    }
  }

  function updateWidths() {
    for (const card of state.cards) {
      card.width = lerp(card.width, card.targetWidth, 0.065);
    }
  }

  function moveCards() {
    const move = speed();
    for (const card of state.cards) {
      card.x += move;
    }
  }

  function recycleCards() {
    const containerWidth = marquee.clientWidth;
    const g = gap();

    let leftmostX = Infinity;
    for (const card of state.cards) {
      if (card.x < leftmostX) leftmostX = card.x;
    }

    for (const card of state.cards) {
      if (card.x >= containerWidth + g) {
        card.x = leftmostX - card.width - g;
        leftmostX = card.x;
      }
    }
  }

  function packCardsRightToLeft() {
    const g = gap();
    const sorted = [...state.cards].sort((a, b) => a.x - b.x);

    for (let i = sorted.length - 2; i >= 0; i--) {
      const current = sorted[i];
      const next = sorted[i + 1];
      const expectedX = next.x - current.width - g;
      current.x = lerp(current.x, expectedX, 0.28);
    }
  }

  function ensureLeftFill() {
    const g = gap();
    let sorted = [...state.cards].sort((a, b) => a.x - b.x);
    let first = sorted[0];

    while (first.x > -first.width) {
      const last = sorted[sorted.length - 1];
      last.x = first.x - last.width - g;
      sorted.pop();
      sorted.unshift(last);
      first = sorted[0];
    }
  }

  function render() {
    for (const card of state.cards) {
      applyCard(card);
    }
  }

  function tick(timestamp) {
    updatePhase(timestamp);
    updateWidths();
    moveCards();
    recycleCards();
    packCardsRightToLeft();
    ensureLeftFill();
    render();

    state.animationId = requestAnimationFrame(tick);
  }

  function restart() {
    cancelAnimationFrame(state.animationId);
    build();
    state.animationId = requestAnimationFrame(tick);
  }

  window.addEventListener("resize", restart);
  restart();
})();