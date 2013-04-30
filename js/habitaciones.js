// JavaScript Document
var hoteles_id = $("body").attr("rel");

function displayHabitaciones() {
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT id, nombre  FROM contenidos WHERE hoteles_id='+hoteles_id+' AND tipo = "Habitacion" ORDER BY nombre ASC', [], 
										function (tx, results) {
												var i;
												var len = results.rows.length;
												var html_item = '';
												for (i = 0; i < len; i++) {
														 html_item = html_item + '<li x-blackberry-focusable="true" onmouseover="highlightHabitaciones(this);" onmouseout="unhighlightHabitaciones(this);" onclick="showInternas_Habitacion('+results.rows.item(i).id+');">'+results.rows.item(i).nombre+'</li>';
														 //html_item = html_item + '<tr x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="showMenuPrincipal_hotel('+results.rows.item(i).id+');"><td><img src="data:image/jpeg;base64,'+results.rows.item(i).imagen+'" width="100%"/></td><td>'+results.rows.item(i).nombre+'</td></tr>';
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