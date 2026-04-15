

/* ============================================
   FUNCIÓN: highlightActivePage()
   ============================================
   PropÃ³sito: Resaltar el enlace del menÃº que
   corresponde a la pÃ¡gina actual.
   
   CÃ³mo funciona:
   1. Obtiene la ruta actual del navegador
   2. Selecciona todos los enlaces del menÃº
   3. Compara la URL actual con cada href
   4. AÃ±ade/quita la clase 'active'
   
   Conceptos aprendidos:
   - window.location.pathname: ruta actual
   - document.querySelectorAll(): seleccionar varios
   - forEach(): recorrer elementos
   - getAttribute(): obtener valor de atributo
   - classList.add/remove(): modificar clases CSS
   ============================================ */
   
function highlightActivePage() {
  // window.location.pathname devuelve la ruta actual
  // Ejemplo: "/HTML/1960/60s.html"
  const currentPath = window.location.pathname;

  // Selecciona todos los enlaces (<a>) dentro del menÃº
  // document.querySelectorAll devuelve una NodeList (lista)
  const navLinks = document.querySelectorAll(".Menu a");

  // forEach permite recorrer cada elemento de la lista
  navLinks.forEach((link) => {
    // getAttribute("href") obtiene el valor del atributo href
    // Ejemplo: "../../HTML/1960/60s.html"
    const href = link.getAttribute("href");

    // ComparaciÃ³n:
    // - currentPath.includes(href): la URL contiene la ruta del enlace
    // - Especial caso para Home: si la URL contiene "Home"
    if (
      currentPath.includes(href) ||
      (currentPath.includes("Home") && href.includes("Home.html"))
    ) {
      // AÃ±adir clase 'active' para resaltar visualmente
      link.classList.add("active");
    } else {
      // Quitar clase si no corresponde (por si se navega atrÃ¡s)
      link.classList.remove("active");
    }
  });
}

/* ============================================
   EVENTO: DOMContentLoaded
   ============================================
   Ejecuta el cÃ³digo cuando el HTML estÃ¡ listo
   (antes de cargar imÃ¡genes y otros recursos).
   
   Esto asegura que el script funcione despuÃ©s
   de que el DOM exista pero antes de que todo
   estÃ© completamente cargado.
   ============================================ */
document.addEventListener("DOMContentLoaded", highlightActivePage);

/* ============================================
   NOTA EDUCATIVA: Rutas relativas vs absolutas
   ============================================
   - Rutas relativas: "../CSS/styles.css" (respecto al archivo actual)
   - Rutas absolutas: "/HTML/1960/60s.html" (desde raÃ­z del servidor)
   
   En este proyecto usamos rutas relativas para
   que funcione al abrir archivos directamente
   desde el explorador (sin servidor).
   ============================================ */

/*--------------SLIDER DE CARRUSEL-------------
   ============================================
   PropÃ³sito: Crear un slider automÃ¡tico para
   mostrar los coches de manera continua*/
const track = document.getElementById("sliderTrack");
let speed = 0.3; // velocidad (ajustable)
let pos = 0;
let isSliderPaused = false;

function loopSlider() {
  if (!track) return;
  if (!isSliderPaused) {
    pos += speed;
  }
  if (pos >= track.scrollWidth / 2) pos = 0; // reinicia suavemente
  track.style.transform = `translateX(-${pos}px)`;
  requestAnimationFrame(loopSlider);
}

if (track) {
  track.addEventListener("mouseenter", () => {
    isSliderPaused = true;
  });

  track.addEventListener("mouseleave", () => {
    isSliderPaused = false;
  });

  loopSlider();
}

document.querySelectorAll(".car-item").forEach((item) => {
  item.addEventListener("click", () => {
    const link = item.querySelector("a").getAttribute("href");
    window.location.href = link;
  });
});
// DecadeSection.jsx
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // SLIDERS (manual simple)
  // =========================
  const sliders = document.querySelectorAll("[data-slider]");

  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".slides img");
    const text = slider.parentElement.querySelector(".car-text");
    let current = 0;
    let interval;

    function showSlide(idx) {
      slides.forEach((img, i) => img.classList.toggle("active", i === idx));
      if (text) {
        text.classList.remove("active");
        setTimeout(() => text.classList.add("active"), 100);
      }
    }

    function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }

    function prevSlide() {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    }

    slider.querySelector(".next").addEventListener("click", () => {
      nextSlide();
      resetInterval();
    });
    slider.querySelector(".prev").addEventListener("click", () => {
      prevSlide();
      resetInterval();
    });

    function startInterval() {
      interval = setInterval(nextSlide, 3000);
    }
    function resetInterval() {
      clearInterval(interval);
      startInterval();
    }

    showSlide(current);
    startInterval();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");

  if (!contactForm) return;

  const requiredFields = contactForm.querySelectorAll("input[required], textarea[required]");
  const emailField = contactForm.querySelector("#email");
  const nameField = contactForm.querySelector("#nombre");
  const messageField = contactForm.querySelector("#mensaje");

  /*----------MENSAJE ERRROR Y VALIDACIÓN DE CAMPOS (CONTACTO)---------------- */
  function getFieldMessage(field) {
    if (field.id === "nombre" && !field.value.trim()) {
      return "Necesita rellenar este campo.";
    }

    if (field.id === "email") {
      const emailValue = field.value.trim();

      if (!emailValue) {
        return "Necesita rellenar este campo."; /*Primero verifica si el campo está vacío*/
      }

      if (!emailValue.includes("@") || !field.checkValidity()) {
        return "El formato es incorrecto y necesita poner @."; /*Luego verifica si el formato es incorrecto*/
      }
    }

    if (field.id === "mensaje" && !field.value.trim()) {
      return "Necesita rellenar este campo.";
    }

    return "";
  }

  function getFieldMessageElement(field) {
    return contactForm.querySelector(`[data-field-message="${field.id}"]`);
  }

  function updateFieldMessage(field) {
    const messageElement = getFieldMessageElement(field);
    if (!messageElement) return;

    const message = getFieldMessage(field);
    messageElement.textContent = message;
    messageElement.classList.toggle("is-visible", Boolean(message));
  }

  function updateFieldState(field) {
    const hasError = Boolean(getFieldMessage(field));
    field.classList.toggle("is-invalid", hasError);
    updateFieldMessage(field);
  }

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      updateFieldState(field);
    });
  });

  contactForm.addEventListener("submit", (event) => {
    const invalidFields = Array.from(requiredFields).filter((field) =>
      Boolean(getFieldMessage(field)),
    );

    requiredFields.forEach((field) => updateFieldState(field));

    if (invalidFields.length > 0) {
      event.preventDefault();
      invalidFields[0].focus();
      return;
    }
  });
});


