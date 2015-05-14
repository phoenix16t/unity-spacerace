#pragma strict

var speed: float;
var laserId: int;
var ownerId: int;
// private var photonView: PhotonView;

// function Start() {
// 	// photonView = GetComponent(PhotonView);
// }

function Update() {
	transform.position += transform.forward * speed;
}

// function OnTriggerEnter(other: Collider) {
// 	if(other.tag == 'asteroid' && PhotonNetwork.isMasterClient) {
// 		other.GetComponent.<AsteroidController>().Hit();
// 		photonView.RPC('Hit', PhotonTargets.AllViaServer, photonView.viewID);
// 	}
// }

// @RPC
// function Hit(laserId: int) {
// 	// if(photonView.viewID == laserId) {
// 	// 	Destroy(gameObject);
// 	// }
// }
