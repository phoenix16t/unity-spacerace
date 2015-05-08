#pragma strict

var speed: float;
var ownerId: int;

function Update() {
  transform.position += transform.forward * speed;
}

function OnTriggerEnter(other: Collider) {
  Debug.Log("Collider" + other);
  Debug.Log("f");
}