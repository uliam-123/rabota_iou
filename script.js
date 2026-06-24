
const categoryData = {
  landscape: [
    { title: "Ночное окно", text: "..." },
    { title: "Осенний сад", text: "..." }
  ],

  idea: [
    { title: "Идея", text: "..." }
  ],

  thought: [
    { title: "Мысль", text: "..." }
  ],

  other: [
    { title: "Без названия", text: "..." }
  ]
};

/* ===== ЦИТАТЫ (каждые 10 минут) ===== */

const quotes = [
  "Цитата 1...",
  "Цитата 2...",
  "Цитата 3..."
];

function getQuoteIndex() {
  const interval = 10 * 60 * 1000;
  return Math.floor(Date.now() / interval) % quotes.length;
}

function renderQuote() {
  const el = document.getElementById("poem-fragment");
  if (!el) return;

  const quote = quotes[getQuoteIndex()] || "";

  el.innerHTML = `
    <div class="fade">
      ${quote}
    </div>
  `;
}

renderQuote();
setInterval(renderQuote, 60000);

/* ===== СОСТОЯНИЕ ===== */

let currentCategory = null;

/* ===== ПЕРЕХОД В КАТЕГОРИЮ ===== */

function openCategory(cat) {
  currentCategory = cat;

  const home = document.getElementById("poem-fragment");
  const container = document.getElementById("category-content");

  if (!home || !container) return;

  home.style.opacity = 0;

  setTimeout(() => {
    home.style.display = "none";

    const poems = categoryData[cat] || [];

    container.style.display = "block";
    container.style.opacity = 0;

    container.innerHTML = `
      <div class="fade">
        <h2>${cat}</h2>

        ${
          poems.length
            ? poems
                .map(
                  (p, i) => `
            <div class="poem-item" onclick="openPoem(${i})">
              ${p.title}
            </div>
          `
                )
                .join("")
            : "<p>Нет стихов</p>"
        }

        <div class="back-btn" onclick="backToHome()">← Назад</div>
      </div>
    `;

    setTimeout(() => {
      container.style.opacity = 1;
    }, 50);
  }, 400);
}

/* ===== ОТКРЫТЬ СТИХ ===== */

function openPoem(index) {
  const container = document.getElementById("category-content");
  if (!container || !currentCategory) return;

  const poem = categoryData[currentCategory]?.[index];
  if (!poem) return;

  container.style.opacity = 0;

  setTimeout(() => {
    container.innerHTML = `
      <div class="fade">
        <h2>${poem.title}</h2>

        <pre style="white-space: pre-wrap; line-height: 1.5">
${poem.text}
        </pre>

        <div class="back-btn" onclick="backToCategory()">← Назад</div>
      </div>
    `;

    container.style.opacity = 1;
  }, 400);
}

/* ===== ВОЗВРАТ ===== */

function backToCategory() {
  if (currentCategory) {
    openCategory(currentCategory);
  }
}

function backToHome() {
  const home = document.getElementById("poem-fragment");
  const container = document.getElementById("category-content");

  if (!home || !container) return;

  container.style.opacity = 0;

  setTimeout(() => {
    container.style.display = "none";

    home.style.display = "block";

    setTimeout(() => {
      home.style.opacity = 1;
    }, 50);
  }, 400);
}

/* ===== ЛИСТЬЯ (бесконечно) ===== */

function spawnLeaf() {
  const leaf = document.createElement("div");
  leaf.className = "leaf";

  const y = Math.random() * window.innerHeight * 0.5;

  leaf.style.top = window.innerHeight * 0.2 + y + "px";
  leaf.style.right = "-20px";

  const duration = 4 + Math.random() * 4;
  leaf.style.animationDuration = duration + "s";

  document.body.appendChild(leaf);

  setTimeout(() => {
    leaf.remove();
  }, duration * 1000);
}

function startLeaves() {
  setInterval(() => {
    if (Math.random() < 0.7) {
      spawnLeaf();
    }
  }, 300);
}

startLeaves();
