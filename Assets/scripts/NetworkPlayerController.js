#pragma strict

var lerpSmoothing: float = 5f;
var invincibleTime: float = 5f;
var shotSpawn: GameObject;
var Laser: GameObject;
var Explosion: GameObject;
var uniqueLaserId: int = 0;
private var photonView: PhotonView;
private var position: Vector3;
private var rotation: Quaternion;

function Start() {
	photonView = GetComponent.<PhotonView>();
	invincibleTime += Time.time;
	gameObject.name = photonView.owner.name;
	transform.Find('playerName').GetComponent.<TextMesh>().text = photonView.owner.name;

	if(photonView.isMine) {
		GetComponent.<PlayerController>().enabled = true;
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
	if(other.tag == 'asteroid' && PhotonNetwork.isMasterClient && Time.time > invincibleTime) {
		photonView.RPC('PlayerKilled', PhotonTargets.All, photonView.viewID, transform.position);
	}
}

function Shoot() {
	// var uniqueId = PhotonNetwork.AllocateViewID();
	uniqueLaserId++;
	photonView.RPC('FireLaser', PhotonTargets.AllViaServer, PhotonNetwork.player.ID, uniqueLaserId);
}

@RPC
function PlayerKilled(id: int, pos: Vector3) {
	Instantiate(Explosion, pos, Quaternion.identity);
	if(photonView.viewID == id && photonView.isMine) {
		var props = new ExitGames.Client.Photon.Hashtable();
		props['isAlive'] = false;
		PhotonNetwork.player.SetCustomProperties(props);
		PhotonNetwork.Destroy(this.gameObject);
	}
}

@RPC
function FireLaser(ownerId: int, uniqueId: int) {
	var bolt = Instantiate(Laser, shotSpawn.transform.position, shotSpawn.transform.rotation);
	var boltScript = bolt.GetComponent.<LaserController>();
	boltScript.ownerId = ownerId;
	boltScript.laserId = uniqueId;
}
