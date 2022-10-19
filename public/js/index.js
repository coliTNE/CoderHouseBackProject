const nombre = document.getElementById("name");
const precio = document.getElementById("price");
const imagen = document.getElementById("thumbnail");
const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
  if (!nombre.value || !precio.value || !imagen.value) {
    e.preventDefault();
    alert("Completa todos los campos")
  }
});
