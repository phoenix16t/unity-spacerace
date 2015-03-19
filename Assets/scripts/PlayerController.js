#pragma strict

var health: float;
var moveSpeed: float;
var pos: float;

function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(stream.isWriting == true) {
		stream.SendNext(health);
	}
	else {
		health = stream.ReceiveNext();
	}
}

function Update() {
	Debug.Log("mine" + PhotonView.isMine);
	var move = Input.GetAxis("Horizontal");
	transform.position.x += move * moveSpeed * Time.deltaTime;
	pos = 1;
}