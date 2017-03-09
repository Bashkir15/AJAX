/* IMPORTANT NOTE. The code in this file is not good or meant to be used in any serious way.
I just wanted to set you up something incredibly basic and kind of show you how the idea
of server side javascript works. When you get more comfortable we can explore this a bit more.
For localdevelopment, or if you are just serving a very small static site(although some changes would
have to be made in that case) this will suffice and allow you to have a bit of a boilerplate you
can expand and change a bit to serve content for other projects you're working on */

/* This is a module. Basically you are importing code from some where and using it
in this file. It allows you to share code very easily, preventing you from having to 
repeat yourself and have to rewrite the functionality */

var express = require('express');

/* express is a framework for Node.js, a server-side javascript platform. DOn't worry
about learning this yet. It will benefit you greatly in the future, but for now this
basic config is enough to get you able to do your AJAX and actually be able to host 
simple sites on a cloud platform like heroku or AWS */

var app = express();

/* This is expresses router. It does what you think. When the browser changes url's
it makes a request to that path on the server. So when you click the /login route on
the client it asks the server to send the login page. The server will see if it has 
a route for /login and if it does it will send back the page */

var router = express.Router();

/* here I'm using the router. The methods for the router correspond to HTTP methods,
such as get, post, put and delete. The router is getting the '/' route and it accepts a
function as a second argument. THe arguments passed into that function are the request and
response objects. The browser REQUESTS info from the server and sends a request object to
it and then the server RESPONDS with the response object. In the function I'm using the
sendFile method on the response object, which does exactly what it sounds like. I pass in
the path to the file and that's all there is to it 

THe __dirname might look weird to you. You have to specify a root for res.sendFile. __dirname is 
built into node and corresponds to the directory the file is found in. */

var indexRoute = router.get('/', function(req, res) {
	res.sendFile(__dirname + '/improvements/index.html');
});

var signupRoute = router.get('/signup', function(req, res) {
	res.sendFile(__dirname + '/improvements/signup.html');
});

var confirmRoute = router.get('/confirmation', function(req, res) {
	res.sendFile(__dirname + '/json/confirmation.json');
});


/* here I'm telling the application to use the function stored in indexRoute for request
to the '/' path. I could have done this differently. I could have just made the app make
the same request and not used the router, but I wanted to show you how the router works.
You could have done. 

app.get('/', function(req, res) {
	res.sendFile('/index.html');
});

though 

Ideally you would have wanted to have your routes in a different file, saying all routes like /, /contact,
/login and stuff, and then export that entire file. Then you'd import it here as indexRoutes and do what we do 
below. */

app.use('/', indexRoute);
app.use('/signup', signupRoute);



/* So, this is pretty much the only thing that might seem a little strange and weird to follow.
To server content that you are hosting locally, like static files in this case, since you are
using a server now, the browser is going to send the request to the server now. The server has to know where to send these requests
to just like it did with the sendFile where we specificied a root directory. Here we are specifying a
directory to server static content, that is where the express.static method comes in. We are telling the application
that we are going to serve static content from the specified directory, so when it gets a request it knows
where to go. A thing to note is that when you do this, you do not have to specify the last part of that path in
your html. Since we made /css a static directory, instead of requesting <link rel='stylesheet' href='css/main.css'>
you now only need to do <link rel='stylesheet' href='./main.css'> the './' means currently directory. Express
is watching these directories so when you request static content it knows it will go to one of these, so it
doesn't need to be specifed. For this reason it is better to create one static directory to put these files in
so you could just do app.use(express.static(__dirname + '/static')) */

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/improvements/js'));
app.use(express.static(__dirname + '/json'));
app.use(express.static(__dirname + '/img'));

/* Finally, a server has to listen on a port so it knows where to send the requests to
here we are telling the application to listen on port 3000. THere are some restricted ports 
you can't use because some of your machines functionality uses them, but generally 3000, 8000, 7000. 8080
and the like are good, so feel free to use those. I think pass in a function, but you don't need to.
I just passed in a function to alert you in your terminal console that your server is running.
THat is how you start the server by the way, by using your terminal. You'll need to install 
Nodejs and npm and then change to the improvements directly and run npm install to download the dependencies.
You'll notice the package.json and node_modules in the directory here. THese are from npm. WHen you
start a new project with npm you'll run npm init,  the terminal will ask you some questions about your app
and then it'll make the package.json file. This file is great. It is where you manage your npm dependencies and
other things. You can set up a lot of cool stuff like scripts to run with npm here, but for now
it just tells your dependencies. Anytime you install something locally with npm it will automatically
update your package.json for you. So if you have this file and run npm install, which you will now need
to do even though there is a node_modules file they aren't installed locally, it'll look at the package.json
file and install the dependencies there.

That was long winded haha. AFter that you can in this directly type node server.js which tells node to execute the
server.js file. You could do this with any file. You could write anything, like a function that prints 1-10000000
in a file and run that file and node will execute it. So it executes this file and spins up a server
like we want

*/

app.listen(3000, function() {
	console.log('The server is running');
});