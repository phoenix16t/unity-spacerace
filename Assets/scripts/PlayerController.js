#pragma strict

var moveSpeed: float;
var topBoundary: float;
var bottomBoundary: float;
var Explosion: GameObject;
private var distance: float;
private var mousePos : Vector2;
private var screenPos : Vector3;

function Start() {
	distance = transform.position.z - camera.main.transform.position.z;
}

function Update() {
	// initialize
	mousePos = Input.mousePosition;
	if(mousePos.y > 560) { mousePos.y = 560; }
	else if(mousePos.y < 40) { mousePos.y = 40; }

	// convert mouse position to screen position
	screenPos = camera.main.ScreenToWorldPoint(Vector3(mousePos.x, mousePos.y, distance));
	screenPos.x = 0;

	// set rotation
	transform.rotation.eulerAngles.z = Mathf.Atan2((screenPos.y - transform.position.y), (screenPos.x - transform.position.x)) * Mathf.Rad2Deg;

	// move ship
	transform.position = Vector3.MoveTowards(transform.position, screenPos, moveSpeed);
	transform.position.x = -7;
}
