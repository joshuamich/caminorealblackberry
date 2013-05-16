
	var idioma 	   = document.documentElement.lang;
	var hoteles_id		= $("body").attr("rel");
	
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
			try{
					var contacto_msg="";
					var email_hotel="";
					var ultima_fecha_actualizacion='2000-01-01';
					if(mynamespace.db){
						mynamespace.db.readTransaction(
							function (t) {
								t.executeSql('SELECT contacto,contacto_en,email FROM hoteles WHERE id='+hoteles_id, [], 
									function (tx, results) {
											var i;
											var len = results.rows.length;
											var last_date_sync;
											for (i = 0; i < len; i++) {
													contacto_msg = results.rows.item(i).contacto;
													if(idioma=='en'){
														contacto_msg = results.rows.item(i).contacto_en;
													}
													email_hotel  = results.rows.item(i).email;
											}	
											
											if(booking_url!=''){
												var args = new blackberry.invoke.BrowserArguments(booking_url);
												blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
											}else{
												alert('No existe enlace de reserva para este hotel. /npor favor intente el formulario de contacto');	
											}
									}
								);
							}
						);
					}				
				
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
					xmlhttp.open("POST",base_url+"userdata.php?option=contactenosform&nombre="+nombre+"&email="+email+"&message="+mensaje+"&email_hotel="+email_hotel,false);
					xmlhttp.send();
					if(xmlhttp.responseText=="result=true"){
							if(idioma=='en'){
								alert(contacto_msg);
							}else{
								alert(contacto_msg);
							}
							var myfileurl="menuprincipal.html";	
							$('body').load(myfileurl, function() {
							});
					}else{
							 if(idioma=='en'){
								alert("error in data transfer, please try again later");
							}else{
								alert("error en la transferencia de datos, favor intente mas tarde");
							}
					}
					
			}catch(err){
				log(err.message );
			}
			return true;
	}