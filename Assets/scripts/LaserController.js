#pragma strict

var speed: float;
var ownerId: int;
var photonView: PhotonView;
private var gameScript: NewGameController;

function Start() {
	gameScript = GameObject.FindWithTag("GameController").GetComponent.<NewGameController>();
}

function Update() {
	transform.position += transform.forward * speed;
}

function OnTriggerEnter(other: Collider) {
	// gameScript.Hit();

// Debug.Log("id " + GetInstanceID() + " " + other.GetInstanceID());


	if(other.tag == 'asteroid' && PhotonNetwork.isMasterClient) {
		photonView.RPC('Hit', PhotonTargets.All, photonView.viewID);
	}


}

@RPC
function Hit(id: int) {
	Debug.Log("hitted " + id);

	if(photonView.viewID == id) {
		// Destroy(other.gameObject);
		Destroy(gameObject);
	}
}
