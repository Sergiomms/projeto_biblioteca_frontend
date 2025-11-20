import styled from "styled-components";

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
  max-width: 700px;
  margin: 10px auto;
`;

export const Label = styled.label`
  font-weight: bold;
  align-self: flex-start;
  width: 100%;
  max-width: 600px;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border: 1px solid #bbb;
  height: 40px;
  border-radius: 5px;
`;

export const Select = styled.select`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border: 1px solid #bbb;
  height: 40px;
  border-radius: 5px;
  background-color: white;
`;

export const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 42px;
  width: 150px;
  margin-top: 8px;
  font-weight: bold;

  &:hover {
    background-color: #357abd;
  }
`;
