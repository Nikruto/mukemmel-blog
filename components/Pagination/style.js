import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
`;

export const PageCounter = styled.div`
  font-family: 'Nunito Sans';
  font-weight: 600;
  padding: 5px 11px 5px 11px;
  margin-right: 5px;
  border-radius: 3px;
  background-color: ${props => (props.isActive ? '#348ac7' : 'white')};
  color: ${props => (props.isActive ? 'white' : 'black')};
  transition: 0.25s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: #348ac7;
    color: white;
  }
`;
