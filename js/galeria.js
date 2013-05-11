	
	
	var contenidos_id = $("body").attr("page_id");
	return_page=return_page+'';


	function getGalerias(){
					try{
							var ultima_fecha_actualizacion='2000-01-01';
							if(mynamespace.db){
								log('reading galeria max date for ' + hoteles_id_s);
								mynamespace.db.readTransaction(
									function (t) {
										t.executeSql('SELECT COALESCE(MAX(updated),date("2000-01-01")) last_sync FROM galeria WHERE contenidos_id='+contenidos_id, [], 
											function (tx, results) {
													var i;
													var len = results.rows.length;
													var last_date_sync;
													for (i = 0; i < len; i++) {
															 ultima_fecha_actualizacion = results.rows.item(i).last_sync;
													}	
													 getXMLGalerias(ultima_fecha_actualizacion);
													
											}
										);
									}
								);
							}
							
							
					}catch(err){
							log(err.message );
					}
					
	}
		
	function getXMLGalerias(ufecha){
				if(blackberry.system.hasDataCoverage()){
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange=function(){
							if(xmlhttp.readyState==4 && xmlhttp.status==200){
									parser_Galerias(xmlhttp.responseText);
							}else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
									 hideLoading();
									displayGaleria();
							}
						}
						
						xmlhttp.open("GET",galerias_url+"&fecha="+ufecha+"&contenidos_id="+contenidos_id,true);
						xmlhttp.send();
				}else{
						hideLoading();
						displayGaleria();
				}
	}	
					
	function parser_Galerias(xmlstring){	
			parse_insert_galerias(xmlstring);
			hideLoading();
			displayGaleria();
	}

	function displayGaleria() {
				$('#contenido_general').css('display', 'table');
				if(idioma=='en'){
					document.getElementById('titulo_pagina').innerHTML="Gallery";
				}
				blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
				    showLoading();
					var myfileurl="internaHabitaciones.html";	
					$('body').load(myfileurl, function() {
					});
				});
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
				var imgancho = document.getElementById("contenidoGaleria").getElementsByTagName("img");
				for (i = 0; i < imgancho.length; i++) {
					imgancho[i].style.width = anchoVentana * 0.2 - 4 + "px";
				}
	}
	
	if(contenidos_id != ""){
			getGalerias();
	}