	
	var idioma 	      = document.documentElement.lang;
	var contenidos_id = $("body").attr("page_id");
	var base_url	  =	"http://innotechsa.com/caminorealbb_Administrator/";
	var galerias_url  =	base_url + "ws.php?option=galerias";

	
		
	function getGalerias(){
					try{
							showLoading();
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
	
	function parse_insert_galerias(xmlstring){
					var parser		  = 	new DOMParser();
					var xmlDocument   = 	parser.parseFromString( xmlstring, "text/xml" );
					var items 	 	  = 	xmlDocument.getElementsByTagName("item");
					var tableContent  = "";
					var array_galerias= new Array();
				
					for (var i = 0; i < items.length; i++) {   
						var galerias_id			= items[i].getElementsByTagName("id");
						var contenidos_id		= items[i].getElementsByTagName("contenidos_id");
						var galerias_imagen		= items[i].getElementsByTagName("imagen");
						var galerias_updated	= items[i].getElementsByTagName("updated");
						var fail				= false;
						
						if(galerias_id.length>0){
							if(galerias_id[0].firstChild!=null){
									var item_contenido = new Array();
									item_contenido[0]  = galerias_id[0].firstChild.nodeValue;
									
									if(contenidos_id.length	 >0){		if(contenidos_id[0].firstChild	!=null){			item_contenido[1] = contenidos_id[0].firstChild.nodeValue;			}else{ item_contenido[1] = "";	fail=true;	}	}else{	item_contenido[1] = ""; fail=true; }
									if(galerias_imagen.length>0){		if(galerias_imagen[0].firstChild!=null){			item_contenido[2] = galerias_imagen[0].firstChild.nodeValue;		}else{ item_contenido[2] = "";  fail=true;	}	}else{	item_contenido[2] = ""; fail=true; }
									if(galerias_updated.length>0){		if(galerias_updated[0].firstChild!=null){			item_contenido[3] = galerias_updated[0].firstChild.nodeValue;		}else{ item_contenido[3] = "";  fail=true;	}	}else{	item_contenido[3] = ""; fail=true; }
									
									if(!fail && item_contenido.length == 4){
											array_galerias[array_galerias.length] = item_contenido;
									}
							}
						}
					}
					insertGalerias(array_galerias);
	}
	
	function insertGalerias(array_galerias) {
			if(mynamespace.db){
					mynamespace.db.transaction(
						function (t) {
							var i;
							for (i = 0; i < array_galerias.length; i++){
								var item_obj 		=	array_galerias[i];
								var insert_query	=	'INSERT INTO galeria (id,contenidos_id,imagen,updated) VALUES ('+item_obj[0]+', "'+item_obj[1]+'","'+item_obj[2]+'","'+item_obj[3]+'")';
								var delete_query 	=	'DELETE FROM galeria WHERE id=' + item_obj[0] + ' ';
								t.executeSql(delete_query);
								t.executeSql(insert_query,
											[],
											function (tx, res) {	log("row Created Successfully");	},
											function (tx, err) {	log("ERROR - row creation failed - code: " + err.code + ", message: " + err.message);	}
											);
							}
							displayGaleria();
						}
					);
					
			}
			
		}
			
	function displayGaleria() {
			hideLoading();
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
												var imgancho = document.getElementById("contenidoGaleria").getElementsByTagName("img");
												for (i = 0; i < imgancho.length; i++) {
													imgancho[i].style.width = anchoVentana * 0.2 - 4 + "px";
												}
										}
							);
						}
					);
			}
			
			
			
	}
	
	function showInternaFotografia(objectImg) {
		showLoading();
		var myfileurl = "InternaFotografia.html";
		$('body').load(myfileurl, function() { 
				$('#imagen_galeria').attr("src", objectImg.src);
		});
		
	}
	
	
	
	
	function highlightGaleriaItems(e) {
		e.style.border = "2px solid #174e85";
	}
	
	function unhighlightGaleriaItems(e) {
		e.style.border = "2px solid transparent";
	}
	
	function showLoading(){
		document.getElementById("modalCanvas").style.display = 'block';
		document.getElementById("loadingCanvas").style.display = 'block';
	}
	
	function hideLoading(){
		document.getElementById("modalCanvas").style.display = 'none';
		document.getElementById("loadingCanvas").style.display = 'none';
	}
	
	function log(message){	/*alert('CONSOLE.LOG: ' + message);*/	if(typeof console == "object"){		console.log(message);  }		}
	
	
	blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
				showLoading();
				var myfileurl="internas.html";	
				if(return_page){	
						myfileurl=return_page;
				}
				$('body').load(myfileurl, function() {});
	});
	
	
	if(contenidos_id != ""){
			getGalerias();
	}