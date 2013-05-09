// JavaScript Document
/************************** Globales *********************************/

	var anchoVentana = window.innerWidth;
	var hoteles_id;
	var contenidos_id;
	var galerias_id;
	var return_page;
	var idioma='es';
/****************************Navigation Functions****************************/

	function highlight(e) {
		e.style.backgroundColor = "#0a3a82";
	}
	
	function unhighlight(e) {
		e.style.backgroundColor = "#0c2963";
	}
	
	function highlightHabitaciones(e) {
		e.style.backgroundColor = "#d9dada";
	}
	
	function unhighlightHabitaciones(e) {
		e.style.backgroundColor = "#e8e8e8";
	}
	
	function highlightBotonTitulo(e) {
		e.style.border = "2px solid #174e85";
	}
	
	function unhighlightBotonTitulo(e) {
		e.style.border = "2px solid #ffffff";
	}
	
	function highlightGaleriaItems(e) {
		e.style.border = "2px solid #174e85";
	}
	
	function unhighlightGaleriaItems(e) {
		e.style.border = "2px solid transparent";
	}

/****************************NAVIGATION***********************************/
	
	
	function showInternas_Habitacion(contenidos_id) {
		
	    showLoading();
		$("body").attr("page_id", contenidos_id);
		var myfileurl = "internas.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showContacto() {
		showLoading();
		var myfileurl = "contacto.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showInternaFotografia(objectImg) {
		showLoading();
		var myfileurl = "InternaFotografia.html";
		$('body').load(myfileurl, function() { 
				$('#imagen_galeria').attr("src", objectImg.src);
		});
		
	}
	
	function showGaleria() {
	    showLoading();
		var myfileurl = "galeria.html";
		$('body').load(myfileurl, function() {
		});
	}
	
	function showPromocionesInterna() {
		// file to embed
		//showLoading();
		var myfileurl = "interiorPromociones.html";
		$('body').load(myfileurl, function() {
		});
	}

	
	function init(){
			 showLoading();
			 var myfileurl = "home.html";
			 $('body').load(myfileurl, function() {});
	}
		
	function cambiar_idioma(nuevo_idioma){
		idioma=nuevo_idioma;
		showLoading();
		var myfileurl = "home.html";
		$('body').load(myfileurl, function() {});	
	}
	init();
	