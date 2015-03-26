#pragma strict

var lerpSmoothing: float = 5;
private var photonView: PhotonView;
private var IsNetworkPlayer: boolean = true;
private var networkPosition: Vector3;
private var networkRotation: Quaternion;

function Start() {
	photonView = GetComponent(PhotonView);
	
	if(photonView.isMine) {
		gameObject.name = "Me";
		GetComponent(PlayerController).enabled = true;
		IsNetworkPlayer = false;
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
		networkPosition = stream.ReceiveNext();
		networkRotation = stream.ReceiveNext();
	}
}

function Update() {
	if(IsNetworkPlayer) {
		transform.position = Vector3.Lerp(transform.position, networkPosition, Time.deltaTime * lerpSmoothing);
		transform.rotation = Quaternion.Lerp(transform.rotation, networkRotation, Time.deltaTime * lerpSmoothing);
	}
}