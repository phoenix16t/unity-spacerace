#pragma strict

var asteroids: GameObject[];
var spawnRate: float;
var startTime: float;
private var nextSpawn: float;
private var photonView: PhotonView;
private var oldPos: Vector3;
private var position: Vector3;
private var rotation: Vector3;
private var asteroidType: int;

function Start() {
	photonView = GetComponent(PhotonView);
	nextSpawn = Time.time + startTime;
}

function Update() {
	if(PhotonNetwork.isMasterClient && Time.time > nextSpawn) {
		position = new Vector3(transform.position.x, Random.Range(-5f, 5f), transform.position.z);
		rotation = Random.insideUnitSphere;
		asteroidType = Random.Range(0, asteroids.length);

		var uniqueId = PhotonNetwork.AllocateViewID();
		photonView.RPC('SpawnAsteroid', PhotonTargets.AllViaServer, position, rotation, asteroidType, uniqueId);
		nextSpawn = Time.time + spawnRate;
	}
}

@RPC
function SpawnAsteroid(position: Vector3, rotation: Vector3, asteroidType: int, uniqueId: int) {
	var asteroid = Instantiate(asteroids[asteroidType], position, Quaternion.identity);
	asteroid.gameObject.rigidbody.AddForce(transform.right * -100);
	asteroid.gameObject.rigidbody.AddTorque(rotation * 100);
	asteroid.GetComponent.<PhotonView>().viewID = uniqueId;
}