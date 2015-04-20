#pragma strict

private var VERSION = "v0.0.1";

function Start() {
	PhotonNetwork.logLevel = PhotonLogLevel.Full;
	PhotonNetwork.ConnectUsingSettings(VERSION);
	PhotonNetwork.playerName = PlayerPrefs.GetString("playerName", "Guest" + Random.Range(1,9999));
}

function OnGUI() {
	// GUILayout.Label(PhotonNetwork.connectionStateDetailed.ToString());
	if(!PhotonNetwork.connected) {
		showConnectionMesg();
		return;
	}
	else if(PhotonNetwork.room) { return; }

	GUILayout.BeginArea(new Rect((Screen.width - 900) / 2, (Screen.height - 600) / 2, 900, 600));
	GUILayout.Label("Main Menu");
	GUILayout.EndArea();
}

function showConnectionMesg() {
	GUILayout.BeginArea(new Rect((Screen.width - 900) / 2, (Screen.height - 600) / 2, 900, 600));
	GUILayout.Label("Connecting to the game network...");
	GUILayout.EndArea();
}