/*****************************		DB OPERATIONS	**************************/
		if (typeof mynamespace === 'undefined') {
			mynamespace = {};
		}
		var last_sync_date;			
		
				
		(function () {
				function onDBCreate(database) {
						mynamespace.db 	= 	database;
						database.transaction(
								function (tx) {
									tx.executeSql(
									'CREATE TABLE IF NOT EXISTS hoteles (id int unique, nombre text, nombre_en text,imagen text,updated DATETIME NOT NULL)',
									[],
									function (tx, res) {	log("Table hoteles Created Successfully");	},
									function (tx, err) {	log("ERROR - Table hoteles creation failed - code: " + err.code + ", message: " + err.message);	}
									);
									
									tx.executeSql(
									'CREATE TABLE IF NOT EXISTS  contenidos (id int unique, hoteles_id int,nombre text,nombre_en text,descripcion text, descripcion_en text,imagen_destacada text,tipo text, updated DATETIME NOT NULL)',
									[],
									function (tx, res) {	log("Table  contenidos Created Successfully");	},
									function (tx, err) {	log("ERROR - Table contenidos creation failed - code: " + err.code + ", message: " + err.message);	}
									);
									
									tx.executeSql(
									'CREATE TABLE IF NOT EXISTS galeria (id int unique, contenidos_id int,imagen text)',
									[],
									function (tx, res) {	log("Table galeria Created Successfully");	},
									function (tx, err) {	log("ERROR - Table galeria creation failed - code: " + err.code + ", message: " + err.message);	}
									);
									
									tx.executeSql(
									'CREATE TABLE IF NOT EXISTS ubicaciones (id int unique, hoteles_id int,nombre text,nombre_en text, tipo text,lat_c text,long_c text,updated DATETIME NOT NULL)',
									[],
									function (tx, res) {	log("Table ubicaciones Created Successfully");	},
									function (tx, err) {	log("ERROR - Table ubicaciones creation failed - code: " + err.code + ", message: " + err.message);	}
									);
								}
						);
				}
			
				if (window.openDatabase){
						mynamespace.db = window.openDatabase('caminoreal', '', 'Camino Real DB', 10 * 1024 * 1024, onDBCreate);
				}else{
						alert("This device does not have HTML5 Database support");
				}
		}());
		
		function insertHoteles(array_hoteles) {
			if(mynamespace.db){
					mynamespace.db.transaction(
						function (t) {
							var i;
							for (i = 0; i < array_hoteles.length; i++){
								var item_obj =array_hoteles[i];
								var insert_query	=	'INSERT INTO hoteles (id, nombre,nombre_en,imagen,updated) VALUES ('+item_obj[0]+', "'+item_obj[1]+'", "'+item_obj[2]+'","'+item_obj[3]+'","'+item_obj[4]+'")';
								var delete_query	=	'DELETE FROM hoteles WHERE id=' + item_obj[0] + ' ';
								t.executeSql(delete_query);
								t.executeSql(insert_query);						
							}
						}
					);
				//getContenidos();
				if ( typeof init == 'function' ) { 
						init(); 
				}
			}
		}
		
		function deleteHoteles() {
			if(mynamespace.db){
					mynamespace.db.transaction(
						function (t) {
							t.executeSql('DELETE FROM hoteles');				
						}
					);
			}
		}
		
		function readHoteles() {
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT COUNT(*) AS c FROM hoteles', [], 
										function (tx, results) {
												var len = results.rows.length, i;
												for (i = 0; i < len; i++) {
														log(results.rows.item(i).c);
												}
										}
							);
						}
					);
			}
		}
		
		function displayHoteles() {
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT *  FROM hoteles', [], 
										function (tx, results) {
												var i;
												var len = results.rows.length;
												var html_item = '';
												for (i = 0; i < len; i++) {
														 html_item = html_item + '<tr x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="showMenuPrincipal_hotel('+results.rows.item(i).id+');"><td><img src="data:image/jpeg;base64,'+results.rows.item(i).imagen+'" width="100%"/></td><td>'+results.rows.item(i).nombre+'</td></tr>';
												}
												document.getElementById('homecontenido').innerHTML=html_item;
										}
							);
						}
					);
			}
		}	
		
		
		function insertContenidos(array_contenidos) {
			if(mynamespace.db){
					mynamespace.db.transaction(
						function (t) {
							var i;
							for (i = 0; i < array_contenidos.length; i++){
								var item_obj 		=	array_contenidos[i];
								
								
								var insert_query	=	'INSERT INTO contenidos (id,hoteles_id, nombre,nombre_en,descripcion,descripcion_en,imagen_destacada,tipo,updated) VALUES ('+item_obj[0]+', "'+item_obj[1]+'","'+item_obj[2]+'","'+item_obj[3]+'","'+item_obj[4]+'","'+item_obj[5]+'","'+item_obj[6]+'","'+item_obj[7]+'","'+item_obj[8]+'")';
								var delete_query 	=	'DELETE FROM contenidos WHERE id=' + item_obj[0] + ' ';
								t.executeSql(delete_query);
								t.executeSql(insert_query,
											[],
											function (tx, res) {	log("row Created Successfully");	},
											function (tx, err) {	log("ERROR - row creation failed - code: " + err.code + ", message: " + err.message);	}
											);
											
							}
						}
					);
					getGalerias();
			}
		}
		
		function insertGalerias(array_galerias) {
			if(mynamespace.db){
					mynamespace.db.transaction(
						function (t) {
							var i;
							for (i = 0; i < array_galerias.length; i++){
								var item_obj 		=	array_galerias[i];
								var insert_query	=	'INSERT INTO galeria (id,contenidos_id,imagen) VALUES ('+item_obj[0]+', "'+item_obj[1]+'","'+item_obj[2]+'")';
								var delete_query 	=	'DELETE FROM galeria WHERE id=' + item_obj[0] + ' ';
								t.executeSql(delete_query);
								t.executeSql(insert_query,
											[],
											function (tx, res) {	log("row Created Successfully");	},
											function (tx, err) {	log("ERROR - row creation failed - code: " + err.code + ", message: " + err.message);	}
											);
											
							}
						}
					);
					getUbicaciones();
			}
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
						}
					);
				if ( typeof init == 'function' ) { 
						init(); 
				}
			}
		}

/************		END DB OPERATIONS*/


/***********		Version Controller		*************/
		
		
		
		
		function getNewData(){
				if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT COALESCE(MAX(fecha),date("2013-01-01")) last_sync FROM (SELECT MAX(updated) fecha FROM hoteles UNION SELECT MAX(updated) fecha FROM contenidos ) aux_table', [], 
										function (tx, results) {
												var i;
												var len = results.rows.length;
												var last_date_sync;
												for (i = 0; i < len; i++) {
														 last_date_sync=results.rows.item(i).last_sync;
												}
												
												if(last_date_sync){
														last_sync_date=last_date_sync;
														getHoteles();
												}
										}
							);
						}
					);
				}
		}

		
/***********		XML OPERATIONS			*************/
		function parse_insert_hoteles(xmlstring){
				var parser		 = 	new DOMParser();
				var xmlDocument  = 	parser.parseFromString( xmlstring, "text/xml" );
				var items 	 	 = 	xmlDocument.getElementsByTagName("item");
				var tableContent = "";
				var array_hoteles= new Array();
				log('HotelesLength = '+items.length+'');
				for (var i = 0; i < items.length; i++) {   
					var hoteles_id			= items[i].getElementsByTagName("id");
					var hoteles_nombre		= items[i].getElementsByTagName("nombre");
					var hoteles_nombre_en	= items[i].getElementsByTagName("nombre_en");
					var hoteles_imagen		= items[i].getElementsByTagName("imagen");
					var hoteles_updated		= items[i].getElementsByTagName("updated");
					
					if(hoteles_id.length>0){
						if(hoteles_id[0].firstChild!=null){
								var item_hotel = new Array();
								if(hoteles_id.length>0){		if(hoteles_id[0].firstChild!=null){				item_hotel[0] = hoteles_id[0].firstChild.nodeValue;			}else{ item_hotel[0] = "";	fail=true;							}	}else{	item_hotel[0] = ""; fail=true; 							}
								if(hoteles_nombre.length>0){	if(hoteles_nombre[0].firstChild!=null){			item_hotel[1] = hoteles_nombre[0].firstChild.nodeValue;		}else{ item_hotel[1]= "";	fail=true;							}	}else{	item_hotel[1] = ""; fail=true; 							}
								if(hoteles_nombre_en.length>0){	if(hoteles_nombre_en[0].firstChild!=null){		item_hotel[2] = hoteles_nombre_en[0].firstChild.nodeValue;	}else{ item_hotel[2]= hoteles_nombre[0].firstChild.nodeValue;	}	}else{	item_hotel[2] = hoteles_nombre[0].firstChild.nodeValue;	}
								if(hoteles_imagen.length>0){	if(hoteles_imagen[0].firstChild!=null){			item_hotel[3] = hoteles_imagen[0].firstChild.nodeValue;		}else{ item_hotel[3]= "";	fail=true;							}	}else{	item_hotel[3] = ""; fail=true; 							}
								if(hoteles_updated.length>0){	if(hoteles_updated[0].firstChild!=null){		item_hotel[4] = hoteles_updated[0].firstChild.nodeValue;	}else{ item_hotel[4]= "";	fail=true;							}	}else{	item_hotel[4] = ""; fail=true;							}
							
								array_hoteles[array_hoteles.length] = item_hotel;
						}
					}
				}
				insertHoteles(array_hoteles);
		}

		function parse_insert_contenidos(xmlstring){
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
		}


		function parse_insert_galerias(xmlstring){
					var parser		  = 	new DOMParser();
					var xmlDocument   = 	parser.parseFromString( xmlstring, "text/xml" );
					var items 	 	  = 	xmlDocument.getElementsByTagName("item");
					var tableContent  = "";
					var array_galerias= new Array();
				
					for (var i = 0; i < items.length; i++) {   
						var galerias_id			= items[i].getElementsByTagName("id");
						var contenidos_id		= items[i].getElementsByTagName("contenidos_id");
						var galerias_imagen		= items[i].getElementsByTagName("imagen");
						var fail				= false;
						
						if(galerias_id.length>0){
							if(galerias_id[0].firstChild!=null){
									var item_contenido = new Array();
									item_contenido[0]  = galerias_id[0].firstChild.nodeValue;
									
									if(contenidos_id.length	 >0){		if(contenidos_id[0].firstChild	!=null){			item_contenido[1] = contenidos_id[0].firstChild.nodeValue;			}else{ item_contenido[1] = "";	fail=true;	}	}else{	item_contenido[1] = ""; fail=true; }
									if(galerias_imagen.length>0){		if(galerias_imagen[0].firstChild!=null){			item_contenido[2] = galerias_imagen[0].firstChild.nodeValue;		}else{ item_contenido[2] = "";  fail=true;	}	}else{	item_contenido[2] = ""; fail=true; }
									
									if(!fail && item_contenido.length == 3){
											array_galerias[array_galerias.length] = item_contenido;
									}
							}
						}
					}
					insertGalerias(array_galerias);
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





/****************************		Remote Hotel Operations		*************/

		//var base_url			=	"http://127.0.0.1/caminorealAdministrator/";
		var base_url			=	"http://innotechsa.com/caminorealbb_Administrator/";
		var hoteles_url			=	base_url + "ws2.php?option=hoteles_complete";
		var contenidos_url		=	base_url + "ws2.php?option=contenidos";
		var galerias_url		=	base_url + "ws2.php?option=galerias";
		var ubicaciones_url		=	base_url + "ws2.php?option=ubicaciones";
		
		function getHoteles(){
				if(!last_sync_date){
						var today = new Date();
						var dd = today.getDate();
						var mm = today.getMonth()+1;
						var yyyy = today.getFullYear();
						if(dd<10){dd='0'+dd} 
						if(mm<10){mm='0'+mm} 
						last_sync_date  = yyyy;
						last_sync_date += '-';
						last_sync_date += mm;
						last_sync_date += '-';
						last_sync_date += dd;
						log(last_sync_date);
				}
				
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange=function()
				  {
				  if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						parser_hoteles(xmlhttp.responseText);
					}
				  }
				xmlhttp.open("GET",hoteles_url+"&fecha="+last_sync_date,true);
				xmlhttp.send();
				
		}
		
		function parser_hoteles(xmlstring){
				log('Get Hoteles response ok');
				parse_insert_hoteles(xmlstring);
		}
		
		function getContenidos(){
				if(!last_sync_date){
						var today = new Date();
						var dd = today.getDate();
						var mm = today.getMonth()+1;
						var yyyy = today.getFullYear();
						if(dd<10){dd='0'+dd} 
						if(mm<10){mm='0'+mm} 
						last_sync_date  = yyyy;
						last_sync_date += '-';
						last_sync_date += mm;
						last_sync_date += '-';
						last_sync_date += dd;
						log(last_sync_date);
				}
				
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange=function()
				{
				  if(xmlhttp.readyState==4 && xmlhttp.status==200)
						{
							parser_Contenidos(xmlhttp.responseText);
						}
				}
				xmlhttp.open("GET",contenidos_url+"&fecha="+last_sync_date,true);
				xmlhttp.send();
				
		}
				
		function parser_Contenidos(xmlstring){	
				log('Get Contenidos response ok');
				parse_insert_contenidos(xmlstring);
		}
		
		function getGalerias(){
				if(!last_sync_date){
						var today = new Date();
						var dd = today.getDate();
						var mm = today.getMonth()+1;
						var yyyy = today.getFullYear();
						if(dd<10){dd='0'+dd} 
						if(mm<10){mm='0'+mm} 
						last_sync_date  = yyyy;
						last_sync_date += '-';
						last_sync_date += mm;
						last_sync_date += '-';
						last_sync_date += dd;
						log(last_sync_date);
				}
				
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange=function()
				{
				  if(xmlhttp.readyState==4 && xmlhttp.status==200)
						{
							parser_Galerias(xmlhttp.responseText);
						}
				}
				xmlhttp.open("GET",galerias_url+"&fecha="+last_sync_date,true);
				xmlhttp.send();
				
		}
		
		function  parser_Galerias(xmlstring){
				log('Get Galerias response ok');
				parse_insert_galerias(xmlstring);
		}
		
		function getUbicaciones(){
				if(!last_sync_date){
						var today = new Date();
						var dd = today.getDate();
						var mm = today.getMonth()+1;
						var yyyy = today.getFullYear();
						if(dd<10){dd='0'+dd} 
						if(mm<10){mm='0'+mm} 
						last_sync_date  = yyyy;
						last_sync_date += '-';
						last_sync_date += mm;
						last_sync_date += '-';
						last_sync_date += dd;
						log(last_sync_date);
				}
				
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange=function()
				{
				  if(xmlhttp.readyState==4 && xmlhttp.status==200)
						{
							parser_ubicaciones(xmlhttp.responseText);
						}
				}
				xmlhttp.open("GET",ubicaciones_url+"&fecha="+last_sync_date,true);
				xmlhttp.send();
				
		}
		
		function parser_ubicaciones(xmlstring){
				log('Get Ubicaciones response ok');
				parse_insert_ubicaciones(xmlstring);
		}



/******************************Action Functions******************************/
	function showLoading(){
		document.getElementById("modalCanvas").style.display = 'block';
		document.getElementById("loadingCanvas").style.display = 'block';
	}
	
	function hideLoading(){
		document.getElementById("modalCanvas").style.display = 'none';
		document.getElementById("loadingCanvas").style.display = 'none';
	}


/**********************		DEBUG	******************************/
	function log(message){	alert('.|.=? ' + message);	if(typeof console == "object"){		/*console.log(message);*/	}		}
		
/******************************MENU*****************************************/
		try
		{
				if (blackberry.ui.menu.getMenuItems().length > 0) {
					blackberry.ui.menu.clearMenuItems();
				}
				var estiloitemMenu	= 	"";
				var get_data 		= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Insert Data", getHoteles);
				/*var get_cdata 		= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Insert Contenidos", getContenidos);
				var get_gdata 		= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Insert Galeria", getGalerias);
				var display_data 	= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Display Hoteles", displayHoteles);
				var read_data 		= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Count Data", readHoteles);
				var delete_data 	= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Borrar Data", deleteHoteles);*/
				blackberry.ui.menu.addMenuItem(get_data);
				/*blackberry.ui.menu.addMenuItem(get_cdata);
				blackberry.ui.menu.addMenuItem(get_gdata);
				blackberry.ui.menu.addMenuItem(display_data);
				blackberry.ui.menu.addMenuItem(read_data);
				blackberry.ui.menu.addMenuItem(delete_data);*/
		}
		catch(err)
		{
				log(err.message );
		}
		
	function init_db(){
		try
		{
			if ( blackberry.system.hasDataCoverage()) {
				getNewData();	
			}else{
				log('No data coverage');
				if ( typeof init == 'function' ) { 
						init(); 
				}
			}
		}
		catch(err)
		{
				log(err.message );
		}
	}
		
	init_db();