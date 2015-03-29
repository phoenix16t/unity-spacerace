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
	PhotonNetwork.logLevel = PhotonLogLevel.Full;
	PhotonNetwork.ConnectUsingSettings(VERSION);

	spawnPoint = GameObject.FindWithTag("Respawn");
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
	roomName = GameObject.Find("NewGameName").Find("Text").GetComponent.<UI.Text>().text;
	PhotonNetwork.CreateRoom(roomName);
}

function OnJoinedRoom() {
//	namez = PhotonNetwork.RoomInfo.name;
//	Debug.Log("namez " + namez);
	
	// var list = PhotonNetwork.GetRoomList();
	// Debug.Log("rooms " + list.length);

Debug.Log("calling");
	PhotonNetwork.LoadLevel("level1");
}

function OnLevelWasLoaded() {
Debug.Log("Arrived");

	// PhotonNetwork.Instantiate("player", spawnPoint.transform.position, spawnPoint.transform.rotation, 0);

	PhotonNetwork.Instantiate("player", Vector3.zero, Quaternion.identity, 0);
}

/*
function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(stream.isWriting == true) {
		stream.SendNext(joinGame);
	}
	else {
		Debug.Log("joined " + stream.ReceiveNext());	
	}
}

function OnReceivedRoomListUpdate() {
	roomList = PhotonNetwork.GetRoomList();

	if(roomList.length == 0) {
		GameReady();
	}
	else if(roomList.length != 0) {
		GameInProgress();
	}
}

function GameInProgress() {
	if(roomList.length == 0) {
		GameReady();
	}
	else {
		status.text = "Game in session. Please wait...";
		joinButton.GetComponent(UI.Button).interactable = false;
		
		joinButton.SetActive(true);
		cancelButton.SetActive(false);
		startButton.SetActive(false);
	}
}

function GameReady() {
	joinGame = false;
	nameField.enabled = true;

	if(roomList && roomList.length != 0) {
		GameInProgress();
	}
	else {
		status.text = "Ready to play";
		joinButton.GetComponent(UI.Button).interactable = true;
		
		joinButton.SetActive(true);
		cancelButton.SetActive(false);
		startButton.SetActive(false);
	}
}

function StartGame() {
	if(!nameField.text) {
		GameReady();
	}
	else {
		nameField.enabled = false;
		status.text = "Joined. Click Start or Cancel";
		joinButton.SetActive(false);
		cancelButton.SetActive(true);
		startButton.SetActive(true);
		
		joinGame = true;
		
//		Debug.Log("player " + PhotonNetwork.playerList[0] + " name " + nameField.text);
	}
}
*/
