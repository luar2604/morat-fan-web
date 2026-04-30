const usuariosBase = [
  { usuario: "ana_02", password: "1234" },
  { usuario: "luis_m", password: "abcd" }
];

const CLAVE_USUARIOS         = "usuarios";
const CLAVE_USUARIO_LOGUEADO = "usuarioLogueado";


function inicializarUsuarios() {
  const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS);

  if (!usuariosGuardados) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosBase));
  }
}

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

function borrarUsuarios() {
  localStorage.removeItem(CLAVE_USUARIOS);
}


function estaUsuarioLogueado() {
  const usuarioLogueado = localStorage.getItem(CLAVE_USUARIO_LOGUEADO);
  return usuarioLogueado ? true : false;
}

function obtenerUsuarioLogueado() {
  return JSON.parse(localStorage.getItem(CLAVE_USUARIO_LOGUEADO));
}

function buscarUsuario(usuario, password) {
  const usuarios = obtenerUsuarios();

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].usuario == usuario && usuarios[i].password == password) {
      return usuarios[i];
    }
  }

  return null;
}

function guardarUsuarioLogueado(usuarioLogueado) {
  localStorage.setItem(CLAVE_USUARIO_LOGUEADO, JSON.stringify(usuarioLogueado));
}

function borrarUsuarioLogueado() {
  localStorage.removeItem(CLAVE_USUARIO_LOGUEADO);
}

function mostrarMensaje(idElemento, texto, esError) {
  const el = document.getElementById(idElemento);
  if (!el) return;
  el.textContent   = texto;
  el.style.color   = esError ? "#e05555" : "var(--acento)";
  el.style.display = "block";
}


const formLogin = document.getElementById("formLogin");

if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario  = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!usuario || !password) {
      mostrarMensaje("mensajeLogin", "Rellena todos los campos.", true);
      return;
    }

    const usuarioEncontrado = buscarUsuario(usuario, password);

    if (usuarioEncontrado) {
      guardarUsuarioLogueado(usuarioEncontrado);
      mostrarMensaje("mensajeLogin", "¡Bienvenido, " + usuarioEncontrado.usuario + "!", false);

      setTimeout(function () {
        window.location.href = "../index.html";
      }, 1000);

    } else {
      mostrarMensaje("mensajeLogin", "Usuario o contraseña incorrectos.", true);
    }
  });
}


const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre    = document.getElementById("nombre").value.trim();
    const usuario   = document.getElementById("usuario").value.trim();
    const password  = document.getElementById("password").value.trim();
    const password1 = document.getElementById("password1").value.trim();

    if (!nombre || !usuario || !password || !password1) {
      mostrarMensaje("mensajeRegistro", "Rellena todos los campos.", true);
      return;
    }

    if (password !== password1) {
      mostrarMensaje("mensajeRegistro", "Las contraseñas no coinciden.", true);
      return;
    }

    const usuarios = obtenerUsuarios();

    const yaExiste = usuarios.find(function (u) {
      return u.usuario === usuario;
    });

    if (yaExiste) {
      mostrarMensaje("mensajeRegistro", "Ese usuario ya está en uso.", true);
      return;
    }

    const nuevoUsuario = {
      usuario:  usuario,
      password: password,
      nombre:   nombre
    };

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    mostrarMensaje("mensajeRegistro", "¡Cuenta creada! Redirigiendo...", false);

    setTimeout(function () {
      window.location.href = "../pages/login.html";
    }, 1200);
  });
}


const formRecuperacion = document.getElementById("formRecuperacion");

if (formRecuperacion) {
  formRecuperacion.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario   = document.getElementById("usuario").value.trim();
    const password  = document.getElementById("password").value.trim();
    const password1 = document.getElementById("password1").value.trim();

    if (!usuario || !password || !password1) {
      mostrarMensaje("mensajeRecuperacion", "Rellena todos los campos.", true);
      return;
    }

    if (password !== password1) {
      mostrarMensaje("mensajeRecuperacion", "Las contraseñas no coinciden.", true);
      return;
    }

    const usuarios = obtenerUsuarios();

    const indice = usuarios.findIndex(function (u) {
      return u.usuario === usuario;
    });

    if (indice === -1) {
      mostrarMensaje("mensajeRecuperacion", "No existe ningún usuario con ese nombre.", true);
      return;
    }

    usuarios[indice].password = password;
    guardarUsuarios(usuarios);

    mostrarMensaje("mensajeRecuperacion", "¡Contraseña cambiada! Redirigiendo...", false);

    setTimeout(function () {
      window.location.href = "../pages/login.html";
    }, 1200);
  });
}


inicializarUsuarios();