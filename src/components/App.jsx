import React from 'react';
import { Layout } from './Layout';
import 'modern-normalize';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ListItem } from './ListItem/ListItem';
import { Filter } from './Filter/Filter';
import { NameOfList, OutputConainer } from 'styles/GlobalStyle';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const storedData = localStorage.getItem('contacts');
    if (storedData) {
      this.setState({ contacts: JSON.parse(storedData) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contaсts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  changeReqFilter = newRequest => {
    this.setState({ filter: newRequest });
  };

  getFiltrDataCont = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  contactsDeleter = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  contactsAdder = values => {
    const { name, number } = values;
    const isExist = this.state.contacts.some(
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

    //localStorage.setItem('contact', JSON.stringify(newContact));

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  render() {
    return (
      <Layout>
        <ContactForm onAdd={this.contactsAdder} />
        <OutputConainer>
          <NameOfList>Contacts:</NameOfList>
          <Filter
            datasSearch={this.state.filter}
            onChangeReq={this.changeReqFilter}
          />
          <ListItem
            datas={this.getFiltrDataCont()}
            deleteCont={this.contactsDeleter}
          />
        </OutputConainer>
      </Layout>
    );
  }
}
