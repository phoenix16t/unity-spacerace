#pragma strict

private var start: GameObject;

function Start () {
//	blah = 
	
	
	for (var child in transform){
		Debug.Log("child" + child);
	}
	
	start = GameObject.Find("StartButton");
	
	Debug.Log("start" + start);
}