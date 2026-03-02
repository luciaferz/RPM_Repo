// Detecta la página actual y resaltar en el menú
function highlightActivePage() {
  // Obtener la URL actual
  const currentPath = window.location.pathname;

  // Obtener todos los enlaces del menú
  const navLinks = document.querySelectorAll(".Menu a");

  navLinks.forEach((link) => {
    // Obtener el href del enlace
    const href = link.getAttribute("href");

    // Comparar si el enlace corresponde a la página actual
    if (
      currentPath.includes(href) ||
      (currentPath.includes("Home") && href.includes("Home.html"))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Ejecutar cuando carga la página
document.addEventListener("DOMContentLoaded", highlightActivePage);
