var fs = require( 'fs' );
var path = require( 'path' );
var folder = "D:/Music";
var jsmediatags = require("jsmediatags");

fs.readdir(folder, function(err, files) {
	if (err) {
		console.error("Could not list the directory.", err);
		process.exit(1);
	}
	files.forEach(function(file, index) {
		var cardBlock = document.createElement("div");
		cardBlock.className = "row";
		cardBlock.id = "albumCard" + index;
		var stats = fs.statSync(folder + "/" + file);
		if (stats.isDirectory()) {
			fs.readdir(folder + "/" + file, function(err, files) {
				if (err) {
					console.error("Could not list the directory.", err);
					process.exit(1);
				}
				jsmediatags.read(folder + "/" + file + "/" + files[0], {
					onSuccess: function(tag) {
						var picture = tag.tags.picture; // create reference to track art
						var base64String = "";
						for (var i = 0; i < picture.data.length; i++) {
						    base64String += String.fromCharCode(picture.data[i]);
						}
						var imageUri = "data:" + picture.format + ";base64," + window.btoa(base64String);
						cardBlock.innerHTML = `
							<div class="col s12 m6">
								<div class="card">
									<div class="card-image">
										<img src="images/sample-1.jpg"></img>
										<a class="btn-floating btn-large halfway-fab waves-effect waves-light red"><i class="material-icons">play_arrow</i></a>
									</div>
									<div class="card-content">
										<span class="card-title">Card Title</span>
										<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
									</div>
								</div>
							</div>`
						$(document).ready(function(){
					    $("#albumCard" + index).find("span").html(file);
						});
						document.getElementById("folders").appendChild(cardBlock);
					},
					onError: function(error) {
						console.log(':(', error.type, error.info);
					}
				});
			});
		}
	});
});
