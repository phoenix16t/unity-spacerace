#pragma strict

var photonView: PhotonView;
var scores = new Array();
var rank: int = 0f;
var startDelay: float = 10f;
var AsteroidSpawner: GameObject;

private var gameIsPlaying: boolean = false;
private var startTime: float = 0f;
private var startCountDown: boolean = false;
private var timeLeft: float;

private var timerStarted: boolean = false;

var mySkin: GUISkin;
private var showRankings: boolean = false;

var props = new ExitGames.Client.Photon.Hashtable();
props.Add('isAlive', true);
props.Add('score', 0f);

private var allDead: boolean = false;
private var replied: boolean = false;

var cooldownTime: int = 5f;
private var isCoolingDown: boolean = false;
private var cooldown: int = 0f;

//////////////////////////////////////////////////
///// Game logic
//////////////////////////////////////////////////
function Update() {
	if(!gameIsPlaying && !isCoolingDown && PhotonNetwork.room) {
		if(!timerStarted && PhotonNetwork.isMasterClient) {
			startTime = startDelay + PhotonNetwork.time;
			timerStarted = true;
			replied = true;
		}
		else if(!timerStarted) {
			photonView.RPC('GetStartTime', PhotonTargets.MasterClient);
			timerStarted = true;
		}

		if(timerStarted && startTime > 0 && replied) {
			if(startTime > PhotonNetwork.time) {
				timeLeft = startTime - PhotonNetwork.time;
			}
			else if(startTime <= PhotonNetwork.time) {
				gameIsPlaying = true;
				timerStarted = false;
				replied = false;
				StartGame();
			}
		}
	}
	else if(gameIsPlaying) {
		allDead = true;
		for(var thisPlayer in PhotonNetwork.playerList) {
			if(thisPlayer.customProperties['isAlive']) {
				allDead = false;
			}
		}
		if(allDead) {
			gameIsPlaying = false;
			allDead = false;
			isCoolingDown = true;
		}
	}
	else if(isCoolingDown) {
		if(cooldown == 0) {
			cooldown = cooldownTime + Time.time;
		}
		else if(cooldown <= Time.time) {
			isCoolingDown = false;
			cooldown = 0f;
		}
	}

	if(Input.GetKeyDown('tab')) {
		showRankings = true;
	}
	else if(Input.GetKeyUp('tab')) {
		showRankings = false;
	}
}

@RPC
function GetStartTime() {
	if(PhotonNetwork.isMasterClient) {
		photonView.RPC('SetStartTime', PhotonTargets.All, startTime);
	}
}

@RPC
function SetStartTime(newTime: float) {
	Debug.Log('newTime ' + newTime);
	startTime = newTime;
	replied = true;
}

function StartGame() {
	props['isAlive'] = true;
	props['score'] = 0;
	PhotonNetwork.player.SetCustomProperties(props);

	var player = PhotonNetwork.Instantiate('player', Vector3.zero, Quaternion.Euler(0,90,0), 0);
	AsteroidSpawner.SetActive(true);
}


//////////////////////////////////////////////////
///// GUI
//////////////////////////////////////////////////
function OnGUI() {
	if(!PhotonNetwork.room) { return; }

	if(!gameIsPlaying && !isCoolingDown) {
		GUILayout.Space(50);

		GUILayout.BeginHorizontal(GUILayout.Width(900));
			GUILayout.FlexibleSpace();
			GUILayout.Label('Next round starts in ' + timeLeft.ToString('F2') + ' seconds');
			GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

		GUILayout.Space(100);

		GUILayout.BeginHorizontal(GUILayout.Width(900));
			GUILayout.FlexibleSpace();
			GUILayout.Label('Players:');
			GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

		for(var thisPlayer in PhotonNetwork.playerList) {
			GUILayout.BeginHorizontal(GUILayout.Width(900));
				GUILayout.FlexibleSpace();
				GUILayout.Label(thisPlayer.name);
				GUILayout.FlexibleSpace();
			GUILayout.EndHorizontal();
		}

		startCountDown = true;
	}
	else {
		GUILayout.BeginHorizontal(GUILayout.Width(900));
			GUILayout.FlexibleSpace();
			GUILayout.Label('Score: ' + PhotonNetwork.player.customProperties['score'], GUILayout.Width(100));
			GUILayout.Label('Rank: ' + rank, GUILayout.Width(350));
			if(GUILayout.Button('To Lobby')) {
				PhotonNetwork.LeaveRoom();
			}
		GUILayout.EndHorizontal();

		if(showRankings) {
			GUI.skin = mySkin;
				GUILayout.Window(0, Rect(300, 100, 300, 400), displayRankings, 'Rankings');
			GUI.skin = null;
		}
	}
}

function displayRankings(id: int) {
	GUILayout.Space(30);

	var scoreList = new Array();
	for(var thisPlayer in PhotonNetwork.playerList) {
		var score: int = thisPlayer.customProperties['score'];
		var status: String = thisPlayer.customProperties['isAlive'] ? 'Alive' : 'Splat';
		scoreList.push(score.ToString('D4') + '.' + thisPlayer.name + '.' + score + '.' + status);
	}

	scoreList.Sort().Reverse();

	GUILayout.BeginHorizontal(GUILayout.Width(300));
		GUILayout.FlexibleSpace();
		GUILayout.Label('Rank', GUILayout.Width(50));
		GUILayout.Label('Name', GUILayout.Width(50));
		GUILayout.Label('Kills', GUILayout.Width(50));
		GUILayout.Label('Status', GUILayout.Width(85));
	GUILayout.EndHorizontal();

	var counter: int = 1;
	for(var thisPlayer: String in scoreList) {
		var playerInfo = thisPlayer.Split('.'[0]);
		var rankSuffix = ['st','nd','rd'];

		var rankText = counter <= rankSuffix.length ? counter + rankSuffix[counter-1] : counter.ToString();

		GUILayout.BeginHorizontal(GUILayout.Width(300));
			GUILayout.FlexibleSpace();
			GUILayout.Label(rankText, GUILayout.Width(50));
			GUILayout.Label(playerInfo[1], GUILayout.Width(50));
			GUILayout.Label(playerInfo[2], GUILayout.Width(50));
			GUILayout.Label(playerInfo[3], GUILayout.Width(85));
		GUILayout.EndHorizontal();

		counter++;
	}
}


function OnLeftRoom() {
	Application.LoadLevel(Application.loadedLevel);
}

function asteroidHit(asteroidId: int, laserId: int, laserOwnerId: int) {
	if(PhotonNetwork.isMasterClient) {
		for(thisPlayer in PhotonNetwork.playerList) {
			if(thisPlayer.ID == laserOwnerId) {
				var scoreaaaa: int = thisPlayer.customProperties['score'];
				scoreaaaa++;
				props['score'] = scoreaaaa;
				thisPlayer.SetCustomProperties(props);
			}
		}

		photonView.RPC('asteroidHitRPC', PhotonTargets.AllViaServer, asteroidId, laserId, laserOwnerId);
	}
}

@RPC
function asteroidHitRPC(asteroidId: int, laserId: int, laserOwnerId: int) {
	var asteroids = GameObject.FindGameObjectsWithTag('asteroid');
	for(var asteroid in asteroids) {
		if(asteroid.GetComponent.<AsteroidController>().asteroidId == asteroidId) {
			Destroy(asteroid);
		}
	}

	var lasers = GameObject.FindGameObjectsWithTag('Laser');
	for(var laser in lasers) {
		var laserController = laser.GetComponent.<LaserController>();
		if(laserController.ownerId == laserOwnerId && laserController.laserId == laserId) {
			Destroy(laser);
		}
	}
}
