#pragma strict

var lerpSmoothing: float = 5f;
private var invincibleTime: float = 5f;
private var photonView: PhotonView;
private var networkPosition: Vector3;
private var networkRotation: Quaternion;

function Start() {
	photonView = GetComponent(PhotonView);
	invincibleTime += Time.time;
	
	if(photonView.isMine) {
		gameObject.name = "Me";
		GetComponent(PlayerController).enabled = true;
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
	if(!photonView.isMine) {
		transform.position = Vector3.Lerp(transform.position, networkPosition, Time.deltaTime * lerpSmoothing);
		transform.rotation = Quaternion.Lerp(transform.rotation, networkRotation, Time.deltaTime * lerpSmoothing);
	}
}

function OnTriggerEnter(other: Collider) {
	if(other.tag == 'asteroid' && photonView.isMine && Time.time > invincibleTime) {
		PhotonNetwork.Destroy(this.gameObject);
	}
}