import styled from 'styled-components';

export const LoginContainer = styled.div`
  background-color: #f0f4f6;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 30px 40px 30px 40px;
`;

export const Title = styled.h1`
  font-family: 'Segoe UI';
  text-align: center;
  margin: 0px;
  font-size: 30px;
`;

export const TextInput = styled.input`
  font-family: 'Segoe UI';
  font-weight: 600;
  border: none;
  background-color: #efefef;
  padding: 15px;
  width: 225px;
  border-radius: 3px;
  transition: 0.1s linear;

  &:nth-of-type(1) {
    margin-top: 40px;
  }
  &:nth-of-type(2) {
    margin-top: 20px;
  }

  &:hover {
    background-color: #e9e9e9;
  }

  &:focus {
    outline: none;
    box-shadow: 0 1px 0 #000 inset, -1px 0 0 #000 inset, 0 -1px 0 #000 inset,
      1px 0 0 #000 inset;
    background-color: white;
    &::placeholder {
      color: transparent;
    }
  }
`;

export const SendButton = styled.button`
  font-family: 'Segoe UI';
  font-size: 18px;
  border: none;
  border-radius: 3px;
  width: fit-content;
  margin: 35px auto 30px auto;
  padding: 5px 15px 5px 15px;
  color: white;
  background: linear-gradient(to right, #7474bf, #348ac7);
  transition: 0.1s linear;

  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }
  &:active {
    filter: brightness(90%);
  }
`;

export const ErrorText = styled.span`
  font-family: 'Segoe UI';
  color: #ff0000;
  font-size: 14px;
`;
