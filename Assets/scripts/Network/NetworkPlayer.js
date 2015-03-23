#pragma strict

var lerpSmoothing: float = 5;
//var pos: float;
private var photonView: PhotonView;
//var nameText: UI.Text;
private var isAlive: boolean = true;
private var opponentPosition: Vector3;

function Start() {
//	Debug.Log("player" + nameText.text);
	photonView = GetComponent(PhotonView);
	
	if(photonView.isMine) {
		gameObject.name = "Me";
		GetComponent(PlayerController).enabled = true;
	}
	else {
		gameObject.name = "Network player";
		Alive();
	}
}

function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(stream.isWriting == true) {
//		stream.SendNext(health);
		stream.SendNext(transform.position);
	}
	else {
//		health = stream.ReceiveNext();
		opponentPosition = stream.ReceiveNext();
	}
}

function Alive() {
	while(isAlive) {
//		transform.position = Vector3.Lerp(transform.position, opponentPosition, Time.deltaTime * lerpSmoothing);
//	transform.position = opponentPosition;
	}
}