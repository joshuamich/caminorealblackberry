function initMenuPrincipal(){
	if (blackberry.ui.menu.getMenuItems().length > 0) {
		blackberry.ui.menu.clearMenuItems();
	}
	
	blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
	   showLoading();
		var myfileurl="home.html";	
		$('body').load(myfileurl, function() {
		});
	});	
	
	if(idioma=='en'){
			document.getElementById('button_reservar').innerHTML="Book";
			document.getElementById('button_habitaciones').innerHTML="Rooms";
			document.getElementById('button_servicios').innerHTML="Services";
			document.getElementById('button_restaurantes').innerHTML="Restaurants";
			document.getElementById('button_banquetes').innerHTML="Banquet";
			document.getElementById('button_promociones').innerHTML="Promotions";
			document.getElementById('button_facilidades').innerHTML="Facilities";
			document.getElementById('button_mapa').innerHTML="Maps";
			document.getElementById('button_contacto').innerHTML="Contact";
			
	}
	
	
}	


function showReservar() {
    showLoading();
    var myfileurl = "reservar.html";
    $('body').load(myfileurl, function() {
    });
}

function showHabitaciones() {
   showLoading();
    var myfileurl = "habitaciones.html";
    $('body').load(myfileurl, function() {
    });
}

function showServicios() {
	showLoading();
    var myfileurl = "servicios.html";
    $('body').load(myfileurl, function() {
    });
}

function showRestaurantes() {
    showLoading();
    var myfileurl = "restaurantes.html";
    $('body').load(myfileurl, function() {
    });
}

function showBanquetes() {
   showLoading();
    var myfileurl = "banquetes.html";
    $('body').load(myfileurl, function() {
    });
}

function showPromociones() {
    showLoading();
    var myfileurl = "promociones.html";
    $('body').load(myfileurl, function() {
    });
}

function showFacilidades() {
   	showLoading();
    var myfileurl = "facilidades.html";
    $('body').load(myfileurl, function() {
    });
}

function showMapas() {
    showLoading();
    var myfileurl = "mapas.html";
    $('body').load(myfileurl, function() {
    });
}


initMenuPrincipal();