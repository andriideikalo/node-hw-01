const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const chalk = require('chalk');

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
    try {
      const contacts = await fs.readFile(contactsPath, "utf-8");
      const parsedContacts = JSON.parse(contacts);
      const filteredContacts = parsedContacts.filter(
        (contact) => contact.id !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
      console.log(chalk.bgYellow(`Сontact with "ID:${contactId}" has been removed`));
    } catch (error) {
      console.warn(error);
    }
   }
  async function addContact(name, email, phone) {
  
    try {
      const contacts = await fs.readFile(contactsPath, "utf-8");
      const parsedContacts = JSON.parse(contacts);
      const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
      };
      const updatedContacts = [...parsedContacts, newContact];
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
      console.log(chalk.bgYellow(`Сontact named "${name}" has been added`));
    } catch (error) {
      console.warn(error);
    }
  }

module.exports = {
  listContacts,
  getContactById,
  getContactByName,
  removeContact,
  addContact,
};
