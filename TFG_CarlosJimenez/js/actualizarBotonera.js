window.addEventListener("load", iniciar);

async function iniciar() {
  const json = localStorage.getItem("datos_cliente");
  if (json) {
    try {
      const datos = JSON.parse(json);
      datosCliente(datos.email, datos.contrasena);
      cambiarBotonera(true);
      document
        .getElementById("buttonCerrarSesion")
        .addEventListener("click", cerrarSesion);
    } catch (e) {
      console.log("Error: ", e);
    }
  } else {
    cambiarBotonera(false);
  }
}

function cambiarBotonera(value) {
  const buttonInicio = document.getElementById("buttonInicioSesion");
  const buttonAdmin = document.getElementById("buttonAdminPerfil");
  const buttonCerrar = document.getElementById("buttonCerrarSesion");

  buttonInicio.style.display = value ? "none" : "block";
  buttonAdmin.style.display = value ? "block" : "none";
  buttonCerrar.style.display = value ? "block" : "none";
}

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
      localStorage.setItem("datos_cliente", data.data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function cerrarSesion() {
  localStorage.removeItem("datos_cliente");
  window.reload();
}
