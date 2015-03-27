#pragma strict

var roomName = "space";
var roomList: RoomInfo[];
private var VERSION = "v0.0.1";
private var gameReady: boolean = false;
private var spawnPoint: GameObject;
private var status: UI.Text;
private var joinGame: boolean = false;
private var joinButton: UI.Button;
private var startButton: GameObject;

function Start() {
	PhotonNetwork.logLevel = PhotonLogLevel.Full;
	PhotonNetwork.ConnectUsingSettings(VERSION);
	status = GameObject.Find("Status").GetComponent(UI.Text);
	joinButton = GameObject.Find("JoinButton").GetComponent(UI.Button);
	startButton = GameObject.Find("StartButton");
	Debug.Log("start" + startButton + "sldfkj" + joinButton);
}

function OnGUI() {
	GUILayout.Label(PhotonNetwork.connectionStateDetailed.ToString());
}

function OnReceivedRoomListUpdate() {
	roomList = PhotonNetwork.GetRoomList();
	Debug.Log("list " + roomList.length);

	if(roomList.length == 0) {
		status.text = "Ready to play";
//		joinGame = true;
		joinButton.interactable = true;
	}
	else {
		status.text = "Game in session. Please wait...";
//		joinGame = false;
		joinButton.interactable = false;
	}


//	var playerList = PhotonNetwork.playerList;
//	Debug.Log("roomlist " + roomList[0].name);
	// Debug.Log("roomlist2 " + roomList.length);
	
	// if(roomList.length == 0) {
	// 	gameReady = true;
	// }
	// else {
	// 	gameReady = false;
	// }
}

function StartGame() {
	status.text = "Joined. Click Start or Cancel";
	startButton.SetActive(true);
}

//function Update() {
//	if(joinGame) {
//		
//	}
//}