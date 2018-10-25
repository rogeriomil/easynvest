import { user } from "./user";
import { storage } from "./storage";
import { ui } from "./ui";
import { http } from "./http";

const path = window.location.pathname;

//Event Listeners to display users
document.addEventListener("DOMContentLoaded", getUsersAPI);
document.addEventListener("DOMContentLoaded", getUsersLS);

//Event listener to add a user
if (path === "/") {
  document.getElementById("user-form").addEventListener("submit", addUser);
}

//Event listener to delete a user
if (path === "/list.html") {
  document.getElementById("user-list").addEventListener("click", deleteUser);
}

document.getElementById("user-form").addEventListener("change", function() {
  const name = document.getElementById("name").value,
    email = document.getElementById("email").value,
    cpf = document.getElementById("cpf").value,
    phone = document.getElementById("phone").value;

  if (name === "" || email === "" || cpf === "" || phone === "") {
    document.getElementById("btnSubmit").disabled = true;
  } else {
    document.getElementById("btnSubmit").disabled = false;
  }
});

function addUser(e) {
  const name = document.getElementById("name").value,
    email = document.getElementById("email").value,
    cpf = document.getElementById("cpf").value,
    phone = document.getElementById("phone").value;

  const usuario = {
    name: name,
    email: email,
    cpf: cpf,
    phone: phone
  };

  const inputs = [
    document.getElementById("name"),
    document.getElementById("email"),
    document.getElementById("cpf"),
    document.getElementById("phone")
  ];

  formValidation(inputs);

  user.addUser(usuario);
  document.getElementById("user-form").reset();
  window.location.replace("list.html");

  e.preventDefault();
}

function getUsersAPI() {
  http
    .get(`https://private-21e8de-rafaellucio.apiary-mock.com/users`)
    .then(data =>
      data.map(u => {
        ui.addUserToList(u);
      })
    )
    .catch(err => console.log(err));
}

function getUsersLS() {
  if (path === "/list.html") {
    const users = storage.getUsersLS();
    storage.displayUsers(users);
  }
}

function deleteUser(e) {
  ui.deleteUser(e.target);
  //deleting user pro localStorage
  storage.deleteUser(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent
  );

  e.preventDefault();
}

function formValidation(inputs) {
  inputs.map(input => {
    if (input.length < 3) {
      input.classList.add("invalid");
    }
  });
}
