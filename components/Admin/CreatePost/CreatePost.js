import React from 'react';
import Immutable from 'immutable';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { styleMap, blockRenderMap, blockStyleFn } from './editorStyles.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuoteLeft,
  faCode,
  faHighlighter,
  faPaperPlane,
  faEye,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import stringToEnglish from '../../../src/stringToEnglish.js';

import {
  CreatePostComponent,
  InnerContainer,
  EditorContainer,
  EditorTitle,
  EditorToolbar,
  StyleButtons,
  StyleButton,
  EditorStyleContainer,
  OptionsContainer,
  OptionsHead,
  OptionsTitle,
  OptionsMid,
  OptionsLabel,
  OptionsInput,
  OptionsSendButton,
  PageTitle
} from './style.js';

const Editor = dynamic(
  import('draft-js').then(module => module.Editor),
  {
    ssr: false
  }
);

import Draft, { EditorState, convertToRaw, RichUtils } from 'draft-js';

class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      postInput: {
        title: '',
        slug: '',
        imageLink: ''
      },
      errors: {},
      isAttemptingToSend: false
    };

    this.updateEditorState = this.updateEditorState.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.displayErrors = this.displayErrors.bind(this);
  }

  displayErrors() {}

  onSaveButton() {
    if (this.state.isAttemptingToSend == true) return;

    this.setState({ isAttemptingToSend: true });

    let errors = {};
    const { title, slug } = this.state.postInput;

    if (title.trim().length === 0) errors.title = 'Başlık boş bırakılamaz';

    if (slug.trim().length === 0) errors.slug = 'Slug boş bırakılamaz';

    if (Object.keys(errors).length != 0) {
      this.setState({ isAttemptingToSend: false, errors });
      this.displayErrors(errors);
      return;
    } else {
      this.setState({ errors: [] });
      let postData = {
        title: this.state.postInput.title,
        slug: this.state.postInput.slug,
        imageLink: this.state.postInput.imageLink,
        details: JSON.stringify(
          convertToRaw(this.state.editorState.getCurrentContent())
        )
      };
      axios
        .post('/api/admin/createpost', postData)
        .then(res => {
          this.setState({ isAttemptingToSend: false });
          if (res.data.success === false) {
            window.alert(res.data.msg);
          } else {
            window.alert('Yeni Post Oluşturuldu');
            let urlToOpen = `http://${window.location.host}/${postData.slug}`;
            var win = window.open(urlToOpen, '_blank');
            win.focus();
          }
        })
        .catch(err => {
          Cookies.remove('token');
        });
    }
  }

  onPostInputChange(e, name) {
    this.setState({
      postInput: { ...this.state.postInput, [name]: e.target.value }
    });
  }

  handleReturn(e) {
    if (e.shiftKey) {
      this.updateEditorState(
        RichUtils.insertSoftNewline(this.state.editorState)
      );
      return 'handled';
    }
    return 'not-handled';
  }

  handleKeyCommand(command) {
    return 'not-handled';
  }
  updateEditorState(editorState) {
    this.setState({ editorState });
  }

  toggleInlineStyle = style => {
    const editorStateFocused = EditorState.forceSelection(
      this.state.editorState,
      this.state.editorState.getSelection()
    );
    this.updateEditorState(
      RichUtils.toggleInlineStyle(editorStateFocused, style)
    );
  };

  toggleBlockType = block => {
    const editorStateFocused = EditorState.forceSelection(
      this.state.editorState,
      this.state.editorState.getSelection()
    );
    this.updateEditorState(
      RichUtils.toggleBlockType(editorStateFocused, block)
    );
  };

  render() {
    return (
      <CreatePostComponent>
        <PageTitle>Yazı Ekle</PageTitle>
        <InnerContainer>
          <EditorContainer>
            <EditorToolbar>
              <StyleButtons>
                <StyleButton
                  onClick={() => this.toggleBlockType('header-one')}
                  style={{}}
                  id={
                    RichUtils.getCurrentBlockType(this.state.editorState) ===
                    'header-one'
                      ? 'ActiveBlock'
                      : ''
                  }
                >
                  H1
                </StyleButton>
                <StyleButton
                  onClick={() => this.toggleBlockType('header-two')}
                  style={{}}
                  id={
                    RichUtils.getCurrentBlockType(this.state.editorState) ===
                    'header-two'
                      ? 'ActiveBlock'
                      : ''
                  }
                >
                  H2
                </StyleButton>
                <StyleButton
                  onClick={() => this.toggleBlockType('header-three')}
                  style={{}}
                  id={
                    RichUtils.getCurrentBlockType(this.state.editorState) ===
                    'header-three'
                      ? 'ActiveBlock'
                      : ''
                  }
                >
                  H3
                </StyleButton>
                <StyleButton
                  onClick={() => this.toggleBlockType('header-four')}
                  style={{}}
                  id={
                    RichUtils.getCurrentBlockType(this.state.editorState) ===
                    'header-four'
                      ? 'ActiveBlock'
                      : ''
                  }
                >
                  H4
                </StyleButton>
                <StyleButton
                  onClick={() => this.toggleInlineStyle('HIGHLIGHT')}
                  style={{
                    marginLeft: '30px',
                    borderBottom: '2px solid #faed27'
                  }}
                  id={
                    this.state.editorState
                      .getCurrentInlineStyle()
                      .has('HIGHLIGHT')
                      ? 'ActiveInline'
                      : ''
                  }
                >
                  <FontAwesomeIcon icon={faHighlighter} />
                </StyleButton>
                <StyleButton
                  onClick={() => this.toggleBlockType('blockquote')}
                  style={{ marginLeft: '10px' }}
                  id={
                    RichUtils.getCurrentBlockType(this.state.editorState) ===
                    'blockquote'
                      ? 'ActiveBlock'
                      : ''
                  }
                >
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </StyleButton>
                <StyleButton
                  onClick={() => this.toggleBlockType('code-block')}
                  style={{ marginLeft: '5px' }}
                  id={
                    RichUtils.getCurrentBlockType(this.state.editorState) ===
                    'code-block'
                      ? 'ActiveBlock'
                      : ''
                  }
                >
                  <FontAwesomeIcon icon={faCode} />
                </StyleButton>
              </StyleButtons>
            </EditorToolbar>
            <EditorTitle
              value={this.state.postInput.title}
              onChange={e => this.onPostInputChange(e, 'title')}
              placeholder="Başlık"
              disabled={this.state.isAttemptingToSend}
            />
            <EditorStyleContainer>
              <Editor
                customStyleMap={styleMap}
                blockRenderMap={blockRenderMap}
                blockStyleFn={blockStyleFn}
                handleKeyCommand={this.handleKeyCommand}
                handleReturn={this.handleReturn}
                keyBindingFn={this.keyBindingFn}
                editorState={this.state.editorState}
                onChange={editorState => this.updateEditorState(editorState)}
              />
            </EditorStyleContainer>
            {/* <button
              onClick={() =>
                console.log(
                  convertToRaw(this.state.editorState.getCurrentContent())
                )
              }
            >
              Export
            </button> */}
          </EditorContainer>
          <OptionsContainer>
            <OptionsHead>
              <OptionsTitle>Ayarlar</OptionsTitle>
            </OptionsHead>
            <OptionsMid>
              <OptionsLabel>Slug</OptionsLabel>
              <OptionsInput
                disabled={this.state.isAttemptingToSend}
                value={this.state.postInput.slug}
                onChange={e => this.onPostInputChange(e, 'slug')}
                type="text"
              />
              <OptionsLabel>Resim Linki</OptionsLabel>
              <OptionsInput
                disabled={this.state.isAttemptingToSend}
                value={this.state.postInput.imageLink}
                onChange={e => this.onPostInputChange(e, 'imageLink')}
                type="text"
              />
              <OptionsSendButton
                disabled={this.state.isAttemptingToSend}
                onClick={() => this.onSaveButton()}
              >
                Kaydet
              </OptionsSendButton>
            </OptionsMid>
          </OptionsContainer>
        </InnerContainer>
      </CreatePostComponent>
    );
  }
}

export default CreatePost;
