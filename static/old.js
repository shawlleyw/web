var selected = 0;
function previewImage(fileDom) {
	var reader = new FileReader();
	var file = fileDom.files[0];
	var imageType = /^image\//;
	if (!imageType.test(file.type)) {
		alert("Please select image");
		return;
	}
	reader.onload = function (element) {
		var img = document.getElementById("preview");
		img.src = element.target.result;
		img.removeAttribute("hidden");
	}
	reader.readAsDataURL(file);
	selected = 1;
}
function sendImage() {
	if(selected != 1){
		alert("Please select image");
		return;
	}
	selected = 0;
	document.getElementById('waiting').innerHTML = 'Waiting for host...'
	var formData = new FormData();
	formData.append('photo', $('#file')[0].files[0]);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			getInfo();
		}
	}
	xhttp.open("POST","http://cat.wakk.top/run", true);
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
	xhttp.open("GET","http://cat.wakk.top/run", true);
	xhttp.send();
}
function writePage(text) {
	var value = eval('(' + text + ')');
	var name = value.CatType;
	var link = value.Link;
	document.getElementById('catname').innerHTML = name;
	document.getElementById('catname').setAttribute('href', link);
}
