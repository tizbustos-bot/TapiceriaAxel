/* =========================================================
   TAPICERÍA AXEL — script.js  (vanilla JS)
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     WHATSAPP
     Para cambiar el número o el mensaje, editá SOLO estas dos
     constantes. El número va en formato internacional, sin
     "+", sin 0, sin 15 y sin espacios.
     --------------------------------------------------------- */
  var WHATSAPP_NUMBER = "5491178241899";
  var WHATSAPP_MESSAGE =
    "Hola Axel! Vi tu página y quería consultar por un trabajo de tapicería. " +
    "Te envío una foto del mueble para pedir presupuesto.";

  var waURL =
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);

  // Aplica el link de WhatsApp a todos los elementos con clase .js-wa
  document.querySelectorAll(".js-wa").forEach(function (el) {
    el.setAttribute("href", waURL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---------------------------------------------------------
     HEADER — estado al hacer scroll
     --------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------------------------------------------------
     MENÚ MOBILE (hamburguesa)
     --------------------------------------------------------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }
  function openMenu() {
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  toggle.addEventListener("click", function () {
    if (nav.classList.contains("open")) closeMenu();
    else openMenu();
  });

  // Cerrar al tocar un link del menú
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
  // Cerrar con Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------------------------------------------------------
     FAQ — acordeón
     --------------------------------------------------------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");

    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // Cierra los demás (comportamiento de acordeón)
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-a").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        q.setAttribute("aria-expanded", "false");
        a.style.maxHeight = null;
      } else {
        item.classList.add("open");
        q.setAttribute("aria-expanded", "true");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---------------------------------------------------------
     REVEAL al scroll (IntersectionObserver)
     --------------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------------------------------------------------------
     GALERÍA — LIGHTBOX
     --------------------------------------------------------- */
  var galleryImgs = Array.prototype.slice.call(
    document.querySelectorAll("#gallery img")
  );
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var currentIndex = 0;

  function showImage(index) {
    if (index < 0) index = galleryImgs.length - 1;
    if (index >= galleryImgs.length) index = 0;
    currentIndex = index;
    var img = galleryImgs[index];
    lbImg.setAttribute("src", img.getAttribute("src"));
    lbImg.setAttribute("alt", img.getAttribute("alt") || "");
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open"); // bloquea scroll de fondo
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  galleryImgs.forEach(function (img, i) {
    img.parentElement.addEventListener("click", function () { openLightbox(i); });
  });
  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", function () { showImage(currentIndex - 1); });
  lbNext.addEventListener("click", function () { showImage(currentIndex + 1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });

  /* ---------------------------------------------------------
     GALERÍA — VER MÁS / VER MENOS
     Al inicio se muestran solo las 3 primeras fotos y aparece
     el botón. Sin JS, se ven todas (progressive enhancement).
     Para cambiar cuántas se ven de entrada, editá VISIBLES.
     --------------------------------------------------------- */
  var VISIBLES = 3;
  var gallery = document.getElementById("gallery");
  var galleryMore = document.getElementById("galleryMore");
  if (gallery && galleryMore) {
    var galleryItems = gallery.querySelectorAll(".gallery-item");
    var ocultas = galleryItems.length - VISIBLES;

    if (ocultas > 0) {
      gallery.classList.add("is-collapsed");
      galleryMore.hidden = false;

      var setLabel = function (collapsed) {
        galleryMore.firstChild.nodeValue = collapsed
          ? "Ver más trabajos (" + ocultas + ") "
          : "Ver menos ";
      };
      setLabel(true);

      galleryMore.addEventListener("click", function () {
        var collapsed = gallery.classList.toggle("is-collapsed");
        galleryMore.setAttribute("aria-expanded", String(!collapsed));
        setLabel(collapsed);

        if (collapsed) {
          // Al plegar, volvemos al comienzo de la galería
          document.getElementById("trabajos").scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // Aseguramos que las fotos recién mostradas aparezcan (animación reveal)
          galleryItems.forEach(function (it) { it.classList.add("in"); });
        }
      });
    }
  }

  /* ---------------------------------------------------------
     CONFIGURADOR DE COLOR
     - Cambia el color de la tapicería del sillón (variable --sofa)
     - Cambia el fondo de pared (blanca / negra)
     - Actualiza el CTA de WhatsApp con el color elegido
     --------------------------------------------------------- */
  var scene = document.getElementById("cfgScene");
  var sofa = document.getElementById("cfgSofa");
  if (scene && sofa) {
    var swatches = document.querySelectorAll(".cfg-swatch");
    var walls = document.querySelectorAll(".cfg-wall");
    var colorNameEl = document.getElementById("cfgColorName");
    var cfgCta = document.getElementById("cfgCta");
    var selectedColorName = "Azul Francia";

    function updateCfgCta() {
      var msg =
        "Hola Axel! Vi tu página y me interesa un trabajo de tapicería en color " +
        selectedColorName + ". Te envío una foto del mueble para pedir presupuesto.";
      cfgCta.setAttribute("href", "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg));
    }
    cfgCta.setAttribute("target", "_blank");
    cfgCta.setAttribute("rel", "noopener");
    updateCfgCta();

    // Selección de color
    swatches.forEach(function (sw) {
      sw.addEventListener("click", function () {
        sofa.style.setProperty("--sofa", sw.getAttribute("data-color"));
        selectedColorName = sw.getAttribute("data-name");
        colorNameEl.textContent = selectedColorName;
        swatches.forEach(function (s) { s.classList.remove("is-active"); });
        sw.classList.add("is-active");
        updateCfgCta();
      });
    });

    // Toggle de pared
    walls.forEach(function (w) {
      w.addEventListener("click", function () {
        scene.setAttribute("data-wall", w.getAttribute("data-wall"));
        walls.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        w.classList.add("is-active");
        w.setAttribute("aria-pressed", "true");
      });
    });
  }

  /* ---------------------------------------------------------
     Año dinámico en el footer (por si querés que se actualice solo)
     Descomentá si agregás <span id="year"></span> en el footer.
     --------------------------------------------------------- */
  // var yearEl = document.getElementById("year");
  // if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
