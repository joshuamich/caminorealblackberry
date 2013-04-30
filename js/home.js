/************************** Globales *********************************/

var anchoVentana = window.innerWidth;
//blackberry.ui.menu.clearMenuItems();
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

/******************************Action Functions******************************/

function showHome() {
    // file to embed
//    showLoading();
    var myfileurl = "index.html";
    $('body').load(myfileurl, function() {
    });
}



function showMenuPrincipal() {
	//alert('nada');
    // file to embed
//    showLoading();
    /*var myfileurl = "menuprincipal.html";
    $('body').load(myfileurl, function() {
    });*/
}

function showMenuPrincipal_hotel(id) {
	
	$("body").attr('rel', id);
    
    showLoading();
    var myfileurl = "menuprincipal.html";
    $('body').load(myfileurl, function() {
    });
}

function showReservar() {
    // file to embed
//    showLoading();
    var myfileurl = "reservar.html";
    $('body').load(myfileurl, function() {
    });
}

function showHabitaciones() {
    // file to embed
//    showLoading();
    var myfileurl = "habitaciones.html";
    $('body').load(myfileurl, function() {
    });
}

function showServicios() {
    // file to embed
//    showLoading();
    var myfileurl = "servicios.html";
    $('body').load(myfileurl, function() {
    });
}

function showRestaurantes() {
    // file to embed
//    showLoading();
    var myfileurl = "restaurantes.html";
    $('body').load(myfileurl, function() {
    });
}

function showBanquetes() {
    // file to embed
//    showLoading();
    var myfileurl = "internas.html";
    $('body').load(myfileurl, function() {
    });
}

function showPromociones() {
    // file to embed
//    showLoading();
    var myfileurl = "promociones.html";
    $('body').load(myfileurl, function() {
    });
}

function showInternas() {
    // file to embed
//    showLoading();
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
//    showLoading();
	//log(objectImg.src);
    var myfileurl = "InternaFotografia.html";
    $('body').load(myfileurl, function() { 
		 	$('#imagen_galeria').attr("src", objectImg.src);
    });
	
}

function showFacilidades() {
    // file to embed
	//showLoading();
    var myfileurl = "facilidades.html";
    $('body').load(myfileurl, function() {
    });
}

function showMapas() {
    // file to embed
	//showLoading();
    var myfileurl = "mapas.html";
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

function showPromocionesInterna() {
    // file to embed
	//showLoading();
    var myfileurl = "interiorPromociones.html";
    $('body').load(myfileurl, function() {
    });
}

function showLoading(){
	document.getElementById("modalCanvas").style.display = 'block';
	document.getElementById("loadingCanvas").style.display = 'block';
}

function hideLoading(){
	document.getElementById("modalCanvas").style.display = 'none';
	document.getElementById("loadingCanvas").style.display = 'none';
}
/******************************Action Functions******************************/
