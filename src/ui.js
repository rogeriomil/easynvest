class UI {
  addUserToList(user) {
    const list = document.getElementById("user-list");
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.cpf}</td>
            <td>${user.phone}</td>
            <td><i class="far fa-trash-alt"></i></td>
            `;
    list.appendChild(row);
  }

  deleteUser(target) {
    if (target.className === "far fa-trash-alt") {
      target.parentElement.parentElement.remove();
    }
  }
}

export const ui = new UI();
