#pragma strict

var asteroid: GameObject;
var spawnRate: float;
var startTime: float;
private var nextSpawn: float;

function Start () {
	nextSpawn = Time.time + startTime;
}

function Update () {
	if(Time.time > nextSpawn) {
		nextSpawn = Time.time + spawnRate;
		
		var position = new Vector3(transform.position.x, Random.Range(-5f, 5f), transform.position.z);
		var ins_asteroid = Instantiate(asteroid, position, Quaternion.identity);
		ins_asteroid.gameObject.rigidbody.AddForce(transform.right * -100);
	}
}