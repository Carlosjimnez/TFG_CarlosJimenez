setTimeout(function () {
  document.getElementById("spinner2").style.display = "none";
}, 2000);
//Spinner formulario
const formulario = document.getElementById("reservaForm");
const enviarReservaBtn = document.getElementById("enviarReservaBtn");
// Obtener Referencia al spinner
const spinner = document.getElementById("spinner");
// Obtener referencia al modal de confirmación
const confirmacionModal = new bootstrap.Modal(
  document.getElementById("confirmacionModal")
);

document
  .getElementById("btnConfirmarReserva")
  .addEventListener("click", function () {
    // Ocultar el spinner
    spinner.classList.add("d-none");
    // Ocultar el modal de confirmación
    confirmacionModal.hide();
    //formulario.submit();
  });

document
  .getElementById("btnCancelarReserva")
  .addEventListener("click", function () {
    spinner.classList.add("d-none");
    confirmacionModal.hide();
  });
