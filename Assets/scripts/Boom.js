#pragma strict

function OnTriggerEnter(other: Collider) {
	if(other.tag == 'asteroid') {
		transform.parent.gameObject.GetComponent.<RemotePlayer>().PlayerKilled();
	}
}