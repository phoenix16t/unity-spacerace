#pragma strict

var lerpSmoothing: float = 5f;
var Explosion: GameObject;
var invincibleTime: float = 5f;
private var photonView: PhotonView;
private var position: Vector3;
private var rotation: Quaternion;

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
		position = stream.ReceiveNext();
		rotation = stream.ReceiveNext();
	}
}

function Update() {
	if(!photonView.isMine) {
		transform.position = Vector3.Lerp(transform.position, position, Time.deltaTime * lerpSmoothing);
		transform.rotation = Quaternion.Lerp(transform.rotation, rotation, Time.deltaTime * lerpSmoothing);
	}
}

function OnTriggerEnter(other: Collider) {
	if(other.tag == 'asteroid' && photonView.isMine && Time.time > invincibleTime) {
		photonView.RPC("PlayerKilled", PhotonTargets.All, transform.position);
		PhotonNetwork.Destroy(this.gameObject);
	}
}

@RPC
function PlayerKilled(position: Vector3) {
	Instantiate(Explosion, position, Quaternion.identity);
}