// DOCUMENT FOR USERACC PRACTICE
var data = JSON.parse(localStorage.getItem('data')) || [];

function Add(e){
    
    let email = document.getElementById("email");
    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");
    let birthdate = document.getElementById("birthdate");
    let password = document.getElementById("password");



    console.log("button clicked");
  
    formValidation();
    alert("Sign up success");
    window.location = "signin.html";
    return false;
  };


let formValidation = () => {
    if (email.value == "") {
        alert("Email field is empty");
    } else {

        acceptData();

    }

  };

//   alert(localStorage.getItem('data'));
// save data
let acceptData = () => {

  data.push({
    email: email.value,
    firstname: firstname.value,
    lastname: lastname.value,
    birthdate: birthdate.value,
    password: password.value,



  });

  localStorage.setItem('data', JSON.stringify(data));
//   alert(localStorage.getItem('data'));
};

function validatecreds(e){
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let results = 0;

    var datachk = JSON.parse(localStorage.getItem('data')) || [];
    for(var i in datachk){
        var entry = datachk[i]

        if(email.value == entry.email && password.value == entry.password){
            results =1;
        }else{
            
            }           
    }
    if(results){
        alert("success");
        window.location.href = "index.html";
        return false;
    } else{
        alert("failed");
    }



}

