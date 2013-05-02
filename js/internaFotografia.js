	var contenidos_id = $("body").attr("page_id");
			
	function initInternaFotografia(){
		blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,function() {   
			showLoading();
			var myfileurl="galeria.html";
			$('body').load(myfileurl, function() {
			});
		});
	}
	
	if(contenidos_id != ""){
		initInternaFotografia();
	}