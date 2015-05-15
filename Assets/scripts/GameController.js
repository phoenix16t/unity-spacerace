#pragma strict

var photonView: PhotonView;
var scores = new Array();
var rank: int = 0;
var startDelay: int = 10;
var AsteroidSpawner: GameObject;
private var gameIsPlaying: boolean = false;
private var startTime: int = 0;
private var startCountDown: boolean = false;
private var timeLeft: float;

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
	if(startCountDown) {
		if(startTime == 0) {
			startTime = startDelay + Time.time;
		}
		else if(startCountDown && timeLeft <= 0) {
			StartGame();
			startCountDown = false;
			startTime = 0;
			timeLeft = 0;
		}
		timeLeft = startTime - Time.time;
	}
}

function StartGame() {
	var player = PhotonNetwork.Instantiate('player', Vector3.zero, Quaternion.Euler(0,90,0), 0);
	AsteroidSpawner.SetActive(true);
	gameIsPlaying = true;
}

function OnGUI() {
	if(!PhotonNetwork.room) { return; }

	if(!gameIsPlaying) {
		GUILayout.BeginHorizontal(GUILayout.Width(900));
			GUILayout.FlexibleSpace();
			GUILayout.Label('Next round starts in ' + timeLeft.ToString('F2') + ' seconds');
			GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

		var allPlayers = new Array();
		allPlayers = PhotonNetwork.playerList;

		for(var thisPlayer in allPlayers.Sort()) {
			GUILayout.BeginHorizontal(GUILayout.Width(300));
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