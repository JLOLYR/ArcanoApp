// script.js (Versión Final con Base Anual Corregida)
document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE LOS ARCANOS ---
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
        17: { nombre: "XVII - La Estrella", imagen: "Estrella.png", texto: "Representa la esperanza, la serenidad y la inspiración." },
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
    const implicitos = { 1: 10, 2: 11, 3: 12, 4: 13, 5: 14, 6: 15, 7: 16, 8: 17, 9: 18, 10: 1, 11: 2, 12: 3, 13: 4, 14: 5, 15: 6, 16: 7, 17: 8, 18: 9, 19: 10, 20: 2, 21: 3, 22: 4 };
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
    const modalConfirmar = document.getElementById('modal-confirmar');
    const modalConfirmarMensaje = document.getElementById('modal-confirmar-mensaje');
    const btnConfirmarDelete = document.getElementById('btn-confirmar-delete');
    const btnCancelarDelete = document.getElementById('btn-cancelar-delete');
    let datosCalculoActual = {};
    let nombreParaEliminar = '';
    const datepickerElem = document.getElementById('fecha-nacimiento');
    if (datepickerElem) { new Datepicker(datepickerElem, { language: 'es', autohide: true, format: 'yyyy-mm-dd', buttonClass: 'btn' }); }

    function cambiarPantalla(idPantalla) { pantallas.forEach(p => p.classList.remove('activa')); const pantallaActiva = document.getElementById(idPantalla); if (pantallaActiva) pantallaActiva.classList.add('activa'); }
    function mostrarNotificacion(mensaje) { const notificacion = document.getElementById('notificacion'); const mensajeEl = document.getElementById('notificacion-mensaje'); if (!notificacion || !mensajeEl) return; mensajeEl.textContent = mensaje; notificacion.classList.add('mostrar'); setTimeout(() => { notificacion.classList.remove('mostrar'); }, 3000); }
    
    // --- FUNCIONES DE CÁLCULO (LÓGICA CORREGIDA) ---
    const sumarDigitos = (str) => String(str).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    
    function calcularArcanoPersonal(fecha) {
        const [ano, mes, dia] = fecha.split('-');
        let numDia = parseInt(dia, 10);
        let numMes = parseInt(mes, 10);
        let numAno = sumarDigitos(ano);

        while (true) {
            let total = numDia + numMes + numAno;
            if (total <= 22) break;
            const sePuedeReducir = numDia > 9 || numMes > 9 || numAno > 9;
            if (!sePuedeReducir) break;
            const maxNum = Math.max(numDia, numMes, numAno);
            if (numDia === maxNum) {
                numDia = sumarDigitos(String(numDia));
            } else if (numAno === maxNum) {
                numAno = sumarDigitos(String(numAno));
            } else {
                numMes = sumarDigitos(String(numMes));
            }
        }
        const arcanoFinal = numDia + numMes + numAno;
        const baseAnual = numDia + numMes; // LA BASE SE TOMA DE LOS NÚMEROS FINALES, SIN MÁS REDUCCIÓN
        return { arcano: arcanoFinal === 0 ? 22 : arcanoFinal, baseAnual: baseAnual };
    }
    
function calcularArcanoAnual(base, anoObjetivo) {
    let sumaAno = sumarDigitos(String(anoObjetivo));
    let resultado = base + sumaAno;

    // Bucle de reducción específico para el Arcano Anual
    while (resultado > 27) {
        // La reducción se aplica SIEMPRE sobre la suma del año,
        // nunca sobre la base.
        sumaAno = sumarDigitos(String(sumaAno));
        
        // Se recalcula el resultado con la nueva suma del año reducida.
        resultado = base + sumaAno;
    }

    return resultado === 0 ? 22 : resultado;
}
    
    // --- FUNCIONES DE VISUALIZACIÓN ---
    function mostrarResultado(numeroArcano, esAnual = false, ano = null, esImplicito = false) {
        const arcano = arcanos[numeroArcano]; if (!arcano) return;
        let titulo = "Tu Arcano Personal";
        if (datosCalculoActual.nombre) {
            titulo = `${esImplicito ? 'Arcano Implícito' : esAnual ? 'Arcano del Año' : 'Arcano Personal'} de ${datosCalculoActual.nombre}`;
            if (esAnual && ano) titulo = `Arcano del Año ${ano} para ${datosCalculoActual.nombre}`;
        }
        let contenidoHTML = `<h2 id="titulo-arcano">${titulo}</h2><img src="Arcanos/${arcano.imagen}" alt="${arcano.nombre}" id="arcano-imagen"><h3 id="arcano-nombre">${arcano.nombre}</h3><p id="arcano-texto">${arcano.texto}</p>`;
        if (!esAnual && !esImplicito) {
            contenidoHTML += `<button id="btn-calcular-anual-grande" class="btn-secundario">Calcular Arcano del Año</button>`;
            if (implicitos[numeroArcano]) { contenidoHTML += `<button id="btn-arcano-implicito" class="btn-secundario">Ver Arcano Implícito</button>`; }
        }
        resultadoContenido.innerHTML = contenidoHTML;
        if (!esAnual && !esImplicito) {
            const btnCalcularAnualGrande = document.getElementById('btn-calcular-anual-grande'); if (btnCalcularAnualGrande) { btnCalcularAnualGrande.addEventListener('click', () => { inputAno.value = new Date().getFullYear(); modalAnual.classList.add('activa'); }); }
            const btnArcanoImplicito = document.getElementById('btn-arcano-implicito'); if (btnArcanoImplicito) { btnArcanoImplicito.addEventListener('click', () => { const numeroImplicito = implicitos[numeroArcano]; mostrarResultado(numeroImplicito, false, null, true); }); }
        }
        cambiarPantalla('resultado');
    }
    
    function mostrarGuardados() {
        const guardados = JSON.parse(localStorage.getItem('arcanosGuardados')) || []; if (!tablaContainer) return;
        if (guardados.length === 0) { tablaContainer.innerHTML = "<p>Aún no has guardado ningún arcano.</p>"; return; }
        let tablaHTML = `<table class="tabla-bonita"><thead><tr><th>Nombre</th><th>Fecha Nac.</th><th>Arcano</th><th></th></tr></thead><tbody>`;
        guardados.forEach(persona => {
            const arcanoInfo = arcanos[persona.numeroArcano] || { nombre: "Desconocido" };
            tablaHTML += `<tr><td>${persona.nombre}</td><td>${persona.fechaNacimiento}</td><td><button class="btn-arcano-link" data-persona='${JSON.stringify(persona)}'>${arcanoInfo.nombre}</button></td><td class="celda-eliminar"><button class="btn-eliminar" data-nombre-eliminar="${persona.nombre}">X</button></td></tr>`;
        });
        tablaHTML += `</tbody></table>`;
        tablaContainer.innerHTML = tablaHTML;
    }
    
    // --- EVENT LISTENERS ---
    if (btnNuevo) btnNuevo.addEventListener('click', () => cambiarPantalla('calculo'));
    if (btnVerGuardados) btnVerGuardados.addEventListener('click', () => { mostrarGuardados(); cambiarPantalla('guardados'); });
    btnsVolver.forEach(btn => { if (btn) btn.addEventListener('click', () => cambiarPantalla('inicio')); });

    if (formulario) formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value; const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
        if (nombre && fechaNacimiento) { const resultadoCalculo = calcularArcanoPersonal(fechaNacimiento); datosCalculoActual = { nombre, fechaNacimiento, numeroArcano: resultadoCalculo.arcano, baseAnual: resultadoCalculo.baseAnual }; mostrarResultado(resultadoCalculo.arcano); }
    });

    if (btnGuardar) btnGuardar.addEventListener('click', () => {
        if (datosCalculoActual.nombre) {
            let guardados = JSON.parse(localStorage.getItem('arcanosGuardados')) || [];
            if (!guardados.some(p => p.nombre === datosCalculoActual.nombre)) { guardados.push(datosCalculoActual); localStorage.setItem('arcanosGuardados', JSON.stringify(guardados)); mostrarNotificacion(`${datosCalculoActual.nombre} ha sido guardado.`); }
            else { mostrarNotificacion(`${datosCalculoActual.nombre} ya estaba guardado.`); }
        }
    });

    if (tablaContainer) {
        tablaContainer.addEventListener('click', (e) => {
            if (e.target && e.target.matches('.btn-arcano-link')) { const persona = JSON.parse(e.target.dataset.persona); datosCalculoActual = persona; mostrarResultado(persona.numeroArcano); }
            if (e.target && e.target.matches('.btn-eliminar')) { nombreParaEliminar = e.target.dataset.nombreEliminar; if (modalConfirmarMensaje) modalConfirmarMensaje.textContent = `¿Seguro que deseas eliminar el registro de ${nombreParaEliminar}?`; if (modalConfirmar) modalConfirmar.classList.add('activa'); }
        });
    }

    if (btnCalcularModal) {
        btnCalcularModal.addEventListener('click', () => {
            const anoObjetivo = parseInt(inputAno.value, 10);
            if (anoObjetivo && !isNaN(anoObjetivo) && datosCalculoActual.baseAnual !== undefined) {
                // CORRECCIÓN: USA DIRECTAMENTE LA BASE GUARDADA
                const base = datosCalculoActual.baseAnual;
                const numeroArcanoAnual = calcularArcanoAnual(base, anoObjetivo);
                mostrarResultado(numeroArcanoAnual, true, anoObjetivo, false);
                modalAnual.classList.remove('activa');
            } else if(anoObjetivo && !isNaN(anoObjetivo) && datosCalculoActual.fechaNacimiento) {
                 // Fallback por si la base no está guardada (registros antiguos)
                 const resultadoCalculo = calcularArcanoPersonal(datosCalculoActual.fechaNacimiento);
                 const base = resultadoCalculo.baseAnual;
                 const numeroArcanoAnual = calcularArcanoAnual(base, anoObjetivo);
                 mostrarResultado(numeroArcanoAnual, true, anoObjetivo, false);
                 modalAnual.classList.remove('activa');
            }
        });
    }

    if (btnCancelarModal) { btnCancelarModal.addEventListener('click', () => { if (modalAnual) modalAnual.classList.remove('activa'); }); }
    if (btnConfirmarDelete) {
        btnConfirmarDelete.addEventListener('click', () => {
            let guardados = JSON.parse(localStorage.getItem('arcanosGuardados')) || [];
            const nuevosGuardados = guardados.filter(persona => persona.nombre !== nombreParaEliminar);
            localStorage.setItem('arcanosGuardados', JSON.stringify(nuevosGuardados));
            if (modalConfirmar) modalConfirmar.classList.remove('activa');
            mostrarGuardados();
            mostrarNotificacion(`${nombreParaEliminar} ha sido eliminado.`);
        });
    }
    if (btnCancelarDelete) { btnCancelarDelete.addEventListener('click', () => { if (modalConfirmar) modalConfirmar.classList.remove('activa'); }); }
});