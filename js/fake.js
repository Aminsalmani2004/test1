const users =[
    {Name:"ali" , Age:21},
    {Name:"hasan" , Age:17},
    {Name:"zahra" , Age:26},
    {Name:"mahdi" , Age:33},
    {Name:"reza" , Age:15},
    {Name:"neda" , Age:34},
    {Name:"homa" , Age:24},
    {Name:"saba" , Age:17}
]
const result = users.filter(user => user.Age>=18);
console.log(result);