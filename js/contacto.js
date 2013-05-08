if(idioma=='en'){
	document.getElementById('titulo_pagina').innerHTML='Contact';
	document.getElementById('nombre').value='Name';
	document.getElementById('email').value='Email';
	document.getElementById('mensaje').value='Message';
	document.getElementById('button_enviar').value='Send';
}

	blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
	   showLoading();
		var myfileurl="menuprincipal.html";	
		$('body').load(myfileurl, function() {
		});
	});


function validacion() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("mensaje").value;
    if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) || nombre == "Nombre") {
			if(idioma=='en'){
				alert("Enter a name please;");
			}else{
				alert("Ingrese un nombre por favor.");
			}
			return false;
    }
    if (!(/^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+.)+[A-Z]{2,4}$/i.test(email)) || email == "Email") {
			if(idioma=='en'){
				alert("Enter a valid email please;");
			}else{
				alert("Ingrese un email valido por favor.");
			}
			return false;
    }
    if (mensaje == null || mensaje.length == 0 || /^\s+$/.test(mensaje) || mensaje == "Agregar mensaje") {
			if(idioma=='en'){
				alert("Enter a message please;");
			}else{
				alert("Ingrese un mensaje por favor.");
			}
			return false;
    }
	
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST",base_url+"userdata.php?option=contactenosform&nombre="+nombre+"&email="+email+"&message="+mensaje,false);
	xmlhttp.send();
	if(xmlhttp.responseText=="0"){
			if(idioma=='en'){
				alert("Form sent succesfully");
			}else{
				alert("Formulario enviado con éxito");
			}
	}else{
			 if(idioma=='en'){
				alert("error in data transfer, please try again later");
			}else{
				alert("error en la transferencia de datos, favor intente mas tarde");
			}
	}
    return true;
}