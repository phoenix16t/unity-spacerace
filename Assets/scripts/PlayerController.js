#pragma strict

var moveSpeed: float;
var topBoundary: float;
var bottomBoundary: float;
private var distance: float;

function Start() {
	distance = Vector3.Distance(Vector3.zero, Camera.main.transform.position);
}

function Update() {
//	var move = Input.GetAxis("Horizontal");
//	transform.position.x += move * moveSpeed * Time.deltaTime;

/*
	// determine mouse position
	var mousePos = Input.mousePosition;
Debug.Log("mouse" + mousePos);
	// limit movement to scale of 0 to 1 on viewport space
	var scaled = Camera.main.ScreenToViewportPoint(mousePos);
	if(scaled.y > 1) { scaled.y = 1; }
	else if(scaled.y < 0) { scaled.y = 0; }
	mousePos = Camera.main.ViewportToScreenPoint(scaled);
	// set camera distance
	mousePos.z = distance;
	mousePos = Camera.main.ScreenToWorldPoint(mousePos);
	mousePos.x = 0;
*/
	
	// determine mouse position
	var mousePos = Input.mousePosition;
	if(mousePos.y > topBoundary) { mousePos.y = topBoundary; }
	else if(mousePos.y < bottomBoundary) { mousePos.y = bottomBoundary; };	
	mousePos.z = distance;
	mousePos = Camera.main.ScreenToWorldPoint(mousePos);
	mousePos.x = 0;

//	Debug.Log("cam" + scaled);
//
//	Debug.Log("cam2" + scaled);
//	Debug.Log("cam3" + Camera.main.ViewportToScreenPoint(scaled));
	
	// set ship rotation angle
	transform.LookAt(mousePos);
	transform.eulerAngles.y = 90;
	transform.eulerAngles.z = 0;
//	
//	// move ship
	transform.position = Vector3.MoveTowards(transform.position, mousePos, moveSpeed);
	transform.position.x = -8;
}