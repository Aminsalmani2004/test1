const myBtn=document.getElementById("my-btn");

const txtDiv=document.getElementById("text");


function loadtext(){

    var xhr = new XMLHttpRequest();
    xhr.open('GET',"/js/text.txt",true);

    xhr.onload=function(){

        if(xhr.status==200){
            txtDiv.innerHTML=this.response;
        }
    }

    xhr.send();
}

myBtn.addEventListener('click',loadtext);