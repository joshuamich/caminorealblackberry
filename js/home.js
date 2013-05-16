	if (typeof mynamespace === 'undefined') {
		mynamespace = {};
	}
	
	var anchoVentana = window.innerWidth;
	var idioma		 =  document.documentElement.lang;
	var base_url	 = "http://innotechsa.com/caminorealbb_Administrator/";
	var hoteles_url	 = base_url + "ws.php?option=hoteles_complete";
	var hoteles_id;
	var contenidos_id;
	var galerias_id;
	var return_page;	
	var last_sync_date;
	
	try{
			if (window.openDatabase){
					mynamespace.db = window.openDatabase('DB_CaminoRealv3', '', 'DBCaminoRealv3', 10 * 1024 * 1024, onErrorDB);
			}else{
					log("This device does not have HTML5 Database support");
			}
			
	}catch(err){		
			log(err.message );		
	}
	
	   function onErrorDB(database){
			location.href="index.html";
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
										}
							);
						}
					);
			}
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
					blackberry.ui.menu.clearMenuItems();
					var idioma_espanol = new blackberry.ui.menu.MenuItem(false, 1, "Español", idiomaespanol);
					var idioma_ingles = new blackberry.ui.menu.MenuItem(false, 1, "English", idiomaingles);
					blackberry.ui.menu.addMenuItem(idioma_espanol);
					blackberry.ui.menu.addMenuItem(idioma_ingles);
					blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() { 
					});
					document.body.style.minHeight = window.innerHeight + "px";
					showLoading();
					displayHoteles();	
			}catch(err){
					log(err.message );
			}
		}
		
		function log(message){	/*alert('CONSOLE.LOG: ' + message);	if(typeof console == "object"){		console.log(message);  }*/		}
		
		init_app();