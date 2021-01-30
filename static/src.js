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
	$.ajax({
		type: "post",
		url: "http://cat.wakk.top/run",
		data: formData,
		dataType: 'json',
		processData: false, 
		contentType: false,
		xhrFields: { withCredentials: true },
		async: true,    
		success: function (data) {
			getInfo();
		},
		error: function (data) {
		},
	});
}
function getInfo() {
	$.ajax({
		type: "get",
		url: "http://cat.wakk.top/run",
		dataType: 'json',   
		success: function (result) {
		},
		error: function (result) {
		},
	});
}
function writePage(text) {
	document.getElementById('catinfo').innerHTML = text;
}