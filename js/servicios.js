// JavaScript Document
var hoteles_id = $("body").attr("rel");

function displayServicios() {
			return_page="servicios.html";
			blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
			   showLoading();
				var myfileurl="menuprincipal.html";	
				$('body').load(myfileurl, function() {
				});
			});
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT id, nombre  FROM contenidos WHERE hoteles_id = '+hoteles_id+' AND tipo = "Servicio" ORDER BY nombre ASC', [], 
										function (tx, results) {
												var i;
												var len = results.rows.length;
												var html_item = '';
												for (i = 0; i < len; i++) {
														 html_item = html_item + '<li x-blackberry-focusable="true" onmouseover="highlightHabitaciones(this);" onmouseout="unhighlightHabitaciones(this);" onclick="showInternas_Habitacion('+results.rows.item(i).id+');">'+results.rows.item(i).nombre+'</li>';
												}
												document.getElementById('menuinternoslistado').innerHTML=html_item;
										}
							);
						}
					);
			}
}

if(hoteles_id != ""){
	displayServicios();
}