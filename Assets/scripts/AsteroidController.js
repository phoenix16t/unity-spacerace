﻿#pragma strict

var lerpSmoothing: float = 5f;
private var photonView: PhotonView;
private var position: Vector3;
private var rotation: Quaternion;

function Start() {
	photonView = GetComponent(PhotonView);

	if(photonView.isMine) {
		gameObject.name = "as";
	}
}

function OnPhotonSerializeView(stream: PhotonStream, info: PhotonMessageInfo) {
	if(stream.isWriting == true) {
		stream.SendNext(transform.position);
		stream.SendNext(transform.rotation);
	}
	else {
		position = stream.ReceiveNext();
		rotation = stream.ReceiveNext();
	}
}

function OnTriggerEnter(other: Collider) {
	if(other.tag == 'Boundary') {
		Destroy(gameObject);
	}
}

function Update() {
	if(!photonView.isMine) {
Debug.Log("position " + position);
// Debug.Log("position2 " + transform.position);
		transform.position = Vector3.Lerp(transform.position, position, Time.deltaTime * lerpSmoothing);
		transform.rotation = Quaternion.Lerp(transform.rotation, rotation, Time.deltaTime * lerpSmoothing);
	}
}