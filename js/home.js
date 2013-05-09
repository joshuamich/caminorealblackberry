	try{
			if (blackberry.ui.menu.getMenuItems().length > 0) {
					blackberry.ui.menu.clearMenuItems();
				}
				var estiloitemMenu	= 	"";
				var get_data 		= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Insert Hoteles", getHoteles);
				var get_cdata 		= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Insert Contenidos", getContenidos);
				var get_gdata 		= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Insert Galeria", getGalerias);
				var get_udata 		= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Insert Ubicaciones", getUbicaciones);
				var display_data 	= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Display Hoteles", displayHoteles);
				var counth_data 	= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Count Hoteles Data", countHoteles);
				var countc_data 	= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Count contenidos Data", countContenidos);
				var countg_data 	= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Count galerias Data", countGalerias);
				var countu_data 	= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Count ubicaciones Data", countUbicaciones);
				var delete_data 	= 	new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Borrar Data all", deleteHoteles);
				blackberry.ui.menu.addMenuItem(get_data);
				blackberry.ui.menu.addMenuItem(get_cdata);
				blackberry.ui.menu.addMenuItem(get_gdata);
				blackberry.ui.menu.addMenuItem(get_udata);
				blackberry.ui.menu.addMenuItem(display_data);
				blackberry.ui.menu.addMenuItem(counth_data);
				blackberry.ui.menu.addMenuItem(countc_data);
				blackberry.ui.menu.addMenuItem(countg_data);
				blackberry.ui.menu.addMenuItem(countu_data);
				blackberry.ui.menu.addMenuItem(delete_data);
		
		/*	if (blackberry.ui.menu.getMenuItems().length > 0) {
			blackberry.ui.menu.clearMenuItems();
		}
	
	
	var idioma_espanol = new blackberry.ui.menu.MenuItem(false, 1, "Español", idiomaespanol);
		var idioma_ingles = new blackberry.ui.menu.MenuItem(false, 1, "English", idiomaingles);
		blackberry.ui.menu.addMenuItem(idioma_espanol);
		blackberry.ui.menu.addMenuItem(idioma_ingles);
		blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() { 
		});*/
	
	
	
	if (window.openDatabase){
			alert('opening database from home.js');
			mynamespace.db = window.openDatabase('cm8', '', 'Camino 8 DB8', 10 * 1024 * 1024, error_onDB);
			
			/*if(mynamespace.db.version!='1.2'){
					try {
						mynamespace.db.changeVersion(mynamespace.db.version, "1.2", cv_1_0_1_2, oops_1_0_1_2, success_1_0_1_2);
					} catch(e) {
						alert('changeversion 1.0 -> 2.0 failed');
						alert('DB Version: '+mynamespace.db.version);
					}
			}*/
	}else{
			alert("This device does not have HTML5 Database support");
	}
	
	}catch(err){
			alert(err.message +' code: '+ err.code);
	}
	
	function error_onDB(database){
		alert('error opening from home.js');
	}
	
	/*function error_onDB(database){
			/*function onDBCreate(database) {
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
	
	
	//init_home();
