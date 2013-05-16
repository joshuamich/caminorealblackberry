	
	var contenidos_id = $("body").attr("page_id");
	var idioma 	      = document.documentElement.lang;
			
	function initInternaFotografia(){
			if(idioma=='en'){
				document.getElementById('titulo_pagina').innerHTML='Image';
			}
			
			blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
					showLoading();
					var myfileurl="galeria.html";
					$('body').load(myfileurl, function() {});
			});
	}
	
	if(contenidos_id != ""){
		initInternaFotografia();
	}