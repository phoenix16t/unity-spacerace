#pragma strict

var asteroid: GameObject;
var spawnRate: float;
var startTime: float;
var spawner: boolean = false;
private var nextSpawn: float;
private var photonView: PhotonView;
private var oldPos: Vector3 = Vector3.zero;
private var script: AsteroidSpawnerController;
private var position: Vector3;
private var rotation: Vector3;

function Start () {
	script = GetComponent.<AsteroidSpawnerController>();
	photonView = GetComponent(PhotonView);
	nextSpawn = Time.time + startTime;
}

function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(spawner && stream.isWriting == true) {
		stream.SendNext(position);
		stream.SendNext(rotation);
	}
	else {
		position = stream.ReceiveNext();
		rotation = stream.ReceiveNext();
	}
}

function Update () {
	if(PhotonNetwork.isMasterClient) {
		spawner = true;
	}

	if(spawner && photonView.isMine && Time.time > nextSpawn) {
		nextSpawn = Time.time + spawnRate;
		position = new Vector3(transform.position.x, Random.Range(-5f, 5f), transform.position.z);
		rotation = Random.insideUnitSphere;
	}
	else {
		if(position != oldPos) {
			script.Spawn(position, rotation);
			oldPos = position;
		}
	}
}