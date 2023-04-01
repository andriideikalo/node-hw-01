const path = require("path");

const fs = require("fs").promises;

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname + "/db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const getContactList = await listContacts();
  const getcontact = getContactList.find(({ id }) => id === contactId);
  return getcontact;
}

async function removeContact(contactId) {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(console.warn);
  fs.writeFile(
    contactsPath,
    JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
  ).catch(console.warn);
}

async function addContact(name, email, phone) {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(console.warn);
  fs.writeFile(
    contactsPath,
    JSON.stringify([
      ...contacts,
      // { id: `${contacts.length + 1}`, name, email, phone },
      { id: nanoid(), name, email, phone },
    ])
  );
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
