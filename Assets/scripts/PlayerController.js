#pragma strict

var moveSpeed: float;

function Update() {
	var move = Input.GetAxis("Horizontal");
	transform.position.x += move * moveSpeed * Time.deltaTime;
}