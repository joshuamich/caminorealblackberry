var imagenDestacada = document.getElementById("destacada");
imagenDestacada.style.width = anchoVentana * 0.86 - 6 + "px";

var contenidos_id = $("body").attr("page_id");

function displayContenido() {
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT *  FROM contenidos WHERE id ='+contenidos_id+' LIMIT 1', [], 
										function (tx, results) {
												var i;
												var len = results.rows.length;
												var html_item = '';
												for (i = 0; i < len; i++) {
														 document.getElementById('texto_titulo').innerHTML=results.rows.item(i).nombre;	
														 document.getElementById('descripcion_interna').innerHTML=results.rows.item(i).descripcion;		
														 document.getElementById('destacada').src="data:image/jpeg;base64,"+results.rows.item(i).imagen_destacada;															 
														// html_item = html_item + '<tr x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="showMenuPrincipal_hotel('+results.rows.item(i).id+');"><td><img src="data:image/jpeg;base64,'+results.rows.item(i).imagen+'" width="100%"/></td><td>'+results.rows.item(i).nombre+'</td></tr>';
												}
												//document.getElementById('homecontenido').innerHTML=html_item;
										}
							);
						}
					);
			}
}

if(contenidos_id != ""){
		displayContenido();
}