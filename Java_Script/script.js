/* ============================================
   FUNCIÃ“N: highlightActivePage()
   ============================================
   PropÃ³sito: Resaltar el enlace del menÃº que
   corresponde a la pÃ¡gina actual.
   
   CÃ³mo funciona:
   1. Obtiene la ruta y el query string actual.
   2. Selecciona todos los enlaces del menÃº con jQuery.
   3. Compara la URL actual con el href de cada enlace.
   4. AÃ±ade la clase 'active' al enlace correcto y se la quita a los demÃ¡s.
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
    // requestAnimationFrame es una funciÃ³n avanzada del navegador que llama a 'loopSlider' 
    // unas 60 veces por segundo, creando una animaciÃ³n muy suave para el carrusel.
    requestAnimationFrame(loopSlider);
  }

  if ($track.length) {
    // jQuery: .on() se usa para registrar eventos de ratÃ³n en el slider (parar al pasar el ratÃ³n).
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
  // y simplifica la gestiÃ³n de botones, imÃ¡genes activas y texto asociado.
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
        // setTimeout espera un tiempo (100 milisegundos) antes de ejecutar la funciÃ³n de dentro.
        // Lo usamos para hacer un pequeÃ±o efecto de retardo al cambiar el texto.
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
    // y .on("click") conecta la navegaciÃ³n manual.
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
  // VALIDACIÃ“N DE FORMULARIO DE CONTACTO
  // ============================================
  // jQuery: selecciona el formulario de contacto para validar los campos.
  const $contactForm = $(".contact-form");

  if (!$contactForm.length) return;

  // jQuery: recoge todos los campos a validar del formulario.
  const $requiredFields = $contactForm.find("#nombre, #email, #mensaje");

  /* FUNCIÃ“N: getFieldMessage()
     PropÃ³sito: Devuelve el mensaje de error correspondiente a cada campo. */
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

  /* FUNCIÃ“N: updateFieldState()
     PropÃ³sito: Actualiza visualmente el campo y el mensaje de error. */
  function updateFieldState($field) {
    const message = getFieldMessage($field);

    // jQuery: busca el <p> de error asociado a cada campo mediante data-field-message.
    const $message = $contactForm.find(
      `[data-field-message="${$field.attr("id")}"]`,
    );

    // jQuery: actualiza la clase de error (borde rojo) y el texto del mensaje.
    $field.toggleClass("is-invalid", Boolean(message));
    $message.text(message);
    
    // Mostramos u ocultamos el elemento con .show() o .hide() segÃºn si hay error.
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

  // jQuery: controla el envÃ­o del formulario y evita enviarlo
  // si alguno de los campos obligatorios sigue siendo invÃ¡lido.
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
      event.preventDefault(); // Evita que se envÃ­e el formulario
      invalidFields[0].trigger("focus"); // Pone el foco en el primer error
    }
  });
});

