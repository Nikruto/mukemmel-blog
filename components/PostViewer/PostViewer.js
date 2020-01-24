import React from 'react';
import Link from 'next/link';
import dateToTurkish from '../../src/dateToTurkish.js';
import { addBookmark, removeBookmark } from '../../src/bookmarkParser.js';

import notBookmarkedImg from '../../src/img/bookmark1.png';
import bookmarkedImg from '../../src/img/bookmark2.png';

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
    this.state = {
      isBookmarked: props.post.isBookmarked
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
          {this.props.post.image ? (
            <PostImage src={this.props.post.image} />
          ) : null}
        </PostHead>
        <PostText>{this.props.post.text}</PostText>
      </PostViewerContainer>
    );
  }
}

export default PostViewer;
