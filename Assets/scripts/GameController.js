#pragma strict

var photonView: PhotonView;
var scores = new Array();
var rank: int = 0;
var startDelay: float = 10;
var AsteroidSpawner: GameObject;

private var gameIsPlaying: boolean = false;
private var startTime: float = 0;
private var startCountDown: boolean = false;
private var timeLeft: float;

private var ztimerStarted: boolean = false;

var mySkin: GUISkin;
private var showRankings: boolean = false;

var props = new ExitGames.Client.Photon.Hashtable();

function Update() {
	if(!gameIsPlaying && PhotonNetwork.room) {
		if(!ztimerStarted && PhotonNetwork.isMasterClient) {
			startTime = startDelay + PhotonNetwork.time;
			ztimerStarted = true;
		}
		else if(!ztimerStarted) {
			photonView.RPC('GetStartTime', PhotonTargets.MasterClient);
			ztimerStarted = true;
		}

		if(ztimerStarted && startTime > 0) {
			if(startTime > PhotonNetwork.time) {
				timeLeft = startTime - PhotonNetwork.time;
			}
			else if(startTime <= PhotonNetwork.time) {
				gameIsPlaying = true;
				ztimerStarted = false;
				StartGame();
			}
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
	Debug.Log("newTime " + newTime);
	startTime = newTime;
}

function StartGame() {
	props.Add("isAlive", true);
	props.Add("score", 0);
	PhotonNetwork.player.SetCustomProperties(props);

	var player = PhotonNetwork.Instantiate('player', Vector3.zero, Quaternion.Euler(0,90,0), 0);
	AsteroidSpawner.SetActive(true);
}

function OnGUI() {
	if(!PhotonNetwork.room) { return; }

	if(!gameIsPlaying) {
		GUILayout.Space(50);

		GUILayout.BeginHorizontal(GUILayout.Width(900));
			GUILayout.FlexibleSpace();
			GUILayout.Label('Next round starts in ' + timeLeft.ToString('F2') + ' seconds');
			GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

		GUILayout.Space(100);

		GUILayout.BeginHorizontal(GUILayout.Width(900));
			GUILayout.FlexibleSpace();
			GUILayout.Label("Players:");
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
			GUILayout.Label('Score: ' + PhotonNetwork.player.customProperties['score'], (GUILayout.Width(100)));
			GUILayout.Label('Rank: ' + rank, GUILayout.Width(350));
			if(GUILayout.Button('To Lobby')) {
				PhotonNetwork.LeaveRoom();
			}
		GUILayout.EndHorizontal();

		if(showRankings) {
			GUI.skin = mySkin;
				GUILayout.Window(0, Rect(300, 100, 300, 400), rankings, 'Rankings');
			GUI.skin = null;
		}
	}
}

function rankings(id: int) {
	GUILayout.Space(30);
	for(var thisPlayer in PhotonNetwork.playerList) {
		GUILayout.BeginHorizontal(GUILayout.Width(300));
			GUILayout.FlexibleSpace();
			GUILayout.Label(thisPlayer.name + thisPlayer.customProperties['score']);
			GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	}

	for(var thisPlayer in PhotonNetwork.playerList) {
		GUILayout.BeginHorizontal(GUILayout.Width(300));
			GUILayout.FlexibleSpace();
			GUILayout.Label(thisPlayer.name + thisPlayer.customProperties['score']);
			GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
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
