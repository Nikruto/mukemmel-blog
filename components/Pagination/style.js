import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const PageCounter = styled.div`
  font-family: 'Nunito Sans';
  font-weight: 600;
  padding: 10px 20px 10px 20px;
  background-color: ${props => (props.isActive ? '#35459e' : 'white')};
  color: ${props => (props.isActive ? 'white' : '#35459e')};
  &:hover {
    cursor: pointer;
  }
  &:not(:first-child) {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
