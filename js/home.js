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
	}catch(err){
			log(err.message );
	}
	
	if (window.openDatabase){
						mynamespace.db = window.openDatabase('caminoreal', '', 'Camino Real DB', 10 * 1024 * 1024, error_onDB);
	}
	
	function error_onDB(database){
		
	}	
	/*function error_onDB(database){
			function onDBCreate(database) {
						mynamespace.db 	= 	database;
						database.transaction(
								function (tx) {
									tx.executeSql(
									'CREATE TABLE IF NOT EXISTS hoteles (id int unique, nombre text, nombre_en text,imagen text,updated DATETIME NOT NULL)',
									[],
									function (tx, res) {	log("Table Created Successfully");	},
									function (tx, err) {	log("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);	}
									);
									
									tx.executeSql(
									'CREATE TABLE IF NOT EXISTS  contenidos (id int unique, hoteles_id int,nombre text,nombre_en text,descripcion text, descripcion_en text,imagen_destacada text,tipo text, updated DATETIME NOT NULL)',
									[],
									function (tx, res) {	log("Table Created Successfully");	},
									function (tx, err) {	log("ERROR - Table creation failed - code: " + err.code + ", message: " + err.message);	}
									);
									
									tx.executeSql(
									'CREATE TABLE IF NOT EXISTS galeria (id int unique, contenidos_id int,imagen text)',
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
	}*/
		
	function init_home(){
			if (typeof mynamespace === 'undefined') {
					mynamespace = {};
			}
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT *  FROM hoteles', [], 
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
									document.getElementById('homecontenido').innerHTML=html_item;
							}
							);
						}
					);
			}
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
	
	
	init_home();
