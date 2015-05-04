#pragma strict

var lerpSmoothing: float = 5f;
var invincibleTime: float = 5f;
var fireRate: float;
var shotSpawn: GameObject;
var Laser: GameObject;
var Explosion: GameObject;
private var photonView: PhotonView;
private var position: Vector3;
private var rotation: Quaternion;
private var nextShot: float;

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
	else if (Input.GetButton("Fire1") && Time.time > nextShot) {
		photonView.RPC("Shoot", PhotonTargets.All);
		nextShot = Time.time + fireRate;
	}
}

@RPC
function EmitPlayerKilled() {
	Instantiate(Explosion, transform.position, Quaternion.identity);
}

@RPC
function Shoot() {
	Instantiate(Laser, shotSpawn.transform.position, shotSpawn.transform.rotation);
}

function PlayerKilled() {
	photonView.RPC("EmitPlayerKilled", PhotonTargets.All);
}