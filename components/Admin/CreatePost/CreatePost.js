import React from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEye, faCog } from '@fortawesome/free-solid-svg-icons';
import stringToEnglish from '../../../src/stringToEnglish.js';
import { CreatePostComponent, PageTitle } from './style.js';

import { EditorState } from 'draft-js';
const Editor = dynamic(
  import('draft-js').then(module => module.Editor),
  {
    ssr: false
  }
);

class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = editorState => this.setState({ editorState });
  }

  updateEditorState(editorState) {
    this.setState({ editorState });
  }
  render() {
    return (
      <CreatePostComponent>
        <PageTitle>Yazı Ekle</PageTitle>
        <Editor
          editorState={this.state.editorState}
          onChange={editorState => this.updateEditorState(editorState)}
        />
      </CreatePostComponent>
    );
  }
}

export default CreatePost;
