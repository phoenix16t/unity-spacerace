#pragma strict

function Start() {
	PhotonNetwork.logLevel = PhotonLogLevel.Full;
	PhotonNetwork.ConnectUsingSettings("0.1");
}

function OnGUI() {
	GUILayout.Label(PhotonNetwork.connectionStateDetailed.ToString());
}

function OnJoinedLobby() {
	PhotonNetwork.JoinRandomRoom();
}

function OnPhotonRandomJoinFailed() {
	PhotonNetwork.CreateRoom(null);
}

function OnCreatedRoom() {
	Debug.Log("Room name: " + PhotonNetwork.room.name);
}

function OnJoinedRoom() {
//	var player = PhotonNetwork.Instantiate("player", Vector3(0,0,0), Quaternion.identity, 0);
//	var playerName = PhotonNetwork.Instantiate("playerName", Vector3(0,0,0), Quaternion.identity, 0);
//	Debug.Log("asldkfjslkdjflskdjfsldkfjsdlkfjsd" + playerName.GetComponent(ObjectLabel));
//	playerName.GetComponent(ObjectLabel).target = player.transform;
//	Debug.Log("asldkfjslkdjflskdjfsldkfjsdlkfjsd" + playerName.GetComponent(ObjectLabel).target);
}