#pragma strict

var lerpSmoothing: float = 5;
private var photonView: PhotonView;
private var isAlive: boolean = true;
private var opponentPosition: Vector3;

function Start() {
	photonView = GetComponent(PhotonView);
	
	if(photonView.isMine) {
		gameObject.name = "Me";
		GetComponent(PlayerController).enabled = true;
		isAlive = false;
	}
	else {
		gameObject.name = "Network player";
	}
}

function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(stream.isWriting == true) {
		stream.SendNext(transform.position);
	}
	else {
		opponentPosition = stream.ReceiveNext();
	}
}

function Update() {
	if(isAlive) {
		transform.position = Vector3.Lerp(transform.position, opponentPosition, Time.deltaTime * lerpSmoothing);
	}
}