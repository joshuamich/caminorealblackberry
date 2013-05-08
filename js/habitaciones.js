// JavaScript Document
var hoteles_id = $("body").attr("rel");

function displayHabitaciones() {
			if(idioma=='en'){
				document.getElementById('titulo_pagina').innerHTML="Rooms";
			}
			return_page="habitaciones.html";
			blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
			   showLoading();
				var myfileurl="menuprincipal.html";	
				$('body').load(myfileurl, function() {
				});
			});
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT id,nombre,nombre_en  FROM contenidos WHERE hoteles_id='+hoteles_id+' AND tipo = "Habitacion" ORDER BY nombre ASC', [], 
										function (tx, results) {
												var i;
												var len = results.rows.length;
												var html_item = '';
												for (i = 0; i < len; i++) {
														 var nombre=results.rows.item(i).nombre;
														 if(idioma=='en'){	nombre=results.rows.item(i).nombre_en;}
														 html_item = html_item + '<li x-blackberry-focusable="true" onmouseover="highlightHabitaciones(this);" onmouseout="unhighlightHabitaciones(this);" onclick="showInternas_Habitacion('+results.rows.item(i).id+');">'+nombre+'</li>';
												}
												document.getElementById('menuinternoslistado').innerHTML=html_item;
										}
							);
						}
					);
			}
}

if(hoteles_id != ""){
	displayHabitaciones();
}