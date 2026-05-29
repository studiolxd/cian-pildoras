/* Arrastrar */

const concepts = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');
const conceptsContainer = document.getElementById('concepts');

concepts.forEach(concept => {
    concept.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', event => {
        event.preventDefault();
    });
    zone.addEventListener('drop', event => {
        event.preventDefault();
        let draggedId = event.dataTransfer.getData('text');
        let draggedElement = document.getElementById(draggedId);
        if (!zone.querySelector('.draggable')) {
            zone.appendChild(draggedElement);
        }
    });
});

function checkResults() {
    dropZones.forEach(zone => {
        let droppedElement = zone.querySelector('.draggable');
        if (droppedElement && droppedElement.id === zone.dataset.correct) {
            zone.classList.add('correct');
        } else {
            zone.classList.add('incorrect');
        }
    });
}

function resetGame() {
    dropZones.forEach(zone => {
        zone.classList.remove('correct', 'incorrect');
        const droppedElement = zone.querySelector('.draggable');
        if (droppedElement) {
            conceptsContainer.appendChild(droppedElement);
        }
    });
}

/* Verdadero o Falso */
function verificarRespuestas() {
    let preguntas = document.querySelectorAll(".preguntaVF");

    preguntas.forEach(pregunta => {
        let correcta = pregunta.getAttribute("data-correct"); // Obtiene la respuesta correcta del HTML
        let seleccion = pregunta.querySelector("input:checked");
        let feedback = pregunta.querySelector(".feedbackVF");
        let explicacion = pregunta.getAttribute("data-explicacion");

        if (seleccion) {
            if (seleccion.value === correcta) {
                feedback.innerHTML = `<span class="text-success fw-bold">✅ ¡Correcto!<br>${explicacion}</span>`;
            } else {
                feedback.innerHTML = `<span class="text-danger fw-bold">❌ Incorrecto.<br>${explicacion}</span>`;
            }
        } else {
            feedback.innerHTML = `<span class="text-warning fw-bold">No has seleccionado una opción.</span>`;
        }
    });

}