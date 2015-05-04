#pragma strict

var maxDistance: float = 50f;
private var distance: float;

function Update() {
  distance = Vector3.Distance(transform.position, Vector3.zero);

  if(distance > maxDistance) {
    Destroy(gameObject);
  }
}