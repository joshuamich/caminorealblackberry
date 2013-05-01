// JavaScript Document
/************************** Globales *********************************/

var anchoVentana = window.innerWidth;
var hoteles_id;
var contenidos_id;
var galerias_id;
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
function showLoading(){
	document.getElementById("modalCanvas").style.display = 'block';
	document.getElementById("loadingCanvas").style.display = 'block';
}

function hideLoading(){
	document.getElementById("modalCanvas").style.display = 'none';
	document.getElementById("loadingCanvas").style.display = 'none';
}

function init(){
	 showLoading();
	 var myfileurl = "home.html";
     $('body').load(myfileurl, function() {});
}
init();