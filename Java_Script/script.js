function highlightActivePage() {
  const currentPath = window.location.pathname;

  // jQuery: selecciona todos los enlaces del menu y los recorre con .each()
  // Se usa para detectar cual coincide con la ruta actual y marcarlo como activo.
  $(".Menu a").each(function () {
    // jQuery: $(this) convierte el elemento actual en objeto jQuery
    // para poder usar .attr() y .toggleClass() de forma mas simple.
    const $link = $(this);
    const href = $link.attr("href") || "";
    const isActive =
      currentPath.includes(href) ||
      (currentPath.includes("Home") && href.includes("Home.html"));

    $link.toggleClass("active", isActive);
  });
}

// jQuery: $(function () {}) espera a que el DOM este listo.
// Aqui se agrupan todas las interacciones comunes de la web.
$(function () {
  highlightActivePage();

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

    if (pos >= $track[0].scrollWidth / 2) {
      pos = 0;
    }

    $track.css("transform", `translateX(-${pos}px)`);
    requestAnimationFrame(loopSlider);
  }

  if ($track.length) {
    // jQuery: .on() se usa para registrar eventos de raton en el slider.
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

  // jQuery: busca todos los sliders manuales con [data-slider]
  // y simplifica la gestion de botones, imagenes activas y texto asociado.
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
        setTimeout(() => $text.addClass("active"), 100);
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
    // y .on("click") conecta la navegacion manual.
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

<<<<<<< Updated upstream

=======
  // jQuery: selecciona el formulario de contacto para validar los campos.
  const $contactForm = $(".contact-form");

  if (!$contactForm.length) return;

  // jQuery: recoge todos los campos obligatorios del formulario.
  const $requiredFields = $contactForm.find("input[required], textarea[required]");

  function getFieldMessage($field) {
    const fieldId = $field.attr("id");
    const value = ($field.val() || "").trim();

    if (fieldId === "nombre" && !value) {
      return "Necesita rellenar este campo.";
    }

    if (fieldId === "email") {
      if (!value) {
        return "Necesita rellenar este campo.";
      }

      const hasAt = value.includes("@");
      const isValid = $field[0].checkValidity();

      if (!hasAt || !isValid) {
        return "El formato es incorrecto y necesita poner @.";
      }
    }

    if (fieldId === "mensaje" && !value) {
      return "Necesita rellenar este campo.";
    }

    return "";
  }

  function updateFieldState($field) {
    const message = getFieldMessage($field);

    // jQuery: busca el <p> de error asociado a cada campo mediante data-field-message.
    const $message = $contactForm.find(`[data-field-message="${$field.attr("id")}"]`);

    // jQuery: .toggleClass() y .text() actualizan el estado visual y el mensaje mostrado.
    $field.toggleClass("is-invalid", Boolean(message));
    $message.text(message).toggleClass("is-visible", Boolean(message));
  }

  // jQuery: valida mientras el usuario escribe o sale del campo.
  $requiredFields.on("input blur", function () {
    updateFieldState($(this));
  });

  // jQuery: controla el envio del formulario y evita enviarlo
  // si alguno de los campos obligatorios sigue siendo invalido.
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
      event.preventDefault();
      invalidFields[0].trigger("focus");
    }
  });
});
>>>>>>> Stashed changes
