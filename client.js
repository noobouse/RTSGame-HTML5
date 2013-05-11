/*  Copyright (c) 2013 Asad Memon

Forked and updated.

MIT Licensed.
*/

/*  Copyright (c) 2012 Sven "FuzzYspo0N" Bergström

written by : http://underscorediscovery.com
written for : http://buildnewgames.com/real-time-multiplayer/

MIT Licensed.
*/

//A window global for our game root variable.
var game = {};

//When loading, we store references to our
//drawing canvases, and initiate a game instance.
window.onload = function() {

	//Create our game client instance.
	game = new game_core();

	//Fetch the viewport
	game.viewport = document.getElementById('viewport');

	//Adjust their size
	game.viewport.width = game.world.width;
	game.viewport.height = game.world.height;

	//Fetch the rendering contexts
	game.ctx = game.viewport.getContext('2d');

	//Set the draw style for the font
	game.ctx.font = '11px "Helvetica"';

	//Finally, start the loop
	game.update(new Date().getTime());

};
//window.onload

jQuery(document).ready(function($) {
	$('#form-connect').submit(function(e) {
		e.preventDefault();
		console.log(JSON.stringify($(this).serializeArray()));
		console.log(JSON.parse(JSON.stringify($(this).serializeArray()))[0]);
		game.socket.emit('connect_form', JSON.stringify($(this).serializeArray()));

	});

	//register
	$('#register_button').click(function(e) {
		e.preventDefault();
		$('#form-connect').hide();
		$('#form-register').fadeIn(1000);
	});
	$('#connect_button').click(function(e) {
		e.preventDefault();
		$('#form-register').hide();
		$('#form-connect').fadeIn(1000);

	});

	$('#form-register').submit(function(e) {
		e.preventDefault();
		
		data = $(this).serializeArray();
		//test pwd egaux
		if (data[1].value == data[2].value) {
			// hash des pwd avant passage sur le reseau
			data[1].value = CryptoJS.SHA256(data[1].value).toString(CryptoJS.enc.Hex);
			data[2].value = CryptoJS.SHA256(data[2].value).toString(CryptoJS.enc.Hex);
			game.socket.emit('register', JSON.stringify(data));
		}
		else{
			console.log('bad password');
		}
	});
});

