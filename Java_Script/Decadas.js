let DECADES = {};

fetch('../../Java_Script/decadas.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar los datos');
    }
    return response.json();
  })
  .then(data => {
    DECADES = data;
    renderDecade();
    setupGalleryChange();
    setupInfoToggle();
  })
  .catch(error => {
    console.error('Error al cargar decadas.json:', error);
  });

function getDecadeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const decade = params.get("decada");
  return DECADES[decade] ? decade : "1960";
}

function createGallery(images, carName) {
  return images
    .map((image, index) => {
      return `
        <button
          type="button"
          class="car-thumb-button${index === 0 ? " active" : ""}"
          data-thumb-button
          data-image-src="${image.src}"
          data-image-alt="${image.alt || carName}"
          aria-label="Ver imagen de ${carName}"
        >
          <img
            src="${image.src}"
            alt="${image.alt || carName}"
            class="car-thumb"
            loading="lazy"
          />
        </button>
      `;
    })
    .join("");
}

function createCard(car) {
  const mainImage = car.images[0];

  return `
    <article class="car-card" id="${car.id}">
      <img
        src="${mainImage.src}"
        alt="${mainImage.alt}"
        class="car-main-image"
        data-main-image
        loading="lazy"
      />
      <div class="car-info">
        <p class="car-year">${car.year}</p>
        <h3 class="subtitulo">${car.name}</h3>
        <p class="car-description">${car.text}</p>
        <div class="car-gallery-thumbs">
          ${createGallery(car.images, car.name)}
        </div>
        <button type="button" class="info-toggle" data-info-toggle>
          Ver informacion
        </button>
        <div class="car-extra-info" data-info-panel>
          <div class="info-block">
            <h4>Descripcion</h4>
            <p>${car.text}</p>
          </div>
          <div class="info-block">
            <h4>Caracteristicas</h4>
            <p>${car.features || "Modelo representativo de su decada por diseno, motor y personalidad."}</p>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderDecade() {
  const decadeKey = getDecadeFromUrl();
  const decade = DECADES[decadeKey];
  const title = document.getElementById("decadeHeading");
  const lead = document.getElementById("garageLead");
  const subheading = document.getElementById("decadeSubheading");
  const narrative = document.getElementById("decadeNarrative");
  const grid = document.getElementById("carsGrid");

  if (!decade || !title || !lead || !subheading || !narrative || !grid) {
    return;
  }

  document.body.setAttribute("data-decade", decadeKey);
  title.textContent = decade.title;
  title.className = decade.headingClass;
  lead.textContent = decade.intro;
  subheading.textContent = "";
  narrative.textContent = "";
  grid.innerHTML = decade.cars.map(createCard).join("");

  document.querySelectorAll(".decade-filter-link").forEach((link) => {
    const isActive = link.dataset.decadeLink === decadeKey;
    link.classList.toggle("active", isActive);
  });
}

function setupGalleryChange() {
  document.querySelectorAll(".car-card").forEach((card) => {
    const mainImage = card.querySelector("[data-main-image]");
    const buttons = card.querySelectorAll("[data-thumb-button]");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (!mainImage) return;

        mainImage.src = button.dataset.imageSrc;
        mainImage.alt = button.dataset.imageAlt;

        buttons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
  });
}

function setupInfoToggle() {
  document.querySelectorAll(".car-card").forEach((card) => {
    const button = card.querySelector("[data-info-toggle]");
    const panel = card.querySelector("[data-info-panel]");

    if (!button || !panel) return;

    button.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("open");
      button.textContent = isOpen ? "Ocultar informacion" : "Ver informacion";
    });
  });
}
