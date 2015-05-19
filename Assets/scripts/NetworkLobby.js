#pragma strict

private var VERSION = 'v0.0.1';
private var roomName: String;
private var roomList: RoomInfo[];
private var scrollPos: Vector2 = Vector2.zero;

function Start() {
	PhotonNetwork.logLevel = PhotonLogLevel.Full;
	PhotonNetwork.ConnectUsingSettings(VERSION);
	PhotonNetwork.playerName = PlayerPrefs.GetString('playerName', 'Guest' + Random.Range(1,9999));
	roomName = PhotonNetwork.playerName + '\'s room';
}

function OnGUI() {
	// GUILayout.Label(PhotonNetwork.connectionStateDetailed.ToString());
	if(!PhotonNetwork.connected) {
		showConnectionMesg();
		return;
	}
	else if(PhotonNetwork.room) { return; }

	roomList = PhotonNetwork.GetRoomList();

	GUILayout.BeginArea(new Rect(300, 0, 300, 600));
		GUILayout.Space(50);

		// Title
		GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
			GUILayout.Label('Main Menu');
			GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

		// Name
		GUILayout.BeginHorizontal();
			GUILayout.Label('Name:', GUILayout.Width(75));
			GUILayout.FlexibleSpace();
			var newName = GUILayout.TextField(PhotonNetwork.playerName, GUILayout.Width(205));
			if(newName != PhotonNetwork.playerName) {
				PhotonNetwork.playerName = newName;
				PlayerPrefs.SetString('playerName', PhotonNetwork.playerName);
			}
		GUILayout.EndHorizontal();

		// Create Room
		GUILayout.BeginHorizontal();
			GUILayout.Label('Create room:', GUILayout.Width(75));
			GUILayout.FlexibleSpace();
			roomName = GUILayout.TextField(roomName, GUILayout.Width(150));
			if(GUILayout.Button('Go', GUILayout.Width(50))) {
				var roomOptions = new RoomOptions();
				roomOptions.maxPlayers = 10;
				PhotonNetwork.CreateRoom(roomName, roomOptions, TypedLobby.Default);
			}
		GUILayout.EndHorizontal();

		GUILayout.Space(30);

		// Choose room
		GUILayout.BeginHorizontal();
			GUILayout.Label('Join room:', GUILayout.Width(75));
			GUILayout.FlexibleSpace();
			if(roomList.Length > 0) {
				if(GUILayout.Button('Random', GUILayout.Width(100))) {
					PhotonNetwork.JoinRandomRoom();
				}
			}
		GUILayout.EndHorizontal();

		scrollPos = GUILayout.BeginScrollView(scrollPos, GUILayout.Height(180), GUILayout.Width(300));
		if(roomList.Length == 0) {
			GUILayout.Label('No games available');
		}
		else {
			for(var game: RoomInfo in roomList) {
				GUILayout.BeginHorizontal();
					GUILayout.Label(game.name + ' - ' + game.playerCount + '/' + game.maxPlayers);
					if(GUILayout.Button('Join', GUILayout.Width(50))) {
						PhotonNetwork.JoinRoom(game.name);
					}
				GUILayout.EndHorizontal();
			}
		}
		GUILayout.EndScrollView();

	GUILayout.EndArea();
}

function showConnectionMesg() {
	GUILayout.BeginArea(new Rect((Screen.width - 900) / 2, (Screen.height - 600) / 2, 900, 600));
	GUILayout.Label('Connecting to the game network...');
	GUILayout.EndArea();
}