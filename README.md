1. ESTRUCTURA DEL PROYECTO

- Tree de carpetas y archivos (HTML, CSS, JS, imágenes)
- Relación entre páginas (index → secciones → contacto)

RPM_Repo/
├── index.html                  (Página principal - Home)
├── CSS/
│   ├── styles.css          (Estilos globales, menú, hero, carrusel)
│   ├── Decadas.css         (Estilos específicos de décadas)
│   ├── contacto.css        (Estilos del formulario)
│   └── footer.css          (Estilos del pie de página)
├── Java_Script/
│   ├── script.js           (Funciones comunes: slider, validación)
│   └── Decadas.js          (Gestión de décadas y galería)
└── HTML/
    ├── Contacto/
    │   └── contacto.html   (Formulario de contacto)
    ├── Decadas/
    │   ├── secciones.html  (Galería de coches)
    │   ├── img_60s/        (Imágenes de los 60s)
    │   ├── img_70s/        (Imágenes de los 70s)
    │   ├── img_80s/        (Imágenes de los 80s)
    │   ├── img_90s/        (Imágenes de los 90s)
    │   ├── img_00s/        (Imágenes de los 00s)
    │   └── img_10s/        (Imágenes de los 10s)
    └── img_Home/           (Imágenes del carrusel home)


2. TECNOLOGÍAS UTILIZADAS
- HTML5 - Estructura semántica
- CSS3 - Estilos y animaciones. Flexbox, @keyframes, @media queries, variables CSS
- Bootstrap 5.3.2 - Grid system y utility classes
- jQuery 3.7.1 - Manipulación DOM y eventos. Selector $(), eventos .on(), DOM .html()/.text()/.attr()
- Google Fonts - Bebas Neue, Cairo, Oswald


3. CSS

Infraestructura de Estilos y Diseño (CSS)

El archivo styles.css utiliza variables CSS como var(--btn-color, #f20a0a), Flexbox para alineaciones (display: flex, justify-content, align-items, gap), 
transiciones suaves (transition: color 0.4s ease), pseudo-elementos (::before, ::after) y animaciones mediante @keyframes fadeInUp. 
Las media queries gestionan la adaptabilidad responsive a través de max-width breakpoints. 
El modelo de caja se controla con box-sizing: border-box, mientras que border-radius crea esquinas redondeadas. 
La propiedad clamp() ajusta automáticamente los tamaños de fuente según el viewport. 
En Decadas.css, las custom properties definen colores temáticos por década como --decade-color: #e63946, permitiendo cambios dinámicos. 
El sistema de rejilla con display: grid y grid-template-columns junto a repeat() y minmax() estructuran el contenido de manera flexible. 
Los atributos data- como data-decade almacenan información personalizada, y selectores avanzados targeting siblings y elementos específicos optimizan el estilo. 
La pseudo-clase :not() excluye elementos concretos, mientras que filtros como blur() y brightness() aplican efectos visuales. contacto.css utiliza grid 
para maquetar formularios, y pseudo-clases de autocompletado como -webkit-autofill personalizan la experiencia de entrada de datos. 
Finalmente, en footer.css, clamp() continúa ajustando tamaños de manera fluida


styles.css:
- Variables CSS: var(--btn-color, #f20a0a)
- Flexbox: display: flex, justify-content, align-items, gap
- Transiciones: transition: color 0.4s ease
- Pseudo-elementos: ::before, ::after
- Animaciones: @keyframes fadeInUp


COMANDOS CSS - Detallados

+---------------------------------------+-------------------------+----------------------------------------------------------+
| Comando                               | Archivo                 | Función                                        |
+---------------------------------------+-------------------------+----------------------------------------------------------+
| var(--variable, default)              | styles.css, Decadas.css | Variables CSS reutilizables                    |
| display: flex                         | styles.css              | Layout flexible                                |
| grid-template-columns: repeat(3, 1fr) | Decadas.css             | Grid de 3 columnas                             |
| clamp(min, %, max)                    | styles.css              | Tamaño responsive fluido [cite: 27, 14]        |
| transition: 0.4s ease                 | styles.css              | Animación suave                                |
| @keyframes fadeInUp                   | styles.css              | Fotogramas de animación                        |
| ::before / ::after                    | styles.css              | Pseudo-elementos                               |
| --custom-property                     | Decadas.css             | Colores por década [cite: 27, 9]               |
| data-* attribute                      | Decadas.css             | Datos personalizados [cite: 27, 11]            |
| .clase1 + .clase2                     | Decadas.css             | Selector hermano adyacente                     |
| @media (max-width: X)                 | Todos                   | Responsive breakpoints                         |
| border-radius: 999px                  | styles.css              | Botón tipo cápsula                             |
| box-sizing: border-box                | styles.css              | Modelo caja estándar [cite: 27, 7]             |
| object-fit: cover                     | styles.css              | Imagen sin distorsión                          |
+---------------------------------------+-------------------------+----------------------------------------------------------+




4. JAVASCRIPT

Lógica Funcional e Interactividad (JavaScript)

En JavaScript, jQuery maneja la selección DOM con $() y .find(), manipulando atributos y contenido mediante .attr(), .text() y .html(). 
Los eventos se registran con .on(), incluyendo técnicas de delegación de eventos, mientras que .each() itera sobre colecciones de elementos. 
La clase activa se gestiona dinámicamente con .toggleClass(), .addClass() y .removeClass() . jQuery también controla estilos CSS directamente 
y detecta estados de clase con .hasClass(), aprovechando la shorthand de transformación $(function() { ... }) para ejecutar código cuando el DOM está listo. 
La API URLSearchParams permite extraer parámetros de consulta, y requestAnimationFrame() optimiza animaciones de bucle mediante el flujo loopSlider(). 
La validación de formularios verifica campos en tiempo real con getFieldMessage() y updateFieldState(), mostrando u ocultando elementos según 
sea necesario y previniendo envíos inválidos con event.preventDefault(). 
El objeto DECADES centraliza todos los datos de automóviles organizados por década. La función renderDecade() inyecta el contenido seleccionado en el DOM, 
mientras que createCardHtml() y createGalleryHtml() generan el HTML dinámico para tarjetas y miniaturas. 
Los eventos de galería se configuran para responder a las interacciones del usuario. 
Para cambiar entre imágenes, setupGalleryEvents() permite clic en miniaturas, y setupInfoToggleEvents() controla los paneles de información. 
Un sistema de loop infinito con requestAnimationFrame() anima el carrusel de décadas, pausando automáticamente con eventos de hover. 
La navegación fluye desde Home hacia Secciones, pasando por décadas específicas y galerías de coches, o alternativamente desde Home a Contacto. 
Bootstrap se integra como CDN para el sistema de grid y utilidades CSS.


COMANDOS JAVASCRIPT - Detallados
+--------------------------+------------------------+-------------------------------------------------------+
| Comando                  | Archivo                | Función                                 |
+--------------------------+------------------------+-------------------------------------------------------+
| $("selector")            | script.js, Decadas.js  | Selector jQuery                         |
| .attr("attr", "valor")   | script.js              | Get/Set atributos                       |
| .text("texto")           | script.js              | Modificar texto                         |
| .html("html")            | Decadas.js             | Insertar HTML                           |
| .addClass("clase")       | Decadas.js             | Añadir clase                            |
| .removeClass("clase")    | Decadas.js             | Quitar clase                            |
| .toggleClass("clase")    | script.js, Decadas.js  | Alternar clase                          |
| .hasClass("clase")       | Decadas.js             | Comprobar clase                         |
| .on("evento", fn)        | script.js, Decadas.js  | Registrar eventos                       |
| .each(fn)                | script.js, Decadas.js  | Iterar elementos                        |
| .find("selector")        | Decadas.js             | Buscar descendientes                    |
| .closest("selector")     | Decadas.js             | Buscar ancestro                         |
| .siblings("selector")    | Decadas.js             | Hermanos                                |
| .val()                   | script.js              | Valor de input                          |
| .show() / .hide()        | script.js              | Mostrar/ocultar                         |
| .trigger("focus")        | script.js              | Forzar evento                           |
| $(function(){...})       | Todos                  | DOM Ready                               |
| window.location.search   | Decadas.js             | Query string URL                        |
| URLSearchParams          | Decadas.js             | Parsear parámetros                      |
| requestAnimationFrame()  | script.js              | Animación 60fps                         |
| event.preventDefault()   | script.js              | Bloquear envío                          |
+--------------------------+------------------------+-------------------------------------------------------+




5. FLUJO DE NAVEGACIÓN
Home ──────┬──> Secciones ──> Galería (clic década) ──> Galería (mostrar coches)
           │                                              │
           │                                              └──> Cambiar imágenes
           │                                              │
           │                                              └──> Info toggle
           │
           └──> Contacto ──> Formulario ──> Validación ──> Envío



