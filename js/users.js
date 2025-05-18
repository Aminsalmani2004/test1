function getUsers() {
    fetch("users.json")
        .then((res) => res.json())
        .then((json) => {
            let output = "";
            json.forEach(function (user) {
                output += ` 
                   <ul>
        <li>${user.id}</li>
        <li>${user.Name}</li>
        <li>${user.email}</li>
    </ul>`;
            });
            document.getElementById("output").innerHTML=output;
        });

}
getUsers();