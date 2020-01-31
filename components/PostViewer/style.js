import styled from 'styled-components';

export const PostViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: ${props =>
    props.fullPage ? '' : '0px 1px 4px rgba(0, 0, 0, 0.1)'};

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-width: ${props => (props.fullPage ? '0px' : '1px')};
  border-radius: 6px;

  .DraftEditor-root {
    display: flex;
    flex: 1;
  }

  .DraftEditor-editorContainer {
    height: 100%;
    width: 100%;
  }

  .public-DraftEditor-content {
    height: 100%;
    width: 100%;
  }
`;

export const PostHead = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostDate = styled.p`
  margin: 0px;
  font-family: 'Nunito Sans';
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
`;
export const PostTitleAndBookmarkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PostTitle = styled.h1`
  font-family: 'Nunito Sans';
  font-weight: 800;
  font-size: 30px;
  margin: 0px;
`;

export const BookmarkImage = styled.img`
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const PostImage = styled.img`
  margin-top: 0.83em;
  width: 100%;
`;

export const PostText = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-family: 'Nunito Sans';
`;

export const ReadMoreText = styled.a`
  font-family: 'Nunito Sans';
  font-size: 18px;
  font-weight: 800;
  align-self: flex-end;
  transition: 0.1s linear;
  &:hover {
    cursor: pointer;
    color: #348ac7;
  }
`;
