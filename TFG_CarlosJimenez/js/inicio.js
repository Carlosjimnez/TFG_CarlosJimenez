window.addEventListener("load", sacarMensaje);

async function sacarMensaje() {
  const msgError = document.getElementById("mensajeError");
  const json = JSON.parse(localStorage.getItem("datos_cliente"));
  msgError.style.display = json ? "none" : "block";
}

document
  .getElementById("registroForm")
  .addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const values = document.querySelectorAll("#registroForm [name]");
    if (validarDatos(values)) {
      const body = generarBody(values);
      altaCliente(body);
    }
  });

document.getElementById("inicioForm").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const email = document.getElementById("emailEntrar").value;
  const contrasena = document.getElementById("contrasenaEntrar").value;
  datosCliente(email, contrasena);
});

function datosCliente(email, contrasena) {
  fetch(
    `http://localhost/TFG_Carlos/backend/controllers/clientes.php?email=${email}&contrasena=${contrasena}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response JSON:", data);
      if (data.data !== "null") {
        localStorage.setItem("datos_cliente", data.data);
        location.href = "index.html";
      } else {
        console.log(data.data);
        location.reload();
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function altaCliente(json) {
  fetch("http://localhost/TFG_Carlos/backend/controllers/clientes.php", {
    method: "post",
    body: JSON.stringify({ datos_crear: json }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response JSON:", data);
      localStorage.setItem("datos_cliente", JSON.stringify(data.data));
      alert("El Registro ha sido realizado con exito");
      location.href = "index.html";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert("El email ya existe en la base de datos");
    });
}

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
  let fechaTarjeta = document.querySelector('input[name="fechaTarjeta"]').value;

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

  if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(contrasena)) {
    errores += "La contraseña no esta en el formato correcto \n ";
  }

  if (!/^[A-Za-z]+ [A-Za-z\s]+$/.test(nombreTarjeta)) {
    errores +=
      "El nombre de la tarjeta no está en el formato correcto. Ejemplo:(Pepe Perez) \n";
  }

  if (!/^\d{16}$/.test(numTarjeta)) {
    errores += "El número de la tarjeta no es el correcto \n";
  }

  if (isNaN(fechaTarjeta) && !validarFechaTarjeta(fechaTarjeta)) {
    errores +=
      "La fecha de expiración de la tarjeta no es posterior a la fecha actual \n";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores += "El email no está en el formato correcto \n";
  }

  if (errores) {
    alert(errores);
    valido = false;
  }

  return valido;
}

function validarEmail(email) {
  let valido = true;
  fetch(
    `http://localhost/TFG_Carlos/backend/controllers/clientes.php?email=${email}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response JSON:", data);
      return data.data !== "null";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function generarBody(values) {
  const body = {};
  values.forEach((el) => {
    if (el.name === "fechaTarjeta") {
      body[el.name] = `${el.value}-01`;
    } else {
      body[el.name] = el.value;
    }
  });
  return body;
}

function validarFechaTarjeta(fecha) {
  const hoy = new Date();
  const [ano, mes] = fecha.split("-").map(Number);
  const expiracion = new Date(ano, mes - 1);
  return expiracion >= hoy;
}
