function propmenus(state) {
	propmenu = document.getElementsByClassName("propmenu")[0];
	if (state == 1){propmenu.show()} else {propmenu.close()};
	
	propTitle = document.getElementsByClassName("propTitle")[0];
	propContent = document.getElementsByClassName("propContent")[0];
}

function gettextarea() {
	txtarea = document.getElementsByClassName("editorarea")[0];
	return txtarea.value
};

function getcursorpos() {
	txtarea = document.getElementsByClassName("editorarea")[0];
	
	return txtarea.selectionEnd;
};

function addelement(elementto) {
    document.getElementsByClassName("editorarea")[0].value = gettextarea().substr(0, getcursorpos()) + '\n' + elementto + gettextarea().substr(getcursorpos());
};


function getyoutubepic(){
	url = document.getElementsByClassName("propTextarea")[0].value;
	purl = url.replace("https://www.youtube.com/watch?v=", "");
	vthumb = 'https://img.youtube.com/vi/' + purl + '/0.jpg';
	urlembed = 'https://www.youtube.com/embed/' + purl;

	document.getElementsByClassName("videothumb")[0].src = vthumb;
}

function addvideo(state) {
	if (typeof vthumb === undefined){vthumb = ""};
	propmenus(1);
	propTitle.innerHTML = '<p><i class="fas fa-video"></i> Adicionando Vídeo do YouTube</p>';
	propContentl2 = '<center><img class="videothumb"/></center>';
	propContent.innerHTML = '<div class="propLinha"> <p>URL: </p> <textarea onmouseout="getyoutubepic()" spellcheck="false" class="propTextarea"></textarea> <button onclick="addvideo(1)">Adicionar</button></div>' + propContentl2;

	if (state == 1){
		addelement('<iframe class="Pvideo" src="' + urlembed + '" frameborder="0" allowfullscreen></iframe>');
		propmenus(0);
	}
}

function addparagrafo() {
	addelement('<p class="Ptexto">Insira o Páragrafo aqui</p>');
}

function addtitulo() {
	addelement('<h3 class="Ptitulo">Insira o Titulo aqui</h3>');
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
		addelement('<img class="Pimagem" src="' + imglink.value + '"/>');
		propmenus(0);
	};
};

function addlista() {
	addelement('<ul class="Ullista">\n\t<li>Item um</li>\n\t<li>Item dois</li>\n\t<li>Item três</li>\n</ul>');
};

function addbloco() {
	addelement('<center>\n\t<div class="Pbloco">\n\t\t<img class="Pimagem" src="Insira Link para imagem 1 aqui"/>\n\t\t<img class="Pimagem" src="Insira Link para imagem 2 aqui"/>\n\t</div>\n</center>');
};

function limparPost() {
	document.getElementsByClassName("editorarea")[0].value = "";
}

function previewpost(state){
	previewpostDialog = document.getElementsByClassName("previewpost")[0];
	previewpostDialog.innerHTML = '<button style="position: fixed;" onclick="previewpost(0)">Fechar</button>';
	
	if (state == 1){previewpostDialog.show()} else {previewpostDialog.close()};
	
	previewpostDialog.innerHTML += gettextarea();
};


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
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

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
}