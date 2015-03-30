#pragma strict

private var VERSION = "v0.0.1";
private var photonView: PhotonView;

function Start() {
	photonView = GetComponent(PhotonView);
	PhotonNetwork.logLevel = PhotonLogLevel.Full;
	PhotonNetwork.ConnectUsingSettings(VERSION);
}

function OnGUI() {
	GUILayout.Label(PhotonNetwork.connectionStateDetailed.ToString());
}

function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(stream.isWriting == true) {
		// stream.SendNext(joinGame);
	}
	else {
		// tempJoined = stream.ReceiveNext();
	}
}

function OnJoinedLobby() {
	PhotonNetwork.Instantiate("lobbyCanvas", Vector3.zero, Quaternion.identity, 0);
}