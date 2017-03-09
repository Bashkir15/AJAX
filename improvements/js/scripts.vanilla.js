//generally avoid creating variables in the global scope, but since you only have 
// one file, there isn't an issue. Namespacing is important until you learn about 
// modules

var emailSubmit = document.querySelector('.email button');
var overlay = document.getElementById('login-overlay');
var placementSelector = document.body.querySelector('main header');
var lightboxContent;
var url = '/signup';


function handleDialog() {
	overlay.style.display = 'block';

	/* I would use a promise here, but I don't want this to be too confusing. jQuery's load functionality relies on
	the fact that jQuery has a lot of utility functions to parseHTML and ends up being a few hundreds or so lines of code
	so I'm going to do a quick workaround. Also leaving out some error checks and stuff to just show functionality, but I
	can go back and include those if you want*/

	var xhr = new XMLHttpRequest();
	var finished = false;

	xhr.onreadystatechange = function xhrStateChange() {
		if (xhr.readyState === 4 && !finished) {
			finished = true;

			try {
				lightboxContent = xhr.responseXML.querySelector('.fetch');
				placementSelector.appendChild(lightboxContent);

				var signupSubmit = lightboxContent.querySelector('.submit button');
				signupSubmit.addEventListener('click', handleDialogSubmit);	

				overlay.addEventListener('click', function() {
					signupSubmit.removeEventListener('click', handleDialogSubmit);				
					lightboxContent.parentNode.removeChild(lightboxContent);
					overlay.style.display = 'none';
				});
			} catch (e) {
				console.log(e);
			}
		}
	};

	xhr.open('GET', url);
	xhr.responseType = 'document';
	xhr.send();

}


function handleDialogSubmit() {
	/* I was a little confused in your JQUERY here. You pass data to getJSON, but that makes a get request. Here you are wanting
	to send data to the server instead of receive so you would want to use a POST request with ajax. I understand why
	you didn't do that because of lack of server and such, but was confused by you passing the username and such in.
}	

*/

	fetch('/confirmation', {
		method: 'GET'
	})
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		var confirmMessage = '<div class="confirmation"><p>' + data.logged + '</p></div>';
		lightboxContent.innerHTML = confirmMessage;
	})
}

emailSubmit.addEventListener('click', handleDialog);

