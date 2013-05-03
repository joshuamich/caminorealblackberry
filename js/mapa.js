if (blackberry.ui.menu.getMenuItems().length > 0) {
    blackberry.ui.menu.clearMenuItems();
}
var estiloitemMenu = "<span style='font-size: 0.6em; display: block; border-bottom: 1px solid #ffffff; line-height: 1.4em;'>";

var restaurantes = new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Restaurantes</span>", mostrarRestaurantes);
var gasolineras = new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Gasolineras</span>", mostrarGasolineras);
var serviciosdeviaje = new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Servicios de Viaje</span>", mostrarServiciosViajes);
var bares = new blackberry.ui.menu.MenuItem(false, 1, estiloitemMenu + "Bares</span>", mostrarBar);

blackberry.ui.menu.addMenuItem(restaurantes);
blackberry.ui.menu.addMenuItem(gasolineras);
blackberry.ui.menu.addMenuItem(serviciosdeviaje);
blackberry.ui.menu.addMenuItem(bares);

var mapaAltura = document.getElementById("mapa");
mapaAltura.style.height = anchoVentana + "px";
var barIcon = './images/barIcon.png';
var restauranteIcon = './images/restauranteIcon.png';
var gasolinerasIcon = './images/gasolinerasIcon.png';
var serviciosIcon = './images/serviciosViajeIcon.png';
var bar = new Array();
var servicios = new Array();
var gasolineras = new Array();
var restaurantes = new Array();
var mapOptions;
var map;

function initmap(){
	mapOptions = {
		center: new google.maps.LatLng(14.594797, -90.51778),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: false,
		zoomControl: false,
		overviewMapControl: false,
		mapTypeControl: false
	};
	map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
	
	demoData();
	
}


function crearMarcador(lat, long, iconoUrl) {
    var location = new google.maps.LatLng(lat, long);
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: iconoUrl
    });
    if (iconoUrl == barIcon) {
        bar.push(marker);
    }
    if (iconoUrl == restauranteIcon) {
        restaurantes.push(marker);
    }
    if (iconoUrl == gasolinerasIcon) {
        gasolineras.push(marker);
    }
    if (iconoUrl == serviciosIcon) {
        servicios.push(marker);
    }
    return marker;
}

function showBar() {
    if (bar) {
        for (i in bar) {
            bar[i].setMap(map);
        }
    }
}

function hideBar() {
    if (bar) {
        for (i in bar) {
            bar[i].setMap(null);
        }
    }
}

function showRestaurantes() {
    if (restaurantes) {
        for (i in restaurantes) {
            restaurantes[i].setMap(map);
        }
    }
}

function hideRestaurantes() {
    if (restaurantes) {
        for (i in restaurantes) {
            restaurantes[i].setMap(null);
        }
    }
}

function showGasolineras() {
    if (gasolineras) {
        for (i in gasolineras) {
            gasolineras[i].setMap(map);
        }
    }
}

function hideGasolineras() {
    if (gasolineras) {
        for (i in gasolineras) {
            gasolineras[i].setMap(null);
        }
    }
}

function showServicios() {
    if (servicios) {
        for (i in servicios) {
            servicios[i].setMap(map);
        }
    }
}

function hideServicios() {
    if (servicios) {
        for (i in servicios) {
            servicios[i].setMap(null);
        }
    }
}

/********************* Agregando Bares **********************/
function demoData(){
crearMarcador(14.594797, -90.51778, barIcon);
crearMarcador(14.592482, -90.522054, barIcon);
crearMarcador(14.59109, -90.518031, barIcon);

/******************* Agregando Servicios ********************/

crearMarcador(14.594351, -90.519211, serviciosIcon);
crearMarcador(14.59325, -90.522548, serviciosIcon);
crearMarcador(14.59134, -90.520402, serviciosIcon);

/***************** Agregando Gasolineras *******************/

crearMarcador(14.592077, -90.516057, gasolinerasIcon);
crearMarcador(14.592419, -90.513096, gasolinerasIcon);
crearMarcador(14.594558, -90.514061, gasolinerasIcon);

/***************** Agregando Restaurantes *******************/

crearMarcador(14.597008, -90.513514, restauranteIcon);
crearMarcador(14.594922, -90.515778, restauranteIcon);
crearMarcador(14.597424, -90.517967, restauranteIcon);
}
function mostrarRestaurantes() {
    showRestaurantes();
    hideGasolineras();
    hideBar();
    hideServicios();
}

function mostrarBar() {
    hideRestaurantes();
    hideGasolineras();
    hideServicios();
    showBar();
}

function mostrarGasolineras() {
    hideRestaurantes();
    hideBar();
    hideServicios();
    showGasolineras();
}

function mostrarServiciosViajes() {
    hideRestaurantes();
    hideGasolineras();
    hideBar();
    showServicios();
}

	initmap();
	