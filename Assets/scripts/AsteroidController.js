#pragma strict

private var photonView: PhotonView;

function Start() {
  photonView = GetComponent(PhotonView);
}

function Hit() {
  if(PhotonNetwork.isMasterClient) {
    photonView.RPC('Destroyed', PhotonTargets.AllViaServer, photonView.viewID);
  }
}

@RPC
function Destroyed(asteroidId: int) {
  if(photonView.viewID == asteroidId) {
    Destroy(gameObject);
  }
}
