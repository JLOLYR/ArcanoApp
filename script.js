// script.js (Versión Final con Lógica de Etapas Corregida)
document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE LOS ARCANOS (incluye 23-27) ---
    const arcanos = {
        1: { nombre: "I - El Mago", imagen: "Mago.png", texto: "Representa el poder, la habilidad y la concentración." },
        2: { nombre: "II - La Sacerdotisa", imagen: "Sacerdotisa.png", texto: "Simboliza la intuición, los secretos y el conocimiento oculto." },
        3: { nombre: "III - La Emperatriz", imagen: "Emperatriz.png", texto: "Representa la fertilidad, la abundancia y la creatividad." },
        4: { nombre: "IV - El Emperador", imagen: "Emperador.png", texto: "Simboliza la autoridad, la estructura y el control." },
        5: { nombre: "V - El Sumo Sacerdote", imagen: "Hierofante.png", texto: "Representa la tradición, la educación y las creencias." },
        6: { nombre: "VI - Los Enamorados", imagen: "Enamorados.png", texto: "Simboliza las uniones, las decisiones y las relaciones." },
        7: { nombre: "VII - El Carro", imagen: "Carro.png", texto: "Representa la victoria, la determinación y el autocontrol." },
        8: { nombre: "VIII - La Fuerza", imagen: "Fuerza.png", texto: "Simboliza la valentía, la compasión y el dominio de uno mismo." },
        9: { nombre: "IX - El Ermitaño", imagen: "Ermitaño.png", texto: "Representa la introspección, la soledad y la guía interior." },
        10: { nombre: "X - La Rueda de la Fortuna", imagen: "Rueda.png", texto: "Simboliza el cambio, los ciclos y el destino." },
        11: { nombre: "XI - La Justicia", imagen: "Justicia.png", texto: "Representa la equidad, la verdad y la ley de causa y efecto." },
        12: { nombre: "XII - El Colgado", imagen: "Colgado.png", texto: "Simboliza la suspensión, las nuevas perspectivas y el sacrificio." },
        13: { nombre: "XIII - La Muerte", imagen: "Muerte.png", texto: "Representa el fin de un ciclo y una transformación profunda." },
        14: { nombre: "XIV - La Templanza", imagen: "Templanza.png", texto: "Simboliza el equilibrio, la paciencia y la moderación." },
        15: { nombre: "XV - El Diablo", imagen: "Diablo.png", texto: "Representa las adicciones, las ataduras y el materialismo." },
        16: { nombre: "XVI - La Torre", imagen: "Torre.png", texto: "Simboliza la destrucción súbita, el caos y la revelación." },
        17: { nombre: "XVII - La Estrella", imagen: "Estrella.png", texto: "Representa la esperanza, la inspiración y la serenidad." },
        18: { nombre: "XVIII - La Luna", imagen: "Luna.png", texto: "Simboliza la ilusión, el miedo y el subconsciente." },
        19: { nombre: "XIX - El Sol", imagen: "Sol.png", texto: "Representa la alegría, el éxito y la vitalidad." },
        20: { nombre: "XX - El Juicio", imagen: "Juicio.png", texto: "Simboliza el renacimiento, la evaluación y la redención." },
        21: { nombre: "XXI - El Mundo", imagen: "Mundo.png", texto: "Representa la realización, la integración y el final de un ciclo." },
        22: { nombre: "XXII - El Loco", imagen: "Loco.png", texto: "Simboliza el comienzo, la espontaneidad y la fe ciega." },
        23: { nombre: "Rey de Bastos", imagen: "Rey bastos.png", texto: "Simboliza el liderazgo, la visión y la audacia." },
        24: { nombre: "Reina de Bastos", imagen: "Reina bastos.png", texto: "Representa la vitalidad, la independencia y la confianza." },
        25: { nombre: "Caballero de Bastos", imagen: "Caballero bastos.png", texto: "Simboliza la energía, la pasión y la acción impulsiva." },
        26: { nombre: "Paje de Bastos", imagen: "Paje bastos.png", texto: "Representa el entusiasmo, la exploración y las buenas noticias." },
        27: { nombre: "Diez de Bastos", imagen: "Diez bastos.png", texto: "Simboliza la carga, la responsabilidad y el trabajo duro." }
    };

    // --- SELECTORES DE ELEMENTOS (Sin cambios) ---
    const pantallas = document.querySelectorAll('.pantalla');
    const btnNuevo = document.getElementById('btn-nuevo');
    const btnVerGuardados = document.getElementById('btn-ver-guardados');
    const formulario = document.getElementById('formulario-arcano');
    const resultadoContenido = document.getElementById('resultado-contenido');
    const btnGuardar = document.getElementById('btn-guardar');
    const btnsVolver = document.querySelectorAll('[id^="btn-volver-inicio-"]');
    const modalAnual = document.getElementById('modal-anual');
    const inputAno = document.getElementById('input-ano');
    const btnCalcularModal = document.getElementById('btn-calcular-modal');
    const btnCancelarModal = document.getElementById('btn-cancelar-modal');
    const tablaContainer = document.getElementById('tabla-guardados-container');
    let datosCalculoActual = {};
    let fechaParaCalculoAnual = '';

    // --- FUNCIONES BÁSICAS (Sin cambios) ---
    function cambiarPantalla(idPantalla) {
        pantallas.forEach(p => p.classList.remove('activa'));
        const pantallaActiva = document.getElementById(idPantalla);
        if (pantallaActiva) pantallaActiva.classList.add('activa');
    }
    function mostrarNotificacion(mensaje) {
        const notificacion = document.getElementById('notificacion');
        const mensajeEl = document.getElementById('notificacion-mensaje');
        if (!notificacion || !mensajeEl) return;
        mensajeEl.textContent = mensaje;
        notificacion.classList.add('mostrar');
        setTimeout(() => { notificacion.classList.remove('mostrar'); }, 3000);
    }

    // --- FUNCIONES DE CÁLCULO (LÓGICA NUEVA Y PRECISA) ---
    const sumarDigitos = (str) => String(str).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

    function obtenerNumerosBase(fecha) {
        const [ano, mes, dia] = fecha.split('-');
        
        // Etapa 1: Suma Inicial
        let numAno = sumarDigitos(ano);
        let numMes = sumarDigitos(mes);
        let numDia = sumarDigitos(dia);
        
        // Etapa 2: Bucle de Reducción
        while (true) {
            let total = numAno + numMes + numDia;

            // Condición de salida 1: El total es 22 o menos. Es un resultado válido.
            if (total <= 22) {
                break;
            }

            // Condición de salida 2 (Caso Excepcional): El total es mayor a 22, pero ya no se puede reducir nada más.
            // Esto permite que resultados como 23, 27, etc., sean válidos al final.
            const sePuedeReducir = numAno > 9 || numMes > 9 || numDia > 9;
            if (!sePuedeReducir) {
                break;
            }

            // Si ninguna condición de salida se cumple, se procede a reducir una vez por iteración.
            // Se reduce de derecha a izquierda: primero año, luego mes, luego día.
            if (numAno > 9) {
                numAno = sumarDigitos(String(numAno));
            } else if (numMes > 9) {
                numMes = sumarDigitos(String(numMes));
            } else if (numDia > 9) {
                numDia = sumarDigitos(String(numDia));
            }
        }
        
        let resultadoFinal = numAno + numMes + numDia;
        
        return {
            numerosFinales: [numAno, numMes, numDia], // Guardamos los números finales por si se necesitan
            arcano: resultadoFinal === 0 ? 22 : resultadoFinal // El arcano es el total al salir del bucle
        };
    }

    function calcularArcanoPersonal(fecha) {
        return obtenerNumerosBase(fecha).arcano;
    }

    function calcularArcanoAnual(fechaNacimiento, anoObjetivo) {
        // Para el arcano anual, la base SIEMPRE se reduce a un solo dígito por componente.
        const [anoNacimiento, mesNacimiento, diaNacimiento] = fechaNacimiento.split('-');
        let baseDia = sumarDigitos(diaNacimiento);
        while(baseDia > 9) baseDia = sumarDigitos(String(baseDia));
        
        let baseMes = sumarDigitos(mesNacimiento);
        while(baseMes > 9) baseMes = sumarDigitos(String(baseMes));

        const base = baseDia + baseMes;
        const sumaAnoObjetivo = sumarDigitos(String(anoObjetivo));
        let resultado = base + sumaAnoObjetivo;
        
        // En el cálculo anual, el resultado final sí se reduce si supera 22,
        // excepto en el caso excepcional final que lo lleva hasta 27.
        while (resultado > 27) { 
            resultado = sumarDigitos(String(resultado)); 
        }
        
        return resultado === 0 ? 22 : resultado;
    }


    // --- El resto del archivo (VISUALIZACIÓN Y EVENTOS) permanece sin cambios ---
    // ... (El resto del código es idéntico al de la respuesta anterior) ...
    // --- FUNCIONES DE VISUALIZACIÓN ---
    function mostrarResultado(numeroArcano, esAnual = false, ano = null) {
        const arcano = arcanos[numeroArcano];
        if (!arcano) return;
        let titulo = esAnual ? `Arcano del Año ${ano}` : "Tu Arcano Personal";
        let contenidoHTML = `
            <h2 id="titulo-arcano">${titulo}</h2>
            <img src="Arcanos/${arcano.imagen}" alt="${arcano.nombre}" id="arcano-imagen">
            <h3 id="arcano-nombre">${arcano.nombre}</h3>
            <p id="arcano-texto">${arcano.texto}</p>`;

        if (!esAnual) {
            contenidoHTML += `<button id="btn-calcular-anual-grande" class="btn-secundario">Calcular Arcano del Año</button>`;
        }
        resultadoContenido.innerHTML = contenidoHTML;

        if (!esAnual) {
            const btnCalcularAnualGrande = document.getElementById('btn-calcular-anual-grande');
            if (btnCalcularAnualGrande) {
                btnCalcularAnualGrande.addEventListener('click', () => {
                    fechaParaCalculoAnual = datosCalculoActual.fechaNacimiento;
                    inputAno.value = new Date().getFullYear();
                    modalAnual.classList.add('activa');
                });
            }
        }
        cambiarPantalla('resultado');
    }

    function mostrarGuardados() {
        const guardados = JSON.parse(localStorage.getItem('arcanosGuardados')) || [];
        if (!tablaContainer) return;
        if (guardados.length === 0) {
            tablaContainer.innerHTML = "<p>Aún no has guardado ningún arcano.</p>";
            return;
        }
        let tablaHTML = `<table class="tabla-bonita"><thead><tr><th>Nombre</th><th>Arcano</th><th>Año</th></tr></thead><tbody>`;
        guardados.forEach(persona => {
            const arcanoInfo = arcanos[persona.numeroArcano] || { nombre: "Desconocido" };
            tablaHTML += `
                <tr>
                    <td>${persona.nombre}</td>
                    <td><button class="btn-arcano-link" data-arcano-numero="${persona.numeroArcano}">${arcanoInfo.nombre}</button></td>
                    <td><button class="btn-calcular-anual-guardado" data-fecha-nacimiento="${persona.fechaNacimiento}">Calcular</button></td>
                </tr>`;
        });
        tablaHTML += `</tbody></table>`;
        tablaContainer.innerHTML = tablaHTML;
    }

    // --- EVENT LISTENERS ---
    if (btnNuevo) btnNuevo.addEventListener('click', () => cambiarPantalla('calculo'));
    if (btnVerGuardados) btnVerGuardados.addEventListener('click', () => {
        mostrarGuardados();
        cambiarPantalla('guardados');
    });
    btnsVolver.forEach(btn => { if (btn) btn.addEventListener('click', () => cambiarPantalla('inicio')); });

    if (formulario) formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
        if (nombre && fechaNacimiento) {
            const numeroArcano = calcularArcanoPersonal(fechaNacimiento);
            datosCalculoActual = { nombre, fechaNacimiento, numeroArcano };
            mostrarResultado(numeroArcano);
        }
    });

    if (btnGuardar) btnGuardar.addEventListener('click', () => {
        if (datosCalculoActual.nombre) {
            let guardados = JSON.parse(localStorage.getItem('arcanosGuardados')) || [];
            if (!guardados.some(p => p.nombre === datosCalculoActual.nombre)) {
                guardados.push(datosCalculoActual);
                localStorage.setItem('arcanosGuardados', JSON.stringify(guardados));
                mostrarNotificacion(`${datosCalculoActual.nombre} ha sido guardado.`);
            } else {
                mostrarNotificacion(`${datosCalculoActual.nombre} ya estaba guardado.`);
            }
        }
    });

    if (tablaContainer) {
        tablaContainer.addEventListener('click', (e) => {
            if (e.target && e.target.matches('.btn-arcano-link')) {
                const numeroArcano = parseInt(e.target.dataset.arcanoNumero, 10);
                if (!isNaN(numeroArcano)) mostrarResultado(numeroArcano);
            }
            if (e.target && e.target.matches('.btn-calcular-anual-guardado')) {
                fechaParaCalculoAnual = e.target.dataset.fechaNacimiento;
                inputAno.value = new Date().getFullYear();
                modalAnual.classList.add('activa');
            }
        });
    }

    if (btnCalcularModal) {
        btnCalcularModal.addEventListener('click', () => {
            const anoObjetivo = parseInt(inputAno.value, 10);
            if (anoObjetivo && !isNaN(anoObjetivo) && fechaParaCalculoAnual) {
                const numeroArcanoAnual = calcularArcanoAnual(fechaParaCalculoAnual, anoObjetivo);
                mostrarResultado(numeroArcanoAnual, true, anoObjetivo);
                modalAnual.classList.remove('activa');
            }
        });
    }

    if (btnCancelarModal) btnCancelarModal.addEventListener('click', () => modalAnual.classList.remove('activa'));
});