#pragma strict

var lerpSmoothing: float = 5;
var Explosion: GameObject;
var isAlive: boolean = true;
private var photonView: PhotonView;
private var networkPosition: Vector3;
private var networkRotation: Quaternion;
private var networkAlive: boolean;

function Start() {
	photonView = GetComponent(PhotonView);
	
	if(photonView.isMine) {
		gameObject.name = "Me";
		GetComponent(PlayerController).enabled = true;
	}
	else {
		gameObject.name = "Network player";
	}
}

function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(stream.isWriting == true) {
		stream.SendNext(transform.position);
		stream.SendNext(transform.rotation);
		stream.SendNext(isAlive);
	}
	else {
		networkPosition = stream.ReceiveNext();
		networkRotation = stream.ReceiveNext();
		networkAlive = stream.ReceiveNext();
	}
}

function Update() {
	// isAlive = GetComponent(PlayerController).isAlive;

	if(!photonView.isMine && networkAlive) {
		transform.position = Vector3.Lerp(transform.position, networkPosition, Time.deltaTime * lerpSmoothing);
		transform.rotation = Quaternion.Lerp(transform.rotation, networkRotation, Time.deltaTime * lerpSmoothing);
	}
	else if(!photonView.isMine && !networkAlive) {
		Instantiate(Explosion, transform.position, Quaternion.identity);
		Destroy(gameObject);
	}

	if(!photonView.isMine) {
		Debug.Log("blah blah " + networkPosition);
	}
}

function LeaveRoom() {
	PhotonNetwork.LeaveRoom();
	PhotonNetwork.LoadLevel("lobby");
}