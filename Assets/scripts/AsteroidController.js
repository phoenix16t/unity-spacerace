#pragma strict

var asteroidId: int;
private var gameController: GameController;
private var isAlive: boolean = true;
// private var photonView: PhotonView;

function Start() {
  // photonView = GetComponent(PhotonView);
  gameController = GameObject.Find("GameController").GetComponent.<GameController>();
}

function OnTriggerEnter(other: Collider) {
	if(other.tag == 'Laser' && isAlive && PhotonNetwork.isMasterClient) {
		var laser = other.GetComponent.<LaserController>();
		gameController.GetComponent.<PhotonView>().RPC("asteroidHit", PhotonTargets.AllViaServer, asteroidId, laser.ownerId, laser.laserId);
		isAlive = false;
	}
}

// function Hit() {
//   // if(PhotonNetwork.isMasterClient) {
//   //   photonView.RPC('Destroyed', PhotonTargets.AllViaServer, photonView.viewID);
//   // }
// }

// @RPC
// function Destroyed(asteroidId: int) {
//   // if(photonView.viewID == asteroidId) {
//   //   Destroy(gameObject);
//   // }
// }
