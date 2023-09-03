import React, { useEffect, useState } from 'react';
import { Layout } from './Layout';
import 'modern-normalize';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ListItem } from './ListItem/ListItem';
import { Filter } from './Filter/Filter';
import { NameOfList, OutputConainer } from 'styles/GlobalStyle';

const savedContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(function phoneHandler() {
    const storedData = localStorage.getItem('contacts');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeReqFilter = filter => {
    setFilter(filter);
  };

  const getFiltrDataCont = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const contactsDeleter = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const contactsAdder = values => {
    const { name, number } = values;
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevState => [...prevState, newContact]);
  };

  return (
    <Layout>
      <ContactForm onAdd={contactsAdder} />
      <OutputConainer>
        <NameOfList>Contacts:</NameOfList>
        <Filter datasSearch={filter} onChangeReq={changeReqFilter} />
        <ListItem datas={getFiltrDataCont()} deleteCont={contactsDeleter} />
      </OutputConainer>
    </Layout>
  );
};
