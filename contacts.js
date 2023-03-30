const path = require("path");

fs.readFile("readme.txt", data)
  .then((data) => console.log(data.toString()))
  .catch((err) => console.log(err.message));

fs.writeFile("readme.txt", data)
  .then((data) => console.log(data.toString()))
  .catch((err) => console.log(err.message));

const contactsPath = path.join("./db/contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  // ...твой код
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
