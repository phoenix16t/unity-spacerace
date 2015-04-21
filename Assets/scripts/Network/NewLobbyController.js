#pragma strict

private var VERSION = "v0.0.1";
private var roomName: String;
private var scrollPos: Vector2 = Vector2.zero;

function Start() {
	PhotonNetwork.logLevel = PhotonLogLevel.Full;
	PhotonNetwork.ConnectUsingSettings(VERSION);
	PhotonNetwork.playerName = PlayerPrefs.GetString("playerName", "Guest" + Random.Range(1,9999));
	roomName = PhotonNetwork.playerName + "'s room";
}

function OnGUI() {
	// GUILayout.Label(PhotonNetwork.connectionStateDetailed.ToString());
	if(!PhotonNetwork.connected) {
		showConnectionMesg();
		return;
	}
	else if(PhotonNetwork.room) { return; }

	GUILayout.BeginArea(new Rect(300, 0, 300, 600));
		// Title
		GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
			GUILayout.Label("Main Menu");
			GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

		// Name
		GUILayout.BeginHorizontal();
			GUILayout.Label("Name:", GUILayout.Width(75));
			GUILayout.FlexibleSpace();
			var newName = GUILayout.TextField(PhotonNetwork.playerName, GUILayout.Width(205));
			if(newName != PhotonNetwork.playerName) {
				PhotonNetwork.playerName = newName;
				PlayerPrefs.SetString("playerName", PhotonNetwork.playerName);
			}
		GUILayout.EndHorizontal();

		// Join room
		// GUILayout.BeginHorizontal();
		// 	GUILayout.Label("Join room:", GUILayout.Width(75));
		// 	roomName = GUILayout.TextField(roomName, GUILayout.Width(180));
		// 	GUILayout.Button("Go");
		// GUILayout.EndHorizontal();

		// Create Room
		GUILayout.BeginHorizontal();
			GUILayout.Label("Create room:", GUILayout.Width(75));
			GUILayout.FlexibleSpace();
			roomName = GUILayout.TextField(roomName, GUILayout.Width(150));
			if(GUILayout.Button("Go", GUILayout.Width(50))) {
				var roomOptions = new RoomOptions();
				roomOptions.maxPlayers = 10;
				PhotonNetwork.CreateRoom(roomName, roomOptions, TypedLobby.Default);
			}
		GUILayout.EndHorizontal();

		// Join random room
		// GUILayout.BeginHorizontal();
		// 	GUILayout.Label("Join random: ", GUILayout.Width(75));
		// 	if(PhotonNetwork.GetRoomList().Length == 0) {
		// 		GUILayout.Label("No games available");
		// 	}
		// 	else {
		// 		GUILayout.Button("Go");
		// 	}
		// GUILayout.EndHorizontal();

		GUILayout.Space(30);

		// Choose room
		GUILayout.BeginHorizontal();
			GUILayout.Label("Join room:", GUILayout.Width(75));
			GUILayout.FlexibleSpace();
			GUILayout.Button("Random", GUILayout.Width(60));
		GUILayout.EndHorizontal();

		scrollPos = GUILayout.BeginScrollView(scrollPos, GUILayout.Height(180), GUILayout.Width(300));
		if(PhotonNetwork.GetRoomList().Length == 0) {
			GUILayout.Label("No games available");
		}
		else {

			for(var game: RoomInfo in PhotonNetwork.GetRoomList()) {
				GUILayout.BeginHorizontal();
					GUILayout.Label(game.name + " " + game.playerCount + "/" + game.maxPlayers);
					GUILayout.Button("Join", GUILayout.Width(50));
				GUILayout.EndHorizontal();
			}
			GUILayout.EndScrollView();
		}

	GUILayout.EndArea();
}

function showConnectionMesg() {
	GUILayout.BeginArea(new Rect((Screen.width - 900) / 2, (Screen.height - 600) / 2, 900, 600));
	GUILayout.Label("Connecting to the game network...");
	GUILayout.EndArea();
}