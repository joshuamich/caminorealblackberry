if (blackberry.ui.menu.getMenuItems().length > 0) {
    blackberry.ui.menu.clearMenuItems();
	
	blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
	   showLoading();
		var myfileurl="menuprincipal.html";	
		$('body').load(myfileurl, function() {
		});
	});
}
var hoteles_id = $("body").attr("rel");
var estiloitemMenu ="";

var rest_titulo="Restaurantes";
var gas_titulo="Gasolineras";
var serviciosdeviaje_titulo="Servicios de Viaje";
var bar_titulo="Bares";

if(idioma='en'){
	rest_titulo="Restaurant";
	gas_titulo="Gas stations";
	serviciosdeviaje_titulo="Services";
	bar_titulo="Bars";	
}


var restaurantes = new blackberry.ui.menu.MenuItem(false, 1, rest_titulo, mostrarRestaurantes);
var gasolineras = new blackberry.ui.menu.MenuItem(false, 1, gas_titulo, mostrarGasolineras);
var serviciosdeviaje = new blackberry.ui.menu.MenuItem(false, 1, serviciosdeviaje_titulo, mostrarServiciosViajes);
var bares = new blackberry.ui.menu.MenuItem(false, 1, bar_titulo, mostrarBar);



blackberry.ui.menu.addMenuItem(restaurantes);
blackberry.ui.menu.addMenuItem(gasolineras);
blackberry.ui.menu.addMenuItem(serviciosdeviaje);
blackberry.ui.menu.addMenuItem(bares);

var mapaAltura = document.getElementById("mapa");
mapaAltura.style.height = anchoVentana + "px";
var barIcon			= './images/barIcon.png';
var restauranteIcon = './images/restauranteIcon.png';
var gasolinerasIcon = './images/gasolinerasIcon.png';
var serviciosIcon 	= './images/serviciosViajeIcon.png';

var bar_Icon 		= new GIcon();
bar_Icon.image 		= './images/barIcon.png';
bar_Icon.iconSize 	= new GSize(18,25);
bar_Icon.iconAnchor = new GPoint(9,12);

var rest_Icon 		= new GIcon();
rest_Icon.image 	= './images/restauranteIcon.png';
rest_Icon.iconSize 	= new GSize(18,25);
rest_Icon.iconAnchor= new GPoint(9,12);

var gas_Icon 		= new GIcon();
gas_Icon.image 		= './images/gasolinerasIcon.png';
gas_Icon.iconSize 	= new GSize(18,25);
gas_Icon.iconAnchor = new GPoint(9,12);

var serv_Icon 		= new GIcon();
serv_Icon.image 	= './images/serviciosViajeIcon.png';
serv_Icon.iconSize	= new GSize(18,25);
serv_Icon.iconAnchor= new GPoint(9,12);


var bar 			= new Array();
var servicios 		= new Array();
var gasolineras 	= new Array();
var restaurantes 	= new Array();
var mapOptions;
var map;

/*function initmap(){
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
	
}*/


function getUbicaciones(){
					try{
							var ultima_fecha_actualizacion='2000-01-01';
							if(mynamespace.db){
								log('reading ubicaciones max date for ' + hoteles_id);
								mynamespace.db.readTransaction(
									function (t) {
										t.executeSql('SELECT COALESCE(MAX(updated),date("2000-01-01")) last_sync FROM ubicaciones WHERE hoteles_id='+hoteles_id, [], 
											function (tx, results) {
													var i;
													var len = results.rows.length;
													var last_date_sync;
													for (i = 0; i < len; i++) {
															 ultima_fecha_actualizacion = results.rows.item(i).last_sync;
													}	
													 getXMLUbicaciones(ultima_fecha_actualizacion);
													
											}
										);
									}
								);
							}
							
							
					}catch(err){
							log(err.message );
					}
					
	}
		
	function getXMLUbicaciones(ufecha){
				if(blackberry.system.hasDataCoverage()){
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange=function(){
							if(xmlhttp.readyState==4 && xmlhttp.status==200){
									parser_Ubicaciones(xmlhttp.responseText);
							}else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
									 hideLoading();
									 initmap();
							}
						}
						
						xmlhttp.open("GET",ubicaciones_url+"&fecha="+ufecha+"&hoteles_id="+hoteles_id,true);
						xmlhttp.send();
				}else{
						hideLoading();
						initmap();
				}
	}	
					
	function parser_Ubicaciones(xmlstring){
			parse_insert_ubicaciones(xmlstring);
			hideLoading();
			initmap();
	}

function initmap(){
	 if(idioma=='en'){
			document.getElementById('titulo_pagina').innerHTML="Maps";
	 }
	 map = new GMap2(document.getElementById("mapa"));
	 map.addControl(new GLargeMapControl());
	 map.addControl(new GMapTypeControl());
	 map.setCenter(new GLatLng(14.594797, -90.51778), 15);
	 demoData();
}

function crearMarcador(lat, long, iconoUrl) {
    var location = new google.maps.LatLng(lat, long);
	var marker;
  	/*var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: iconoUrl
    });*/
    if (iconoUrl == barIcon) {
		marker = new GMarker(location,bar_Icon);
		
        bar.push(marker);
    }
    if (iconoUrl == restauranteIcon) {
		marker = new GMarker(location,rest_Icon);
        restaurantes.push(marker);
    }
    if (iconoUrl == gasolinerasIcon) {
		marker = new GMarker(location,gas_Icon);
        gasolineras.push(marker);
    }
    if (iconoUrl == serviciosIcon) {
		marker = new GMarker(location,serv_Icon);
        servicios.push(marker);
    }
	map.addOverlay(marker);
    return marker;
}

function showBar() {
    if (bar) {
        for (i in bar) {
			if ( bar[i].isHidden()) {
			   bar[i].show();
			 } 
            //bar[i].setMap(map);
			
        }
    }
}

function hideBar() {
    if (bar) {
        for (i in bar) {
			if (! bar[i].isHidden()) {
			   	bar[i].hide();
			}
            //bar[i].setMap(null);
        }
    }
}

function showRestaurantes() {
    if (restaurantes) {
        for (i in restaurantes) {
			if ( restaurantes[i].isHidden()) {
			   restaurantes[i].show();
			 }
            //restaurantes[i].setMap(map);
        }
    }
}

function hideRestaurantes() {
    if (restaurantes) {
        for (i in restaurantes) {
			if (! restaurantes[i].isHidden()) {
			   restaurantes[i].hide();
			}
            //restaurantes[i].setMap(null);
        }
    }
}

function showGasolineras() {
    if (gasolineras) {
        for (i in gasolineras) {
			if ( gasolineras[i].isHidden()) {
			   gasolineras[i].show();
			 } 
            //gasolineras[i].setMap(map);
        }
    }
}

function hideGasolineras() {
    if (gasolineras) {
        for (i in gasolineras) {
			if ( !gasolineras[i].isHidden()) {
			   gasolineras[i].hide();
			}
            //gasolineras[i].setMap(null);
        }
    }
}

function showServicios() {
    if (servicios) {
        for (i in servicios) {
			if ( servicios[i].isHidden()) {
			   servicios[i].show();
			}
            //servicios[i].setMap(map);
        }
    }
}

function hideServicios() {
    if (servicios) {
        for (i in servicios) {
			if ( !servicios[i].isHidden()) {
			  
			   servicios[i].hide();
			}
            //servicios[i].setMap(null);
        }
    }
}

/********************* Agregando Bares **********************/
function demoData(){
	
	if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT *  FROM ubicaciones WHERE hoteles_id='+hoteles_id+' ORDER BY tipo ASC', [], 
							function (tx, results) {
									var i;
									var len = results.rows.length;
									var html_item = '';
									for (i = 0; i < len; i++) {
											var icon_url='';
											var tipo=results.rows.item(i).tipo+'';
											switch (tipo) { 
													case 'Restaurante':    
															icon_url=restauranteIcon;
													break;
													case 'Gasolinera':    
															icon_url=gasolinerasIcon;
													break;
													case 'Bar':    
															icon_url=barIcon;
													break;
													case 'Servicio':    
															icon_url=serviciosIcon;
													break;
													default:
														icon_url=serviciosIcon;
													break;
											}
											crearMarcador(results.rows.item(i).lat_c+'', results.rows.item(i).long_c+'', icon_url);
									}
								
							}
							);
						}
					);
					//hideLoading();
	}
	/*
	crearMarcador(14.594797, -90.51778, barIcon);
	crearMarcador(14.592482, -90.522054, barIcon);
	crearMarcador(14.59109, -90.518031, barIcon);*/
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

	getUbicaciones();
	