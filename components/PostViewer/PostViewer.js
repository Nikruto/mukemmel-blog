import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  styleMap,
  blockRenderMap,
  blockStyleFn,
  EditorStyleContainer
} from '../Admin/CreatePost/editorStyles.js';
import dateToTurkish from '../../src/dateToTurkish.js';
import { addBookmark, removeBookmark } from '../../src/bookmarkParser.js';

import notBookmarkedImg from '../../src/img/bookmark1.png';
import bookmarkedImg from '../../src/img/bookmark2.png';

const Editor = dynamic(
  import('draft-js').then(module => module.Editor),
  {
    ssr: false
  }
);

import { EditorState, convertFromRaw } from 'draft-js';

import {
  PostViewerContainer,
  PostHead,
  PostDate,
  PostTitleAndBookmarkContainer,
  PostTitle,
  BookmarkImage,
  PostImage,
  PostText
} from './style.js';

class PostViewer extends React.Component {
  constructor(props) {
    super(props);
    let parsedText = JSON.parse(this.props.post.text);
    if (this.props.post.onlyFirstBlock) {
      parsedText.blocks = parsedText.blocks.slice(0, 1);
    }
    this.state = {
      isBookmarked: props.post.isBookmarked,
      editorState: EditorState.createWithContent(convertFromRaw(parsedText))
    };
  }
  onBookmarkClick(post) {
    if (post.isBookmarked) {
      removeBookmark(post.slug);
    } else {
      addBookmark(post.slug);
    }
    this.setState({ isBookmarked: !this.state.isBookmarked });
  }
  render() {
    return (
      <PostViewerContainer fullPage={this.props.fullPage}>
        <PostHead>
          <PostDate>{dateToTurkish(new Date(this.props.post.date))}</PostDate>
          <PostTitleAndBookmarkContainer>
            <PostTitle>
              {this.props.post.link ? (
                <Link href={this.props.post.link}>
                  <a>{this.props.post.title}</a>
                </Link>
              ) : (
                <a>{this.props.post.title}</a>
              )}
            </PostTitle>

            {!this.props.post.useBookmark ? null : (
              <BookmarkImage
                src={this.state.isBookmarked ? bookmarkedImg : notBookmarkedImg}
                onClick={() => this.onBookmarkClick(this.props.post)}
              />
            )}
          </PostTitleAndBookmarkContainer>
          {this.props.post.imageUrl ? (
            <PostImage src={this.props.post.imageUrl} />
          ) : null}
        </PostHead>
        <PostText>
          <EditorStyleContainer>
            <Editor
              customStyleMap={styleMap}
              blockRenderMap={blockRenderMap}
              blockStyleFn={blockStyleFn}
              editorState={this.state.editorState}
              readOnly={true}
            />
          </EditorStyleContainer>
        </PostText>
      </PostViewerContainer>
    );
  }
}

export default PostViewer;
