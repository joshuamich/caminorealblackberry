/******************************MENU*****************************************/
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
									'CREATE TABLE  hoteles (id int unique, nombre text,imagen text,updated DATETIME NOT NULL)',
									[],
									function (tx, res) {	log("Table Created Successfully");	},
									function (tx, err) {	log("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);	}
									);
									
									tx.executeSql(
									'CREATE TABLE  contenidos (id int unique, hoteles_id int,nombre text,descripcion text, imagen_destacada text,tipo text, updated DATETIME NOT NULL)',
									[],
									function (tx, res) {	log("Table Created Successfully");	},
									function (tx, err) {	log("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);	}
									);
									
									tx.executeSql(
									'CREATE TABLE galeria (id int unique, contenidos_id int,imagen text)',
									[],
									function (tx, res) {	log("Table Created Successfully");	},
									function (tx, err) {	log("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);	}
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
								var insert_query	=	'INSERT INTO hoteles (id, nombre,imagen,updated) VALUES ('+item_obj[0]+', "'+item_obj[1]+'","'+item_obj[2]+'","'+item_obj[3]+'")';
								t.executeSql(insert_query);						
							}
						}
					);
				getContenidos();
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
								var insert_query	=	'INSERT INTO contenidos (id,hoteles_id, nombre,descripcion,imagen_destacada,tipo,updated) VALUES ('+item_obj[0]+', "'+item_obj[1]+'","'+item_obj[2]+'","'+item_obj[3]+'","'+item_obj[4]+'","'+item_obj[5]+'","'+item_obj[6]+'")';
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
								t.executeSql(insert_query,
											[],
											function (tx, res) {	log("row Created Successfully");	},
											function (tx, err) {	log("ERROR - row creation failed - code: " + err.code + ", message: " + err.message);	}
											);
											
							}
						}
					);
					if ( typeof init == 'function' ) { 
						init(); 
					}
			}
		}

/*END DB OPERATIONS*/

/***********		Version Controller		*************/
		//false && 
		
		if ( blackberry.system.hasDataCoverage()) {
			getNewData();	
		}else{
			log('No data coverage');
			//init();		<-- Display data
		}
		
		
		function getNewData(){
				if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT COALESCE(MAX(fecha),DATE("now")) last_sync FROM (SELECT MAX(updated) fecha FROM hoteles UNION SELECT MAX(updated) fecha FROM contenidos ) aux_table', [], 
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
				for (var i = 0; i < items.length; i++) {   
					var hoteles_id			= items[i].getElementsByTagName("id");
					var hoteles_nombre		= items[i].getElementsByTagName("nombre");
					var hoteles_imagen		= items[i].getElementsByTagName("imagen");
					var hoteles_updated		= items[i].getElementsByTagName("updated");
					
					if(hoteles_id.length>0){
						if(hoteles_id[0].firstChild!=null){
								var item_hotel = new Array();
								item_hotel[0] = hoteles_id[0].firstChild.nodeValue;
								item_hotel[1] = hoteles_nombre[0].firstChild.nodeValue;
								item_hotel[2] = hoteles_imagen[0].firstChild.nodeValue;
								item_hotel[3] = hoteles_updated[0].firstChild.nodeValue;
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
					var contenidos_id			= items[i].getElementsByTagName("id");
					var hoteles_id				= items[i].getElementsByTagName("hoteles_id");
					var contenidos_nombre		= items[i].getElementsByTagName("nombre");
					var contenidos_descripcion	= items[i].getElementsByTagName("descripcion");
					var contenidos_imagen		= items[i].getElementsByTagName("imagen_destacada");
					var contenidos_tipo 		= items[i].getElementsByTagName("tipo");
					var contenidos_updated 		= items[i].getElementsByTagName("updated");
					var fail=false;
					if(contenidos_id.length>0){
						if(contenidos_id[0].firstChild!=null){
								var item_contenido = new Array();
								item_contenido[0] = contenidos_id[0].firstChild.nodeValue;
								
								if(hoteles_id.length>0){			if(hoteles_id[0].firstChild!=null){				item_contenido[1] = hoteles_id[0].firstChild.nodeValue;				}else{ item_contenido[1] = "";	fail=true;	}	}else{	item_contenido[1] = ""; fail=true; }
								if(contenidos_nombre.length>0){		if(contenidos_nombre[0].firstChild!=null){		item_contenido[2] = contenidos_nombre[0].firstChild.nodeValue;		}else{ item_contenido[2] = "";  fail=true;	}	}else{	item_contenido[2] = ""; fail=true; }
								if(contenidos_descripcion.length>0){if(contenidos_descripcion[0].firstChild!=null){	item_contenido[3] = contenidos_descripcion[0].firstChild.nodeValue;	}else{ item_contenido[3] = ""; 				}	}else{	item_contenido[3] = ""; 		   }
								if(contenidos_imagen.length>0){		if(contenidos_imagen[0].firstChild!=null){		item_contenido[4] = contenidos_imagen[0].firstChild.nodeValue;		}else{ item_contenido[4] = ""; 				}	}else{	item_contenido[4] = "";  		   }
								if(contenidos_tipo.length>0){		if(contenidos_tipo[0].firstChild!=null){		item_contenido[5] = contenidos_tipo[0].firstChild.nodeValue;		}else{ item_contenido[5] = ""; 	fail=true;	}	}else{	item_contenido[5] = ""; fail=true; }
								if(contenidos_updated.length>0){	if(contenidos_updated[0].firstChild!=null){		item_contenido[6] = contenidos_updated[0].firstChild.nodeValue;		}else{ item_contenido[6] = ""; 				}	}else{	item_contenido[6] = "";  		   }
								//alert(item_contenido.length+' '+(!fail));
								if(!fail && item_contenido.length == 7){
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





/****************************		Remote Hotel Operations		*************/

		//var base_url		=	"http://127.0.0.1/caminorealAdministrator/";
		var base_url		=	"http://innotechsa.com/caminorealbb_Administrator/";
		var hoteles_url		=	base_url + "ws.php?option=hoteles";
		var contenidos_url		=	base_url + "ws.php?option=contenidos";
		var galerias_url		=	base_url + "ws.php?option=galerias";
		
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
				/*xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						parser_hoteles(xmlhttp.responseText);
					}else{
						
					}
				}*/
				xmlhttp.open("GET",hoteles_url+"&fecha="+last_sync_date,false);
				xmlhttp.send();
				parser_hoteles(xmlhttp.responseText);
		}
		
		function parser_hoteles(xmlstring){
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
				/*xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						parser_Contenidos(xmlhttp.responseText);
					}else{
						
					}
				}*/
				xmlhttp.open("GET",contenidos_url+"&fecha="+last_sync_date,false);
				xmlhttp.send();
				parser_Contenidos(xmlhttp.responseText);
		}
				
		function parser_Contenidos(xmlstring){	
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
				/*xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						parser_Galerias(xmlhttp.responseText);
					}else{
						
					}
				}*/
				xmlhttp.open("GET",galerias_url+"&fecha="+last_sync_date,false);
				xmlhttp.send();
				parser_Galerias(xmlhttp.responseText);
		}
		
		function  parser_Galerias(xmlstring){
				parse_insert_galerias(xmlstring);
		}

/**********************		DEBUG	******************************/
function log(message){		if(typeof console == "object"){		/*console.log(message);	*/	}		}

