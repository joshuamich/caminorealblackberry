	var base_url		=	"http://innotechsa.com/caminorealbb_Administrator/";
	var contenidos_url	=	base_url + "ws.php?option=contenidos";
	var idioma 			=   document.documentElement.lang;
	
	function getContenidos(){
					try{
							var ultima_fecha_actualizacion='2000-01-01';
							if(mynamespace.db){
								log('reading contenidos max date for ' + hoteles_id_s);
								mynamespace.db.readTransaction(
									function (t) {
										t.executeSql('SELECT COALESCE(MAX(updated),date("2000-01-01")) last_sync FROM contenidos WHERE hoteles_id='+hoteles_id_s, [], 
											function (tx, results) {
													var i;
													var len = results.rows.length;
													var last_date_sync;
													for (i = 0; i < len; i++) {
															 ultima_fecha_actualizacion = results.rows.item(i).last_sync;
													}	
													 getXMLContenidos(ultima_fecha_actualizacion);
											}
										);
									}
								);
							}
					}catch(err){
							log(err.message );
					}
					
	}
		
	function getXMLContenidos(ufecha){
		try{
				if(blackberry.system.hasDataCoverage()){
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange=function(){
							if(xmlhttp.readyState==4 && xmlhttp.status==200){
									parser_Contenidos(xmlhttp.responseText);
							}else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
									 hideLoading();
							}
						}
						xmlhttp.open("GET",contenidos_url+"&fecha="+ufecha+"&hoteles_id="+hoteles_id_s,true);
						xmlhttp.send();
				}else{
						hideLoading();						
				}
		}catch(err){		log(err.message );		}
	}	
	
	function parse_insert_contenidos(xmlstring){
			try{
				var parser		 = 	new DOMParser();
				var xmlDocument  = 	parser.parseFromString( xmlstring, "text/xml" );
				var items 	 	 = 	xmlDocument.getElementsByTagName("item");
				var tableContent = "";
				var array_contenidos= new Array();
			
				for (var i = 0; i < items.length; i++) {   
					var contenidos_id			 = items[i].getElementsByTagName("id");
					var hoteles_id				 = items[i].getElementsByTagName("hoteles_id");
					var contenidos_nombre		 = items[i].getElementsByTagName("nombre");
					var contenidos_nombre_en	 = items[i].getElementsByTagName("nombre_en");
					var contenidos_descripcion	 = items[i].getElementsByTagName("descripcion");
					var contenidos_descripcion_en= items[i].getElementsByTagName("descripcion_en");
					var contenidos_imagen		 = items[i].getElementsByTagName("imagen_destacada");
					var contenidos_tipo 		 = items[i].getElementsByTagName("tipo");
					var contenidos_updated 		 = items[i].getElementsByTagName("updated");
					var fail=false;
					if(contenidos_id.length>0){
						if(contenidos_id[0].firstChild!=null){
								var item_contenido = new Array();
								item_contenido[0] = contenidos_id[0].firstChild.nodeValue;
								
								if(hoteles_id.length>0){				if(hoteles_id[0].firstChild!=null){					item_contenido[1] = hoteles_id[0].firstChild.nodeValue;					}else{ item_contenido[1] = "";	fail=true;	}	}else{	item_contenido[1] = ""; fail=true; }
								if(contenidos_nombre.length>0){			if(contenidos_nombre[0].firstChild!=null){			item_contenido[2] = contenidos_nombre[0].firstChild.nodeValue;			}else{ item_contenido[2] = "";  fail=true;	}	}else{	item_contenido[2] = ""; fail=true; }
								if(contenidos_nombre_en.length>0){		if(contenidos_nombre_en[0].firstChild!=null){		item_contenido[3] = contenidos_nombre_en[0].firstChild.nodeValue;		}else{ item_contenido[3] = contenidos_nombre[0].firstChild.nodeValue;	}	}else{	item_contenido[3] = contenidos_nombre[0].firstChild.nodeValue;}
								if(contenidos_descripcion.length>0){	if(contenidos_descripcion[0].firstChild!=null){		item_contenido[4] = contenidos_descripcion[0].firstChild.nodeValue;		}else{ item_contenido[4] = ""; 				}	}else{	item_contenido[4] = ""; 		   }
								if(contenidos_descripcion_en.length>0){	if(contenidos_descripcion_en[0].firstChild!=null){	item_contenido[5] = contenidos_descripcion_en[0].firstChild.nodeValue;	}else{ item_contenido[5] = contenidos_descripcion[0].firstChild.nodeValue; 	}	}else{	item_contenido[5] = contenidos_descripcion[0].firstChild.nodeValue;}
								if(contenidos_imagen.length>0){			if(contenidos_imagen[0].firstChild!=null){			item_contenido[6] = contenidos_imagen[0].firstChild.nodeValue;			}else{ item_contenido[6] = ""; 				}	}else{	item_contenido[6] = "";  		   }
								if(contenidos_tipo.length>0){			if(contenidos_tipo[0].firstChild!=null){			item_contenido[7] = contenidos_tipo[0].firstChild.nodeValue;			}else{ item_contenido[7] = ""; 	fail=true;	}	}else{	item_contenido[7] = ""; fail=true; }
								if(contenidos_updated.length>0){		if(contenidos_updated[0].firstChild!=null){			item_contenido[8] = contenidos_updated[0].firstChild.nodeValue;			}else{ item_contenido[8] = ""; 				}	}else{	item_contenido[8] = "";  		   }
								
								if(!fail && item_contenido.length == 9){
										array_contenidos[array_contenidos.length] = item_contenido;
								}
								
						}
					}
				}
				insertContenidos(array_contenidos);
			}catch(err){		log(err.message );		}
		}
	
	function insertContenidos(array_contenidos) {
			try{
				if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
								var i;
								for (i = 0; i < array_contenidos.length; i++){
									var item_obj 		=	array_contenidos[i];
									var delete_query 	=	'DELETE FROM contenidos WHERE id=' + item_obj[0] + ' ';
									var insert_query	=	'INSERT INTO contenidos (id,hoteles_id, nombre,nombre_en,descripcion,descripcion_en,imagen_destacada,tipo,updated) VALUES ('+item_obj[0]+', "'+item_obj[1]+'","'+item_obj[2]+'","'+item_obj[3]+'","'+item_obj[4]+'","'+item_obj[5]+'","'+item_obj[6]+'","'+item_obj[7]+'","'+item_obj[8]+'")';
									t.executeSql(delete_query);
									t.executeSql(insert_query,
												[],
												function (tx, res) {	log("row Created Successfully");	},
												function (tx, err) {	log("ERROR - row creation failed - code: " + err.code + ", message: " + err.message);	}
												);
								}
								hideLoading();		
							}
						);
						
				}
			
			}catch(err){		log(err.message );		}
	}
					
	function parser_Contenidos(xmlstring){	
			parse_insert_contenidos(xmlstring);
	}
	
	function displayMenu(){
			$('#menu_general').css('display', 'table');
			$('#menu_general').css('width', '100%');
	}
	
	function log(message){	/*alert('CONSOLE.LOG: ' + message);	if(typeof console == "object"){		console.log(message);  }*/		}
	
	
	function highlight(e) {
		e.style.backgroundColor = "#0a3a82";
	}
	
	function unhighlight(e) {
		e.style.backgroundColor = "#0c2963";
	}
	
	function showLoading(){
		document.getElementById("modalCanvas").style.display   = 'block';
		document.getElementById("loadingCanvas").style.display = 'block';
	}
	
	function hideLoading(){
		document.getElementById("modalCanvas").style.display   = 'none';
		document.getElementById("loadingCanvas").style.display = 'none';
	}
	
	function showReservar() {
		try{
			var booking_url="";
			var ultima_fecha_actualizacion='2000-01-01';
			if(mynamespace.db){
				mynamespace.db.readTransaction(
					function (t) {
						t.executeSql('SELECT booking FROM hoteles WHERE id='+hoteles_id_s, [], 
							function (tx, results) {
									var i;
									var len = results.rows.length;
									var last_date_sync;
									for (i = 0; i < len; i++) {
											 booking_url = results.rows.item(i).booking;
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
		}catch(err){
				log(err.message );
		}
	}
	
	function showHabitaciones() {
	   showLoading();
		var myfileurl = "habitaciones.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showServicios() {
		showLoading();
		var myfileurl = "servicios.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showRestaurantes() {
		showLoading();
		var myfileurl = "restaurantes.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showBanquetes() {
	   showLoading();
		var myfileurl = "banquetes.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showPromociones() {
		showLoading();
		var myfileurl = "promociones.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showFacilidades() {
		showLoading();
		var myfileurl = "facilidades.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showMapas() {
		showLoading();
		var myfileurl = "mapas.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showContacto() {
		showLoading();
		var myfileurl = "contacto.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function initMenuPrincipal(){
		try{
			showLoading();
			if (blackberry.ui.menu.getMenuItems().length > 0) {
				blackberry.ui.menu.clearMenuItems();
			}
			
			blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
					showLoading();
					var myfileurl="home.html";	
					$('body').load(myfileurl, function() {
					});
			});
			
			getContenidos();
			
			if(idioma=='en'){
					document.getElementById('button_reservar').innerHTML	="Book";
					document.getElementById('button_habitaciones').innerHTML="Rooms";
					document.getElementById('button_servicios').innerHTML	="Services";
					document.getElementById('button_restaurantes').innerHTML="Restaurants";
					document.getElementById('button_banquetes').innerHTML	="Banquet";
					document.getElementById('button_promociones').innerHTML	="Promotions";
					document.getElementById('button_facilidades').innerHTML	="Facilities";
					document.getElementById('button_mapa').innerHTML		="Maps";
					document.getElementById('button_contacto').innerHTML	="Contact";
			}
		}catch(err){		log(err.message );		}
		
	}
	
	function log(message){	/*alert('CONSOLE.LOG: ' + message);	if(typeof console == "object"){		console.log(message);  }*/		}
	
		
	var hoteles_id_s = $("body").attr("rel");
	initMenuPrincipal();