$(document).ready(function() {
	var blocks = document.getElementById("hidden-data");
	var obj = JSON.parse(blocks.innerHTML);
	var i;
	for(i=0;i<10;i++){

	//console.log(obj[i]);
	console.log(obj[i].stateHash);
}
});