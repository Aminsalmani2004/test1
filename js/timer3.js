const resetBtn=document.getElementById("resetBtn");
const input = document.getElementById("test-area");
const stopBtn=document.getElementById("stopBtn");
const origintext=document.querySelector("#origin-text p").innerHTML;
const testWrapper=document.querySelector(".test-wrapper");
const timer=document.getElementById("timer");
const record= document.getElementById("record");

let totalCentiSecond=0;
let isRunning=false;
let interval=null;
let bestRecord=Infinity;


function padZero(num){
    return num<10 ? '0' + num :num;
};
function updateTime(){
    let minutes=Math.floor(totalCentiSecond/6000);
    let seconds=Math.floor((totalCentiSecond % 6000)/100);
    let ceniSecond=Math.floor(totalCentiSecond % 100);

    timer.textContent= `${padZero(minutes)}:${padZero(seconds)}:${padZero(ceniSecond)}`; 
    };
function start(){
        interval =setInterval(() =>{     
        totalCentiSecond++;
        updateTime(totalCentiSecond);
    },10);
    isRunning=true;
   /*  startBtn.textContent="Pause";  */
};

function pause(){
    clearInterval(interval);
    isRunning=false;
    if(totalCentiSecond<bestRecord){
        bestRecord=totalCentiSecond;
        record.textContent=`${"Best Record : "+timer.textContent}`;
    }
    
}
input.addEventListener('input',() =>{
    if(!isRunning && input.value.trim().length > 0){
        start();
    }

});
function clear(){
    input.value="";
    testWrapper.style.borderColor="gray";
}

function spellcheck(){
    let enteredtext=input.value;
    let originTextMatch=origintext.substring(0,enteredtext.length);
    
    if(enteredtext==origintext){
        testWrapper.style.borderColor="green";
        pause();
    
    }else{
        if(enteredtext==originTextMatch){
            testWrapper.style.borderColor="yellow";

        }
        else{
            testWrapper.style.borderColor="red";
                
        }

    }
}




resetBtn.addEventListener('click',()=>{
    pause();
    totalCentiSecond=0;
    updateTime();
    clear();
/*     startBtn.textContent="Start"*/
})
stopBtn.addEventListener('click',()=>{
    pause();
})
input.addEventListener('keyup',spellcheck);