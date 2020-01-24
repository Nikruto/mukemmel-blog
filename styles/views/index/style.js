import styled from 'styled-components';

export const Container = styled.div`
  max-width: 46rem;
  width: 100%;
  margin: 0 auto;
`;

export const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 96px;
`;

export const PostViewerWrapper = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;
