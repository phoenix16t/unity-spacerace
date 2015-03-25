#pragma strict

var asteroidz: GameObject;

function Spawn(position: Vector3, rotation: Vector3, asteroid: GameObject) {
		var insAsteroid = Instantiate(asteroid, position, Quaternion.identity);
		insAsteroid.gameObject.rigidbody.AddForce(transform.right * -100);
		insAsteroid.gameObject.rigidbody.AddTorque(rotation * 100);
}