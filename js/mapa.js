
	var idioma 	   			= document.documentElement.lang;
	var base_url			= "http://innotechsa.com/caminorealbb_Administrator/";
	var ubicaciones_url		= base_url + "ws.php?option=ubicaciones";
	var bb_width			= window.innerWidth;
	var bb_height			= window.innerHeight;
	
	if (blackberry.ui.menu.getMenuItems().length > 0) {
		blackberry.ui.menu.clearMenuItems();
	}
	
	blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
				showLoading();
				var myfileurl="menuprincipal.html";	
				$('body').load(myfileurl, function() {
				});
	});
	
	
		
	var hoteles_id		= $("body").attr("rel");
	var estiloitemMenu	="";
	var rest_titulo		="Restaurantes";
	var gas_titulo		="Gasolineras";
	var serviciosdeviaje_titulo="Servicios de Viaje";
	var bar_titulo		="Bares";
	
	if(idioma='en'){
		rest_titulo		="Restaurant";
		gas_titulo		="Gas stations";
		serviciosdeviaje_titulo="Services";
		bar_titulo		="Bars";	
	}
	
	
	var restaurantes 	= new blackberry.ui.menu.MenuItem(false, 1, rest_titulo, mostrarRestaurantes);
	var gasolineras 	= new blackberry.ui.menu.MenuItem(false, 1, gas_titulo, mostrarGasolineras);
	var serviciosdeviaje= new blackberry.ui.menu.MenuItem(false, 1, serviciosdeviaje_titulo, mostrarServiciosViajes);
	var bares 			= new blackberry.ui.menu.MenuItem(false, 1, bar_titulo, mostrarBar);
	
	
	
	blackberry.ui.menu.addMenuItem(restaurantes);
	blackberry.ui.menu.addMenuItem(gasolineras);
	blackberry.ui.menu.addMenuItem(serviciosdeviaje);
	blackberry.ui.menu.addMenuItem(bares);
	
	var mapaAltura 		= document.getElementById("mapa");
	mapaAltura.style.height = anchoVentana + "px";
	var barIcon			= './images/barIcon.png';
	var restauranteIcon = './images/restauranteIcon.png';
	var gasolinerasIcon = './images/gasolinerasIcon.png';
	var serviciosIcon 	= './images/serviciosViajeIcon.png';
	
	var bar_Icon;
	/*var bar_Icon 		= new GIcon();
	bar_Icon.image 		= './images/barIcon.png';
	bar_Icon.iconSize 	= new GSize(18,25);
	bar_Icon.iconAnchor = new GPoint(9,12);*/
	
	var rest_Icon; 
	/*var rest_Icon 		= new GIcon();
	rest_Icon.image 	= './images/restauranteIcon.png';
	rest_Icon.iconSize 	= new GSize(18,25);
	rest_Icon.iconAnchor= new GPoint(9,12);*/
	
	var gas_Icon;
	/*var gas_Icon 		= new GIcon();
	gas_Icon.image 		= './images/gasolinerasIcon.png';
	gas_Icon.iconSize 	= new GSize(18,25);
	gas_Icon.iconAnchor = new GPoint(9,12);*/
	
	var serv_Icon;
	/*var serv_Icon 		= new GIcon();
	serv_Icon.image 	= './images/serviciosViajeIcon.png';
	serv_Icon.iconSize	= new GSize(18,25);
	serv_Icon.iconAnchor= new GPoint(9,12);*/
	
	
	var bar 			= new Array();
	var servicios 		= new Array();
	var gasolineras 	= new Array();
	var restaurantes 	= new Array();
	var mapOptions;
	var map;
	
	/*function initmap(){
		mapOptions = {
			center: new google.maps.LatLng(14.594797, -90.51778),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			streetViewControl: false,
			zoomControl: false,
			overviewMapControl: false,
			mapTypeControl: false
		};
		map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
		
		demoData();
		
	}*/
	
	
	
	
	
	function getUbicaciones(){
				
					try{	
							
							var ultima_fecha_actualizacion='2000-01-01';
							if(mynamespace.db){
								log('reading ubicaciones max date for ' + hoteles_id);
								mynamespace.db.readTransaction(
									function (t) {
										t.executeSql('SELECT COALESCE(MAX(updated),date("2000-01-01")) last_sync FROM ubicaciones WHERE hoteles_id='+hoteles_id, [], 
											function (tx, results) {
													var i;
													var len = results.rows.length;
													var last_date_sync;
													for (i = 0; i < len; i++) {
															 ultima_fecha_actualizacion = results.rows.item(i).last_sync;
													}	
													 getXMLUbicaciones(ultima_fecha_actualizacion);
													
											}
										);
									}
								);
							}
							//initmap();
							
					}catch(err){
							log(err.message );
					}
					
	}
		
	function getXMLUbicaciones(ufecha){
				if(blackberry.system.hasDataCoverage()){
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange=function(){
							if(xmlhttp.readyState==4 && xmlhttp.status==200){
									parser_Ubicaciones(xmlhttp.responseText);
							}else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
									 hideLoading();
									 demoData();
							}
						}
					
						xmlhttp.open("GET",ubicaciones_url+"&fecha="+ufecha+"&hoteles_id="+hoteles_id,true);
						xmlhttp.send();
				}else{
						hideLoading();
						demoData();
				}
	}	
					
	function parser_Ubicaciones(xmlstring){
			parse_insert_ubicaciones(xmlstring);
			hideLoading();
	}

	function parse_insert_ubicaciones(xmlstring){
					var parser		  = 	new DOMParser();
					var xmlDocument   = 	parser.parseFromString( xmlstring, "text/xml" );
					var items 	 	  = 	xmlDocument.getElementsByTagName("item");
					var tableContent  = "";
					var array_ubicaciones= new Array();
				
					for (var i = 0; i < items.length; i++) {   
						var ubicaciones_id		= items[i].getElementsByTagName("id");
						var hoteles_id			= items[i].getElementsByTagName("hoteles_id");
						var ubicaciones_nombre	= items[i].getElementsByTagName("nombre");
						var ubicaciones_nombre_en= items[i].getElementsByTagName("nombre_en");
						var ubicaciones_tipo	= items[i].getElementsByTagName("tipo");
						var ubicaciones_lat		= items[i].getElementsByTagName("lat");
						var ubicaciones_long	= items[i].getElementsByTagName("long");
						var ubicaciones_updated	= items[i].getElementsByTagName("updated");
						var fail				= false;
						
						if(ubicaciones_id.length>0){
							if(ubicaciones_id[0].firstChild!=null){
									var item_contenido = new Array();
									item_contenido[0]  = ubicaciones_id[0].firstChild.nodeValue;
									
									if(hoteles_id.length	 >0){		if(hoteles_id[0].firstChild	!=null){			item_contenido[1] = hoteles_id[0].firstChild.nodeValue;				}else{ item_contenido[1] = "";	fail=true;	}	}else{	item_contenido[1] = ""; fail=true; }
									if(ubicaciones_nombre.length>0){	if(ubicaciones_nombre[0].firstChild!=null){		item_contenido[2] = ubicaciones_nombre[0].firstChild.nodeValue;		}else{ item_contenido[2] = "";  fail=true;	}	}else{	item_contenido[2] = ""; fail=true; }
									if(ubicaciones_nombre_en.length>0){	if(ubicaciones_nombre_en[0].firstChild!=null){	item_contenido[3] = ubicaciones_nombre_en[0].firstChild.nodeValue;	}else{ item_contenido[3] = ubicaciones_nombre[0].firstChild.nodeValue;	}	}else{	item_contenido[3] = ubicaciones_nombre[0].firstChild.nodeValue;  }
									if(ubicaciones_tipo.length>0){		if(ubicaciones_tipo[0].firstChild!=null){		item_contenido[4] = ubicaciones_tipo[0].firstChild.nodeValue;		}else{ item_contenido[4] = "";  fail=true;	}	}else{	item_contenido[4] = ""; fail=true; }
									if(ubicaciones_lat.length>0){		if(ubicaciones_lat[0].firstChild!=null){		item_contenido[5] = ubicaciones_lat[0].firstChild.nodeValue;		}else{ item_contenido[5] = "";  fail=true;	}	}else{	item_contenido[5] = ""; fail=true; }
									if(ubicaciones_long.length>0){		if(ubicaciones_long[0].firstChild!=null){		item_contenido[6] = ubicaciones_long[0].firstChild.nodeValue;		}else{ item_contenido[6] = "";  fail=true;	}	}else{	item_contenido[6] = ""; fail=true; }
									if(ubicaciones_updated.length>0){	if(ubicaciones_updated[0].firstChild!=null){	item_contenido[7] = ubicaciones_updated[0].firstChild.nodeValue;	}else{ item_contenido[7] = "";  fail=true;	}	}else{	item_contenido[7] = ""; fail=true; }
									
																		
									if(!fail && item_contenido.length == 8){
											array_ubicaciones[array_ubicaciones.length] = item_contenido;
									}
							}
						}
					}
					insertUbicaciones(array_ubicaciones);
	}



	function insertUbicaciones(array_ubicaciones) {
			if(mynamespace.db){
					mynamespace.db.transaction(
						function (t) {
							var i;
							for (i = 0; i < array_ubicaciones.length; i++){
								var item_obj =array_ubicaciones[i];
								var insert_query	=	'INSERT INTO ubicaciones (id, hoteles_id,nombre,nombre_en, tipo,lat_c,long_c,updated) VALUES ('+item_obj[0]+', "'+item_obj[1]+'","'+item_obj[2]+'","'+item_obj[3]+'","'+item_obj[4]+'","'+item_obj[5]+'","'+item_obj[6]+'","'+item_obj[7]+'")';
								var delete_query	=	'DELETE FROM ubicaciones WHERE id=' + item_obj[0] + ' ';
								t.executeSql(delete_query);
								t.executeSql(insert_query);						
							}
							demoData();
						}
					);
			}
	}


	function initmap(){
	
				
				if(blackberry.system.hasDataCoverage()){
						 if(idioma=='en'){
								document.getElementById('titulo_pagina').innerHTML="Maps";
						 }
						 
						var map_canvas=document.getElementById("mapa");
						map_canvas.style.width=bb_width+"px";
						map_canvas.style.height=(bb_height)+"px";
						
						map = new GMap2(document.getElementById("mapa"));
						map.addControl(new GLargeMapControl());
						map.addControl(new GMapTypeControl());
						map.setCenter(new GLatLng(14.594797, -90.51778), 15);
						
						bar_Icon 			= new GIcon();
						bar_Icon.image 		= './images/barIcon.png';
						bar_Icon.iconSize 	= new GSize(18,25);
						bar_Icon.iconAnchor = new GPoint(9,12);
						
						rest_Icon 			= new GIcon();
						rest_Icon.image 	= './images/restauranteIcon.png';
						rest_Icon.iconSize 	= new GSize(18,25);
						rest_Icon.iconAnchor= new GPoint(9,12);
						
						gas_Icon 			= new GIcon();
						gas_Icon.image 		= './images/gasolinerasIcon.png';
						gas_Icon.iconSize 	= new GSize(18,25);
						gas_Icon.iconAnchor = new GPoint(9,12);
						
						serv_Icon 			= new GIcon();
						serv_Icon.image 	= './images/serviciosViajeIcon.png';
						serv_Icon.iconSize	= new GSize(18,25);
						serv_Icon.iconAnchor= new GPoint(9,12);
						getUbicaciones();
				}else{
						alert('Error de conexion');
						showLoading();
						var myfileurl="menuprincipal.html";	
						$('body').load(myfileurl, function() {
						});
				}
		
	}
	
	function crearMarcador(lat, long, iconoUrl) {
			var location = new google.maps.LatLng(lat, long);
			var marker;
			/*var marker = new google.maps.Marker({
				position: location,
				map: map,
				icon: iconoUrl
			});*/
			if (iconoUrl == barIcon) {
				marker = new GMarker(location,bar_Icon);
				
				bar.push(marker);
			}
			if (iconoUrl == restauranteIcon) {
				marker = new GMarker(location,rest_Icon);
				restaurantes.push(marker);
			}
			if (iconoUrl == gasolinerasIcon) {
				marker = new GMarker(location,gas_Icon);
				gasolineras.push(marker);
			}
			if (iconoUrl == serviciosIcon) {
				marker = new GMarker(location,serv_Icon);
				servicios.push(marker);
			}
			map.addOverlay(marker);
			return marker;
	}
	
	function showBar() {
		if (bar) {
			for (i in bar) {
				if ( bar[i].isHidden()) {
				   bar[i].show();
				 } 
				//bar[i].setMap(map);
				
			}
		}
	}
	
	function hideBar() {
		if (bar) {
			for (i in bar) {
				if (! bar[i].isHidden()) {
					bar[i].hide();
				}
				//bar[i].setMap(null);
			}
		}
	}
	
	function showRestaurantes() {
		if (restaurantes) {
			for (i in restaurantes) {
				if ( restaurantes[i].isHidden()) {
				   restaurantes[i].show();
				 }
				//restaurantes[i].setMap(map);
			}
		}
	}
	
	function hideRestaurantes() {
		if (restaurantes) {
			for (i in restaurantes) {
				if (! restaurantes[i].isHidden()) {
				   restaurantes[i].hide();
				}
				//restaurantes[i].setMap(null);
			}
		}
	}
	
	function showGasolineras() {
		if (gasolineras) {
			for (i in gasolineras) {
				if ( gasolineras[i].isHidden()) {
				   gasolineras[i].show();
				 } 
				//gasolineras[i].setMap(map);
			}
		}
	}
	
	function hideGasolineras() {
		if (gasolineras) {
			for (i in gasolineras) {
				if ( !gasolineras[i].isHidden()) {
				   gasolineras[i].hide();
				}
				//gasolineras[i].setMap(null);
			}
		}
	}
	
	function showServicios() {
		if (servicios) {
			for (i in servicios) {
				if ( servicios[i].isHidden()) {
				   servicios[i].show();
				}
				//servicios[i].setMap(map);
			}
		}
	}
	
	function hideServicios() {
		if (servicios) {
			for (i in servicios) {
				if ( !servicios[i].isHidden()) {
				  
				   servicios[i].hide();
				}
				//servicios[i].setMap(null);
			}
		}
	}
	
	/********************* Agregando Bares **********************/
	function demoData(){
		bar 			= new Array();
		servicios 		= new Array();
		gasolineras 	= new Array();
		restaurantes 	= new Array();
		if(mynamespace.db){
						mynamespace.db.readTransaction(
							function (t) {
								t.executeSql('SELECT *  FROM ubicaciones WHERE hoteles_id='+hoteles_id+' ORDER BY tipo ASC', [], 
								function (tx, results) {
										var i;
										var len = results.rows.length;
										var html_item = '';
										for (i = 0; i < len; i++) {
												var icon_url='';
												var tipo=results.rows.item(i).tipo+'';
												switch (tipo) { 
														case 'Restaurante':    
																icon_url=restauranteIcon;
														break;
														case 'Gasolinera':    
																icon_url=gasolinerasIcon;
														break;
														case 'Bar':    
																icon_url=barIcon;
														break;
														case 'Servicio':    
																icon_url=serviciosIcon;
														break;
														default:
															icon_url=serviciosIcon;
														break;
												}
												crearMarcador(results.rows.item(i).lat_c+'', results.rows.item(i).long_c+'', icon_url);
										}
									
								}
								);
							}
						);
						//hideLoading();
		}
		/*
		crearMarcador(14.594797, -90.51778, barIcon);
		crearMarcador(14.592482, -90.522054, barIcon);
		crearMarcador(14.59109, -90.518031, barIcon);*/
	}
	
	function mostrarRestaurantes() {
		showRestaurantes();
		hideGasolineras();
		hideBar();
		hideServicios();
	}
	
	function mostrarBar() {
		hideRestaurantes();
		hideGasolineras();
		hideServicios();
		showBar();
	}
	
	function mostrarGasolineras() {
		hideRestaurantes();
		hideBar();
		hideServicios();
		showGasolineras();
	}
	
	function mostrarServiciosViajes() {
		hideRestaurantes();
		hideGasolineras();
		hideBar();
		showServicios();
	}
	
	function showLoading(){
		document.getElementById("modalCanvas").style.display   = 'block';
		document.getElementById("loadingCanvas").style.display = 'block';
	}
	
	function hideLoading(){
		document.getElementById("modalCanvas").style.display   = 'none';
		document.getElementById("loadingCanvas").style.display = 'none';
	}

	function log(message){	/*alert('CONSOLE.LOG: ' + message);	if(typeof console == "object"){		console.log(message);  }*/		}
	
	initmap();
	
	