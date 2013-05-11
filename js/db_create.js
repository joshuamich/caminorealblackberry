	//CREACION DE BASE DE DATOS
	if (typeof mynamespace === 'undefined') {
		mynamespace = {};
	}
	
	var anchoVentana = window.innerWidth;
	var hoteles_id;
	var contenidos_id;
	var galerias_id;
	var return_page;	
	var last_sync_date;			
	var idioma='es';
	var base_url="http://innotechsa.com/caminorealbb_Administrator/";
	var hoteles_url	=base_url + "ws.php?option=hoteles_complete";
	
	try{
		(function () {
				function onDBCreate(database) {
						mynamespace.db 	= 	database;
						database.transaction(
								function (tx) {
									tx.executeSql(
									'CREATE TABLE IF NOT EXISTS hoteles (id int unique, nombre text, nombre_en text,imagen blob,updated DATETIME NOT NULL)',
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
								}
						);
				}
			
				if (window.openDatabase){
						mynamespace.db = window.openDatabase('DB_CaminoRealv2', '', 'DBCaminoRealv2', 20 * 1024 * 1024, onDBCreate);
				}else{
						alert("This device does not have HTML5 Database support");
				}
		}());
	}catch(err){		alert(err.message );		}
	
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
							displayHoteles();
							/*var myfileurl = "home.html";
							$('body').load(myfileurl, function() {});*/
						}
					);
			}
			
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
														 html_item = html_item + '<tr x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="showMenuPrincipal_hotel('+id+');"><td><img src="data:image/jpeg;base64,'+results.rows.item(i).imagen+'" width="100%"/></td><td>'+nombre+'</td></tr>';
												}
												hideLoading();
												document.getElementById('homecontenido').innerHTML=html_item;
										}
							);
						}
					);
			}
		}
		
		function parse_insert_hoteles(xmlstring){
				var parser		 = 	new DOMParser();
				var xmlDocument  = 	parser.parseFromString( xmlstring, "text/xml" );
				var items 	 	 = 	xmlDocument.getElementsByTagName("item");
				var tableContent = "";
				var array_hoteles= new Array();
				//log('HotelesLength = '+items.length+'');
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
				if(items.length==0||xmlstring==""){
					var myfileurl = "home.html";
					$('body').load(myfileurl, function() {});
				}else{
					insertHoteles(array_hoteles);
				}
		}	
		
		function getHoteles(){
				if(blackberry.system.hasDataCoverage()){
						if(!last_sync_date){
								last_sync_date='2000-01-01';
						}
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange	=	function(){
								if (xmlhttp.readyState==4 && xmlhttp.status==200){
										parser_hoteles(xmlhttp.responseText);
								}else if(xmlhttp.readyState==4 && xmlhttp.status!=200 ){
										displayHoteles();
								}
						}
						xmlhttp.open("GET",hoteles_url+"&fecha="+last_sync_date,true);
						xmlhttp.send();
				}else{
					displayHoteles();
				}
				
		}
		
		function parser_hoteles(xmlstring){
				parse_insert_hoteles(xmlstring);
		}
	
		function showLoading(){
			document.getElementById("modalCanvas").style.display = 'block';
			document.getElementById("loadingCanvas").style.display = 'block';
		}
		
		function hideLoading(){
			document.getElementById("modalCanvas").style.display = 'none';
			document.getElementById("loadingCanvas").style.display = 'none';
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
		
		function init_app(){
				try{
						showLoading();
						if (blackberry.system.hasDataCoverage()) {
							getNewData();	
						}else{
							displayHoteles();
						}
				}catch(err){
						log(err.message );
				}
		}
		
		function log(message){	/*alert('CONSOLE.LOG: ' + message);*/	if(typeof console == "object"){		console.log(message);  }		}
		
		//init_app();
		showLoading();