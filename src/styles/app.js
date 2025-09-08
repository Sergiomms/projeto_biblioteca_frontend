import styled from "styled-components";

export const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
`;

export const Title = styled.h1`
  color: #4A90E2;
  margin-bottom: 20px;
`;

export const Box = styled.div`
  display: inline-block;
  padding: 20px;
  background-color: #fff;
  border: 2px solid #4A90E2;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f4f4f4;
  }
`;



