/* ============================================
   FUNCION: highlightActivePage()
   ============================================
   Propósito: Resaltar el enlace del menú que
   corresponde a la página actual.
   
   Cómo funciona:
   1. Obtiene la ruta y el query string actual.
   2. Selecciona todos los enlaces del menú con jQuery.
   3. Compara la URL actual con el href de cada enlace.
   4. Añade la clase 'active' al enlace correcto y se la quita a los demás.
   ============================================ */
function highlightActivePage() {
  // Obtenemos la ruta y el query string actual (p. ej. /secciones.html?decada=1960)
  const currentFullRoute = window.location.pathname + window.location.search;

  $(".Menu a").each(function () {
    const $link = $(this);
    const href = $link.attr("href") || "";

    // Un enlace es activo si:
    // 1. La ruta completa actual incluye el href del enlace
    // 2. Es el Home (caso especial por estructura de carpetas)
    const isActive =
      currentFullRoute.includes(href) ||
      (currentFullRoute.includes("Home") && href.includes("Home.html"));

    $link.toggleClass("active", isActive);
  });
}

// jQuery: $(function () {}) espera a que el DOM estÃ© listo.
// AquÃ­ se agrupan todas las interacciones comunes de la web.
$(function () {
  highlightActivePage();

  // ============================================
  // SLIDER DE CARRUSEL (HOME)
  // ============================================
  // jQuery: $("#sliderTrack") selecciona el carrusel principal de Home.
  const $track = $("#sliderTrack");
  let speed = 0.3;
  let pos = 0;
  let isSliderPaused = false;

  function loopSlider() {
    if (!$track.length) return;

    if (!isSliderPaused) {
      pos += speed;
    }

    // Si llegamos a la mitad del scroll (donde empiezan las copias de las fotos), reiniciamos.
    if (pos >= $track[0].scrollWidth / 2) {
      pos = 0;
    }

    $track.css("transform", `translateX(-${pos}px)`);
    // requestAnimationFrame es una función avanzada del navegador que llama a 'loopSlider'
    // unas 60 veces por segundo, creando una animación muy suave para el carrusel.
    requestAnimationFrame(loopSlider);
  }

  if ($track.length) {
    // jQuery: .on() se usa para registrar eventos de ratón en el slider (parar al pasar el ratón).
    $track.on("mouseenter", function () {
      isSliderPaused = true;
    });

    $track.on("mouseleave", function () {
      isSliderPaused = false;
    });

    loopSlider();
  }

  // jQuery: selecciona cada tarjeta del slider y redirige al enlace interno al hacer click.
  $(".car-item").on("click", function () {
    const link = $(this).find("a").attr("href");

    if (link) {
      window.location.href = link;
    }
  });

  // ============================================
  // SLIDERS MANUALES (TARJETAS DE COCHES)
  // ============================================
  // jQuery: busca todos los sliders manuales con [data-slider]
  // y simplifica la gestión de botones, imágenes activas y texto asociado.
  $("[data-slider]").each(function () {
    const $slider = $(this);
    const $slides = $slider.find(".slides img");
    const $text = $slider.parent().find(".car-text").first();
    let current = 0;
    let interval;

    function showSlide(index) {
      $slides.removeClass("active").eq(index).addClass("active");

      if ($text.length) {
        $text.removeClass("active");
        // setTimeout espera un tiempo (100 milisegundos) antes de ejecutar la función de dentro.
        // Lo usamos para hacer un pequeño efecto de retardo al cambiar el texto.
        setTimeout(function () {
          $text.addClass("active");
        }, 100);
      }
    }

    function nextSlide() {
      current = (current + 1) % $slides.length;
      showSlide(current);
    }

    function prevSlide() {
      current = (current - 1 + $slides.length) % $slides.length;
      showSlide(current);
    }

    function startInterval() {
      interval = setInterval(nextSlide, 3000);
    }

    function resetInterval() {
      clearInterval(interval);
      startInterval();
    }

    // jQuery: .find() localiza los botones dentro de cada slider
    // y .on("click") conecta la navegación manual.
    $slider.find(".next").on("click", function () {
      nextSlide();
      resetInterval();
    });

    $slider.find(".prev").on("click", function () {
      prevSlide();
      resetInterval();
    });

    showSlide(current);
    startInterval();
  });

  // ============================================
  // VALIDACIÓN DE FORMULARIO DE CONTACTO
  // ============================================
  // jQuery: selecciona el formulario de contacto para validar los campos.
  const $contactForm = $(".contact-form");

  if (!$contactForm.length) return;

  // jQuery: recoge todos los campos a validar del formulario.
  const $requiredFields = $contactForm.find("#nombre, #email, #mensaje");

  /* FUNCIÓN: getFieldMessage()
     Propósito: Devuelve el mensaje de error correspondiente a cada campo. */
  function getFieldMessage($field) {
    const fieldId = $field.attr("id");
    const value = ($field.val() || "").trim();

    if (fieldId === "nombre" && !value) {
      return "Es obligatorio rellenar el campo";
    }

    if (fieldId === "email") {
      if (!value) {
        return "Es obligatorio rellenar el campo";
      }

      const hasAt = value.includes("@");

      if (!hasAt) {
        return "Formato incorrecto necesario incluir @";
      }
    }

    if (fieldId === "mensaje" && !value) {
      return "Es obligatorio rellenar el campo";
    }

    return "";
  }

  /* FUNCIÓN: updateFieldState()
     Propósito: Actualiza visualmente el campo y el mensaje de error. */
  function updateFieldState($field) {
    const message = getFieldMessage($field);

    // jQuery: busca el <p> de error asociado a cada campo mediante data-field-message.
    const $message = $contactForm.find(
      `[data-field-message="${$field.attr("id")}"]`,
    );

    // jQuery: actualiza la clase de error (borde rojo) y el texto del mensaje.
    $field.toggleClass("is-invalid", Boolean(message));
    $message.text(message);

    // Mostramos u ocultamos el elemento con .show() o .hide() según si hay error.
    if (message) {
      $message.show();
    } else {
      $message.hide();
    }
  }

  // jQuery: valida mientras el usuario escribe o sale del campo.
  $requiredFields.on("input blur", function () {
    updateFieldState($(this));
  });

  // jQuery: controla el envío del formulario y evita enviarlo
  // si alguno de los campos obligatorios sigue siendo inválido.
  $contactForm.on("submit", function (event) {
    const invalidFields = [];

    $requiredFields.each(function () {
      const $field = $(this);
      updateFieldState($field);

      if (getFieldMessage($field)) {
        invalidFields.push($field);
      }
    });

    if (invalidFields.length > 0) {
      event.preventDefault(); // Evita que se envíe el formulario
      invalidFields[0].trigger("focus"); // Pone el foco en el primer error
    }
  });
});
