#pragma strict

var photonView: PhotonView;
var scores = new Array();
var rank: int = 0;
var startDelay: float = 10;
var AsteroidSpawner: GameObject;

// var livingPlayers = new Array();

private var gameIsPlaying: boolean = false;
private var startTime: float = 0;
private var startCountDown: boolean = false;
private var timeLeft: float;

private var ztimerStarted: boolean = false;
// private var z-requestStartTime: boolean = false;


// function OnJoinedRoom() {
// 	var player = PhotonNetwork.Instantiate('player', Vector3.zero, Quaternion.Euler(0,90,0), 0);
// 	Debug.Log("id " + photonView.viewID);
// 	Debug.Log("id " + player.GetComponent.<PhotonView>());

// 	// 	for(var thisPlayer in PhotonNetwork.playerList) {
// 	// 	Debug.Log("id " + thisPlayer.ID);
// 	// }



// 	photonView.RPC('newPlayer', PhotonTargets.All, photonView.viewID);
// }

@RPC
function newPlayer(newId: int) {
	Debug.Log("newid " + newId);
	scores[newId] = 0;
}

function Update() {
	// if(PhotonNetwork.isMasterClient) {
	// 	Debug.Log("time " + PhotonNetwork.time);
	// }
	// else {
	// 	photonView.RPC("disTime", PhotonTargets.All, PhotonNetwork.time);
	// }





	// if(startCountDown) {
	// 	if(startTime == 0 && PhotonNetwork.isMasterClient) {
	// 		startTime = startDelay + Time.time;
	// 	}
	// 	else if(startCountDown && timeLeft <= 0) {
	// 		StartGame();
	// 		startCountDown = false;
	// 		startTime = 0;
	// 		timeLeft = 0;
	// 	}
	// 	timeLeft = startTime - Time.time;
	// }

	if(!gameIsPlaying && PhotonNetwork.room) {
		if(!ztimerStarted && PhotonNetwork.isMasterClient) {
			startTime = startDelay + PhotonNetwork.time;
			ztimerStarted = true;
			// Debug.Log("startTime " + startTime);
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
}

// @RPC
// function disTime(temp: double) {
// 	Debug.Log("dis " + temp);
// }

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
	// for(var thisPlayer in PhotonNetwork.playerList) {
	// 	// livingPlayers[thisPlayer.ID] = true;
	// 	// thisPlayer.SetCustomProperties
	// }


	var props = new ExitGames.Client.Photon.Hashtable();
	props.Add("isAlive", true);
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

		// var allPlayers = new Array();
		// allPlayers = PhotonNetwork.playerList;

		
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
			GUILayout.Label('Score: ' + scores, (GUILayout.Width(100)));
			GUILayout.Label('Rank: ' + rank, GUILayout.Width(350));
			if(GUILayout.Button('To Lobby')) {
				PhotonNetwork.LeaveRoom();
			}
		GUILayout.EndHorizontal();

		if(Input.GetKeyDown('tab')) {
			Debug.Log("lsdkfjsdlfjowiefjsjvlkxn,mbaelfj,mbsn,");
			GUI.backgroundColor = Color.red;
			GUI.color = Color.yellow;
		}
			GUILayout.BeginHorizontal(GUILayout.Width(900));
				GUILayout.FlexibleSpace();
				GUILayout.Label("sldkfjsdlkfj");
			GUILayout.EndHorizontal();
	}
}

function OnLeftRoom() {
	Application.LoadLevel(Application.loadedLevel);
}

function asteroidHit(asteroidId: int, laserId: int, laserOwnerId: int) {

// Debug.Log("index " + laserOwnerId);
// scores[laserOwnerId] = 1;
// Debug.Log("score " + scores[laserOwnerId]);

	var newScore: int;

	if(!scores[laserOwnerId]) {
		newScore = 0;
	}
	else if(scores[laserOwnerId]) {
		newScore = scores[laserOwnerId];
	}
	else {
		newScore = 0;
	}
	newScore++;

	photonView.RPC('asteroidHitRPC', PhotonTargets.AllViaServer, asteroidId, laserId, laserOwnerId, newScore);
}

@RPC
function asteroidHitRPC(asteroidId: int, laserId: int, laserOwnerId: int, newScore: int) {

Debug.Log("new score " + newScore);

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

	// var players = GameObject.FindGameObjectsWithTag('Player');
	// for(var player in players) {
	// 	var playerController = player.GetComponent.<PlayerController>();
	// 	if(player.GetComponent.<PhotonView>().viewID == laserOwnerId) {
	// 		// playerController.score
	// 	}
	// }

	scores[laserOwnerId] = newScore;

}