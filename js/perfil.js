if (estaUsuarioLogueado() == false) {
    window.location.href = "../pages/login.html";
}
var usuarioActual = obtenerUsuarioLogueado();
var nombreMostrado;

if (usuarioActual.nombre) {
    nombreMostrado = usuarioActual.nombre;
} else {
    nombreMostrado = usuarioActual.usuario;
}

document.getElementById("perfilNombre").textContent  = nombreMostrado;
document.getElementById("perfilUsuario").textContent = "@" + usuarioActual.usuario;
document.getElementById("datoNombre").textContent    = nombreMostrado;
document.getElementById("datoUsuario").textContent   = usuarioActual.usuario;

var primeraLetra  = nombreMostrado[0].toUpperCase();
var segundaLetra  = "";
var posicionEspacio = nombreMostrado.indexOf(" ");

if (posicionEspacio != -1) {
    segundaLetra = nombreMostrado[posicionEspacio + 1].toUpperCase();
}

document.getElementById("avatarIniciales").textContent = primeraLetra + segundaLetra;

var botonCerrar = document.getElementById("btnCerrarSesion");

botonCerrar.addEventListener("click", function() {
    borrarUsuarioLogueado();
    window.location.href = "../index.html";
});

var formulario = document.getElementById("formCambiarPassword");

formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    var passwordActual = document.getElementById("passwordActual").value;
    var passwordNueva  = document.getElementById("passwordNueva").value;
    var passwordNueva2 = document.getElementById("passwordNueva2").value;

    if (passwordActual == "" || passwordNueva == "" || passwordNueva2 == "") {
        mostrarMensaje("Rellena todos los campos.", true);
        return;
    }

    if (passwordActual != usuarioActual.password) {
        mostrarMensaje("La contraseña actual no es correcta.", true);
        return;
    }

    if (passwordNueva != passwordNueva2) {
        mostrarMensaje("Las contraseñas nuevas no coinciden.", true);
        return;
    }

    if (passwordNueva == passwordActual) {
        mostrarMensaje("La nueva contraseña debe ser diferente.", true);
        return;
    }

    var usuarios = obtenerUsuarios();

    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario == usuarioActual.usuario) {
            usuarios[i].password = passwordNueva;
        }
    }

    guardarUsuarios(usuarios);

    usuarioActual.password = passwordNueva;
    guardarUsuarioLogueado(usuarioActual);

    document.getElementById("passwordActual").value = "";
    document.getElementById("passwordNueva").value  = "";
    document.getElementById("passwordNueva2").value = "";

    mostrarMensaje("Contraseña cambiada correctamente", false);
});

function mostrarMensaje(texto, esError) {
    var mensaje = document.getElementById("mensajePerfil");

    mensaje.textContent = texto;

    if (esError == true) {
        mensaje.style.color = "#e05555";
    } else {
        mensaje.style.color = "var(--acento)";
    }

    mensaje.style.display = "block";

    setTimeout(function() {
        mensaje.style.display = "none";
    }, 4000);
}