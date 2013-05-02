function validacion() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("mensaje").value;
    if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) || nombre == "Nombre") {
        alert("Ingrese un nombre por favor.");
        return false;
    }
    if (!(/^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+.)+[A-Z]{2,4}$/i.test(email)) || email == "Email") {
        alert("Ingrese un email valido por favor.");
        return false;
    }
    if (mensaje == null || mensaje.length == 0 || /^\s+$/.test(mensaje) || mensaje == "Agregar mensaje") {
        alert("Ingresa un mensaje.");
        return false;
    }
    alert("Todos los datos fueron ingresados correctamente");
    return true;
}