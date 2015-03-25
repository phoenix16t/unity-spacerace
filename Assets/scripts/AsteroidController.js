#pragma strict

function OnTriggerEnter(other: Collider) {
	if(other.tag == 'Boundary') {
		Destroy(gameObject);
	}
	else if(other.tag == 'Player') {
		Destroy(other.gameObject);
	}
}