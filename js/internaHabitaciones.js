var imagenDestacada = document.getElementById("destacada");
imagenDestacada.style.width = anchoVentana * 0.86 - 6 + "px";


var contenidos_id = $("body").attr("page_id");
function displayContenido() {
			
			blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
			    showLoading();
				var myfileurl="menuprincipal.html";	
				if(return_page){myfileurl=return_page;}
				$('body').load(myfileurl, function() {
				});
			});
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



if(contenidos_id != ""){
		displayContenido();
}