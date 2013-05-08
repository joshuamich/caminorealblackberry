if (blackberry.ui.menu.getMenuItems().length > 0) {
    blackberry.ui.menu.clearMenuItems();
}

blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
	   showLoading();
		var myfileurl="menuprincipal.html";	
		$('body').load(myfileurl, function() {
		});
});

if(idioma =='en'){
	document.getElementById('reservarContenido').innerHTML='<h1>Book</h1>'+
           ' <div id="reservarContainer"> '+
                '<h2>Book a Room</h2> '+
                '<form id="formReservar"> '+
                    '<input type="text" class="datepicker" value="Check In" x-blackberry-focusable="true" onmouseover="highlightBotonTitulo(this);" onmouseout="unhighlightBotonTitulo(this);"/> '+
                    '<input type="text" class="datepicker" value="Check Out" x-blackberry-focusable="true" onmouseover="highlightBotonTitulo(this);" onmouseout="unhighlightBotonTitulo(this);"/> '+
                    '<div class="filaReservar"> '+
                    '    <label>Persons</label> '+
                    '    <select name="adultos" x-blackberry-focusable="true" onmouseover="highlightBotonTitulo(this);" onmouseout="unhighlightBotonTitulo(this);"> '+
                    '        <option>1 Adults</option> '+
                    '        <option>2 Adults</option> '+
                    '        <option>3 Adults</option> '+
                    '        <option>4 Adults</option> '+
                    '    </select> '+
                    '</div> '+
                    '<div class="filaReservar"> '+
                    '    <select name="kids" x-blackberry-focusable="true" onmouseover="highlightBotonTitulo(this);" onmouseout="unhighlightBotonTitulo(this);"> '+
                    '        <option>1 Kids</option>'+
                    '        <option>2 Kids</option>'+
                    '        <option>3 Kids</option>'+
                    '        <option>4 Kids</option>'+
                    '    </select>'+
                    '</div>'+
                    '<div class="filaReservar">'+
                    '    <label>Rooms</label>'+
                    '    <select name="adultos" x-blackberry-focusable="true" onmouseover="highlightBotonTitulo(this);" onmouseout="unhighlightBotonTitulo(this);">'+
                    '        <option>1</option>'+
                    '        <option>2</option>'+
                    '        <option>3</option>'+
                    '        <option>4</option>'+
                    '    </select>'+
                    '</div>'+
                    '<div class="filaReservar">'+
                    '    <label>Best Rate Guarantee</label>'+
					'</div>'+
                    '<input type="submit" value="Send" x-blackberry-focusable="true" onmouseover="highlightBotonTitulo(this);" onmouseout="unhighlightBotonTitulo(this);"/>'+
                '</form>'+
            '</div>';
	
}