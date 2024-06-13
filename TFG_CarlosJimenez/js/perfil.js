window.addEventListener("load", () => {
  //Comprobamos si existe datos en el session storage
  if (localStorage.getItem("datos_cliente")) {
    const datos = JSON.parse(localStorage.getItem("datos_cliente"));
    rellenarFormulario(datos);
  } else {
    console.log("No hay datos");
  }
});

function rellenarFormulario(datos) {
  document.querySelector('input[name="nombre"]').value = datos.nombre;
  document.querySelector('input[name="apellido"]').value = datos.apellido;
  document.querySelector('input[name="contacto"]').value = datos.contacto;
  document.querySelector('input[name="email"]').value = datos.email;
  document.querySelector('input[name="contrasena"]').value = datos.contrasena;
  document.querySelector('input[name="nombreTarjeta"]').value =
    datos.nombreTarjeta;
  document.querySelector('input[name="numTarjeta"]').value = datos.numTarjeta;
  document.querySelector('input[name="fechaTarjeta"]').value =
    datos.fechaTarjeta;
}

function eliminarUsuario(id) {
  fetch(
    `http://localhost/TFG_Carlos/backend/controllers/clientes.php?id_cliente=${id}`
  )
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

document.getElementById("eliminarPerfil").addEventListener("click", () => {
  console.log(
    'localStorage.getItem("datos")',
    localStorage.getItem("datos_cliente")
  );
  const obj = JSON.parse(localStorage.getItem("datos_cliente"));
  //DESTRUCTURING PARA SACAR EL ID_CLIENTE DEL OBJETO
  console.log("DATOS CLIENTE", obj);
  const { id_cliente } = obj;
  console.log("id_cliente", id_cliente);
  eliminarUsuario(id_cliente);
});
