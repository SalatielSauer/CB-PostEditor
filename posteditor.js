function propmenus(state) {
	propmenu = document.getElementsByClassName("propmenu")[0];
	if (state == 1){propmenu.showModal(); textoptdialog.close()} else {propmenu.close()};
	
	propTitle = document.getElementsByClassName("propTitle")[0];
	propContent = document.getElementsByClassName("propContent")[0];
};

function gettextarea() {
	txtarea = document.getElementsByClassName("editorarea")[0];
	return txtarea.value
};

function getcursorpos(t) {
	txtarea = document.getElementsByClassName("editorarea")[0];
	if (t == 0){return txtarea.selectionStart} else {return txtarea.selectionEnd};
};

function getselectedarea() {
	return document.getElementsByClassName("editorarea")[0].value.slice(getcursorpos(0), getcursorpos());
};

function setSelection(ctrl, start, end){
	ctrl.focus();
	ctrl.setSelectionRange(start, end);
};

function setCaretPosition(ctrl, pos) {
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  }
};

function removeselected() {
	oldcaretstart = getcursorpos(0);
	txtarea = document.getElementsByClassName("editorarea")[0];
	txtarea.value = txtarea.value.substr(0, getcursorpos(0)) + txtarea.value.substr(getcursorpos());
	setCaretPosition(txtarea, oldcaretstart);
};

function addelement(elementto, index) {
	oldcaretend = getcursorpos();
    document.getElementsByClassName("editorarea")[0].value = gettextarea().substr(0, index) + '' + elementto + gettextarea().substr(index);
	setCaretPosition(txtarea, oldcaretend);
};


function getyoutubepic(){
	url = document.getElementsByClassName("propTextarea")[0].value;
	purl = url.replace("https://www.youtube.com/watch?v=", "");
	vthumb = 'https://img.youtube.com/vi/' + purl + '/0.jpg';
	urlembed = 'https://www.youtube.com/embed/' + purl;

	if (purl){
		document.getElementsByClassName("videothumb")[0].src = vthumb;
		document.getElementsByClassName("videothumb")[0].style = 'display: unset';
	};
};

function addvideo(state) {
	if (typeof vthumb === undefined){vthumb = ""};
	propmenus(1);
	propTitle.innerHTML = '<p><i class="fas fa-video"></i> Adicionando Vídeo do YouTube</p>';
	propContentl2 = '<center><img class="videothumb" style="display: none;"/></center>';
	propContent.innerHTML = '<div class="propLinha"> <p>URL: </p> <textarea onmouseout="getyoutubepic()" spellcheck="false" class="propTextarea"></textarea> <button onclick="addvideo(1)">Adicionar</button></div>' + propContentl2;

	if (state == 1){
		addelement('<iframe class="Pvideo" src="' + urlembed + '" frameborder="0" allowfullscreen></iframe>', getcursorpos());
		propmenus(0);
	}
};

function addparagrafo(t) {
	if (t == 1){
		var seltext = getselectedarea();
		removeselected();
		addelement('<p class="Ptexto">' + seltext + '</p>', getcursorpos());
		textoptdialog.close();
	} else {
		addelement('<p class="Ptexto">Insira o Páragrafo aqui</p>', getcursorpos());
	};
}

function addtitulo(t) {
	if (t == 1){
		var seltext = getselectedarea();
		removeselected();
		addelement('<h3 class="Ptitulo">' + seltext + '</h3>', getcursorpos());
		textoptdialog.close();
	} else {
		addelement('<h3 class="Ptitulo">Insira o Titulo aqui</h3>', getcursorpos());
	};
}

function getimage(){
	imglink = document.getElementById("imagemurl");
	document.getElementsByClassName("imagethumb")[0].src = imglink.value;
};

function addimagem(state) {
	propmenus(1);
	propTitle.innerHTML = '<p><i class="fas fa-image"></i> Adicionando Imagem</p>'
	propContentl2 = '<center><img class="imagethumb"/></center>';
	propContent.innerHTML = '<div class="propLinha"> <p>URL: </p> <textarea id="imagemurl" onmouseout="getimage()" spellcheck="false" class="propTextarea"></textarea>  <button onclick="addimagem(1)">Adicionar</button></div>' + propContentl2;

	if (state == 1){
		addelement('<img class="Pimagem" src="' + imglink.value + '"/>', getcursorpos());
		propmenus(0);
	};
};

function addlista() {
	addelement('<ul class="Ullista">\n\t<li>Item um</li>\n\t<li>Item dois</li>\n\t<li>Item três</li>\n</ul>', getcursorpos());
};

function addbloco() {
	addelement('<center>\n\t<div class="Pbloco">\n\t\t<img class="Pimagem" src="Insira Link para imagem 1 aqui"/>\n\t\t<img class="Pimagem" src="Insira Link para imagem 2 aqui"/>\n\t</div>\n</center>', getcursorpos());
};

function limparPost() {
	document.getElementsByClassName("editorarea")[0].value = "";
};

function addrodape() {
	addelement('<hr>\n<p style="color: white">Visite nosso <a href="http://discord.gg/J7EtPHA" target="_blank">canal no Discord</a>!</p>', getcursorpos());
};

function previewpost(state){
	previewpostDialog = document.getElementsByClassName("previewpost")[0];
	previewpostDialog.innerHTML = '<button style="position: fixed;" onclick="previewpost(0)">Fechar</button>';
	
	if (state == 1){previewpostDialog.showModal()} else {previewpostDialog.close()};
	
	previewpostDialog.innerHTML += gettextarea();
};

/* Text Options */

function addhyperlink() {
	var seltext = getselectedarea();
	removeselected();
	if (seltext.includes("://www.")){
		addelement('<a href="' + seltext + '" target="_blank"> Adicione titulo de Link aqui </a>', getcursorpos());
	} else {
		addelement('<a href="Adicione Link externo aqui" target="_blank">' + seltext + '</a>', getcursorpos());
	};
	textoptdialog.close();
};

function addstrong() {
	var seltext = getselectedarea();
	removeselected();
	addelement('<strong>' + seltext + '</strong>', getcursorpos());
	textoptdialog.close();
};

function additalic() {
	var seltext = getselectedarea();
	removeselected();
	addelement('<i>' + seltext + '</i>', getcursorpos());
};

function showTextOptions(){
	txtarea = document.getElementsByClassName("editorarea")[0];
	textoptdialog = document.getElementsByClassName("textOptions")[0];
	if (getselectedarea().length > 0){
		textoptdialog.style.position = "fixed";
		textoptdialog.style.left = event.clientX + 'px';
		textoptdialog.style.right = 'unset';
		textoptdialog.style.top = (event.clientY - 90) +'px';
		textoptdialog.showModal();
		setSelection(txtarea, getcursorpos(0), getcursorpos());
	} else {textoptdialog.close()};
}
/* end */

function savePost(){
	txtarea = document.getElementsByClassName("editorarea")[0];
    var textToWrite = txtarea.value;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = 'cube-br-post.html';

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
};

// by sumtips.com
function insertTab(o, e)
{		
	var kC = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;
	if (kC == 9 && !e.shiftKey && !e.ctrlKey && !e.altKey)
	{
		var oS = o.scrollTop;
		if (o.setSelectionRange)
		{
			var sS = o.selectionStart;	
			var sE = o.selectionEnd;
			o.value = o.value.substring(0, sS) + "\t" + o.value.substr(sE);
			o.setSelectionRange(sS + 1, sS + 1);
			o.focus();
		}
		else if (o.createTextRange)
		{
			document.selection.createRange().text = "\t";
			e.returnValue = false;
		}
		o.scrollTop = oS;
		if (e.preventDefault)
		{
			e.preventDefault();
		}
		return false;
	}
	return true;
};

 window.onload = function() {
	if (navigator.userAgent.indexOf("Firefox") > 0) {
		alert("Sorry, Firefox does not fully support this tool by default. \n https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal#Browser_compatibility ");
	}
};
