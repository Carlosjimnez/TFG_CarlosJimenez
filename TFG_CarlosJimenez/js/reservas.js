window.addEventListener("load", datosCliente);

function datosCliente() {
  const json = JSON.parse(localStorage.getItem("datos_cliente"));
  if (json) {
    rellenarFormulario(json);
    mostrarOpcionesCliente(true);
  }
}

function rellenarFormulario(datos) {
  datos.fecha_tarjeta = datos.fecha_tarjeta.slice(0, 7);
  document.querySelector('input[name="nombre"]').value = datos.nombre;
  document.querySelector('input[name="contacto"]').value = datos.telefono;
  document.querySelector('input[name="nombreTarjeta"]').value =
    datos.nombre_tarjeta;
  document.querySelector('input[name="numTarjeta"]').value =
    datos.numero_tarjeta;
  document.querySelector('input[name="fechaTarjeta"]').value =
    datos.fecha_tarjeta;
}

function mostrarOpcionesCliente(value) {
  const campoOferta = document.getElementById("ofertasDropdown");
  const campoTrabajador = document.getElementById("trabajadoresDropdown");
  const campoDetalles = document.getElementById("detalles");

  campoOferta.style.display = value ? "block" : "none";
  campoTrabajador.style.display = value ? "block" : "none";
  campoDetalles.style.display = value ? "block" : "none";
}

function validarFormulario(event) {
  event.preventDefault();

  const nombre = document.querySelector('input[name="nombre"]').value.trim();
  const producto = document
    .querySelector('select[name="producto"]')
    .value.trim();

  const oferta = document.querySelector('select[name="oferta"]').value.trim();

  const fechaReserva = document
    .querySelector('input[name="fechaReserva"]')
    .value.trim();

  const hora = document.querySelector('input[name="hora"]').value.trim();

  const contacto = document
    .querySelector('input[name="contacto"]')
    .value.trim();
  const nombreTarjeta = document
    .querySelector('input[name="nombreTarjeta"]')
    .value.trim();
  const numTarjeta = document
    .querySelector('input[name="numTarjeta"]')
    .value.trim();
  const fechaTarjeta = document.querySelector(
    'input[name="fechaTarjeta"]'
  ).value;
  const cvc = document.querySelector('input[name="cvc"]').value;

  let errores = "";
  let valido = true;

  if (!isNaN(nombre)) {
    errores += "El nombre no está en el formato correcto \n";
  }

  if (!producto && !oferta) {
    errores += "Debe seleccionar por lo menos una oferta o un producto\n";
  }

  if (isNaN(fechaReserva) && !validarFechaReserva(fechaReserva)) {
    // 2022-12
    errores += "La fecha de reserva debe ser posterior a la fecha actual \n";
  }
  if (isNaN(fechaReserva) && !validarHora(hora)) {
    errores +=
      "La hora introducida debe de ser dentro del horario (09:00 a 21:00) \n";
  }
  if (!/^[67]\d{8}$/.test(contacto)) {
    errores += "El número de teléfono no está en el formato correcto \n";
  }

  if (!/^[A-Za-z]+ [A-Za-z\s]+$/.test(nombreTarjeta)) {
    errores += "El nombre de la tarjeta no está en el formato correcto \n";
  }

  if (!/^\d{16}$/.test(numTarjeta)) {
    errores += "El número de la tarjeta no es el correcto \n";
  }
  if (isNaN(fechaTarjeta) && !validarFechaTarjeta(fechaTarjeta)) {
    // 2022-12
    errores += "La fecha de tarjeta es posterior a la fecha actual \n";
  }

  if (!/^[0-9]{3,4}$/.test(cvc)) {
    // 2022-12
    errores += "El cvc de la tarjeta no es el correcto \n";
  }

  if (errores) {
    alert(errores);
    valido = false;
  } else {
    let modal = new bootstrap.Modal(
      document.getElementById("confirmacionModal")
    );
    modal.show();
    return valido;
  }
}

function validarFechaTarjeta(fecha) {
  const hoy = new Date();
  const [ano, mes] = fecha.split("-").map(Number);
  const expiracion = new Date(ano, mes - 1);
  return expiracion >= hoy;
}
function validarFechaReserva(fecha) {
  const fechaPattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaPattern.test(fecha)) {
    return false;
  }
  const hoy = new Date();
  const fechaReserva = new Date(fecha);
  hoy.setHours(0, 0, 0, 0);
  fechaReserva.setHours(0, 0, 0, 0);

  return fechaReserva > hoy;
}
function validarHora(hora) {
  const [hour, minute] = hora.split(":").map(Number);

  // Verifica que la hora esté entre 9:00 y 21:00
  if (hour < 9 || hour > 21 || (hour === 21 && minute > 0)) {
    return false;
  }
  return true;
}

function confirmarReserva() {
  const values = document.querySelectorAll("form [name]");
  const body = generarBody(values);

  // Mostrar la alerta de reserva enviada correctamente
  let msg = "Reserva enviada correctamente!";

  try {
    crearReserva(body);
  } catch (e) {
    msg = `Eror al crear reserva ${e}`;
  }

  alert(msg);

  // Cerrar el modal después de mostrar la alerta
  let modal = bootstrap.Modal.getInstance(
    document.getElementById("confirmacionModal")
  );

  modal.hide();
}

function crearReserva(datos) {
  fetch("http://localhost/TFG_Carlos/backend/controllers/reservas.php", {
    method: "post",
    body: JSON.stringify({ datos_reserva: datos }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response JSON:", data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

// Función para manejar la cancelación de la reserva
function cancelarReserva() {
  // Cerrar el modal
  let modal = bootstrap.Modal.getInstance(
    document.getElementById("confirmacionModal")
  );
  modal.hide();
}

// Función para generar el body para la petición del servicio
function generarBody(values) {
  console.log("values", values);

  const body = {};

  values.forEach((el) => {
    if (el.name === "oferta") {
      body[el.name] = el.value || 9;
    } else if (el.name === "producto") {
      body[el.name] = el.value || 13;
    } else if (el.name === "trabajador") {
      body[el.name] = el.value || Math.floor(Math.random() * 18) + 1;
    } else {
      body[el.name] = el.value || null;
    }
  });

  const datos = JSON.parse(localStorage.getItem("datos_cliente"));

  if (datos) {
    body.id_cliente = datos.id_cliente;
  }

  return body;
}

// Agregar eventos a los botones de confirmar y cancelar dentro del modal
document
  .getElementById("btnConfirmarReserva")
  .addEventListener("click", confirmarReserva);
document
  .getElementById("btnCancelarReserva")
  .addEventListener("click", cancelarReserva);
document
  .getElementById("reservaForm")
  .addEventListener("submit", (ev) => ev.preventDefault());
