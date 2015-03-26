#pragma strict

var roomName = "space";
var roomName2 = "space2";
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
	var roomOptions: RoomOptions = new RoomOptions();
	PhotonNetwork.JoinOrCreateRoom(roomName, roomOptions, TypedLobby.Default);
//	PhotonNetwork.CreateRoom(roomName, roomOptions, TypedLobby.Default);
//	PhotonNetwork.CreateRoom(roomName);
//	PhotonNetwork.CreateRoom(roomName2);
	
//	PhotonNetwork.JoinRoom(roomName);


	var roomList = PhotonNetwork.GetRoomList();
//	var playerList = PhotonNetwork.playerList;
//	Debug.Log("roomlist " + roomList[0].name);
//	Debug.Log("playerlist " + playerList);

}

function OnReceivedRoomListUpdate() {
	Debug.Log("lskdjfsldjfsdlkfjsdlkfjsdlfkjsdlfkj");
	
	var roomList = PhotonNetwork.GetRoomList();
//	var playerList = PhotonNetwork.playerList;
	Debug.Log("roomlist " + roomList[0].name);
}

function OnCreatedRoom() {

	var roomList = PhotonNetwork.GetRoomList();
//	var playerList = PhotonNetwork.playerList;
	Debug.Log("roomlist " + roomList.length);
//	Debug.Log("playerlist " + playerList);


	Debug.Log("Room name: " + PhotonNetwork.room.name);
	Debug.Log("r count " + PhotonNetwork.GetRoomList().Length);

	
//	int i = 0;

//	for( var roomInfo: RoomInfo in PhotonNetwork.GetRoomList() )
//	{
//		Debug.Log("rrrrrr " + roomInfo);
////	GUI.Box( new Rect( 20, 20 + (i * 30), 300, 25 ), roomInfo.name + " " + roomInfo.playerCount + "/" + roomInfo.maxPlayers );
////
////	if ( GUI.Button( new Rect( 320, 20 + (i * 30), 100, 25 ), "Join Server") )
////	{
////	 PhotonNetwork.JoinRoom(roomInfo.name);
////	}
//
////	i++;
//	}
}

function OnJoinedRoom() {
	PhotonNetwork.Instantiate("player", spawnPoint.transform.position, spawnPoint.transform.rotation, 0);
}