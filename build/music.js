document.onreadystatechange = subSomething;//当页面加载状态改变的时候执行这个方法.
function subSomething()
{
	if(document.readyState == 'complete'){



	document.addEventListener('touchstart',touch,false);
	var isPlaying = false;
	function touch(){
		if(!isPlaying){

			document.getElementById('Audio').setAttribute('loop','loop');
			document.getElementById('Audio').play();
			isPlaying = true;
		}

	}
} //当页面加载状态

}






