#pragma strict

private var ns: NetworkController4;
private var status: UI.Text;
private var roomList: UI.Text;
private var playerName: UI.Text;
private var roomName: UI.Text;
private var createButton: UI.Button;
private var joinButton: UI.Button;

function Start() {
  ns = GameObject.Find("NetworkManager").GetComponent.<NetworkController4>();
  status = GameObject.Find("Status").GetComponent.<UI.Text>();
  roomList = GameObject.Find("RoomList").GetComponent.<UI.Text>();
  playerName = GameObject.Find("PlayerName").Find("Text").GetComponent.<UI.Text>();
  roomName = GameObject.Find("NewGameName").Find("Text").GetComponent.<UI.Text>();
  createButton = GameObject.Find("CreateButton").GetComponent.<UI.Button>();
  joinButton = GameObject.Find("JoinButton").GetComponent.<UI.Button>();
}

function Update() {
  if(roomName.text) {
    createButton.interactable = true;
  }
  else {
    createButton.interactable = false;
  }

  if(!ns.inLobby) {
    status.text = "Logging in...";
    createButton.interactable = false;
  }  
  else if(ns.inLobby && !ns.roomListComplete) {
    status.text = "Logged in. Finding rooms...";
  }
  else if(ns.inLobby && ns.roomListComplete) {
    if(ns.roomList.length == 0) {
      status.text = "Logged in. No rooms found";
      joinButton.interactable = false;
    }
    else {
      status.text = "Logged in";
      roomList.text = "<rooms listed here>";
      joinButton.interactable = true;
    }
  }
}