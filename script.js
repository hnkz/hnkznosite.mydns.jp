//時間の取得の初期化
dd = new Date();
hours = dd.getHours();
minutes = dd.getMinutes();
seconds = dd.getSeconds();
var time = hours + ":" + minutes + ":" + seconds;

//ディレクトリの初期化
var dir = "";

//ユーザ名の初期化
var name = "hanakazu ";

//コマンドの初期化
var command = "";

//home時のlsコマンドを初期化
var ls_home = ["<span class=\"nav\">home</span>", "<span class=\"nav\">work</span>", "<span class=\"nav\">git</span>","<span class=\"nav\">link</span>"];

//navのリストを初期化
var navList = ["home", "work", "git", "link"];


//表示するメッセージの初期化
var msg = "<h1>Welcome to hnkznosite.mydns.jp<h1>"+ name + time + " <span class=\"dir\">/" + dir +  "</span> $ ";

//tag感知フラグ
var tagFlag = false;

//文字数カウンタ
var count = 0;

//最初の表示
function disp(){
	var type = msg.substring(0, count);
  var lastType = type.slice(-1);

	if(lastType === "<"){ tagFlag = true; }
  if(lastType === ">"){ tagFlag = false; }

	if(!tagFlag){
  	document.getElementById("all").innerHTML = type;
  	count ++;
  } else {
    count ++;
  }

	var rep = setTimeout("disp()", 15);

	if(count > msg.length){
		clearTimeout(rep);
	}
}

//ユーザがキーを入力したとき
document.onkeydown = function(e) {

	//時間の取得
	dd = new Date();
	hours = dd.getHours();
	minutes = dd.getMinutes();
	seconds = dd.getSeconds();
	var time = hours + ":" + minutes + ":" + seconds;

	if (event.keyCode == 13) {
		if (command == "") {
			document.getElementById("all").innerHTML = msg;
		} else {
			if (command.match(/cd/)) {
				if (dir == "") {
					for(var i = 0; i < navList.length; i++){
						reg = new RegExp(navList[i]);
						if(command.match(reg)){
							dir = navList[i];
						}
					}
					msg = msg + command + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
				} else {
					if (command.match("..")) {
						dir = "";
						msg = msg + command + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
					} else {
						msg = msg + "<br>-hnkz: cd: No such file or directory<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
					}
				}
			} else if ( command == "ls") {
				if(dir == ""){
					var lsList = ls_home[0] + " " + ls_home[1] + " " + ls_home[2] + " " + ls_home[3];
					msg = msg + command + "<br>" + lsList + "<br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
				} else {
					msg = msg + command + "<br><br>" + name + time + " <span class=\"dir\">/" + dir + "</span> $ ";
				}
			} else if ( command == "clear") {
				msg = "<h1>Welcome to hnkznosite.mydns.jp<h1>"+ name + time + " <span class=\"dir\">/" + dir +  "</span> $ "
			} else {
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
		//command = command + event.keyCode;
		document.getElementById("all").innerHTML = msg + command;
	}
};
