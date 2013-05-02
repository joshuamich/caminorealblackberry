	if (typeof mynamespace === 'undefined') {
			mynamespace = {};
	}
	
	if (window.openDatabase){
						mynamespace.db = window.openDatabase('caminoreal', '', 'Camino Real DB', 10 * 1024 * 1024, error_onDB);
	}
	
	function error_onDB(){
			alert('error on DB please restart application');	
	}
		
	function init_home(){
			if(mynamespace.db){
					mynamespace.db.readTransaction(
						function (t) {
							t.executeSql('SELECT *  FROM hoteles', [], 
							function (tx, results) {
									var i;
									var len = results.rows.length;
									var html_item = '';
									for (i = 0; i < len; i++) {
											 html_item = html_item + '<tr x-blackberry-focusable="true" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="showMenuPrincipal_hotel('+results.rows.item(i).id+');"><td><img src="data:image/jpeg;base64,'+results.rows.item(i).imagen+'" width="100%"/></td><td>'+results.rows.item(i).nombre+'</td></tr>';
									}
									document.getElementById('homecontenido').innerHTML=html_item;
							}
							);
						}
					);
			}
	}
	
	function showMenuPrincipal_hotel(id) {
		$("body").attr('rel', id);
		showLoading();
		var myfileurl = "menuprincipal.html";
		$('body').load(myfileurl, function() {});
	}
	
	
	init_home();
