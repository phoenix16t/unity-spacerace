#pragma strict

var moveSpeed: float;
var topBoundary: float;
var bottomBoundary: float;
var Explosion: GameObject;
var networkt: NetworkPlayer;
private var distance: float;
private var invincible: boolean = true;
private var godModeTime: float = 5f;
private var deathTime: float = 2f;

function Start() {
	distance = Vector3.Distance(Vector3.zero, Camera.main.transform.position);
	godModeTime = Time.time + godModeTime;
	// networkt = gameObject.GetComponent(NetworkPlayer);
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
	transform.eulerAngles.y = 90;
	transform.eulerAngles.z = 0;

	// move ship
	transform.position = Vector3.MoveTowards(transform.position, mousePos, moveSpeed);
	transform.position.x = -7;

	if(invincible && Time.time > godModeTime) {
		invincible = false;
	}

	// if(!isAlive && Time.time > deathTime) {
	// 	Destroy(gameObject);
	// }
}

function OnTriggerEnter(other: Collider) {
	if(other.tag == 'asteroid' && !invincible) {
		// isAlive = false;
		// GetComponent(NetworkPlayer).isAlive = false;
		// Debug.Log("sldkjfsdlkjfsdklfj " + gameObject.GetComponent(NetworkPlayer));
		// Debug.Log("sldkjfsdlkjfsdklfj " + networkt);
		Instantiate(Explosion, transform.position, Quaternion.identity);
		Destroy(gameObject);
		deathTime = Time.time + deathTime;
	}
}