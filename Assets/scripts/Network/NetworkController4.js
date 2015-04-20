#pragma strict

var roomNameOld = "space";
var roomList: RoomInfo[];
private var VERSION = "v0.0.1";

var inLobby: boolean = false;
var roomListComplete: boolean = false;

static var exists: boolean = false;

private var roomName: String;
private var spawnPoint: GameObject;
private var playerName: String;

function Start() {
	if(exists) {
		Destroy(gameObject);
	}
	else {
		exists = true;

		DontDestroyOnLoad(gameObject);
		PhotonNetwork.logLevel = PhotonLogLevel.Full;
		PhotonNetwork.ConnectUsingSettings(VERSION);
	}
}

function OnGUI() {
	GUILayout.Label(PhotonNetwork.connectionStateDetailed.ToString());
}

function OnJoinedLobby() {
	inLobby = true;
}

function OnReceivedRoomListUpdate() {
	roomList = PhotonNetwork.GetRoomList();
	roomListComplete = true;
}

// function CreateNewRoom() {
// 	Debug.Log("trying to connect");
// 	playerName = GameObject.Find("PlayerName").transform.Find("Text").GetComponent.<UI.Text>().text;
// 	roomName = GameObject.Find("NewGameName").GetComponent.<UI.Text>().text;
// 	var roomOptions: RoomOptions = new RoomOptions();
// 	PhotonNetwork.JoinOrCreateRoom(roomName, roomOptions, TypedLobby.Default);
// }

function OnJoinedRoom() {
	inLobby = false;
	PhotonNetwork.LoadLevel("level1");
}

function OnLevelWasLoaded() {
	Debug.Log("blahblahblahblahblahblah");
	if(PhotonNetwork.room) {
		spawnPoint = GameObject.FindWithTag("Respawn");
		var player = PhotonNetwork.Instantiate("player", spawnPoint.transform.position, spawnPoint.transform.rotation, 0);
		player.transform.Find("playerName").GetComponent.<TextMesh>().text = playerName;
	}
}

function OnLeftRoom() {
	PhotonNetwork.LoadLevel("lobby");
}