const ELEMENT = document.getElementById("mybtn");

ELEMENT.addEventListener('click',displaydate);

function displaydate(){
    document.getElementById("test").innerHTML=Date();
}