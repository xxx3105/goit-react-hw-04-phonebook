import React from 'react';
import { Formik, Form } from 'formik';
import { nanoid } from 'nanoid';
import { Container, TitleOfBlocks } from 'styles/GlobalStyle';
import { ButtonAdder, Inputs, StyledErrorMessage } from './ContactForm.styled';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(8, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required'),
});

// export const ContactsBook = ({ onAdd, onSearch }) => (
export const ContactForm = ({ onAdd }) => (
  <Container>
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        onAdd({ ...values, id: nanoid() });
        //onSearch(values);
        actions.resetForm();
      }}
    >
      <Form>
        <TitleOfBlocks>Name:</TitleOfBlocks>

        <Inputs
          type="text"
          name="name"
          pattern="[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я]+)*"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id="firstName"
          placeholder="Enter name"
        />
        <StyledErrorMessage name="name" component="div" />

        <TitleOfBlocks>Email:</TitleOfBlocks>

        <Inputs
          name="number"
          type="text"
          pattern="\+?\d{1,4}?[ .\-\\s]?\(?\d{1,3}?\)?[ .\-\\s]?\d{1,4}[ .\-\\s]?\d{1,4}[ .\-\\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id="email"
          placeholder="+380501110011"
        />
        <StyledErrorMessage name="number" component="div" />

        <ButtonAdder type="submit">Add contact</ButtonAdder>
      </Form>
    </Formik>
  </Container>
);
