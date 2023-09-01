import {
  DelBut,
  SpicsokCont,
  СontactDesign,
} from 'components/ListItem/ListItem.styled';

export const ListItem = ({ datas, deleteCont }) => {
  return (
    <SpicsokCont>
      {datas.map(contact => (
        <СontactDesign key={contact.id}>
          <b>{contact.name}</b>: {contact.number}{' '}
          <DelBut type="button" onClick={e => deleteCont(contact.id)}>
            Delete
          </DelBut>
        </СontactDesign>
      ))}
    </SpicsokCont>
  );
};
