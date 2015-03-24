#pragma strict

var roomName = "space";
var asteroidController: boolean = false;
private var VERSION = "v0.0.1";
private var spawnPoint: GameObject;

function Start() {
	spawnPoint = GameObject.FindWithTag("Respawn");

	PhotonNetwork.logLevel = PhotonLogLevel.Full;
	PhotonNetwork.ConnectUsingSettings(VERSION);
}

function OnGUI() {
	GUILayout.Label(PhotonNetwork.connectionStateDetailed.ToString());
}

function OnJoinedLobby() {
//	PhotonNetwork.JoinRandomRoom();
	var roomOptions: RoomOptions = new RoomOptions();
	PhotonNetwork.JoinOrCreateRoom(roomName, roomOptions, TypedLobby.Default);
}

function OnPhotonRandomJoinFailed() {
//	PhotonNetwork.CreateRoom(null);
	var roomOptions: RoomOptions = new RoomOptions();
	PhotonNetwork.JoinOrCreateRoom(roomName, roomOptions, TypedLobby.Default);
}

function OnCreatedRoom() {
	Debug.Log("Room name: " + PhotonNetwork.room.name);
	asteroidController = true;
}

function OnJoinedRoom() {
	PhotonNetwork.Instantiate("player", spawnPoint.transform.position, spawnPoint.transform.rotation, 0);
	
//	if(PhotonNetwork.isMasterClient) {
//		GameObject.FindWithTag("AsteroidSpawner").GetComponent.<NetworkAsteroidSpawner>().spawner = true;
//	}
}