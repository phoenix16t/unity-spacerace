#pragma strict

var health: float;
var moveSpeed: float;
var pos: float;
var photonView: PhotonView;

function Start() {
	photonView = GetComponent(PhotonView);
}

function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(stream.isWriting == true) {
		stream.SendNext(health);
	}
	else {
		health = stream.ReceiveNext();
	}
}

function Update() {
	var move = Input.GetAxis("Horizontal");
	transform.position.x += move * moveSpeed * Time.deltaTime;
	pos = 1;
}