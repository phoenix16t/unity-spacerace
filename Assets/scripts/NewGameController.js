#pragma strict

function OnJoinedRoom() {
	var player = PhotonNetwork.Instantiate("player", Vector3.zero, Quaternion.Euler(0,90,0), 0);
	// player.transform.Find("playerName").GetComponent.<TextMesh>().text = PhotonNetwork.playerName;
}

function OnGUI() {
	if(!PhotonNetwork.room) { return; }

	GUILayout.BeginHorizontal(GUILayout.Width(900));
		GUILayout.FlexibleSpace();
		if(GUILayout.Button("To Lobby")) {
			PhotonNetwork.LeaveRoom();
		}
	GUILayout.EndHorizontal();
}

function OnLeftRoom() {
	Application.LoadLevel(Application.loadedLevel);
}
