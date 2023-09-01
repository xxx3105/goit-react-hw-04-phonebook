import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';

export const Inputs = styled(Field)`
  margin-left: 15px;
  padding: 5px 15px 5px;
  border-radius: 5px;
`;

export const ButtonAdder = styled.button`
  margin: 20px 65px;
  padding: 10px 15px;
  border-radius: 5px;
  border-style: none;
  cursor: pointer;
  font-weight: 500;
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
`;
