#pragma strict

var asteroids: GameObject[];
var spawnRate: float;
var startTime: float;
private var nextSpawn: float;
private var photonView: PhotonView;
private var oldPos: Vector3;
private var position: Vector3;
private var rotation: Vector3;
private var choice: int;

function Start() {
	photonView = GetComponent(PhotonView);
	nextSpawn = Time.time + startTime;
}

function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(PhotonNetwork.isMasterClient && stream.isWriting == true) {
		stream.SendNext(position);
		stream.SendNext(rotation);
		stream.SendNext(choice);
	}
	else {
		position = stream.ReceiveNext();
		rotation = stream.ReceiveNext();
		choice = stream.ReceiveNext();
	}
}

// function Update () {
// 	if(PhotonNetwork.isMasterClient && photonView.isMine && Time.time > nextSpawn) {
// 		nextSpawn = Time.time + spawnRate;
// 		position = new Vector3(transform.position.x, Random.Range(-5f, 5f), transform.position.z);
// 		rotation = Random.insideUnitSphere;
// 		choice = Random.Range(0, asteroids.length);
// 	}
// 	else {
// 		if(position != oldPos) {
// 			var insAsteroid = Instantiate(asteroids[choice], position, Quaternion.identity);
// 			insAsteroid.gameObject.rigidbody.AddForce(transform.right * -100);
// 			insAsteroid.gameObject.rigidbody.AddTorque(rotation * 100);

// 			oldPos = position;
// 		}
// 	}
// }

function Update() {
	if(PhotonNetwork.isMasterClient && Time.time > nextSpawn) {
		nextSpawn = Time.time + spawnRate;
		position = new Vector3(transform.position.x, Random.Range(-5f, 5f), transform.position.z);
		rotation = Random.insideUnitSphere;
		choice = Random.Range(0, asteroids.length);
	}
}
