const firstName = document.getElementById("FirstName");
const lastName = document.getElementById("LastName");
const jobTitle = document.getElementById("jobTitle");
const frmSend = document.getElementById("frmSend");

function SendData(event) {
  event.preventDefault();  // جلوگیری از رفرش صفحه

  var xhr = new XMLHttpRequest();

  var params =
    "firstName=" +
    encodeURIComponent(firstName.value) +
    "&" +
    "lastName=" +
    encodeURIComponent(lastName.value) +
    "&" +
    "jobTitle=" +
    encodeURIComponent(jobTitle.value);

  xhr.open("POST", "http://localhost:7006/api/persons/adduser", true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      if(xhr.status >= 200 && xhr.status < 300) {
        alert("اطلاعات با موفقیت ارسال شد!");
      } else {
        alert("خطا در ارسال اطلاعات: " + xhr.status);
      }
    }
  };

  xhr.send(params);
}

frmSend.addEventListener('submit', SendData);
