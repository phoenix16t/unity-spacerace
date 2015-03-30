#pragma strict

var roomName = "space";
private var roomList: RoomInfo[];
private var VERSION = "v0.0.1";
private var gameReady: boolean = false;
private var spawnPoint: GameObject;
private var status: UI.Text;
private var joinGame: boolean = false;
private var joinButton: GameObject;
private var cancelButton: GameObject;
private var startButton: GameObject;
private var nameField: UI.InputField;
private var photonView: PhotonView;

var tempJoined;

function Start() {
	photonView = GetComponent(PhotonView);
	PhotonNetwork.logLevel = PhotonLogLevel.Full;
	PhotonNetwork.ConnectUsingSettings(VERSION);
	status = GameObject.Find("Status").GetComponent(UI.Text);
	joinButton = GameObject.Find("JoinButton");
	cancelButton = GameObject.Find("CancelButton");
	cancelButton.SetActive(false);
	startButton = GameObject.Find("StartButton");
	startButton.SetActive(false);
	nameField = GameObject.Find("InputField").GetComponent.<UI.InputField>();
	
	GameReady();
}

function OnGUI() {
	GUILayout.Label(PhotonNetwork.connectionStateDetailed.ToString());
}

function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(stream.isWriting == true) {
		stream.SendNext(joinGame);
	}
	else {
		tempJoined = stream.ReceiveNext();
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
	}
}

function Update() {
	Debug.Log("joined " + tempJoined);
}