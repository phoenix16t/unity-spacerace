#pragma strict

function LeaveRoom() {
	PhotonNetwork.LeaveRoom();
	PhotonNetwork.LoadLevel("lobby");
}