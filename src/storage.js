import { ui } from "./ui";

class Storage {
  getUsersLS() {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }
    return users;
  }

  displayUsers(users) {
    const result = users.reduce((unique, o) => {
      if (!unique.some(obj => obj.name === o.name && obj.cpf === o.cpf)) {
        unique.push(o);
      }
      return unique;
    }, []);
    result.map(user => ui.addUserToList(user));
  }

  addUser(user) {
    const storage = new Storage();
    const users = storage.getUsersLS();

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  deleteUser(cpf) {
    const storage = new Storage();
    const users = storage.getUsersLS();

    users.map((user, index) => {
      if (user.cpf === cpf) {
        users.splice(index, 1);
      }
    });
    localStorage.setItem("users", JSON.stringify(users));
  }
}

export const storage = new Storage();
