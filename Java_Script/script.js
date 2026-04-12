/* ============================================
   SCRIPT.JS - Funcionalidades JavaScript
   del proyecto RPM (Proyecto Educativo)
   
   Contenido:
   1. Resaltar pÃ¡gina activa en el menÃº
   2. Detectar la URL actual y comparar con enlaces
   ============================================ */

/* ============================================
   FUNCIÃ“N: highlightActivePage()
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

/*--------------HOME: DECADE SPOTLIGHT INTERACTIVE-------------*/
document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll("[data-spotlight]");
  if (!panels.length) return;

  const spotlightCopies = {
    "1960": [
      { text: "¿Te apetece sentir el origen del mito americano?", cta: "Explorar los 60s" },
      { text: "Cromados, V8 y carácter: aquí empezó todo.", cta: "Entrar en los 60s" }
    ],
    "1970": [
      { text: "Diseño radical y potencia sin complejos.", cta: "Quiero ver los 70s" },
      { text: "La década donde el superdeportivo cambió para siempre.", cta: "Abrir década 70s" }
    ],
    "1980": [
      { text: "Neón, exceso y máquinas con personalidad propia.", cta: "Ver década 80s" },
      { text: "La cultura pop automotriz en su máximo esplendor.", cta: "Explorar los 80s" }
    ],
    "1990": [
      { text: "JDM, tecnología y leyendas de culto.", cta: "Entrar en los 90s" },
      { text: "Si te gustan los iconos japoneses, esta es tu era.", cta: "Descubrir década 90s" }
    ],
    "2000": [
      { text: "Prestaciones de élite con ADN de ingeniería pura.", cta: "Ver década 00s" },
      { text: "La era donde la precisión se volvió protagonista.", cta: "Explorar los 00s" }
    ],
    "2010": [
      { text: "Híbridos extremos y diseño de otro planeta.", cta: "Entrar en los 10s" },
      { text: "La década de los hiperdeportivos modernos.", cta: "Abrir década 10s" }
    ]
  };

  panels.forEach((panel) => {
    const decade = panel.dataset.decade;
    const dynamicText = panel.querySelector(".spotlight-dynamic");
    const ctaButton = panel.querySelector(".spotlight-cta");
    const copies = spotlightCopies[decade] || [];
    let copyIndex = 0;

    const activatePanel = () => {
      panel.classList.add("is-hovered");
      if (!dynamicText || !ctaButton || !copies.length) return;
      const currentCopy = copies[copyIndex % copies.length];
      dynamicText.textContent = currentCopy.text;
      ctaButton.textContent = currentCopy.cta;
      copyIndex += 1;
    };

    panel.addEventListener("mouseenter", activatePanel);
    panel.addEventListener("focusin", activatePanel);
    panel.addEventListener("mouseleave", () => panel.classList.remove("is-hovered"));
    panel.addEventListener("focusout", () => panel.classList.remove("is-hovered"));
  });
});


