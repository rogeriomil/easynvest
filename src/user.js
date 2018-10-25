//user class
class User {
  constructor(name, email, cpf, phone) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.phone = phone;
  }

  addUser(user) {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
}

export const user = new User();
