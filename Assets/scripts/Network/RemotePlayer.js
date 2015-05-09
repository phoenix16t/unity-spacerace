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
	photonView = GetComponent.<PhotonView>();
	invincibleTime += Time.time;
	
	if(photonView.isMine) {
		gameObject.name = 'Me';
		GetComponent.<PlayerController>().enabled = true;
	}
	else {
		gameObject.name = 'Network player';
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
	else if (Input.GetButton('Fire1') && Time.time > nextShot) {
		var newId = PhotonNetwork.AllocateViewID();
		photonView.RPC('Shoot', PhotonTargets.All, PhotonNetwork.player.ID, newId);
		nextShot = Time.time + fireRate;
	}
}

function OnTriggerEnter(other: Collider) {
	if(other.tag == 'asteroid' && PhotonNetwork.isMasterClient && Time.time > invincibleTime) {
		photonView.RPC('PlayerKilled', PhotonTargets.All, photonView.viewID, transform.position);
	}
}

@RPC
function PlayerKilled(id: int, pos: Vector3) {
	Instantiate(Explosion, pos, Quaternion.identity);
	if(photonView.viewID == id && photonView.isMine) {
		PhotonNetwork.Destroy(this.gameObject);
	}
}

@RPC
function Shoot(ownerId: int, newId: int) {
	var bolt = Instantiate(Laser, shotSpawn.transform.position, shotSpawn.transform.rotation);
	bolt.GetComponent.<LaserController>().ownerId = ownerId;
	bolt.GetComponent.<PhotonView>().viewID = newId;
}
