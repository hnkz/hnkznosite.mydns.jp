dd = new Date();
hours = dd.getHours();
minutes = dd.getMinutes();
seconds = dd.getSeconds();
var time = hours + ":" + minutes + ":" + seconds;

var dir = "";

var name = "hanakazu ";

var commandList = {
	"ls"			:"List information about the FILEs (the current directory by default)",
 	"cd"			:"usage: cd [dir] Change directory",
 	"clear"		:"Clear the terminal",
	"pwd"			:"Show the current directory",
	"file"		:"usage: file [file] Show the file information",
	"help"		:"Show command usage",
	"cat"			:"usage: cat [file] Show file contents "
};

var homeFile = {
	"introduction.txt":"Hi, Im Kazuki Hanai. Im 18 years old.<br> Im attending Shizuoka University.<br><br> Like: Computer, Science, Math, Outdoor-sports etc...<br>My Dream: I want to be a hacker or a researcher in the future. <br><br> KazukiHanai",
	"test_.txt":"testtest",
};

var workFile = {
	"my_past_work.txt":"In preparation..."
};

var gitFile = {
	"git.link":"<a href=\"https://github.com/hnkz\" target=\"_blank\">hnkz's git link</a>"
};

var linkFile = {
	"link_all.txt":"<a href=\"https://github.com/hnkz\" target=\"_blank\">hnkz's git link</a><br><a href=\"https://twitter.com/hnkz_hnkz\" target=\"_blank\">my Twitter account link</a>"
};

var command = "";

var lsRoot = ["home", "work", "git","link"];

var navList = ["home", "work", "git", "link"];


var msg = "<h1>Welcome to hnkznosite.mydns.jp<h1><p>Please \"help\" command if you have anything you do not understand.</p>"+ name + time + " <span class=\"dir\">/" + dir +  "</span> $ ";

var tagFlag = false;

var count = 0;

var keyFlag = {
	"shift":false,
};

function disp(){
	var type = msg.substring(0, count);
  var lastType = type.slice(-1);

	if(lastType === "<"){ tagFlag = true; }
  if(lastType === ">"){ tagFlag = false; }

	if(!tagFlag){
  	document.getElementById("all").innerHTML = type;
  	count ++;
		var rep = setTimeout("disp()", 15);
  } else {
    count ++;
		var rep = setTimeout("disp()", 0);
  }


	if(count > msg.length){
		clearTimeout(rep);
	}
}

document.onkeydown = function(e) {

	dd = new Date();
	hours = dd.getHours();
	minutes = dd.getMinutes();
	seconds = dd.getSeconds();

	time = hours + ":" + minutes + ":" + seconds;

	if (event.keyCode == 13) {
		if (command == "") {
			document.getElementById("all").innerHTML = msg;
		} else {
			if (command.match(/cd ?[a-z.0-9]*/)) {
				cd();
			} else if ( command == "ls") {
				ls();
			} else if ( command == "clear") {
				clear();
			} else if ( command == "pwd") {
				pwd();
			} else if ( command == "help") {
				help();
			} else if ( command.match(/cat ?[a-z.0-9_]*/)){
				var file = command.replace(/cat ?/,"");
				cat(file);
			}
			 else {
				msg = msg + command + "<br>" + "-hnkz: " + command + ": command not found" + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
			}

			command = "";
			document.getElementById("all").innerHTML = msg;
		}
	} else if (event.keyCode == 8) {
		command = command.substr( 0, command.length-1 );
		document.getElementById("all").innerHTML = msg + command;
	} else if ( event.keyCode == 16) {
		keyFlag["shift"] = true;
	} else if (event.keyCode == 189) {
		command = command + "_";
		document.getElementById("all").innerHTML = msg + command;
	} else if (event.keyCode == 190) {
		command = command + ".";
		document.getElementById("all").innerHTML = msg + command;
	}
	 else if (event.keyCode == 191) {
		command = command + "/";
		document.getElementById("all").innerHTML = msg + command;
	} else {
		if(keyFlag["shift"]){
			command = command + String.fromCharCode(event.keyCode);
			document.getElementById("all").innerHTML = msg + command;
		} else {
			command = command + String.fromCharCode(event.keyCode).toLowerCase();
			document.getElementById("all").innerHTML = msg + command;
		}
	}
};

document.onkeyup = function(e){
	if (event.keyCode == 16) {
		keyFlag["shift"] = false;
	}
};

function cd(){
	var flag = false;

	if (dir == "") {
		for(var i = 0; i < navList.length; i++){
			reg = new RegExp(navList[i]);
			if(command.match(reg)){
				dir = navList[i];
				flag = true;
			}
		}
		if (command == "cd " || command == "cd") {
			flag = true;
		} else if (command == "cd ..") {
			flag = true;
		}

		if (flag) {
			msg = msg + command + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
		} else {
			msg = msg + command + "<br><span class=\"discription\">-hnkz: cd: No such file or directory</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
		}
	} else {
		if (command == "cd ..") {
			dir = "";
			msg = msg + command + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
		} else if (command == "cd " || command == "cd") {
			dir = "";
			msg = msg + command + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
 		} else {
			msg = msg + command + "<br><span class=\"discription\">-hnkz: cd: No such file or directory</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
		}
	}
}

function ls() {
	var lsList = "";

	if (dir == "") {
		lsList = "<span class=\"nav\">" + lsRoot[0] + " " + lsRoot[1] + " " + lsRoot[2] + " " + lsRoot[3] + "</span>";
		msg = msg + command + "<br>" + lsList + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
	} else if (dir == "home") {
		lsList = "<span class=\"nav\">";
		for (key in homeFile) {
			lsList += key + " ";
		}
		lsList += "</span>";
		msg = msg + command + "<br>" + lsList + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";

	} else if (dir == "work") {
		lsList = "<span class=\"nav\">";
		for (key in workFile) {
			lsList += key + " ";
		}
		lsList += "</span>";
		msg = msg + command + "<br>" + lsList + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";

	} else if (dir == "git") {
		lsList = "<span class=\"nav\">";
		for (key in gitFile) {
			lsList += key + " ";
		}
		lsList += "</span>";
		msg = msg + command + "<br>" + lsList + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";

	} else if (dir == "link") {
		lsList = "<span class=\"nav\">";
		for (key in linkFile) {
			lsList += key + " ";
		}
		lsList += "</span>";
		msg = msg + command + "<br>" + lsList + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";

	} else {
		msg = msg + command + "<br><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
	}
}

function clear() {
	msg = "<h1>Welcome to hnkznosite.mydns.jp<h1><p>Please \"help\" command if you have anything you do not understand.</p>"+ name + time + " <span class=\"dir\">/" + dir +  "</span> $ ";
}

function pwd() {
	msg = msg + command + "<br>" + "<span class=\"dir\">/" + dir + "</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
}

function help() {
	var help = "<span class=\"discription\">";
	for (key in commandList) {
		help += key + ":<br>&nbsp;&nbsp;&nbsp;&nbsp;" + commandList[key] + "<br>";
	}
	help += "</span>";

	msg = msg + command + "<br>" + help + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
}

function cat(file) {
	if (file == "") {
		msg = msg + command + "<br><span class=\"discription\">-hnkz: cat: No such file or directory</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
	} else {
		if (dir == "home") {
			for (key in homeFile) {
				if (file == key) {
					msg = msg + command + "<br><span class=\"discription\">" + homeFile[key] + "</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
					return;
				}
			}
			msg = msg + command + "<br><span class=\"discription\">-hnkz: cat: No such file or directory</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";

		} else if (dir == "work") {
			for (key in workFile) {
				if (file == key) {
					msg = msg + command + "<br><span class=\"discription\">" + workFile[key] + "</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
					return;
				}
			}
			msg = msg + command + "<br><span class=\"discription\">-hnkz: cat: No such file or directory</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";

		} else if (dir == "git") {
			for (key in gitFile) {
				if (file == key) {
					msg = msg + command + "<br><span class=\"discription\">" + gitFile[key] + "</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
					return;
				}
			}
			msg = msg + command + "<br><span class=\"discription\">-hnkz: cat: No such file or directory</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";

		} else if (dir == "link") {
			for (key in linkFile) {
				if (file == key) {
					msg = msg + command + "<br><span class=\"discription\">" + linkFile[key] + "</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
					return;
				}
			}
			msg = msg + command + "<br><span class=\"discription\">-hnkz: cat: No such file or directory</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";

		} else {
			msg = msg + command + "<br><span class=\"discription\">-hnkz: cat: No such file or directory</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
		}
	}
}
