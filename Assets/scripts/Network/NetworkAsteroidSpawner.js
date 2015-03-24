#pragma strict

var asteroid: GameObject;
var position: Vector3;
var spawnRate: float;
var startTime: float;
var spawner: boolean = false;
private var nextSpawn: float;
private var photonView: PhotonView;
private var oldPos: Vector3 = Vector3.zero;

function Start () {
	photonView = GetComponent(PhotonView);
	nextSpawn = Time.time + startTime;
}

function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(spawner && stream.isWriting == true) {
		stream.SendNext(position);
	}
	else {
		position = stream.ReceiveNext();
	}
}

function Update () {
	if(spawner && photonView.isMine && Time.time > nextSpawn) {
		nextSpawn = Time.time + spawnRate;
		position = new Vector3(transform.position.x, Random.Range(-5f, 5f), transform.position.z);

//		var ins_asteroid = PhotonNetwork.Instantiate("asteroid", position, Quaternion.identity, 0);
//		ins_asteroid.gameObject.rigidbody.AddForce(transform.right * -1000);
	}
	else {
		if(position != oldPos) {
			PhotonNetwork.Instantiate("asteroid", position, Quaternion.identity, 0);
			oldPos = position;
		}
	}
}




/*

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

*/