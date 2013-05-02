function initMenuPrincipal(){
	blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
	   showLoading();
		var myfileurl="home.html";	
		$('body').load(myfileurl, function() {
		});
	});	
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