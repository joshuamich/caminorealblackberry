
	var hoteles_id = $("body").attr("rel");
	var idioma 	   = document.documentElement.lang;

	function displayPromociones() {
		
				if(idioma=='en'){
					document.getElementById('titulo_pagina').innerHTML="Promotions";
				}
				
				
				$("body").attr("return_page","promociones.html");
				blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
						showLoading();
						var myfileurl="menuprincipal.html";	
						$('body').load(myfileurl, function() {
						});
				});
				
				
				if(mynamespace.db){
						mynamespace.db.readTransaction(
							function (t) {
								t.executeSql('SELECT id, nombre,nombre_en  FROM contenidos WHERE hoteles_id = '+hoteles_id+' AND tipo = "Promocion" ORDER BY nombre ASC', [], 
											function (tx, results) {
													var i;
													var len = results.rows.length;
													var html_item = '';
													for (i = 0; i < len; i++) {
															 var nombre=results.rows.item(i).nombre;
															 if(idioma=='en'){
																	nombre=results.rows.item(i).nombre_en; 
															  }
															 html_item = html_item + '<li x-blackberry-focusable="true" onmouseover="highlightHabitaciones(this);" onmouseout="unhighlightHabitaciones(this);" onclick="showInternas_Habitacion('+results.rows.item(i).id+');">'+nombre+'</li>';
													}
													document.getElementById('menuinternoslistado').innerHTML=html_item;
											}
								);
							}
						);
				}
	}
	
	function showInternas_Habitacion(contenidos_id) {
	    showLoading();
		$("body").attr("page_id", contenidos_id);
		var myfileurl = "internas.html";
		$('body').load(myfileurl, function() {});
	}
	
	function highlightHabitaciones(e) {
		e.style.backgroundColor = "#d9dada";
	}
	
	function unhighlightHabitaciones(e) {
		e.style.backgroundColor = "#e8e8e8";
	}
	
	function showLoading(){
		document.getElementById("modalCanvas").style.display   = 'block';
		document.getElementById("loadingCanvas").style.display = 'block';
	}
	
	function hideLoading(){
		document.getElementById("modalCanvas").style.display   = 'none';
		document.getElementById("loadingCanvas").style.display = 'none';
	}
		
	function showHome(){
		var myfileurl="home.html";
		$('body').load(myfileurl, function() {});
	}
	
	
	
	if(hoteles_id != ""){
		displayPromociones();
	}else{
		var myfileurl="menuprincipal.html";	
		$('body').load(myfileurl, function() {});
	}