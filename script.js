var name = "hanakazu: ~ $ ";
var msg = "<h1>Welcome to hnkznosite.mydns.jp<h1>"+ name +"";
var roopFlag = false;
var tagFlag = false;
var count = 0;

function disp(){

	var type = msg.substring(0, count);
  var lastType = type.slice(-1);

  if(lastType === "<"){ roopFlag = true; }
  if(lastType === ">"){ roopFlag = false; }

  if(!roopFlag){
  	document.getElementById("all").innerHTML = type;
  	count ++;
  }
  else{
    count ++;
  }

	var rep = setTimeout("disp()", 15);
	if(count > msg.length){
		if(roopFlag){ count = 0; }
		else{ clearTimeout(rep); }
	}
}

var command = "";

document.onkeydown = function(e) {
	if (event.keyCode == 13) {
		msg = msg + command + "<br>" + name;
		command = "";
		document.getElementById("all").innerHTML = msg;
	}
	else if (event.keyCode == 8) {
		command = command.substr( 0, command.length-1 );
		document.getElementById("all").innerHTML = msg + command;
	}
  else{
		command = command + String.fromCharCode(event.keyCode).toLowerCase();
		//command = command + event.keyCode;
		document.getElementById("all").innerHTML = msg + command;
	}
};
