#pragma strict

var moveSpeed: float;
var topBoundary: float;
var bottomBoundary: float;
var fireRate: float;
var Explosion: GameObject;
private var distance: float;
private var nextShot: float;

function Start() {
	distance = Vector3.Distance(Vector3.zero, Camera.main.transform.position);
}

function Update() {
	// determine mouse position
	var mousePos = Input.mousePosition;
	if(mousePos.y > topBoundary) { mousePos.y = topBoundary; }
	else if(mousePos.y < bottomBoundary) { mousePos.y = bottomBoundary; };	
	mousePos.z = distance;
	mousePos = Camera.main.ScreenToWorldPoint(mousePos);
	mousePos.x = 0;
	
	// set ship rotation angle
	transform.LookAt(mousePos);

	// move ship
	transform.position = Vector3.MoveTowards(transform.position, mousePos, moveSpeed);
	transform.position.x = -7;

	// shoot
	// if(Input.GetButton("Fire1") && Time.time > nextShot) {
	// 	Debug.Log("bang");
	// 	nextShot = Time.time + fireRate;
	// }


	// throw away - players coming in late to current round should watch
	// t += Time.deltaTime / 5;
	// gameObject.renderer.material.color = Color.Lerp(Color.green, Color.white, t);
}
