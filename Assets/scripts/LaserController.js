#pragma strict

var speed: float;

function Start() {
  // transform.rotation = Quaternion.AngleAxis(90, Vector3.up);
  // transform.rotation = Quaternion.AngleAxis(90, Vector3.forward);
  transform.rotation = Quaternion.AngleAxis(90, Vector3.right);
}

function Update() {
  //transform.position += transform.forward * speed;
}