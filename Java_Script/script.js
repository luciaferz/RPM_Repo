function highlightActivePage() {
  //marcar en el menú qué página se esta viendo en el momento.
  // Obtenemos la ruta y el query string actual (p. ej. /secciones.html?decada=1960)
  const currentFullRoute = window.location.pathname + window.location.search; //Guarda la página actual completa.

  $(".Menu a").each(function () {
    //Recorre todos los enlaces del menú y usa jQuery para seleccionar todos los <a> del menú.
    const $link = $(this);
    const href = $link.attr("href") || ""; //Lee cada enlace y obtiene el link de cada botón del menú.

    // Un enlace es activo si:
    // 1. La ruta completa actual incluye el href del enlace
    // 2. Es el Home (caso especial por estructura de carpetas)
    const isActive =
      currentFullRoute.includes(href) ||
      (currentFullRoute.includes("home") && href.includes("home.html"));

    $link.toggleClass("active", isActive); //Activa o desctiva la clase 'active' si es la página actual añade .active si no la quita
  });
}

// jQuery: $(function () {}) espera a que el DOM esté listo.
// Aquí se agrupan todas las interacciones comunes de la web.
$(function () {
  highlightActivePage();

  // --------------- SLIDER DE CARRUSEL (HOME)------------------
  // jQuery: $("#sliderTrack") selecciona el carrusel principal de Home.
  const $track = $("#sliderTrack");
  let speed = 0.3;
  let pos = 0;
  let isSliderPaused = false;

  function loopSlider() {
    if (!$track.length) return;

    if (!isSliderPaused) {
      pos += speed; //Mueve el slider hacia la izquierda poco a poco.
    }

    // Si se llega a la mitad del scroll (donde empiezan las copias de las fotos) se reinicia.
    if (pos >= $track[0].scrollWidth / 2) {
      pos = 0;
    }

    $track.css("transform", `translateX(-${pos}px)`);

    // requestAnimationFrame es una función del navegador que llama a 'loopSlider' que crea una animación muy suave para el carrusel (ejecuta a 60 FPS)
    requestAnimationFrame(loopSlider);
  }

  if ($track.length) {
    // jQuery: .on() se usa para registrar eventos de ratón en el slider (pausar al pasar el ratón).
    $track.on("mouseenter", function () {
      isSliderPaused = true;
    });

    $track.on("mouseleave", function () {
      //Reanuda el movimiento del slider al salir el ratón.
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

  // ---------------- VALIDACIÓN DE FORMULARIO DE CONTACTO-----------------
  // jQuery: selecciona el formulario de contacto para validar los campos.
  const $contactForm = $(".contact-form");

  if (!$contactForm.length) return;

  // jQuery: recoge todos los campos a validar del formulario.
  const $requiredFields = $contactForm.find("#nombre, #email, #mensaje");

  /* FUNCIÓN: getFieldMessage() - Devuelve el mensaje de error correspondiente a cada campo. */
  function getFieldMessage($field) {
    const fieldId = $field.attr("id"); //Identifica el campo por su id (nombre, email o mensaje).
    const value = ($field.val() || "").trim(); //Lee el valor del campo y .trim() elimina espacios al principio y al final.

    if (fieldId === "nombre" && !value) {
      //Hace obligatorio rellenar el campo
      return "Es obligatorio rellenar el campo";
    }

    if (fieldId === "email") {
      if (!value) {
        return "Es obligatorio rellenar el campo";
      }

      const hasAt = value.includes("@"); //Comprueba si el email incluye @, si no lo incluye devuelve un mensaje de error.

      if (!hasAt) {
        return "Formato incorrecto necesario incluir @";
      }
    }

    if (fieldId === "mensaje" && !value) {
      return "Es obligatorio rellenar el campo";
    }

    return ""; // Si no hay errores, devuelve una cadena vacía.
  }

  /* FUNCIÓN: updateFieldState() - Actualiza visualmente el campo y el mensaje de error. */
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
    const invalidFields = []; //Se guardan los campos que están mal

    $requiredFields.each(function () {
      //Recorre cada campo obligatorio para validar su estado.
      const $field = $(this);
      updateFieldState($field); //Valida el campo y actualiza su estado visual (borde rojo y mensaje de error).

      if (getFieldMessage($field)) {
        //Comprueba si hay error y lo añade a la lista de campos inválidos.
        invalidFields.push($field);
      }
    });

    if (invalidFields.length > 0) {
      event.preventDefault(); // Evita que se envíe el formulario si hay campos inválidos.
      invalidFields[0].trigger("focus"); // Pone el foco en el primer error
    }
  });
});
