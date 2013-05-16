	
	var imagenDestacada = document.getElementById("destacada");
	imagenDestacada.style.width = anchoVentana * 0.86 - 6 + "px"
	var contenidos_id = $("body").attr("page_id");
	var idioma 	      = document.documentElement.lang;




	function displayContenido() {
		
		var altoimg = document.getElementById('contactoButton').height;
		altoimg+=4;
		document.getElementById('contactoButton').style="right:"+altoimg+"px";
		//back button		
		blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
				showLoading();
				var myfileurl="menuprincipal.html";	
				if(return_page){	
						myfileurl=return_page;
				}
				$('body').load(myfileurl, function() {});
		});
			
		//display content
		if(mynamespace.db){
				mynamespace.db.readTransaction(
					function (t) {
						t.executeSql('SELECT *  FROM contenidos WHERE id ='+contenidos_id+' LIMIT 1', [], 
									function (tx, results) {
											var i;
											var len = results.rows.length;
											var html_item = '';
											for (i = 0; i < len; i++) {
													 var nombre=results.rows.item(i).nombre;
															if(idioma=='en'){nombre=results.rows.item(i).nombre_en;}
													 var descripcion=results.rows.item(i).descripcion;
															if(idioma=='en'){descripcion=results.rows.item(i).descripcion_en;}
													 var tipo= results.rows.item(i).tipo;
													 var tipo_nombre=tipo;
													if(idioma=='en'){
														 switch(tipo)
															{
															  case 'Habitacion':
																	tipo_nombre="Room";
															  break;
															  case 'Servicio':
																	tipo_nombre="Service";
															  break;
															  case 'Restaurante':
																	tipo_nombre="Restaurant";
															  break;
															  case 'Promocion':
																	tipo_nombre="Promotion";
															  break;
															 case 'Banquete':
																	tipo_nombre="Banquet";
															  break;
															  case 'Facilidad':
																	tipo_nombre="Facility";
															  break;
															default:
																	tipo_nombre="";
															 break;
															}
													}
														
													 document.getElementById('texto_titulo').innerHTML=nombre;
													 document.getElementById('descripcion_interna').innerHTML=descripcion;		
													 document.getElementById('destacada').src="data:image/jpeg;base64,"+results.rows.item(i).imagen_destacada;
													 document.getElementById('titulo_tipo').innerHTML=tipo_nombre;
											}
											
									}
						);
					}
				);
		}
	}



	function showHome(){
		var myfileurl="home.html";
		$('body').load(myfileurl, function() {});
	}
	
	function showContacto() {
		showLoading();
		var myfileurl = "contacto.html";
		$('body').load(myfileurl, function() {});
	}
	
	function showGaleria() {
	    showLoading();
		var myfileurl = "galeria.html";
		$('body').load(myfileurl, function() {});
	}
	
	function highlightBotonTitulo(e) {
		e.style.border = "2px solid #174e85";
	}
	
	function unhighlightBotonTitulo(e) {
		e.style.border = "2px solid #ffffff";
	}

	function showLoading(){
		document.getElementById("modalCanvas").style.display   = 'block';
		document.getElementById("loadingCanvas").style.display = 'block';
	}
	
	function hideLoading(){
		document.getElementById("modalCanvas").style.display   = 'none';
		document.getElementById("loadingCanvas").style.display = 'none';
	}



	


	if(contenidos_id != ""){
			displayContenido();
	}else{
		showHome();	
	}