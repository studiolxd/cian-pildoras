document.addEventListener("DOMContentLoaded", function () {
  // Inicializo el carrusel
  const miCarousel = new bootstrap.Carousel('#carousel', {
    wrap: false,
    touch: true,
  })

  // Función para la interactividad de los iconos
  const iconItems = document.querySelectorAll('.icons-group dt')
  if (iconItems) {
    iconItems.forEach((elem) => {
      elem.addEventListener('click', () => {
        const dlParent = elem.parentNode
        dlParent.classList.add('visited')
      })
    })
  }

  // Lógica para interactividad de las tarjetas
  const flipCards = document.querySelectorAll('.flip-card');

  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      const innerCard = card.querySelector('.flip-card-inner');
      innerCard.classList.toggle('flipped');
    });
  });

  // Lógica para la paginación de los test
  // Mostrar la pregunta seleccionada dentro del ejercicio activo
  document.querySelectorAll('.question-nav').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetQuestion = this.getAttribute('data-target');

      // Encuentra el contenedor de preguntas del ejercicio actual
      const currentTest = this.closest('.question-container');

      currentTest.querySelectorAll('.question-section').forEach(section => {
        section.classList.remove('active');
        document.querySelector(".page-link.active")?.classList.remove("active");
      });
      document.getElementById(targetQuestion).classList.add('active');
      link.classList.add('active');
    });
  });

  // Comprobar respuestas y mostrar feedback personalizado
  document.querySelectorAll('.check-answer').forEach(button => {
    button.addEventListener('click', function () {
      const questionId = this.getAttribute('data-question');
      const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
      const feedback = document.getElementById(`feedback-${questionId}`);

      if (selectedOption) {
        feedback.textContent = selectedOption.getAttribute("data-feedback");
        feedback.classList.toggle("correct", selectedOption.value === "correct");
        feedback.classList.toggle("incorrect", selectedOption.value === "incorrect");
        feedback.style.display = "block";
      }
    });
  });


  // Lógica para habilitar los botones al seleccionar una opción en los test
  document.querySelectorAll('.form-check-input').forEach(input => {
    input.addEventListener('change', function () {
      const questionId = this.name;
      const checkAnswerButton = document.querySelector(`.check-answer[data-question="${questionId}"]`);
      if (checkAnswerButton) {
        checkAnswerButton.disabled = false;
      }
    });
  });


  // Evento para pasar de slides con las teclas Up & Down
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      miCarousel.next()
    } else if (event.key === 'ArrowUp') {
      miCarousel.prev()
    }
  })


// Función para ajustar el padding-bottom dinámicamente
function ajustarPaddingSliders() {
  const slideContainers = document.querySelectorAll(".slide-container");
  /* console.log("slideContainers", slideContainers); */

  slideContainers.forEach((slideContainer) => {
    const carouselItem = slideContainer.closest(".carousel-item");
    const titleSection = carouselItem.querySelector(".title-section");
    const subtitleSection = carouselItem.querySelector(".subtitle-section");
    /* console.log("titleSection", titleSection);
    console.log("subtitleSection", subtitleSection); */

    let totalHeight = 0;

    // Si el carousel-item no está activo, hazlo visible temporalmente
    const wasHidden = !carouselItem.classList.contains("active");
    if (wasHidden) {
      carouselItem.classList.add("active");
    }

    // Calcula las alturas de los elementos
    if (titleSection) {
      totalHeight += titleSection.offsetHeight;
    }

    if (subtitleSection) {
      totalHeight += subtitleSection.offsetHeight;
    }

    // Si el carousel-item estaba oculto, vuelve a ocultarlo
    if (wasHidden) {
      carouselItem.classList.remove("active");
    }

    /* console.log("Altura total del título y subtítulo:", totalHeight); */

    // Ajustar el padding-bottom dinámicamente
    slideContainer.style.paddingBottom = `${totalHeight + 20}px`; // Añade un margen adicional
  });
}

// Ejecutar al cargar la página
ajustarPaddingSliders();

// Recalcular al redimensionar la ventana
window.addEventListener("resize", ajustarPaddingSliders);


  const carouselElement = document.getElementById('carousel')
  const prevButton = document.querySelector('.control-prev')
  const nextButton = document.querySelector('.control-next ')
  const carouselControls = document.querySelector('.carousel-controls')
  const carouselItems = document.querySelectorAll('.carousel-item');
  const totalItems = carouselItems.length

  // mostrar/ocultar la navegación (ocultos en portada)
  carouselControls.style.background = 'none';

  carouselElement.addEventListener('slide.bs.carousel', (event) => {
    const currentItem = event.to;

    if (currentItem === 0) {
      prevButton.classList.remove('show');
      nextButton.classList.remove('show');
      carouselControls.style.background = 'none';
    } else if (currentItem === totalItems - 1) {
      prevButton.classList.add('show');
      nextButton.classList.remove('show');
      carouselControls.style.background = '';
    } else {
      prevButton.classList.add('show');
      nextButton.classList.add('show');
      carouselControls.style.background = '';
    }

  })


  const links = document.querySelectorAll(".nav-link");

  // Función para actualizar el menú activo
  function actualizarMenuActivo(indice) {
    // Quitamos la clase 'active' del enlace actual
    document.querySelector(".nav-link.active")?.classList.remove("active");

    // Buscamos el enlace que tenga el mismo data-bs-slide-to
    const linkActive = document.querySelector(`.nav-link[data-bs-slide-to="${indice}"]`);
    if (linkActive) {
      linkActive.classList.add("active");
    }
  }

  // Evento click en los enlaces del menú
  links.forEach(link => {
    link.addEventListener("click", function () {
      actualizarMenuActivo(this.getAttribute("data-bs-slide-to"));
    });
  });

  // Evento cuando cambia el slide
  carouselElement.addEventListener("slide.bs.carousel", function (event) {
    actualizarMenuActivo(event.to);
  });

  let currentIndex = 0;

  function changePage(index, sliderId) {
    const paginationItems = document.querySelectorAll(`[data-slider="${sliderId}"] .page-link`);
    paginationItems.forEach(item => item.classList.remove("active"));
    paginationItems[index].classList.add("active");

    const sliderGroup = document.getElementById(`slider-group${sliderId}`);
    const sliderContainer = document.getElementById(`slider-container${sliderId}`);
    if (sliderContainer) {
      const sliderWidth = sliderContainer.offsetWidth;
      sliderGroup.style.transform = `translateX(-${index * sliderWidth}px)`;
    }
    currentIndex = index;
  }

  window.addEventListener("resize", function () {
    document.querySelectorAll("[data-slider]").forEach(pagination => {
      const sliderId = pagination.getAttribute("data-slider");
      changePage(currentIndex, sliderId);
    });
  });

  window.changePage = changePage;

  // Imagen ampliable
  // Crear el visor solo una vez
  const visor = document.createElement('div');
  visor.classList.add('visor');
  visor.innerHTML = `
    <span class="cerrar">&times;</span>
    <img src="" alt="Imagen ampliada">
  `;
  document.body.appendChild(visor);

  // Referencias
  const imagenAmpliada = visor.querySelector('img');
  const botonCerrar = visor.querySelector('.cerrar');
  const imagenesAmpliables = document.querySelectorAll('.ampliable');

  // Función para abrir la imagen en grande
  imagenesAmpliables.forEach(img => {
    img.addEventListener('click', () => {
      imagenAmpliada.src = img.src;
      visor.classList.add('activo');
    });
  });

  // Función para cerrar el visor
  function cerrarVisor() {
    visor.classList.remove('activo');
    setTimeout(() => {
      imagenAmpliada.src = "";
    }, 400); // Igual al tiempo del transition en CSS
  }

  botonCerrar.addEventListener('click', cerrarVisor);
  imagenAmpliada.addEventListener('click', cerrarVisor);

});
