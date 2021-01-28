function previewImage(fileDom){
	var reader = new FileReader();
	var file = fileDom.files[0];
	var imageType = /^image\//;
	if(!imageType.test(file.type)) {
		alert("select image");
		return;
	}
	reader.onload = function(element) {
		var img = document.getElementById("preview");
		img.src = element.target.result;
		img.removeAttribute("hidden");
		document.getElementById('waiting').innerHTML='';
	}
	reader.readAsDataURL(file);
}
function sendImage(){
	document.getElementById('waiting').innerHTML = 'waiting for host...'
	var formData = new FormData(); 
	formData.append('file', $('#file')[0].files[0]);  
	formData.append('sizeid',123);  
	var send_xhttp = new XMLHttpRequest();
	send_xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			getInfo();
		}
	}
	send_xhttp.open("POST", "cat.wakk.top/run", true);
	send_xhttp.send(formData);
}
function getInfo(){
	var receive_xhttp = new XMLHttpRequest();
	receive_xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			writePage($.parseJSON(receive_xhttp.responseText))
		}
	}
	receive_xhttp.open("GET", "http://cat.wakk.top/run/", true)
	receive_xhttp.send()
}
function writePage(text) {
	document.getElementById('catinfo').innerHTML = text;
}