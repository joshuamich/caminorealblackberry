	function init_home(){
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT *  FROM hoteles', [], 
							function (tx, results) {
									var i;
									var len = results.rows.length;
									var html_item = '';
									for (i = 0; i < len; i++) {
											 html_item = html_item + '<tr x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="showMenuPrincipal_hotel('+results.rows.item(i).id+');"><td><img src="data:image/jpeg;base64,'+results.rows.item(i).imagen+'" width="100%"/></td><td>'+results.rows.item(i).nombre+'</td></tr>';
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
	
	function showInternas() {
		// file to embed
		//showLoading();
		var myfileurl = "internas.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showInternas_Habitacion(contenidos_id) {
		
	   // showLoading();
		$("body").attr("page_id", contenidos_id);
		var myfileurl = "internas.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	
	function showGaleria() {
		// file to embed
	//    showLoading();
		var myfileurl = "galeria.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showContacto() {
		// file to embed
		//showLoading();
		var myfileurl = "contacto.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showInternaFotografia(objectImg) {
		// file to embed
		//showLoading();
		//log(objectImg.src);
		var myfileurl = "InternaFotografia.html";
		$('body').load(myfileurl, function() { 
				$('#imagen_galeria').attr("src", objectImg.src);
		});
		
	}
	
	function showPromocionesInterna() {
		// file to embed
		//showLoading();
		var myfileurl = "interiorPromociones.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	init_home();
