#pragma strict

var speed: float;

function Update() {
  transform.position += transform.right * speed;
}