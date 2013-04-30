var imgancho = document.getElementById("contenidoGaleria").getElementsByTagName("img");
for (i = 0; i < imgancho.length; i++) {
    imgancho[i].style.width = anchoVentana * 0.2 - 4 + "px";
}

var contenidos_id = $("body").attr("page_id");

function displayGaleria() {
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT *  FROM galeria WHERE contenidos_id = '+contenidos_id+' ', [], 
										function (tx, results) {
												var i;
												var len = results.rows.length;
												var html_item = '';
												for (i = 0; i < len; i++) {													 
														 html_item = html_item + '<img src="data:image/jpeg;base64,'+results.rows.item(i).imagen+'" x-blackberry-focusable="true" onmouseover="highlightGaleriaItems(this);" onmouseout="unhighlightGaleriaItems(this);" onclick="showInternaFotografia(this);"/>';
												}
												document.getElementById('contenidoGaleria').innerHTML=html_item;
										}
							);
						}
					);
			}
}

if(contenidos_id != ""){
		displayGaleria();
}