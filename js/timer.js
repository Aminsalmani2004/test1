const theTimer=document.querySelector(".timer");
const testarea=document.querySelector("#test-area");
const origintext=document.querySelector("#origin-text p").innerHTML;
const testwrapper=document.querySelector(".test-wrapper");
const button=document.querySelector("#reset");
var timerrunning=false;
var timer=[0,0,0,0];
var interval;


function leadingzero(time){

    if(time<=9){
        time="0"+time;
    }
    return time;
    
}


function runTimer(){
let currentTime=leadingzero (timer[0])+":"+leadingzero(timer[1])+":"+leadingzero(timer[2]);

theTimer.innerHTML=currentTime;

timer[3]++;

timer[0]=Math.floor((timer[3]/100)/60);
timer[1]=Math.floor(timer[3]/100)-(timer[0]*60);
timer[2]=Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));



}

function spellchek(){

    let textentered=testarea.value;
    let origintextmatch=origintext.substring(0,textentered.length);

    if(textentered==origintext){

        testwrapper.style.borderColor="green";
        clearInterval(interval);

    }else{
        if(textentered==origintextmatch){
            testwrapper.style.borderColor="#b7eeb8";
        }else{

            testwrapper.style.borderColor="red";
        }
    }

}




function Start(){
    let textlength=testarea.value.length;
    
    if(textlength==0 && !timerrunning){

        timerrunning=true;
        interval=setInterval(runTimer,10);
    }
}

function reset(){

        clearInterval(interval);
        testarea.value="";
        timerrunning=false;
        timer=[0,0,0,0];
        interval=null;
        theTimer.innerHTML="00:00:00";
        testwrapper.style.borderColor="gray";


}



testarea.addEventListener("keypress",Start);

testarea.addEventListener("keyup",spellchek);

button.addEventListener("click",reset);