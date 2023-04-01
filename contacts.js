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
  const getContact = getContactList.find(({ id }) => id === contactId);
  return getContact;
}
async function getContactByName(contactName) {
  const getContactList = await listContacts();
  const getContactName = getContactList.find(
    ({ name }) => name === contactName
  );
  return getContactName;
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
  console.log(`Contact: ${contactId} removed`);
}

async function addContact(name, email, phone) {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(console.warn);
  fs.writeFile(
    contactsPath,
    JSON.stringify([...contacts, { id: nanoid(), name, email, phone }])
  );
  console.log(`Contact added`);
}
module.exports = {
  listContacts,
  getContactById,
  getContactByName,
  removeContact,
  addContact,
};
