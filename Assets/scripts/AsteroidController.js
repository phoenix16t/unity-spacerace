#pragma strict

function OnTriggerEnter(other: Collider) {
	if(other.tag == 'Boundary') {
		Destroy(gameObject);
	}
}