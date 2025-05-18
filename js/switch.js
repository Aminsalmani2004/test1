var day=new Date().getDay();
var today;
switch(day){
    case 0:
        today="sunday";
        break;
    case 1:
        today="Monday";
        break;
    case 2:
        today="Tuesday";
        break;
    case 3:
        today="Wendsday";
        break;            
    case 4:
        today="Thursday";
        break;
    case 5:
        today="Friday";
        break;    
    case 6:
        today="Saturday";
        break;
    default: "Your value not found"; 
}

    document.write("Today is " +today);