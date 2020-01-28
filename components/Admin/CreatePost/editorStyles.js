import Immutable from 'immutable';
import styled from 'styled-components';
export const styleMap = {
    HIGHLIGHT: {
      backgroundColor: '#faed27'
    }
  };
  
export const blockRenderMap = Immutable.Map({
    unstyled: { element: 'div' },
    'code-block': { element: 'div' },
    'header-one': { element: 'h1' },
    'header-two': { element: 'h2' },
    'header-three': { element: 'h3' },
    'header-four': { element: 'h4' }
  });
  
export const blockStyleFn = contentBlock => {
    const type = contentBlock.getType();
    if (type === 'code-block') {
      return 'code-block';
    } else if (type === 'blockquote') {
      return 'block-quote';
    } else if (type === 'unstyled') {
      return 'Block';
    }
  };
  
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
    margin:0px;
    border-left: 5px solid #79b6f2;
    margin-bottom: 10px;
    font-size: 23px;
  }
`;