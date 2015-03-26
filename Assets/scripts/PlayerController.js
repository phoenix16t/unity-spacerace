#pragma strict

var moveSpeed: float;
var topBoundary: float;
var bottomBoundary: float;
var Explosion: GameObject;
private var distance: float;
private var isAlive: boolean = true;

function Start() {
	distance = Vector3.Distance(Vector3.zero, Camera.main.transform.position);
}

function Update() {
	if(isAlive) {
		// determine mouse position
		var mousePos = Input.mousePosition;
		if(mousePos.y > topBoundary) { mousePos.y = topBoundary; }
		else if(mousePos.y < bottomBoundary) { mousePos.y = bottomBoundary; };	
		mousePos.z = distance;
		mousePos = Camera.main.ScreenToWorldPoint(mousePos);
		mousePos.x = 0;
		
		// set ship rotation angle
		transform.LookAt(mousePos);
		transform.eulerAngles.y = 90;
		transform.eulerAngles.z = 0;

		// move ship
		transform.position = Vector3.MoveTowards(transform.position, mousePos, moveSpeed);
		transform.position.x = -7;
	}
}

function OnTriggerEnter(other: Collider) {
	if(other.tag == 'asteroid') {
		Instantiate(Explosion, transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
}