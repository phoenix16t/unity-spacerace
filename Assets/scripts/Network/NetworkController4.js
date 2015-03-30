#pragma strict

var roomNameOld = "space";
var roomList: RoomInfo[];
private var VERSION = "v0.0.1";

var inLobby: boolean = false;
var roomListComplete: boolean = false;
private var roomName: String;
private var namez: String;

private var spawnPoint: GameObject;

function Start() {
	DontDestroyOnLoad(transform.gameObject);
	PhotonNetwork.logLevel = PhotonLogLevel.Full;
	PhotonNetwork.ConnectUsingSettings(VERSION);
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

function CreateNewRoom() {
	roomName = GameObject.Find("NewGameName").GetComponent.<UI.Text>().text;
	PhotonNetwork.CreateRoom(roomName);
}

function OnJoinedRoom() {
	PhotonNetwork.LoadLevel("level1");
}

function OnLevelWasLoaded() {
	spawnPoint = GameObject.FindWithTag("Respawn");

	PhotonNetwork.Instantiate("player", spawnPoint.transform.position, spawnPoint.transform.rotation, 0);
}