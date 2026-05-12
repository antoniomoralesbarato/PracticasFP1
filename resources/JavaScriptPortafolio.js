const button = document.getElementById("cambioTema");
const body = document.body;

if(localStorage.getItem("theme") === "dark"){
    body.classList.add("dark");
    button.textContent = "TemaClaro";
}

button.addEventListener("click", () => {
    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        button.textContent = "TemaClaro";
    } else {
        localStorage.setItem("theme","light");
        button.textContent = "TemaOscuro";
    }
});

document.getElementById("copyright").textContent =
    "© " + new Date().getFullYear() + " Antonio Morales";


const form = document.getElementById("formSugerencias");

form.addEventListener("submit", function(e){
    e.preventDefault(); // evita que se recargue la página

    alert("¡Sugerencia enviada correctamente!");

    form.reset(); 
});