// function realizarPeticion(num) {
//   const url = `http://localhost/TFG_Carlos/backend/index.php?numero=${num}`;

//   fetch(url, {
//     mode: "no-cors",
//     headers: { "Content-Type": "application/json" },
//     method: "GET",
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((e) => console.error("Fetch error:", e));
// }
function realizarPeticion() {
  const url = `http://localhost/TFG_Carlos/backend/index.php`;

  const json = {
    name: 'David',
    age: 22,
    colors: ['red', 'green', 'blue']
  }

  fetch("http://localhost/TFG_CarlosJimenez/backend/index.php", {
    method: "post",
    body: JSON.stringify({json})
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json(); // Cambiar text() a json() para obtener directamente el JSON
    })
    .then((data) => {
      console.log("Response JSON:", data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

// Llamar a la función con un número de ejemplo
// realizarPeticion();
