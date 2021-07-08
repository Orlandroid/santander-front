const forms = document.querySelectorAll(".formEnviar");
console.log(forms);

const getTemplate = () =>{
    return fetch("./template.html")
    .then((response) => response.text())
} 


const sendEmailToApi = (address, template) => {
    fetch("https://bedu-email-sender-api.herokuapp.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        template: template,
      }),
    })
      .then((results) => {
        console.log(results);
        document.getElementById("email").value = "";
        alert("Email sent!");
      })
      .catch(error => {
        console.log(error);
        document.getElementsById("email").value = "";
        alert("Error sending the email!");
      });
  };

const sendEmail = (miVariable) => {
    miVariable.preventDefault();
    const email = miVariable.target.querySelector("input").value;
    getTemplate()
    .then((response)=>{
        console.log(response);
    })
    .catch((error) =>{
        console.log(error,"Error al obtener el template");
    })
}

for (let index = 0; index < forms.length; index++) {
    forms[index].addEventListener("submit",sendEmail);
}