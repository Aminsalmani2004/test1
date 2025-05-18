const Names = ["Reza","Ali","Amin","Amir","Zahra"];

    function CreatLiElement(){

        for (const item of Names) {

          var node = document.createElement("li");
   
          var textnode=document.createTextNode(item);

          node.appendChild(textnode);

          document.getElementById("my-list").appendChild(node);
        }
}

CreatLiElement();