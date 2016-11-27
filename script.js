// 時間の取得の初期化
dd = new Date();
hours = dd.getHours();
minutes = dd.getMinutes();
seconds = dd.getSeconds();
var time = hours + ":" + minutes + ":" + seconds;

// ディレクトリの初期化
var dir = "";

// ユーザ名の初期化
var name = "hanakazu ";

// コマンドリストの初期化
var commandList = {	"ls":"List information about the FILEs (the current directory by default).",
									 	"cd":"usage: cd [dir] change directory",
									 	"clear":"clear the terminal",
										"pwd":"show the current directory",
										"file":"usage: file [file] show the file information",
										"help":"show command usage"
									};

// コマンドの初期化
var command = "";

// home時のlsコマンドを初期化
var lsHome = ["<span class=\"nav\">home</span>", "<span class=\"nav\">work</span>", "<span class=\"nav\">git</span>","<span class=\"nav\">link</span>"];

// navのリストを初期化
var navList = ["home", "work", "git", "link"];


// 表示するメッセージの初期化
var msg = "<h1>Welcome to hnkznosite.mydns.jp<h1><p>Please \"help\" command if you have anything you do not understand.</p>"+ name + time + " <span class=\"dir\">/" + dir +  "</span> $ ";

// tag感知フラグ
var tagFlag = false;

// 文字数カウンタ
var count = 0;

// 最初の表示
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

// ユーザがキーを入力したとき
document.onkeydown = function(e) {

	// 時間の取得
	dd = new Date();
	hours = dd.getHours();
	minutes = dd.getMinutes();
	seconds = dd.getSeconds();

	time = hours + ":" + minutes + ":" + seconds;

	if (event.keyCode == 13) {
		if (command == "") {
			document.getElementById("all").innerHTML = msg;
		} else {
			if (command.match(/cd [a-z.0-9]*/) || command == "cd") {
				cd();
			} else if ( command == "ls") {
				ls();
			} else if ( command == "clear") {
				clear();
			} else if ( command == "pwd") {
				pwd();
			} else if ( command == "help") {
				help();
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
	}
  else{
		command = command + String.fromCharCode(event.keyCode).toLowerCase();
		// command = command + event.keyCode;
		document.getElementById("all").innerHTML = msg + command;
	}
};

// cd command
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
		if (command == "cd" || command == "cd ") {
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
		} else {
			msg = msg + command + "<br><span class=\"discription\">-hnkz: cd: No such file or directory</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
		}
	}
}

// ls command
function ls(){
	if(dir == ""){
		var lsList = lsHome[0] + " " + lsHome[1] + " " + lsHome[2] + " " + lsHome[3];
		msg = msg + command + "<br>" + lsList + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
	} else {
		msg = msg + command + "<br><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
	}
}

// clear command
function clear(){
	msg = "<h1>Welcome to hnkznosite.mydns.jp<h1><p>Please \"help\" command if you have anything you do not understand.</p>"+ name + time + " <span class=\"dir\">/" + dir +  "</span> $ ";
}

// pwd command
function pwd(){
	msg = msg + command + "<br>" + "<span class=\"dir\">/" + dir + "</span><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
}

// help command
function help(){
	var help = "<br><span class=\"discription\">";
	for(key in commandList){
		help += key + ":<br>&nbsp;&nbsp;&nbsp;&nbsp;" + commandList[key] + "<br>";
	}
	help += "</span>";

	msg = msg + command + "<br>" + help + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
}
