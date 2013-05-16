	if (typeof mynamespace === 'undefined') {
		mynamespace = {};
	}
	
	var anchoVentana = window.innerWidth;
	var idioma		 = 'es';
	var base_url	 = "http://innotechsa.com/caminorealbb_Administrator/";
	var hoteles_url	 = base_url + "ws.php?option=hoteles_complete";
	var contenidoborrado_url	 = base_url + "ws.php?option=contenido_borrado";
	var hoteles_id;
	var contenidos_id;
	var galerias_id;
	var return_page;	
	var last_sync_date;			
	
	
		try{
			(function () {
					function onDBCreate(database) {
							mynamespace.db 	= 	database;
							database.transaction(
									function (tx) {
										tx.executeSql(					
										'CREATE TABLE IF NOT EXISTS hoteles (id int unique, nombre text, nombre_en text,imagen blob,contacto text,contacto_en text,email text,booking text,telefono text,updated DATETIME NOT NULL)',
										[],
										function (tx, res) {	log("Table Created Successfully");	},
										function (tx, err) {	log("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);	}
										);
										
										tx.executeSql(
										'CREATE TABLE IF NOT EXISTS  contenidos (id int unique, hoteles_id int,nombre text,nombre_en text,descripcion text, descripcion_en text,imagen_destacada blob,tipo text, updated DATETIME NOT NULL)',
										[],
										function (tx, res) {	log("Table Created Successfully");	},
										function (tx, err) {	log("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);	}
										);
										
										tx.executeSql(
										'CREATE TABLE IF NOT EXISTS galeria (id int unique, contenidos_id int,imagen blob,updated DATETIME NOT NULL)',
										[],
										function (tx, res) {	log("Table Created Successfully");	},
										function (tx, err) {	log("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);	}
										);
										
										tx.executeSql(
										'CREATE TABLE IF NOT EXISTS ubicaciones (id int unique, hoteles_id int,nombre text,nombre_en text, tipo text,lat_c text,long_c text,updated DATETIME NOT NULL)',
										[],
										function (tx, res) {	log("Table Created Successfully");	},
										function (tx, err) {	log("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);	}
										);
										
										tx.executeSql(					
										'CREATE TABLE IF NOT EXISTS contenido_borrado (id int, tipo text,updated DATETIME NOT NULL)',
										[],
										function (tx, res) {	log("Table Created Successfully");	},
										function (tx, err) {	log("ERROR - Table contenido_borrado creation failed - code: " + err.code + ", message: " + err.message);	}
										);
									}
							);
					}
				
					if (window.openDatabase){
							mynamespace.db = window.openDatabase('DB_CaminoRealv3', '', 'DBCaminoRealv3', 10 * 1024 * 1024, onDBCreate);
					}else{
							log("This device does not have HTML5 Database support");
					}
					
			}());
		}catch(err){		
			log(err.message );		
		}
		
		function contenido_borrado(){
				try{
					if(mynamespace.db){
						mynamespace.db.readTransaction(
							function (t) {
								t.executeSql('SELECT COALESCE(MAX(updated),date("2000-01-01")) last_sync FROM contenido_borrado', [], 
									function (tx, results) {
											var i;
											var len = results.rows.length;
											var last_date_sync;
											for (i = 0; i < len; i++) {
													 last_date_sync = results.rows.item(i).last_sync;
											}
											
											var xmlhttp = new XMLHttpRequest();
											xmlhttp.onreadystatechange	=	function(){
													if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
															parser_contenidoBorrado(xmlhttp.responseText);
													}else if(xmlhttp.readyState == 4 && xmlhttp.status != 200 ){
															
													}
											}
											xmlhttp.open("GET",contenidoborrado_url+"&fecha="+last_date_sync,true);
											xmlhttp.send();
									}
								);
							}
						);
					}
				}catch(err){		log(err.message );		}	
		}
		
		function parser_contenidoBorrado(xmlstring){
			try{
					
					var parser		 = 	new DOMParser();
					var xmlDocument  = 	parser.parseFromString( xmlstring, "text/xml" );
					var items 	 	 = 	xmlDocument.getElementsByTagName("item");
					var tableContent = "";
					var array_hoteles= new Array();
					
					for (var i = 0; i < items.length; i++) {   
						var id			= items[i].getElementsByTagName("id");
						var tipo		= items[i].getElementsByTagName("tipo");
						var updated		= items[i].getElementsByTagName("updated");
						
						if(id.length>0){
							if(id[0].firstChild != null){
									var item_borrado = new Array();
									if(id.length>0){					if(id[0].firstChild!=null){				item_borrado[0] = id[0].firstChild.nodeValue;		}else{ item_borrado[0] = "";fail=true;			}	}else{	item_borrado[0] = ""; fail=true; 	}
									if(tipo.length>0){					if(tipo[0].firstChild!=null){			item_borrado[1] = tipo[0].firstChild.nodeValue;		}else{ item_borrado[1]= "";	fail=true;			}	}else{	item_borrado[1] = ""; fail=true; 	}
									if(updated.length>0){				if(updated[0].firstChild!=null){		item_borrado[2] = updated[0].firstChild.nodeValue;	}else{ item_borrado[2]= ""; fail=true;			}	}else{	item_borrado[2] = ""; fail=true;	}
									array_hoteles[array_hoteles.length] = item_borrado;
							}
						}
					}
					if(items.length==0||xmlstring=="" ||xmlstring == null){
						
					}else{
						borrarContenido(array_hoteles);
					}
				}catch(err){		log(err.message );		}
		}
		
		function borrarContenido(array_hoteles) { 
			try{
				if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
									var i;
									for (i = 0; i < array_hoteles.length; i++){
										var item_obj =array_hoteles[i];
										var delete_query="";
										if(item_obj[1] == 'contenidos'){
											delete_query	=	'DELETE FROM contenidos WHERE id=' + item_obj[0] + ' ';
										}
										if(item_obj[1] == 'galerias'){
											delete_query	=	'DELETE FROM galeria WHERE id=' + item_obj[0] + ' ';
										}
										if(item_obj[1] == 'hoteles'){
											delete_query	=	'DELETE FROM hoteles WHERE id=' + item_obj[0] + ' ';
										}
										if(item_obj[1] == 'ubicaciones'){
											delete_query	=	'DELETE FROM ubicaciones WHERE id=' + item_obj[0] + ' ';
										}
										t.executeSql(delete_query);	
										t.executeSql("INSERT INTO contenido_borrado(id,tipo,updated) VALUES ('"+item_obj[0]+"','"+item_obj[1]+"','"+item_obj[2]+"')");	
															
									}
									
							}
						);
				}
			}catch(err){		log(err.message );		}
		}
		
		function insertHoteles(array_hoteles) { 
			try{
				if(mynamespace.db){
						mynamespace.db.transaction(
							function (t) {
								var i;
								for (i = 0; i < array_hoteles.length; i++){
									var item_obj =array_hoteles[i];
									var delete_query	=	'DELETE FROM hoteles WHERE id=' + item_obj[0] + ' ';
									var insert_query	=	'INSERT INTO hoteles (id, nombre,nombre_en,imagen,contacto,contacto_en,email,booking,telefono,updated) VALUES ('+item_obj[0]+', "'+item_obj[1]+'", "'+item_obj[2]+'","'+item_obj[3]+'","'+item_obj[4]+'","'+item_obj[5]+'","'+item_obj[6]+'","'+item_obj[7]+'","'+item_obj[8]+'","'+item_obj[9]+'")';
									t.executeSql(delete_query);
									t.executeSql(insert_query);						
								}
								displayHoteles();
							}
						);
				}
			}catch(err){		log(err.message );		}
		}
		
		function displayHoteles() {
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT *  FROM hoteles ORDER BY nombre ASC', [], 
										function (tx, results) {
												var i;
												var len = results.rows.length;
												var html_item = '';
												for (i = 0; i < len; i++) {
														var id=results.rows.item(i).id;
														var nombre=results.rows.item(i).nombre;
														if(idioma =='en' ){ nombre = results.rows.item(i).nombre_en; }
														 html_item += '<tr x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="showMenuPrincipal_hotel('+id+');"><td><img src="data:image/jpeg;base64,'+results.rows.item(i).imagen+'" width="100%"/></td><td>'+nombre+'</td></tr>';
												}
												hideLoading();
												document.getElementById('homecontenido').innerHTML=html_item;
												contenido_borrado();
										}
							);
						}
					);
			}
		}
		
		function parse_insert_hoteles(xmlstring){
				try{
					var parser		 = 	new DOMParser();
					var xmlDocument  = 	parser.parseFromString( xmlstring, "text/xml" );
					var items 	 	 = 	xmlDocument.getElementsByTagName("item");
					var tableContent = "";
					var array_hoteles= new Array();
					
					for (var i = 0; i < items.length; i++) {   
						var hoteles_id			= items[i].getElementsByTagName("id");
						var hoteles_nombre		= items[i].getElementsByTagName("nombre");
						var hoteles_nombre_en	= items[i].getElementsByTagName("nombre_en");
						var hoteles_contacto	= items[i].getElementsByTagName("contacto");
						var hoteles_contacto_en	= items[i].getElementsByTagName("contacto_en");
						var hoteles_email		= items[i].getElementsByTagName("email");
						var hoteles_booking		= items[i].getElementsByTagName("booking");
						var hoteles_telefono	= items[i].getElementsByTagName("telefono");
						var hoteles_imagen		= items[i].getElementsByTagName("imagen");
						var hoteles_updated		= items[i].getElementsByTagName("updated");
						
						if(hoteles_id.length>0){
							if(hoteles_id[0].firstChild!=null){
									var item_hotel = new Array();
									if(hoteles_id.length>0){			if(hoteles_id[0].firstChild!=null){				item_hotel[0] = hoteles_id[0].firstChild.nodeValue;			}else{ item_hotel[0] = "";	fail=true;			}	}else{	item_hotel[0] = ""; fail=true; 	}
									if(hoteles_nombre.length>0){		if(hoteles_nombre[0].firstChild!=null){			item_hotel[1] = hoteles_nombre[0].firstChild.nodeValue;		}else{ item_hotel[1]= "";	fail=true;			}	}else{	item_hotel[1] = ""; fail=true; 	}
									if(hoteles_nombre_en.length>0){		if(hoteles_nombre_en[0].firstChild!=null){		item_hotel[2] = hoteles_nombre_en[0].firstChild.nodeValue;	}else{ item_hotel[2]= hoteles_nombre[0].firstChild.nodeValue;	}	}else{	item_hotel[2] = hoteles_nombre[0].firstChild.nodeValue;	}
									if(hoteles_imagen.length>0){	  	if(hoteles_imagen[0].firstChild!=null){			item_hotel[3] = hoteles_imagen[0].firstChild.nodeValue;		}else{ item_hotel[3]= "";	fail=true;			}	}else{	item_hotel[3] = ""; fail=true; 	}
									if(hoteles_contacto.length>0){		if(hoteles_contacto[0].firstChild!=null){		item_hotel[4] = hoteles_contacto[0].firstChild.nodeValue;	}else{ item_hotel[4]= "";						}	}else{	item_hotel[4] = "";				}
									if(hoteles_contacto_en.length>0){	if(hoteles_contacto_en[0].firstChild!=null){	item_hotel[5] = hoteles_contacto_en[0].firstChild.nodeValue;}else{ item_hotel[5]= "";						}	}else{	item_hotel[5] = "";				}
									if(hoteles_email.length>0){			if(hoteles_email[0].firstChild!=null){			item_hotel[6] = hoteles_email[0].firstChild.nodeValue;		}else{ item_hotel[6]= "";						}	}else{	item_hotel[6] = "";				}
									if(hoteles_booking.length>0){		if(hoteles_booking[0].firstChild!=null){		item_hotel[7] = hoteles_booking[0].firstChild.nodeValue;	}else{ item_hotel[7]= "";						}	}else{	item_hotel[7] = "";				}
									if(hoteles_telefono.length>0){		if(hoteles_telefono[0].firstChild!=null){		item_hotel[8] = hoteles_telefono[0].firstChild.nodeValue;	}else{ item_hotel[8]= "";						}	}else{	item_hotel[8] = "";				}
									if(hoteles_updated.length>0){		if(hoteles_updated[0].firstChild!=null){		item_hotel[9] = hoteles_updated[0].firstChild.nodeValue;	}else{ item_hotel[9]= "";	fail=true;			}	}else{	item_hotel[9] = ""; fail=true;	}
								
									array_hoteles[array_hoteles.length] = item_hotel;
							}
						}
					}
					if(items.length==0||xmlstring=="" ||xmlstring == null){
						displayHoteles();
					}else{
						insertHoteles(array_hoteles);
					}
				}catch(err){		log(err.message );		}
		}	
		
		function getHoteles(){
			try{
				if(blackberry.system.hasDataCoverage()){
						if(!last_sync_date){
								last_sync_date='2000-01-01';
						}
						
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange	=	function(){
								if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
										parser_hoteles(xmlhttp.responseText);
								}else if(xmlhttp.readyState == 4 && xmlhttp.status != 200 ){
										displayHoteles();
								}
						}
						xmlhttp.open("GET",hoteles_url+"&fecha="+last_sync_date,true);
						xmlhttp.send();
				}else{
					displayHoteles();
				}
			}catch(err){		log(err.message );		}
				
		}
		
		function parser_hoteles(xmlstring){
				parse_insert_hoteles(xmlstring);
		}
		
		function getNewData(){
				try{
					if(mynamespace.db){
						mynamespace.db.readTransaction(
							function (t) {
								t.executeSql('SELECT COALESCE(MAX(updated),date("2000-01-01")) last_sync FROM hoteles', [], 
									function (tx, results) {
											var i;
											var len = results.rows.length;
											var last_date_sync;
											for (i = 0; i < len; i++) {
													 last_date_sync = results.rows.item(i).last_sync;
											}
											
											if(last_date_sync){
													last_sync_date	= last_date_sync;
													getHoteles();
											}
									}
								);
							}
						);
					}
				}catch(err){		log(err.message );		}
		}
		
		function showMenuPrincipal_hotel(id) {
			$("body").attr('rel', id);
			showLoading();
			var myfileurl = "menuprincipal.html";
			$('body').load(myfileurl, function() {});
		}
		
		function idiomaespanol(){
			cambiar_idioma('es'); 
		}
		
		function idiomaingles(){
			cambiar_idioma('en'); 	
		}
		
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
		
		function cambiar_idioma(nuevo_idioma){
			document.documentElement.lang=nuevo_idioma;
			var myfileurl = "home.html";
			$('body').load(myfileurl, function() {});	
		}
		
		function init_app(){
				try{
						
						if (blackberry.ui.menu.getMenuItems().length > 0) {
							blackberry.ui.menu.clearMenuItems();
						}
						
						var idioma_espanol = new blackberry.ui.menu.MenuItem(false, 1, "Español", idiomaespanol);
						var idioma_ingles = new blackberry.ui.menu.MenuItem(false, 1, "English", idiomaingles);
						blackberry.ui.menu.addMenuItem(idioma_espanol);
						blackberry.ui.menu.addMenuItem(idioma_ingles);
						blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() { 
						});
						
						document.body.style.minHeight = window.innerHeight + "px";
						showLoading();
						getNewData();	
				}catch(err){
						log(err.message );
				}
		}
		
		function log(message){	/*	alert('CONSOLE.LOG: ' + message);if(typeof console == "object"){		console.log(message);  }*/		}
		
		init_app();
		