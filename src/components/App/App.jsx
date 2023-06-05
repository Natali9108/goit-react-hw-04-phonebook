import { useState } from 'react';
import { nanoid } from 'nanoid';
import { BsPersonFillAdd } from 'react-icons/bs';
import ButtonIcon from '../ButtonIcon';
import Modal from '../Modal';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import { useToggle, useLocalStorage } from 'hooks';
import { Container, PhonebookTitle, ContactsTitle } from './App.styled';

const LOCAL_STORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(LOCAL_STORAGE_KEY, []);
  const [filter, setFilter] = useState('');
  const { isOpen, toggle } = useToggle();

  const addContact = data => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const isExist = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );
    if (isExist) {
      alert(`This contact is already in contacts.`);
      return;
    }
    setContacts(state => [...state, contact]);
    toggle();
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilterName = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterName)
    );
  };

  const sortVisibleContacts = () => {
    const visibleContacts = getVisibleContacts();
    return visibleContacts.sort((first, second) =>
      first.name.localeCompare(second.name)
    );
  };

  const onDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Container>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ButtonIcon onClick={toggle}>
        <BsPersonFillAdd />
      </ButtonIcon>
      {isOpen && (
        <Modal onClose={toggle}>
          <ContactForm onSubmit={addContact} />
        </Modal>
      )}
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        items={sortVisibleContacts()}
        onDeleteContact={onDeleteContact}
      />
    </Container>
  );
};
