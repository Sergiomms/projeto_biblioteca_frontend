import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 0px 6px #ccc;
`;

export const Button = styled.button`
  background-color: #4A90E2;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 42px;

  &:hover {
    background-color: #357ABD;
  }
`;

export const Input = styled.input`
  width: 80%;
  padding: 0 10px;
  border: 1px solid #bbb;
  height: 40px;
`;

export const Label = styled.label``;