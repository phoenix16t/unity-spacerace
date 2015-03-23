#pragma strict

var lerpSmoothing: float = 5;
private var photonView: PhotonView;
private var isAlive: boolean = true;
private var opponentPosition: Vector3;
private var opponentRotation: Quaternion;

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
		stream.SendNext(transform.rotation);
	}
	else {
		opponentPosition = stream.ReceiveNext();
		opponentRotation = stream.ReceiveNext();
	}
}

function Update() {
	if(isAlive) {
		transform.position = Vector3.Lerp(transform.position, opponentPosition, Time.deltaTime * lerpSmoothing);
		transform.rotation = Quaternion.Lerp(transform.rotation, opponentRotation, Time.deltaTime * lerpSmoothing);
	}
}