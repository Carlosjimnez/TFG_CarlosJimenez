window.addEventListener("load", rellenarForm);

function rellenarForm() {
  const json = JSON.parse(localStorage.getItem("datos_cliente"));
  if (json) {
    rellenarFormulario(json);
  } else {
    vaciarFormulario();
  }
}

function rellenarFormulario(datos) {
  datos.fecha_tarjeta = datos.fecha_tarjeta.slice(0, 7);
  document.querySelector('input[name="nombre"]').value = datos.nombre;
  document.querySelector('input[name="apellido"]').value = datos.apellido;
  document.querySelector('input[name="contacto"]').value = datos.telefono;
  document.querySelector('input[name="email"]').value = datos.email;
  document.querySelector('input[name="contrasena"]').value = datos.contrasena;
  document.querySelector('input[name="nombreTarjeta"]').value =
    datos.nombre_tarjeta;
  document.querySelector('input[name="numTarjeta"]').value =
    datos.numero_tarjeta;
  document.querySelector('input[name="fechaTarjeta"]').value =
    datos.fecha_tarjeta;
}

function vaciarFormulario() {
  document.querySelector('input[name="nombre"]').value = "";
  document.querySelector('input[name="apellido"]').value = "";
  document.querySelector('input[name="contacto"]').value = "";
  document.querySelector('input[name="email"]').value = "";
  document.querySelector('input[name="contrasena"]').value = "";
  document.querySelector('input[name="nombreTarjeta"]').value = "";
  document.querySelector('input[name="numTarjeta"]').value = "";
  document.querySelector('input[name="fechaTarjeta"]').value = "";
}

function actualizarCliente(json) {
  fetch("http://localhost/TFG_Carlos/backend/controllers/clientes.php", {
    method: "post",
    body: JSON.stringify({ datos_actualizar: json }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response JSON:", data);
      location.href = "index.html";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function borrarCliente(idCliente) {
  fetch(
    `http://localhost/TFG_Carlos/backend/controllers/clientes.php?id_cliente=${idCliente}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response JSON:", data);
      localStorage.removeItem("datos_cliente");
      location.href = "./index.html";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

document
  .getElementById("perfilForm")
  .addEventListener("submit", (ev) => ev.preventDefault());

document.getElementById("actualizarPerfil").addEventListener("click", () => {
  const values = document.querySelectorAll("#perfilForm [name]");
  const body = generarBody(values);
  const cliente_datos = localStorage.getItem("datos_cliente");
  const id_cliente = JSON.parse(cliente_datos).id_cliente;
  body.id_cliente = id_cliente;

  try {
    actualizarCliente(body);
    localStorage.setItem("datos_cliente", JSON.stringify(body));
    alert("Se han actualizado sus datos");
  } catch (e) {
    console.log("Error actualizando sus datos", e);
  }
});

document.getElementById("eliminarPerfil").addEventListener("click", () => {
  const obj = JSON.parse(localStorage.getItem("datos_cliente"));
  const { id_cliente } = obj;
  borrarCliente(id_cliente);
});
