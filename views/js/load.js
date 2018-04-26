var start = "Magic Murder";
var game_start = false;
var inRoomInfo = false;

var done = true;
var stage = 1;
var index_of_text = 0;
var loadScene = false;
var show = false;
var scene;
var inPlace = false;
var inSuspect = false;
var suspect = 0;
var choice;
var q_index = 0;
var attemp = 5;
var guess = 0;

var questions = [
	"Is it possible that the magician hide the knife?",
	"Is it possible to get in the room from window?",
	"What's the evidence that shows the victim is killed before magician came back?",
	"Why the magician can not find the body, where did the murderer hide it?",
	"What is the evidence of the body was moved?",
	"What is the item that used for moving the body?",
	"What is the evidence that the murderer use wire to move the body?",
	"When the murderer drag the body, he make trace in the room again, what is the trace?",
	"Why the murderer can not move the body just outside the room?",
	"Who is the murderer and the only person who can move the body outside the room without notice?"
]

var q_answer = [0, 4, 5, 6, 0, 2, 7, 1, 5, 8]

var the_clues = [
	"Corpse Info",
	"Moved Chair",
	"The Possibility of Invisible Wire",
	"The Possibility of Flying",
	"Window",
	"Information from Camera",
	"Curtains",
	"Damaged Belt",
	"Statement of Manager",
	"Statement of Magician",
	"Statement of Ex-boyfriend"
]

var clues_info = [
	"The victim is stab to death at 1 to 3 a.m., with no knife discovered on the scene and places nearby. "+
	"Police search the area and the room thoroughly but they can't find the knife." +
	" The body seems to be dragged, which makes the blood trace on the floor, It could happened when the magician discover the body",
	"This is the chair where the magician sat on before he went to bed. The chair seems to be moved for a bit recently",
	"The magician use some kind of invisible wire to complete his flying show",
	"There is actually some trick that can make people fly",
	"The window is opened but it's 20 floor so there should be no way in from the window.",
	"The manager get in the room at 1:46 to drive the ex-boyfriend away, the ex-boyfriend left at 1:55 and the manager left at 2:05. " +
	"After this we found that the ex-boyfriend of the victim did come back once but cannot get in the room. "+
	"Magician get back in the room at around 2:50.",
	"There is a large curtain in front of all the windows. "+
	"The window will be completely covered when the curtain is closed. "+
	"All the curtain is closed and there is blood stain on the curtain next to the body.",
	"There is a suspicious damage part on the belt of the victim too, "+
	"which might be caused when fighting against the murderer, "+
	"but we don't see any other sign of fighting in the room",
	"The manager live in the room opposite to the crime scene, he once get into the crime scene to drive the ex-boyfriend away at 1:46 and then go back to his room and work after the ex-boyfriend left.",
	"The magician come back at 2:40 and fall asleep with no body on the floor, but see the body at 3:30 when he woke, with door locks.",
	"The ex-boyfriend go in the crime scene to talk to the victim, driven away by the manager and then come back once without get into the room. "+
	"However, he keep wandering around until 3 am."
]

var start_scene = [
	"Hi, it's Chris from CPD, we really need your help with this murder case.",
	"The main suspect keep saying he is innocent",
	"But only magic can make what he said become reality."
]

var case_info = [
	"This is the crime scene of the case.",
	"The victim is the girlfriend of a famous magician who can float in the air in his show",
	"The body was discovered in the magician's room at 3:30 when the magician woke by his manager's phone call",
	"The victim entered the magician's room at 1 a.m. by the camera and no one left the room atfer the magician get in",
	"To solve this puzzle you need to investigate in the crime scene and talk to all of the suspects",
	"Press 'Q' key to talk to suspects of this case",
	"Press 'A' key to see the layout of the room",
	"Press 'S' key to see the highlighted suspicious places",
	"You can also click on the suspicious place to see further infomation",
	"Click on the door if you are ready to start your reasoning of the case",
	"We suggest to see what the suspects would say firstly."
]

var corpse_info = [
	"This room should be where the victim get killed",
	"The victim is stab to death, with no knife discovered on the scene and places nearby.",
	"Police search this area thoroughly, but they can not find the knife.",
	"According to Forensics, the murder should happen between 1am to 3am",
	"The body seems to be dragged, which makes the blood trace on the floor,",
	"It could happened when the magician discover the body",
	"There is a suspicious damage part on the belt of the victim too",
	"Which might be caused when fighting against the murderer",
	"but we don't see any other sign of fighting in the room"
]

var window_info = [
	"The window is opened but it's 20 floor so there should be no way in from the window.",
	"There is a large curtain in front of all the windows.",
	"The window will be completely covered when the curtain is closed.",
	"All the curtain is closed and there is blood stain on the curtain next to the body."
]

var chair_info = [
	"This is the chair where the magician sat on before he went to bed.",
	"The chair seems to be moved for a bit recently",
	"There is not much information on the chair"
]

var manager_info = [
	"You: Where are you last night at 1 to 3 a.m.?",
	"I don't like drinking and I still have work to be done, so I came back and work on the schedule of the magician in my room",
	"You: Where is your room?",
	"Just the opposite of this room.",
	"You: Do you hear something wierd or see anything at around 1 to 3 a.m.",
	"There was a man, who said that he is the ex-boyfriend of the victim come here at around 1:30",
	"I heard that they were arguing so I went to the next room and help the victim drive him away",
	"You: After that?",
	"I talk to the victim for a few minute then I get back to my room.",
	"I didn't hear anything wierd after that",
	"You: Why did you call the magician?",
	"I used to verify work schedule with him every night, so I just call him.",
	"You: Good, thanks for your cooperate",
	"After this, I verify the camera, what the manager said seems to be true.",
	"The manager get in the room at 1:46, the ex-boyfriend left at 1:55 and the manager left at 2:05"
]

var magician_info =[
	"You: Where are you last night at 1 to 3 a.m.?",
	"After I had my show finished at 10, I go to a bar to celebrate with my co-worker.",
	"I was drunk so I can't remember the exact time, but I think I return the hotel at around 2:30.",
	"You: We heard that you are arguing with the victim a lot recently, is that true?",
	"Yes we are, but it's just some small conflict between couple, not a big deal.",
	"You: Do you know why would the victim get in your room?",
	"She is my girlfriend so I ask her come here and wait for me. No one else have the key except me and the victim",
	"But when I get in the room, I didn't see her, so I text her and wait for a few minute on the sofa",
	"After a few minute, I was so tired then I just go to bed. I thought she just left because waiting for too long.",
	"You: But you saw her body after you get the phone call of your manager? The room is lock and we didn't see anyone get in or left your room after you in the camera.",
	"I don't know, but there must be someone get in the room and killed her after I fell asleep. Maybe they can get in from the window.",
	"You: There is no way they can get in from the window, unless they can float in the sky like you.",
	"You: By the way, how do you do your magic, I suppose there is some kind of invisible wire that help you float in the air, right?",
	"No, it's just the power of my soul.(Talk angrily)",
	"After this, I verify the camera, magician get back in the room at around 2:50.",
	"Before 2:50, he is in a bar with multiple witness."
]

var ex_info = [
	"You: Where are you last night at 1 to 3 a.m.",
	"I came here and talk to the victim. Ask if we can be together again",
	"You: But you argued with the victim and driven away by the manager right?",
	"We just talk about our issue, the manager is so annoying, he can't stop me talk to her",
	"You: Where are you after you were driven away.",
	"I came back here once, I knock on the door, but no one respond, so I just left.",
	"You: ok, thanks for your cooperation",
	"After this we found that the ex-boyfriend of the victim did come back once but cannot get in the room",
	"However the man keep wandering nearby until 3 am."
]

var conclusion = [
	"The murderer should be the manager",
	"He kill the victim after the ex-boyfriend left.",
	"Hide the body behind the curtain and bind the invisible wire on the belt.",
	"After the magician fell asleep, he drag the body in his room, which is right opposite to the crime scene.",
	"Cut the wire after he's done dragging and then call the magician to discover the body.",
	"All of these create the puzzle of sudden appear body in a lock room.",
	"After search of the manager's room, the knife was found",
	"Further investigation show that the victim discovered the manager took benefit from the show of magician secretly",
	"Which become the reason of murder"
]


window.onload = function() {
	html = '<p class="title">'+start+'</p></br>'
				+'<p class="get_start">press space to start</p></br>';
	$('.start').append(html);
}

document.addEventListener('keydown', function(event) {
	var temp = event.keyCode;
	if(!game_start) {
    	if(temp == 32) {
        	game_start = true;
        	stage = 1;
        	start_game();
        }
    } else {
    	if (stage == 1) {
    		if(temp == 32) {
    			if(done) {
       				document.getElementById("canvas").innerHTML = "";
    				printLetterByLetter("canvas", start_scene[index_of_text], 1);
	    			index_of_text++;
	    			if (index_of_text >= start_scene.length) {
	    				stage = 2;
	    				index_of_text = 0;
	    			}
	    		}
	    	}
	    } else if (stage == 2) {
	    	if (temp == 32) {
	    		if (index_of_text == 0) {
	    			setBackground("room");
	    		}
	    		if(done) {
       				document.getElementById("canvas").innerHTML = "";
    				printLetterByLetter("canvas", case_info[index_of_text], 1);
    				index_of_text++;
	    			if (index_of_text >= case_info.length) {
	    				stage = 3;
	    				index_of_text = 0;
	    			}
	    		}
	    	}
	    } else if (stage == 3) {
	    	if (!loadScene) {
	    		scene = 0;
	    		hideCanvas();
	    		enableClick();
	    		loadScene = true;
	    	} else {
	    		if (temp == 32) {
		    		if(done) {
	       				document.getElementById("canvas").innerHTML = "";
	       				var theInfo;
	       				if (scene == 1 && suspect == 0)
	    					theInfo =  corpse_info;
	    				else if (scene == 2 && suspect == 0)
	    					theInfo = window_info;
	    				else if (scene == 3 && suspect == 0)
	    					theInfo = chair_info;
	    				else if (scene == 0 && suspect == 1)
	    					theInfo = manager_info;
	    				else if (scene == 0 && suspect == 2)
	    					theInfo = magician_info;
	    				else if (scene == 0 && suspect == 3)
	    					theInfo = ex_info;

	    				else 
	    					return;
	       				if (index_of_text >= theInfo.length) {
	    					index_of_text = 0;
	    					scene = 0;
	    					suspect = 0;
	    					$('#bg_div').html("");
	    					setBackground("room");
	    					hideCanvas();
	    					enableClick();
	    					inPlace = false;
	    					inSuspect = false;
	    				} else if (scene == 1 && index_of_text == 5) {
	    					setBackground("belt");
	    					printLetterByLetter("canvas", theInfo[index_of_text], 1);
	    					index_of_text++;
	    				}
	    				else {
	    					printLetterByLetter("canvas", theInfo[index_of_text], 1);
	    					index_of_text++;
	    				}
	    			}
	    		}
	    		if (temp == 83 && !inPlace && !inSuspect) {
	    			showPlaces();
	    		}
	    		if (temp == 65 && !inPlace && !inSuspect) {
	    			showRoomInfo();
	    		}
	    		if (temp == 81 && !inPlace) {
	    			toSuspects();
	    		}
	    	}
	    } else if (stage == 4) {
	    	if (temp == 32) {
	    		if(done) {
	    			if (index_of_text == conclusion.length) {
	    				document.getElementById("canvas").innerHTML = "";
    					printLetterByLetter("canvas", "Thanks for your playing, your choice before reasoning is " + choice, 1);
	    			} else if (index_of_text > conclusion.length) {
	    				var form_sec = document.getElementById("form_sec");
    					form_sec.style.display = "block";
    					stage = 5;
	    			} else {
       					document.getElementById("canvas").innerHTML = "";
    					printLetterByLetter("canvas", conclusion[index_of_text], 1);
    				}
	    			index_of_text++;
	    		}
	    	}
	    }
	}
});

function start_game() {
	console.log("in start");
	var elem = document.getElementById("start_sec");
	elem.style.display = "none";
	setBackground("start_bg");
	showCanvas(start_scene[index_of_text]);
}



//Function for room
function enableClick() {
	html = '<img onclick="toCorpse()"; id="clickable_object" class="to_corpse" src="/img/'+"empty"+'.png"></img>'
			+'<img onclick="toWindow()"; id="clickable_object" class="to_window" src="/img/'+"empty"+'.png"></img>'
			+'<img onclick="toChair()"; id="clickable_object" class="to_chair" src="/img/'+"empty"+'.png"></img>'
			+'<img onclick="toReasoning()"; id="clickable_object" class="to_reasoning" src="/img/'+"empty"+'.png"></img>';
	$('#bg_div').append(html);
}

function toCorpse() {
	inPlace = true;
	console.log("show corpse info");
	$('#bg_div').html("");
	setBackground("drag");
	showCanvas(corpse_info[index_of_text]);
	scene = 1;
}

function toWindow() {
	console.log("show window info");
	inPlace = true;
	$('#bg_div').html("");
	setBackground("curtain");
	showCanvas(window_info[index_of_text]);
	scene = 2;
}

function toChair() {
	console.log("show chair info");
	inPlace = true;
	$('#bg_div').html("");
	setBackground("chair");
	showCanvas(chair_info[index_of_text]);
	scene = 3;
}

function showRoomInfo() {
	if (!inRoomInfo) {
		$('#bg_div').html("");
		setBackground("room_info");
		inRoomInfo = true;
	} else {
		$('#bg_div').html("");
		setBackground("room");
		enableClick();
		inRoomInfo = false;
	}
}

function showPlaces() {
	if (!show) {
		$('#bg_div').html("");
		setBackground("room");
		html = '<img onclick="toCorpse()"; id="show_place" class="to_corpse" src="/img/'+"empty"+'.png"></img>'
			+'<img onclick="toWindow()"; id="show_place" class="to_window" src="/img/'+"empty"+'.png"></img>'
			+'<img onclick="toChair()"; id="show_place" class="to_chair" src="/img/'+"empty"+'.png"></img>'
			+'<img onclick="toReasoning()"; id="show_place" class="to_reasoning" src="/img/'+"empty"+'.png"></img>';
		$('#bg_div').append(html);
		show = true;
	} else {
		$('#bg_div').html("");
		setBackground("room");
		enableClick();
		show = false;
	}
}

function toReasoning() {
	var elem = document.getElementById("reasoning");
	elem.style.display = "block";
}

function back() {
	var elem = document.getElementById("reasoning");
	elem.style.display = "none";
}




//Function for suspect
function toSuspects() {
	console.log("show suspect info");
	suspect = 0;
	if (!inSuspect) {
		$('#bg_div').html("");
		html = '<div class="suspect_title">' + '<p>Suspects</p>' + '</div>'
			+'<img onclick="toManager()"; class="left_sus" src="/img/'+"manager"+'.png"></img>'
			+'<img onclick="toMagician()"; class="mid_sus" src="/img/'+"magician"+'.png"></img>'
			+'<img onclick="toEx()"; class="right_sus" src="/img/'+"ex"+'.png"></img>'
			+'<p class="suspect_name">Manager</p>'
			+'<p class="suspect_name" style="left:33.5vw">Magician</p>'
			+'<p class="suspect_name" style="right:0">Ex-boyfriend</p>'
		$('#bg_div').append(html);
		inSuspect = true;
	} else {
		$('#bg_div').html("");
		setBackground("room");
		enableClick();
		index_of_text = 0;
		suspect = 0;
		inSuspect = false;
	}
}

function toManager() {
	console.log("manager");
	inSuspect = true;
	$('#bg_div').html("");
	setBackground("room");
	html = '<img class="character" src="/img/'+"manager"+'.png"></img>';
	$('#bg_div').append(html);
	showCanvas(manager_info[index_of_text]);
	suspect = 1;
}

function toMagician() {
	console.log("magician");
	inSuspect = true;
	$('#bg_div').html("");
	setBackground("room");
	html = '<img class="character" src="/img/'+"magician"+'.png"></img>';
	$('#bg_div').append(html);
	showCanvas(magician_info[index_of_text]);
	suspect = 2;
}

function toEx() {
	console.log("Ex");
	inSuspect = true;
	$('#bg_div').html("");
	setBackground("room");
	html = '<img class="character" src="/img/'+"ex"+'.png"></img>';
	$('#bg_div').append(html);
	showCanvas(ex_info[index_of_text]);
	suspect = 3;
}



//Function for reasoning
function chooseSuspect() {
	console.log("Reason Case");
	hideCanvas();
	back();
	$('#bg_div').html("");
	var name1 = "'Manager'";
	var name2 = "'Magician'";
	var name3 = "'Ex-boyfriend'";
	html = '<div class="suspect_title">' + '<p>Choose the murderer you think at this moment</p>' + '</div>'
			+'<img onclick="reasonCase('+name1+', 1)"; class="left_sus" src="/img/'+"manager"+'.png"></img>'
			+'<img onclick="reasonCase('+name2+', 2)"; class="mid_sus" src="/img/'+"magician"+'.png"></img>'
			+'<img onclick="reasonCase('+name3+', 3)"; class="right_sus" src="/img/'+"ex"+'.png"></img>'
			+'<p class="suspect_name">Manager</p>'
			+'<p class="suspect_name" style="left:33.5vw">Magician</p>'
			+'<p class="suspect_name" style="right:0">Ex-boyfriend</p>'
	$('#bg_div').append(html);
}

function reasonCase(name, num) {
	choice = name;
	guess = num;
	console.log(choice);
	var elem = document.getElementById("left_div");
	elem.style.display = "block";
	elem = document.getElementById("right_div");
	elem.style.display = "block";
	$('#bg_div').html("");
	html = '<div class="suspect_title"><p style="font-size:2.2vw;">'+questions[q_index]+'</p></div>'
	$('#bg_div').append(html);
	html = '';
	var s;
	for (i = 0; i < the_clues.length; i++) {
		s = '<p class=clues onclick="showCluesInfo('+i+')">'+the_clues[i]+'</p>';
		html += s;
	}
	$('#left_div').append(html);
}

function showCluesInfo(index) {
	console.log(index);
	$('#right_div').html("");
	html = '<p class="clue">'+the_clues[index]+'</p>';
	var the_img;
	if (index == 0)
		the_img = "drag";
	else if (index == 1)
		the_img = "chair";
	else if ((index > 1 && index < 5) || index == 6)
		the_img = "curtain";
	else if (index == 5)
		the_img = "camera";
	else if (index == 7)
		the_img = "belt";
	else if (index == 8)
		the_img = "manager";
	else if (index == 9)
		the_img = "magician";
	else if (index == 10)
		the_img = "ex";
	html += '<img class="clue_img" src="/img/'+the_img+'.png"></img>'
			+'<p class="clue_info">'+clues_info[index]+'</p>';
	html += '<p class="confirm" onclick="confirm('+index+')"> Confirm </p>';
	$('#right_div').append(html);
}

function confirm(num) {
	if (q_answer[q_index] != num) {
		attemp--;
		if (attemp < 0)
			gameOver();
		else 
			alert("Attempt left: "+ attemp);
	} else {
		alert("Great job, next question.")
		q_index++;
		$('#bg_div').html("");
		html = '<div class="suspect_title"><p style="font-size: 2.2vw;">'+questions[q_index]+'</p></div>'
		$('#bg_div').append(html);
		if (q_index >= questions.length) 
			Win();
	}
}

function Win() {
	var elem = document.getElementById("left_div");
	elem.style.display = "none";
	elem = document.getElementById("right_div");
	elem.style.display = "none";
	setBackground("room");
	index_of_text = 0;
	stage = 4;
	showCanvas(conclusion[0]);
}

function gameOver() {
	alert("Game Over!!");
	stage = 1;
	inRoomInfo = false;
	game_start = false;
	done = true;
	index_of_text = 0;
	loadScene = false;
	show = false;
	scene = 0;
	inPlace = false;
	inSuspect = false;
	suspect = 0;
	choice = 0;
	q_index = 0;
	attemp = 5;
	var elem = document.getElementById("left_div");
	elem.style.display = "none";
	elem = document.getElementById("right_div");
	elem.style.display = "none";
	elem = document.getElementById("start_sec");
	elem.style.display = "block";
    $('#bg_div').html("");
}


//Basic function
function setBackground(pic) {
	var elem = document.getElementById("bg_div");
	elem.innerHTML = "";
	html = '<img class="bg" src="/img/'+pic+'.png"></img>';
	$('#bg_div').append(html);
}

function showCanvas(text) {
	var elem = document.getElementById("canvas");
	elem.style.display = "block";
	var spanWidth = $('#text span').width();
	printLetterByLetter("canvas", text, 0);
	index_of_text++;
}

function hideCanvas() {
	var elem = document.getElementById("canvas");
	$('#canvas').html("");
	elem.style.display = "none";
}

function printLetterByLetter(destination, message, speed){
    var i = 0;
    done = false;
    console.log(message);
    var interval = setInterval(function(){
    document.getElementById(destination).innerHTML += message.charAt(i);
        i++;
        if (i > message.length){
            clearInterval(interval);
            done = true;
        }
    }, speed);
}

function submitForm() {
    var form = document.getElementById("form").elements;
    var g = false;
    if (guess == 1)
    	g = true;
    var userInfo = { 'username': form.username.value, 'guess': g};
    console.log(userInfo);

    $.ajax({
        type: 'POST',
        data: JSON.stringify(userInfo),
        contentType: 'application/json',
        //url: 'http://localhost:5000/submitForm',
        url: 'https://secret-wildwood-68690.herokuapp.com/submitForm',                   
        success: function(data) {
        	console.log('success');
    		console.log(JSON.stringify(data));
    		var d = JSON.stringify(data);
    		hideCanvas();
    		$('#bg_div').html("");
    		var form_sec = document.getElementById("form_sec");
    		form_sec.style.display = "none";
    		console.log(data[0]);
    		$('#bg_div').html(JSON.stringify(data));
        }
    })
}
