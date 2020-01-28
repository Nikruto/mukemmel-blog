import styled from 'styled-components';

export const CreatePostComponent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 40px 40px 0px 40px;
`;

export const PageTitle = styled.h1`
  align-self: flex-start;
  font-family: 'Nunito Sans';
  font-size: 45px;
  margin: 0px;
`;

export const InnerContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex: 1;
  position: relative;
`;

export const EditorStyleContainer = styled.div`
  flex: 1;
  display: flex;
  font-size: 18px;
  font-family: 'Nunito Sans';
  h1,
  h2,
  h3,
  h4,
  p,
  a {
    margin-top: 0px;
    margin-bottom: 10px;
  }

  .Block {
    margin-bottom: 10px;
  }

  .code-block {
    background-color: #282c34;
    color: #79b6f2;
    padding: 15px 0px 15px 20px;
    margin-bottom: 10px;
  }

  .block-quote {
    background-color: #e2f2ff;
    padding: 15px;
    border-left: 5px solid #79b6f2;
    margin-bottom: 10px;
    font-size: 23px;
  }
`;
export const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 40px;

  .DraftEditor-root {
    background-color: white;
    min-height: 100px;
    max-height: 300px;
    width: 100%;
    overflow: auto;
    padding: 10px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .DraftEditor-editorContainer {
    height: 100%;
  }

  .public-DraftEditor-content {
    height: 100%;
  }
`;

export const EditorTitle = styled.input`
  border: none;
  height: 50px;
  font-size: 25px;
  padding: 10px 20px 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-family: 'Nunito Sans';
  font-weight: 700;
  &:focus {
    outline: none;
  }
  &::placeholder {
  }
`;

export const EditorToolbar = styled.div`
  background-color: white;
  display: flex;
  padding: 10px;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.05);
  z-index: 10;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

export const StyleButtons = styled.div`
  display: flex;

  #ActiveBlock {
    color: #79b6f2;
  }

  #ActiveInline {
    color: #79b6f2;
  }
`;

export const StyleButton = styled.button`
  border: none;
  background: rgba(0, 0, 0, 0);
  color: black;
  font-family: 'Nunito Sans';
  font-weight: 800;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;

export const OptionsContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding:20px;
`;

export const OptionsHead = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const OptionsTitle = styled.h1`
  font-family: 'Nunito Sans';
  font-size: 20px;
  margin: 0px;
  text-align:center;
`;

export const OptionsMid = styled.div`
  display:flex;
  flex-direction:column; 
  padding-top:10px;
`;

export const OptionsLabel = styled.span`
  font-size:18px;
  font-family:'Nunito Sans';

  &:nth-of-type(2){
    margin-top:10px;
  }
`

export const OptionsInput = styled.input`
  border:1px solid rgba(0,0,0,0.1);
  border-radius:3px;
  font-family:'Nunito Sans';
  font-size:18px;
  margin-top:5px;
`

export const OptionsSendButton = styled.button`
  font-family:'Nunito Sans';
  border:none;
  border-radius:3px;

  margin-top:15px;
  padding:5px 15px 5px 15px;
  font-size:18px;
  background: linear-gradient(to left, #7474bf, #348ac7);
  color:white;

  &:hover{
    cursor:pointer;
    filter:brightness(90%)
  }

  &:focus{
    outline:none;
  }
`;