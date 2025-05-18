const DIV1 = document.getElementById("rand");

const pELEMENT = document.getElementById("button");

DIV1.addEventListener('mousemove',randomnumber);
 
function randomnumber(){
    document.getElementById("test1").innerHTML=Math.random();
}

pELEMENT.addEventListener('click',stop);

function stop(){
    DIV1.removeEventListener('mousemove',randomnumber);
}