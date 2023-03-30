const path = require("path");

const fs = require("fs").promises;

const contactsPath = path.join("./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

function getContactById(contactId) {
  const contact = fs
    .readFile(contactsPath, "utf-8")
    .then((data) =>
      JSON.parse(data).filter((contact) => contact.id === contactId)
    )
    .then(console.table)
    .catch(console.warn);
  return contact;
}

function removeContact(contactId) {
  const contacts = fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(console.warn);
  fs.writeFile(
    contactsPath,
    JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
  )
    .then(() => console.log("Done!".green))
    .catch(console.warn);
}

function addContact(name, email, phone) {
  const contacts = fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(console.warn);

  fs.writeFile(
    contactsPath,
    JSON.stringify([
      ...contacts,
      { id: `${contacts.length + 1}`, name, email, phone },
    ])
  )
    .then(() => console.log("Done".green))
    .catch(console.warn);
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
