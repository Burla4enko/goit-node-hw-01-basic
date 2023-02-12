const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json");
// console.log(contactsPath);

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    return console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

// listContacts();

async function getContactById(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const foundСontact = contacts.find((contact) => contact.id === contactId);
    return console.log(foundСontact);
  } catch (error) {
    console.log(error);
  }
}

// getContactById("3");

async function removeContact(contactId) {
  try {
    console.log(contactId);
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const deleteIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (deleteIndex === -1) {
      return console.log(
        `Bad value entered, try something different from this "${contactId}"`
      );
    }
    contacts.splice(deleteIndex, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

// removeContact("8");

async function addContact(name, email, phone) {
  const newContact = {
    id: uid(3),
    name,
    email,
    phone,
  };

  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

// addContact("Andrew", "bur@mail.ru", "0999229699");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
