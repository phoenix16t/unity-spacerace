#pragma strict

var moveSpeed: float = 0.3f;
var topBoundary: float = 560f;
var bottomBoundary: float = 40f;
var fireRate: float = 0.2f;
var Explosion: GameObject;
private var distance: float;
private var mousePos: Vector2;
private var screenPos: Vector3;
private var nextShot: float;
private var networkPlayer: NetworkPlayerController;

function Start() {
	distance = transform.position.z - camera.main.transform.position.z;
	networkPlayer =	GetComponent.<NetworkPlayerController>();
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
	transform.rotation.eulerAngles.x = -Mathf.Atan2((screenPos.y - transform.position.y), (screenPos.x - transform.position.x)) * Mathf.Rad2Deg;

	// move ship
	transform.position = Vector3.MoveTowards(transform.position, screenPos, moveSpeed);
	transform.position.x = -7;

	if(Input.GetButton('Fire1') && Time.time > nextShot) {
		networkPlayer.Shoot();
		nextShot = Time.time + fireRate;
	}
}
