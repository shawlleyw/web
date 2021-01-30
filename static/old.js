function previewImage(fileDom) {
	var reader = new FileReader();
	var file = fileDom.files[0];
	var imageType = /^image\//;
	if (!imageType.test(file.type)) {
		alert("select image");
		return;
	}
	reader.onload = function (element) {
		var img = document.getElementById("preview");
		img.src = element.target.result;
		img.removeAttribute("hidden");
	}
	reader.readAsDataURL(file);
}
function sendImage() {
	document.getElementById('waiting').innerHTML = 'waiting for host...'
	var formData = new FormData();
	formData.append('photo', $('#file')[0].files[0]);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			getInfo();
		}
	}
	xhttp.open("POST","http://cat.wakk.top", true);
	xhttp.send(formData);
}
function getInfo() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("waiting").innerHTML = "";
			writePage(this.responseText);
		}
	}
	xhttp.open("GET","http://cat.wakk.top", true);
	xhttp.send();
}
function writePage(text) {
	document.getElementById('catinfo').innerHTML = text;
}