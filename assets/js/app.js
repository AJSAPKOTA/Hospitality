
const skills = [('HV', 'High-Volume Service', 'Reliable execution when service is busy and timing matters.'), ('GR', 'Grill & Fryer', 'Steaks, burgers, fried items and fast section service.'), ('SP', 'Sauté & Pizza', 'Hot-line execution across sauté, pasta and pizza sections.'), ('SF', 'Seafood Preparation', 'Preparation and service of fresh seafood dishes.'), ('BK', 'Breakfast & Pub Cuisine', 'Adaptable across café, breakfast and pub-style menus.'), ('FS', 'Food Safety & HACCP', 'Food safety, hygiene and compliant kitchen practice.'), ('ST', 'FIFO Stock Control', 'Organised stock rotation and kitchen discipline.'), ('MP', 'Mise en Place', 'Structured preparation for efficient service.'), ('TM', 'Teamwork & Communication', 'Clear communication across kitchen and service teams.'), ('PR', 'Working Under Pressure', 'Maintaining timing, quality and composure during service.')];
const dishes = [('herb-crusted-lamb-cutlets', 'Herb-Crusted Lamb', 'Dinner', 'Mains'), ('garlic-prawns-soft-egg', 'Garlic Prawns & Soft Egg', 'Mains', 'Mains'), ('sweet-sour-chicken', 'Sweet & Sour Chicken', 'Mains', 'Mains'), ('stuffed-chicken-roulade', 'Stuffed Chicken Roulade', 'Mains', 'Mains'), ('bacon-wrapped-pork', 'Bacon-Wrapped Pork', 'Mains', 'Mains'), ('pan-seared-salmon', 'Pan-Seared Salmon', 'Mains', 'Mains'), ('salmon-beurre-blanc', 'Salmon & Beurre Blanc', 'Mains', 'Mains'), ('salmon-duo', 'Salmon Duo', 'Mains', 'Mains'), ('chicken-bok-choy-broth', 'Chicken & Bok Choy Broth', 'Mains', 'Mains'), ('chicken-anchovy-salad', 'Chicken & Anchovy Salad', 'Salads', 'Salads'), ('beef-satay-skewers', 'Beef Satay Skewers', 'Starters', 'Starters'), ('roasted-vegetable-salad', 'Roasted Vegetable Salad', 'Salads', 'Salads'), ('gazpacho-duo', 'Gazpacho Duo', 'Starters', 'Starters'), ('caprese-bruschetta', 'Caprese Bruschetta', 'Starters', 'Starters'), ('caprese-salad', 'Caprese Salad', 'Salads', 'Salads'), ('australian-big-breakfast', 'Australian Big Breakfast', 'Breakfast', 'Breakfast'), ('eggs-benedict', 'Eggs Benedict', 'Breakfast', 'Breakfast'), ('smashed-avocado-eggs', 'Smashed Avocado & Poached Eggs', 'Breakfast', 'Breakfast'), ('breakfast-stack', 'Breakfast Stack', 'Breakfast', 'Breakfast'), ('margherita-pizza', 'Wood-Fired Style Pizza', 'Pizza', 'Pizza'), ('pasta-primavera', 'Seasonal Pasta', 'Pasta', 'Pasta'), ('strawberry-crepes', 'Strawberry Crepes', 'Dessert', 'Dessert')];

const skillGrid = document.querySelector("#skills-grid");
const gallery = document.querySelector("#gallery-grid");
const loadMore = document.querySelector("#load-more");
const filters = document.querySelectorAll(".filter");
const themeToggle = document.querySelector("#theme-toggle");
const menuBtn = document.querySelector("#menu-btn");
const navLinks = document.querySelector("#nav-links");
let activeFilter = "all";
let visibleCount = 9;
let currentIndex = 0;

function renderSkills() {
  skillGrid.innerHTML = skills.map(([code,title,desc]) => `
    <article class="skill-card">
      <span class="skill-index">${code}</span>
      <h3>${title}</h3>
      <p>${desc}</p>
    </article>`).join("");
}

function filteredDishes() {
  return activeFilter === "all" ? dishes : dishes.filter(d => d[2] === activeFilter);
}

function renderGallery() {
  const list = filteredDishes();
  const shown = list.slice(0, visibleCount);
  gallery.innerHTML = shown.map((d, i) => `
    <figure class="gallery-card" tabindex="0" data-index="${i}">
      <img src="assets/images/${d[0]}.jpg" alt="${d[1]}" loading="lazy">
      <figcaption><small>${d[2]}</small><strong>${d[1]}</strong></figcaption>
    </figure>`).join("");
  loadMore.hidden = shown.length >= list.length;
  if (!shown.length) gallery.innerHTML = "<p>No dishes in this category yet.</p>";
}

filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.filter;
  visibleCount = 9;
  renderGallery();
}));

loadMore.addEventListener("click", () => {
  visibleCount += 6;
  renderGallery();
});

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("chef-theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});
if (localStorage.getItem("chef-theme") === "dark") document.body.classList.add("dark-mode");

const lightbox = document.querySelector("#lightbox");
const lbImage = document.querySelector("#lightbox-image");
const lbTitle = document.querySelector("#lightbox-title");
const lbCategory = document.querySelector("#lightbox-category");

function openLightbox(index) {
  const list = filteredDishes();
  currentIndex = index;
  const d = list[currentIndex];
  lbImage.src = `assets/images/${d[0]}.jpg`;
  lbImage.alt = d[1];
  lbTitle.textContent = d[1];
  lbCategory.textContent = d[2];
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
}
function stepLightbox(delta) {
  const list = filteredDishes();
  currentIndex = (currentIndex + delta + list.length) % list.length;
  openLightbox(currentIndex);
}
gallery.addEventListener("click", e => {
  const card = e.target.closest(".gallery-card");
  if (card) openLightbox(Number(card.dataset.index));
});
gallery.addEventListener("keydown", e => {
  const card = e.target.closest(".gallery-card");
  if (card && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault(); openLightbox(Number(card.dataset.index));
  }
});
document.querySelector("#lightbox-close").onclick = closeLightbox;
document.querySelector("#lightbox-prev").onclick = () => stepLightbox(-1);
document.querySelector("#lightbox-next").onclick = () => stepLightbox(1);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});

document.querySelector("#year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

renderSkills();
renderGallery();
