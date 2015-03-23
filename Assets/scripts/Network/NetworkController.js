#pragma strict

var roomName = "space";
private var VERSION = "v0.0.1";

function Start() {
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
}

function OnJoinedRoom() {
	PhotonNetwork.Instantiate("player", Vector3(0,0,0), Quaternion.identity, 0);
}