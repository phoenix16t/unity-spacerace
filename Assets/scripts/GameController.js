#pragma strict

var photonView: PhotonView;
var score: int = 0;
var rank: int = 0;

function OnJoinedRoom() {
	var player = PhotonNetwork.Instantiate('player', Vector3.zero, Quaternion.Euler(0,90,0), 0);
}

function OnGUI() {
	if(!PhotonNetwork.room) { return; }

	GUILayout.BeginHorizontal(GUILayout.Width(900));
		GUILayout.FlexibleSpace();
		GUILayout.Label('Score: ' + score, (GUILayout.Width(100)));
		GUILayout.Label('Rank: ' + rank, GUILayout.Width(350));
		if(GUILayout.Button('To Lobby')) {
			PhotonNetwork.LeaveRoom();
		}
	GUILayout.EndHorizontal();
}

function OnLeftRoom() {
	Application.LoadLevel(Application.loadedLevel);
}

@RPC
function asteroidHit(asteroidId: int, laserOwner: int, laserId: int) {
	var asteroids = GameObject.FindGameObjectsWithTag('asteroid');
	for(var asteroid in asteroids) {
		if(asteroid.GetComponent.<AsteroidController>().asteroidId == asteroidId) {
			Destroy(asteroid);
		}
	}

	var lasers = GameObject.FindGameObjectsWithTag('Laser');
	for(var laser in lasers) {
		var laserController = laser.GetComponent.<LaserController>();
		if(laserController.ownerId == laserOwner && laserController.laserId == laserId) {
			Destroy(laser);
		}
	}

	var players = GameObject.FindGameObjectsWithTag('Player');
	for(var player in players) {
		var playerController = player.GetComponent.<PlayerController>();
		if(player.GetComponent.<PhotonView>().viewID == laserOwner) {
			// playerController.score
		}
	}
}