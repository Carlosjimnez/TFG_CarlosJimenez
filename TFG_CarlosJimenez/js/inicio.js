document.getElementById("registroForm").addEventListener("submit", (ev) => {
  ev.preventDefault();
  console.log("SE QUIERE DAR DE ALTA UN USUARIO");
  const values = document.querySelectorAll("#registroForm [name]");
  console.log(values);
  if (validarDatos(values)) {
    // GENERAR EL TRY CATCH
    alert("Todos los datos son válidos");
    const body = generarBody(values);
    console.log("ESTE ES EL BODY DEL ALTA", body);
    //GENERAR MODAL CONFIRMACION
  } else {
  }
});

document.getElementById("inicioForm").addEventListener("submit", (ev) => {
  ev.preventDefault();
  console.log("SE QUIERE INICIAR SESION");
  const values = document.querySelectorAll("#inicioForm [name]");
  // GENERAR EL TRY CATCH
  const body = generarBody(values);
  console.log("ESTE ES EL BODY DEL INCIO", body);

  //GENERAR MODAL CONFIRMACION holagit a
});

function validarDatos(values) {
  const nombre = document.querySelector('input[name="nombre"]').value.trim();
  const apellido = document
    .querySelector('input[name="apellido"]')
    .value.trim();
  const contacto = document
    .querySelector('input[name="contacto"]')
    .value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const contrasena = document
    .querySelector('input[name="contrasena"]')
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

  let errores = "";
  let valido = true;

  if (!isNaN(nombre)) {
    errores += "El nombre no está en el formato correcto \n";
  }

  if (!isNaN(apellido)) {
    errores += "El apellido no está en el formato correcto \n";
  }

  if (!/^[67]\d{8}$/.test(contacto)) {
    errores += "El número de teléfono no está en el formato correcto \n";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores += "El email no está en el formato correcto \n";
  }

  if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(contrasena)) {
    errores += "La contraseña no esta en el formato correcto \n ";
  }

  if (!/^[A-Za-z]+ [A-Za-z\s]+$/.test(nombreTarjeta)) {
    errores += "El nombre de la tarjeta no está en el formato correcto \n";
  }

  if (!/^\d{16}$/.test(numTarjeta)) {
    errores += "El número de la tarjeta no es el correcto \n";
  }
  if (isNaN(fechaTarjeta) && !validarFechaTarjeta(fechaTarjeta)) {
    // 2022-12
    errores +=
      "La fecha de expiración de la tarjeta no es posterior a la fecha actual \n";
  }

  if (errores) {
    alert(errores);
    valido = false;
  }

  return valido;
}

function generarBody(values) {
  const body = {};
  values.forEach((el) => {
    body[el.name] = el.value;
  });
  return body;
}

function validarFechaTarjeta(fecha) {
  const hoy = new Date();
  const [ano, mes] = fecha.split("-").map(Number);
  const expiracion = new Date(ano, mes - 1);
  return expiracion >= hoy;
}