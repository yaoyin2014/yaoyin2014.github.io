document.onreadystatechange = subSomething;//当页面加载状态改变的时候执行这个方法.
function subSomething()
{
if(document.readyState == 'complete'){
	
alert('page loaded complete');
} //当页面加载状态

}


document.getElementById('body').onclick = function(){

document.getElementById('Audio').setAttribute('loop','loop');
document.getElementById('Audio').play();

alert('ok');
}


