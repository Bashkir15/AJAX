var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
		documnent.body.innerHTML = xhr.responseText;
	}

}



xhr.open('GET', 'index.html');
xhr.send();

