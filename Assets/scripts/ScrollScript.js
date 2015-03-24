#pragma strict

var speed: float = 0;
var direction: String;

var x = 0f;
var y = 0f;

function Update () {
	if(direction == 'left') {
		x = Time.time * speed;
	}
	else if(direction == 'up') {
		y = Time.time * -speed;
	}
	else if(direction == 'right') {
		x = Time.time * -speed;
	}
	else if(direction == 'down') {
		y = Time.time * speed;
	}
	renderer.material.mainTextureOffset = new Vector2(x, y);
}