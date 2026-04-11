/* ============================================
   SCRIPT.JS - Funcionalidades JavaScript
   del proyecto RPM (Proyecto Educativo)
   
   Contenido:
   1. Resaltar página activa en el menú
   2. Detectar la URL actual y comparar con enlaces
   ============================================ */

/* ============================================
   FUNCIÓN: highlightActivePage()
   ============================================
   Propósito: Resaltar el enlace del menú que
   corresponde a la página actual.
   
   Cómo funciona:
   1. Obtiene la ruta actual del navegador
   2. Selecciona todos los enlaces del menú
   3. Compara la URL actual con cada href
   4. Añade/quita la clase 'active'
   
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

  // Selecciona todos los enlaces (<a>) dentro del menú
  // document.querySelectorAll devuelve una NodeList (lista)
  const navLinks = document.querySelectorAll(".Menu a");

  // forEach permite recorrer cada elemento de la lista
  navLinks.forEach((link) => {
    // getAttribute("href") obtiene el valor del atributo href
    // Ejemplo: "../../HTML/1960/60s.html"
    const href = link.getAttribute("href");

    // Comparación:
    // - currentPath.includes(href): la URL contiene la ruta del enlace
    // - Especial caso para Home: si la URL contiene "Home"
    if (
      currentPath.includes(href) ||
      (currentPath.includes("Home") && href.includes("Home.html"))
    ) {
      // Añadir clase 'active' para resaltar visualmente
      link.classList.add("active");
    } else {
      // Quitar clase si no corresponde (por si se navega atrás)
      link.classList.remove("active");
    }
  });
}

/* ============================================
   EVENTO: DOMContentLoaded
   ============================================
   Ejecuta el código cuando el HTML está listo
   (antes de cargar imágenes y otros recursos).
   
   Esto asegura que el script funcione después
   de que el DOM exista pero antes de que todo
   esté completamente cargado.
   ============================================ */
document.addEventListener("DOMContentLoaded", highlightActivePage);

/* ============================================
   NOTA EDUCATIVA: Rutas relativas vs absolutas
   ============================================
   - Rutas relativas: "../CSS/styles.css" (respecto al archivo actual)
   - Rutas absolutas: "/HTML/1960/60s.html" (desde raíz del servidor)
   
   En este proyecto usamos rutas relativas para
   que funcione al abrir archivos directamente
   desde el explorador (sin servidor).
   ============================================ */

/*--------------SLIDER DE CARRUSEL-------------
   ============================================
   Propósito: Crear un slider automático para
   mostrar los coches de manera continua*/
const track = document.getElementById("sliderTrack");
let speed = 0.3; // velocidad (ajustable)
let pos = 0;

function loopSlider() {
  pos += speed;
  if (pos >= track.scrollWidth / 2) pos = 0; // reinicia suavemente
  track.style.transform = `translateX(-${pos}px)`;
  requestAnimationFrame(loopSlider);
}

loopSlider();

document.querySelectorAll(".car-item").forEach((item) => {
  item.addEventListener("click", () => {
    const link = item.querySelector("a").getAttribute("href");
    window.location.href = link;
  });
});
 HEAD
document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuario");

  if (usuario) {
    const boton = document.getElementById("btnCuenta");

    if (boton) {
      boton.textContent = "👤 " + usuario;
      boton.href = "#"; 
    }
  }
});


/*------------SECCIONES DE DÉCADAS: Animación al hacer scroll--------------*/
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

