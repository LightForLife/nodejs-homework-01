const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  const result = JSON.parse(allContacts);
  console.table(result);
  return result;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === contactId);
  console.table(result);
  return result || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  console.table(result);

  return result;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  console.table(newContact);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
